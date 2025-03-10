import { ActionIcon, Affix, type AffixBaseProps, type ButtonProps, Drawer, type FloatingPosition, Popover, Tooltip, Transition } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconMessageFilled } from '@tabler/icons-react';
import { Chat, type ChatProps } from './chat';

interface ChatWidgetProps {
    popoverPosition?: FloatingPosition;
    buttonPosition?: AffixBaseProps['position'];
    buttonGradient?: ButtonProps['gradient'];
    chatProps: ChatProps
}

export const ChatWidget = ({
    popoverPosition = "top",
    buttonPosition = { bottom: 20, right: 20 },
    buttonGradient = { from: 'green', to: 'teal', deg: 244 },
    chatProps
}: ChatWidgetProps) => {
    const [opened, { toggle, close }] = useDisclosure(false);
    const isMobileOrTablet = useMediaQuery('(max-width: 768px)') || false;

    return (
        <>
            <Drawer.Root
                opened={opened && isMobileOrTablet}
                onClose={close}
                size="100%"
                zIndex={210} // because Affix zIndex is 200
                position="right"
            >
                <Drawer.Content
                    h="100vh"
                >
                    <Chat
                        radius="none"
                        showMinimizeButton={true}
                        onMinimize={close}
                        {...chatProps}
                    />
                </Drawer.Content>
            </Drawer.Root>
            <Popover
                opened={opened && !isMobileOrTablet}
                position={popoverPosition}
                shadow='none'
                offset={0}
            >
                <Popover.Target>
                    <Affix position={buttonPosition}>
                        <Transition transition="slide-up" mounted>
                            {(transitionStyles) => (
                                <Tooltip
                                    label={`${opened ? 'ปิด' : 'เริ่มต้น'}การสนทนา`}
                                    withArrow
                                    arrowPosition="side"
                                    transitionProps={{
                                        transition: 'pop',
                                        duration: 150,
                                        timingFunction: 'linear'
                                    }}
                                >
                                    <ActionIcon
                                        aria-label={`${opened ? 'ปิด' : 'เริ่มต้น'}การสนทนา`}
                                        onClick={toggle}
                                        style={transitionStyles}
                                        size="xl"
                                        variant="gradient"
                                        gradient={buttonGradient}
                                        autoContrast
                                        radius="xl"
                                    >
                                        <IconMessageFilled />
                                    </ActionIcon>
                                </Tooltip>
                            )}
                        </Transition>
                    </Affix>
                </Popover.Target>
                <Popover.Dropdown
                    h="60vh"
                    w={400}
                    style={{
                        background: 'transparent',
                        boxShadow: 'none',
                        border: 'none',
                    }}
                >
                    <Chat
                        showMinimizeButton={true}
                        onMinimize={close}
                        {...chatProps}
                    />
                </Popover.Dropdown>
            </Popover>
        </>
    )
}