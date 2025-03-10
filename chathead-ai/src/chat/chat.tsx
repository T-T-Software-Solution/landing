import { Attachments, type AttachmentsProps, Bubble, type PromptProps, Sender, XProvider, useXAgent, useXChat } from '@ant-design/x';
import type { BubbleListProps } from '@ant-design/x/es/bubble/BubbleList';
import type { Conversation } from '@ant-design/x/es/conversations';
import type { MessageInfo } from '@ant-design/x/es/useXChat';
import { ActionIcon, Avatar, Box, Button, Card, Group, Indicator, type MantineRadius, Popover, Stack, Text, Tooltip, rem, useMantineTheme } from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconCloudUpload, IconLink, IconMinus, IconSend2, IconSettings, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import DOMPurify from 'dompurify';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Countdown } from './countdown';
import { PlaceholderNode } from './placeholder-node';
import { useChatConfig } from './provider';
import type { AgentAIMessage, AgentMessage, AgentUserMessage, BubbleMessage } from './types';

dayjs.extend(utc);
dayjs.extend(localizedFormat)
dayjs.extend(buddhistEra);
dayjs.extend(relativeTime);

const getCurrentDate = () => dayjs().utc().toDate();

const getDurationFromNow = (date?: Date | null) => {
    if (!date || !dayjs(date).isValid()) return '';
    if (dayjs(date).isBefore(dayjs().subtract(1, 'day'))) {
        return dayjs(date).utc().format('HH:mm')
    }

    return dayjs(date).utc().fromNow()
}
export interface ChatProps {
    onMinimize?: () => void
    showMinimizeButton?: boolean
    scrollableShadow?: boolean
    radius?: MantineRadius
}

export const Chat: React.FC<ChatProps> = ({
    onMinimize,
    showMinimizeButton = false,
    scrollableShadow = false,
    radius = 'lg',
}) => {
    const config = useChatConfig();
    const { language } = config;
    dayjs.locale(language === 'th' ? 'th-TH' : 'en-US');
    const theme = useMantineTheme();
    const [content, setContent] = useState('');
    const [headerOpen, setHeaderOpen] = useState(false);
    const [settingsOpened, { toggle: toggleSettings }] = useDisclosure();
    const [messageHistories, setMessageHistories, clearMessageHistories] = useLocalStorage<Record<Conversation['key'], MessageInfo<AgentMessage>[]>>({
        key: 'message-histories',
        defaultValue: {},
    });
    const [activeKey, setActiveKey, clearActiveKey] = useLocalStorage<Conversation['key']>({
        key: 'conversation-key',
        defaultValue: crypto.randomUUID(),
    });
    const [attachedFiles, setAttachedFiles] = useState<AttachmentsProps['items']>([]);

    const senderRef = useRef<HTMLDivElement>(null);

    const [agent] = useXAgent<AgentMessage>({
        request: async ({ message }, { onSuccess, onError }) => {
            try {
                const { conversationKey, content } = message || {};
                if (!conversationKey || !content) return;

                const userRequest: AgentUserMessage = {
                    conversationKey,
                    type: 'local',
                    content: message?.content ?? '',
                    createdAt: message?.createdAt ?? getCurrentDate(),
                }

                const { answer, error } = await config.onFetchAnswer(content);
                if (error) {
                    onError(error);
                    return;
                }

                const aiResponse: AgentAIMessage = {
                    conversationKey,
                    type: 'ai',
                    content: answer,
                    list: [
                        {
                            conversationKey,
                            type: 'text',
                            content: "Do you want?",
                        },
                        {
                            conversationKey,
                            type: 'suggestion',
                            content: [`Look at: ${content}`, `Search: ${content}`, `Try: ${content}`],
                        },
                    ],
                    createdAt: getCurrentDate(),
                }

                onSuccess(aiResponse);

                if (conversationKey) {
                    setMessageHistories(prev => {
                        const messages = prev[conversationKey] ?? [];

                        return {
                            ...prev,
                            [conversationKey]: [
                                ...messages,
                                {
                                    id: crypto.randomUUID(),
                                    message: userRequest,
                                    status: 'local' as const,
                                },
                                {
                                    id: crypto.randomUUID(),
                                    message: aiResponse,
                                    status: 'success' as const,
                                }
                            ]
                        };
                    });
                }
            } catch (error) {
                if (error instanceof Error) {
                    onError(error);
                }

                onError(new Error('unknown error', { cause: error }));
            }
        },
    });

    const { onRequest, parsedMessages, setMessages } = useXChat<AgentMessage, BubbleMessage>({
        agent,

        requestFallback: (message, { error, messages }) => {
            console.error(error);

            return {
                conversationKey: `error-${crypto.randomUUID()}`,
                type: 'ai',
                content: `${language === 'th' ? 'ขออภัย ตอนนี้ฉันยังไม่สามารถตอบคำถามของคุณได้' : 'Sorry, I am unable to answer your question at the moment'}`,
                createdAt: getCurrentDate(),
            }
        },

        // Convert AgentMessage to BubbleMessage
        parser: (agentMessages) => {
            const list = agentMessages.content ? [agentMessages] : (agentMessages as AgentAIMessage).list;

            return (list || []).map((msg) => {
                if (['text', 'suggestion'].includes(msg.type)) {
                    return {
                        conkey: msg.conversationKey,
                        role: msg.type,
                        content: msg.content,
                    }
                }

                return {
                    conkey: msg.conversationKey,
                    role: msg.type,
                    content: msg.content,
                    created: msg.createdAt
                }
            });
        },
    });

    const groupMessagesByDate = (messages: MessageInfo<BubbleMessage>[]) => {
        const result: BubbleListProps['items'] = [];

        let currentDate: string | null = null;

        messages.forEach((message, index) => {
            const messageDate = message.message.created;
            if (!messageDate) return;

            const formattedDate = dayjs(messageDate).format('D MMMM BBBB');

            if (formattedDate !== currentDate) {
                currentDate = formattedDate;
                result.push({
                    role: 'date',
                    content: formattedDate,
                });
            }

            result.push(toBubbleListItem(message, index));
        });

        return result;
    };

    const toBubbleListItem = (bubbleMsg: MessageInfo<BubbleMessage>, index: number) => {
        const { id, message, status } = bubbleMsg;

        return {
            ...message,
            key: id,
            loading: status === 'loading',
            typing: message.role === 'ai' && index === parsedMessages.length - 1 ? { step: 5, interval: 20 } : false,
            footer: (
                <Tooltip withArrow label={dayjs(message.created).format('D MMMM BBBB เวลา LTS')}>
                    <Text
                        size="xs"
                        c="gray.6"
                        style={{
                            cursor: 'pointer',
                        }}
                    >
                        {getDurationFromNow(message.created)}
                    </Text>
                </Tooltip>
            ),
        }
    }

    const items: BubbleListProps['items'] = groupMessagesByDate(parsedMessages) ?? [];

    const onSubmit = (conversationKey: Conversation['key'], nextContent: string) => {
        if (!nextContent) return;
        onRequest({
            conversationKey: conversationKey,
            type: 'local',
            content: nextContent,
            createdAt: getCurrentDate(),
        });
        setContent('');
    };

    const onPromptsItemClick: (
        conversationKey: Conversation['key'],
        info: { data: PromptProps; }
    ) => void = (conversationKey, info) => {
        onSubmit(conversationKey, info.data.description as string);
    };

    const onStartConversation = () => {
        setActiveKey(crypto.randomUUID());
    }

    const onClearConversation = () => {
        modals.openConfirmModal({
            title: `${language === 'th' ? 'คุณต้องการล้างประวัติการสนทนาใช่หรือไม่?' : 'Do you want to clear the chat history?'}`,
            children: (
                <Text>
                    {language === 'th'
                        ? 'หากล้างแล้วจะไม่สามารถกู้คืนข้อมูลได้อีก'
                        : 'Once cleared, the data cannot be recovered.'}
                </Text>
            ),
            labels: {
                confirm: language === 'th' ? 'ยืนยัน' : 'Confirm',
                cancel: language === 'th' ? 'ยกเลิก' : 'Cancel',
            },
            onConfirm: () => {
                clearActiveKey();
                clearMessageHistories();
                onStartConversation();
            },
            zIndex: 310,
        });
    }

    const handleFileChange: AttachmentsProps['onChange'] = (info) => setAttachedFiles(info.fileList);
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        setMessages(activeKey ? messageHistories[activeKey] || [] : []);
    }, [activeKey, messageHistories]);

    return (
        <Card
            shadow="md"
            radius={radius}
            withBorder
            p={0}
            m={0}
            h="100%"
            w="100%"
            styles={{
                root: {
                    borderColor: theme.colors?.primary?.[1],
                    display: 'flex',
                },
                section: {
                    borderColor: theme.colors?.primary?.[1],
                }
            }}
        >
            <Card.Section
                withBorder
                p="xs"
                m={0}
                h="auto"
                component={Group}
                justify="space-between"
                align="center"
                style={{
                    background: `linear-gradient(to right, ${theme.colors?.primary?.[5]}, ${theme.colors?.primary?.[4]})`,
                }}
            >
                <Popover
                    opened={settingsOpened}
                    position="bottom-start"
                    offset={0}
                    shadow="md"
                    withArrow
                >
                    <Popover.Target>
                        <Tooltip label={language === 'th' ? 'ตั้งค่า' : 'setting'} withArrow>
                            <ActionIcon
                                autoContrast
                                aria-label="ตั้งค่า"
                                variant="light"
                                size="xs"
                                color="primary.3"
                                c="primary.1"
                                onClick={toggleSettings}
                            >
                                <IconSettings />
                            </ActionIcon>
                        </Tooltip>
                    </Popover.Target>
                    <Popover.Dropdown style={{ padding: 0 }}>
                        <Button
                            variant="subtle"
                            color="red"
                            fullWidth
                            size="xs"
                            leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} />}
                            onClick={onClearConversation}
                        >
                            {language === 'th' ? 'ล้างประวัติการสนทนา' : 'Clear chat history'}

                        </Button>
                    </Popover.Dropdown>
                </Popover>
                <Text size="sm" fw={600} c="primary.0">{language === 'th' ? 'น้อง BKK' : 'BKK AI'} — AI Chat</Text>
                {
                    showMinimizeButton ? (
                        <Tooltip label={language === 'th' ? 'ย่อหน้าต่าง' : 'minimize'} withArrow>
                            <ActionIcon
                                autoContrast
                                aria-label="ย่อหน้าต่าง"
                                variant="light"
                                size="xs"
                                color="primary.3"
                                c="primary.1"
                                onClick={() => {
                                    if (onMinimize) {
                                        onMinimize();
                                    }
                                }}
                            >
                                <IconMinus />
                            </ActionIcon>
                        </Tooltip>
                    ) : <div />
                }
            </Card.Section>

            <Card.Section
                m={0}
                p={0}
                h="100%"
                component={Stack}
                gap={0}
                align="stretch"
                justify="space-between"
                style={{
                    overflowY: 'auto',
                }}
            >
                <XProvider direction="ltr"
                    theme={{
                        token: {
                            fontSize: Number.parseInt(theme.fontSizes.md),
                            fontSizeSM: Number.parseInt(theme.fontSizes.sm),
                            fontSizeLG: Number.parseInt(theme.fontSizes.lg),
                            fontSizeXL: Number.parseInt(theme.fontSizes.xl),
                            fontFamily: theme.fontFamily,
                            colorPrimary: theme.colors?.primary?.[4],
                        }
                    }}
                >
                    <Bubble.List
                        autoScroll
                        roles={{
                            date: {
                                variant: 'borderless',
                                style: {
                                    width: '100%',
                                    justifyContent: 'center',
                                },
                                styles: {
                                    content: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontWeight: 500,
                                        color: "inherit",
                                    }
                                },
                            },
                            ai: {
                                placement: 'start',
                                avatar: <Avatar src={config.agentAvatarImageSrc} alt={config.agentName} size="md" >
                                    {config.agentName}
                                </Avatar>,
                                header: config.agentName,
                                variant: 'outlined',
                                style: {
                                    maxWidth: 600,
                                    paddingRight: 50,
                                },
                                styles: {
                                    header: {
                                        color: "inherit",
                                    },
                                    content: {
                                        color: "inherit",
                                        borderColor: theme.colors?.primary?.[1],
                                    },
                                    footer: {
                                        marginTop: 2,
                                        marginRight: 10,
                                    }
                                },
                                messageRender: (message) => {
                                    return (
                                        <div
                                            style={{
                                                whiteSpace: 'pre-wrap',
                                            }}
                                            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(message)
                                            }}
                                        />
                                    )
                                },
                            },
                            local: {
                                placement: 'end',
                                avatar: (
                                    <Avatar
                                        color="primary"
                                        src={config.userAvatarImageSrc}
                                        alt={config.userName}
                                        size="md"
                                    >
                                        {config.userName}
                                    </Avatar>
                                ),
                                variant: 'outlined',
                                typing: false,
                                style: {
                                    alignSelf: 'flex-end',
                                    paddingLeft: 50,
                                },
                                styles: {
                                    content: {
                                        backgroundColor: theme.colors?.primary?.[0],
                                        color: "inherit",
                                        borderColor: theme.colors?.primary?.[1],
                                    },
                                    footer: {
                                        alignSelf: 'end',
                                        marginTop: 2,
                                        marginLeft: 10,
                                    }
                                },
                                messageRender: (message) => {
                                    return (
                                        <Text>
                                            {message}
                                        </Text>
                                    )
                                },
                            },
                        }}
                        style={{
                            flex: 1,
                            padding: "1rem",
                            background: scrollableShadow ? `
                                /* Shadow Cover TOP */
                                linear-gradient(
                                    white 30%,
                                    rgba(255, 255, 255, 0)
                                ) center top,
                                
                                /* Shadow Cover BOTTOM */
                                linear-gradient(
                                    rgba(255, 255, 255, 0), 
                                    white 70%
                                ) center bottom,
                                
                                /* Shadow TOP */
                                radial-gradient(
                                    farthest-side at 50% 0,
                                    rgba(0, 0, 0, 0.1),
                                    rgba(0, 0, 0, 0)
                                ) center top,
                                
                                /* Shadow BOTTOM */
                                radial-gradient(
                                    farthest-side at 50% 100%,
                                    rgba(0, 0, 0, 0.1),
                                    rgba(0, 0, 0, 0)
                                ) center bottom` : 'transparent',
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "100% 40px, 100% 40px, 100% 14px, 100% 14px",
                            backgroundAttachment: "local, local, scroll, scroll"
                        }}
                        items={items.length > 0 ? items : [{
                            content: <PlaceholderNode onPromptsItemClick={(info) => onPromptsItemClick(activeKey, info)} />,
                            variant: 'borderless'
                        }]}
                    />

                    <Box
                        p="md"
                        style={{
                            borderTop: `1px solid ${theme.colors?.primary?.[1]}`,
                        }}
                    >
                        <Sender
                            header={
                                <Sender.Header
                                    title={language === 'th' ? 'ไฟล์แนบ' : 'Attachments'}
                                    open={headerOpen}
                                    onOpenChange={setHeaderOpen}
                                    styles={{
                                        content: {
                                            padding: 0,
                                        },
                                    }}
                                >
                                    <Attachments
                                        // Mock not real upload file
                                        beforeUpload={() => false}
                                        items={attachedFiles}
                                        onChange={handleFileChange}
                                        disabled={agent.isRequesting()}
                                        placeholder={(type) =>
                                            type === 'drop'
                                                ? {
                                                    title: language === 'th' ? 'ลากไฟล์มาวางที่นี่' : 'Drag and drop files here',
                                                }
                                                : {
                                                    icon: <IconCloudUpload />,
                                                    title: language === 'th' ? 'อัปโหลดไฟล์' : 'Upload files',
                                                    description: language === 'th' ? 'คลิกหรือลากไฟล์มายังพื้นที่นี้เพื่ออัปโหลด' : 'Click or drag files here to upload',
                                                }
                                        }
                                        getDropContainer={() => senderRef.current}
                                    />
                                </Sender.Header>
                            }
                            prefix={
                                <Indicator
                                    inline
                                    processing
                                    color="red"
                                    label={attachedFiles?.length ?? ''}
                                    size={16}
                                    disabled={attachedFiles && attachedFiles?.length < 1 || headerOpen}
                                    style={{
                                        alignSelf: "center",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <ActionIcon
                                        variant='transparent'
                                        c="primary.4"
                                        aria-label='Upload file'
                                        onClick={() => {
                                            setHeaderOpen(!headerOpen);
                                        }}
                                    >
                                        <IconLink />
                                    </ActionIcon>
                                </Indicator>
                            }
                            loading={agent.isRequesting()}
                            disabled={!activeKey || agent.isRequesting()}
                            value={content}
                            onChange={setContent}
                            placeholder={language === 'th' ? 'พิมพ์ข้อความที่คุณต้องการถาม...' : 'Type the message you want to ask…'}
                            onSubmit={(content) => onSubmit(activeKey, content)}
                            allowSpeech
                            actions={(_, info) => {
                                const { SendButton } = info.components;

                                if (agent.isRequesting()) {
                                    return (
                                        <Countdown seconds={15} />
                                    );
                                }

                                return (
                                    <SendButton
                                        type="text"
                                        icon={<IconSend2 color={theme.colors?.primary?.[4]} />}
                                        disabled={agent.isRequesting()}
                                    />
                                );
                            }}
                            style={{
                                borderColor: theme.colors?.primary?.[2],
                            }}
                            styles={{
                                prefix: {
                                    display: 'contents',
                                },
                                input: {
                                    color: "inherit",
                                    background: "transparent",
                                    padding: 0,
                                },
                            }}
                        />
                    </Box>
                </XProvider>
            </Card.Section>
        </Card>
    );
}