import { Prompts, type PromptsProps, Welcome } from "@ant-design/x";
import { Avatar, Group, Stack, Text } from "@mantine/core";
import { IconFlame } from "@tabler/icons-react";
import { useChatConfig } from "./provider";

const getWelcomeMessageTH = () => {
	const hour = new Date().getHours();
	if (hour >= 5 && hour < 12) {
		return "สวัสดีตอนเช้าค่ะ ✨ วันนี้อากาศดีนะคะ";
	}
	if (hour >= 12 && hour < 17) {
		return "สวัสดีตอนกลางวันค่ะ 🌞 ทานข้าวแล้วหรือยังคะ?";
	}
	if (hour >= 17 && hour < 22) {
		return "สวัสดีตอนเย็นค่ะ 🌅 วันนี้เป็นอย่างไรบ้างคะ?";
	}

	return "สวัสดีตอนดึกค่ะ 🌙 อย่าลืมพักผ่อนด้วยนะคะ";
};

const getWelcomeMessageEN = () => {
	const hour = new Date().getHours();
	if (hour >= 5 && hour < 12) {
		return "Good morning! ✨ The weather is nice today, isn't it?";
	}
	if (hour >= 12 && hour < 17) {
		return "Good afternoon! 🌞 Have you had lunch yet?";
	}
	if (hour >= 17 && hour < 22) {
		return "Good evening! 🌅 How was your day?";
	}

	return "Good night! 🌙 Don't forget to rest.";
};

interface PlaceholderNodeProps {
	onPromptsItemClick: PromptsProps["onItemClick"];
}

export const PlaceholderNode = ({
	onPromptsItemClick,
}: PlaceholderNodeProps) => {
	const config = useChatConfig();
	const { language } = config;
	const welcomeMessageTH = getWelcomeMessageTH();
	const welcomeMessageEN = getWelcomeMessageEN();

	return (
		<Stack gap="md" maw={600}>
			<Welcome
				variant="borderless"
				icon={
					<Avatar
						src={config.agentAvatarImageSrc}
						alt={config.agentName}
						size="lg"
					>
						{config.agentName}
					</Avatar>
				}
				title={
					language === "th" ? `${welcomeMessageTH}` : `${welcomeMessageEN}`
				}
				description={
					language === "th"
						? "ฉันคือ น้อง BKK ผู้ช่วยที่แสนดีของคุณ..."
						: "I am BKK AI your friendly and helpful assistant…"
				}
			/>

			<Prompts
				title={
					language === "th"
						? "คุณต้องการให้ฉันช่วยเหลืออะไรไหมคะ?"
						: "How can I assist you today?"
				}
				wrap
				items={[
					{
						key: "1",
						label: (
							<Group gap="xs" align="center">
								<IconFlame color="#FF4D4F" />
								<Text fw="bold">
									{language === "th" ? "คำถามยอดนิยม" : "Popular Questions"}
								</Text>
							</Group>
						),
						children:
							language === "th"
								? [
										{
											key: "1-0",
											description: "บัตรประชาชนหายทำอย่างไร",
										},
										{
											key: "1-1",
											description: "ติดตามการจัดซื้อจัดจ้างของกรุงเทพฯ ได้อย่างไร",
										},
										{
											key: "1-2",
											description: "สถานที่ท่องเที่ยวน่าสนใจในกรุงเทพฯ",
										},
									]
								: [
										{
											key: "1-0",
											description: "What to do if your ID card is lost?",
										},
										{
											key: "1-1",
											description:
												"How to track Bangkok's procurement process?",
										},
										{
											key: "1-2",
											description:
												"Interesting tourist attractions in Bangkok?",
										},
									],
					},
				]}
				styles={{
					item: {
						flex: "none",
						width: "270px",
						backgroundImage:
							"linear-gradient(137deg, #fff5e6 0%, #ffe7e7 100%)",
						border: 0,
					},
					subItem: {
						background: "rgba(255,255,255,0.45)",
						border: "1px solid #FFF",
					},
				}}
				onItemClick={onPromptsItemClick}
			/>
		</Stack>
	);
};
