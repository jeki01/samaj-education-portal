import type { chatMessageI } from "@/pages/competitions/chat/useChat";
import moment from "moment";

interface GroupedMessage {
  grouped: chatMessageI[];
  messageTime: string;
  userId: string;
  role: string;
  user: string;
  reports?: number;
  message: string;
  totalReports: number
}

export function groupMessages(messages: chatMessageI[]): GroupedMessage[] {
  const groupedMessages: GroupedMessage[] = [];
  let currentGroup: chatMessageI[] = [];

  messages.forEach((msg, i) => {
    if (i === 0) {
      currentGroup.push(msg);
    } else {
      const prevMsg = messages[i - 1];
      const prevTime = moment(prevMsg.messageTime, "hh:mm A");
      const currTime = moment(msg.messageTime, "hh:mm A");
      const diff = currTime.diff(prevTime, "minutes", true);

      const isSameUser = msg.userId === prevMsg.userId;

      if (isSameUser && diff < 1) {
        currentGroup.push(msg);
      } else {
        groupedMessages.push({
          grouped: currentGroup,
          messageTime: currentGroup[currentGroup.length - 1].messageTime,
          userId: currentGroup[0].userId,
          role: currentGroup[0].role,
          user: currentGroup[0].user,
          reports: currentGroup[0].reports,
          message: currentGroup[0].message,
          totalReports: currentGroup[0].totalReports
        });

        currentGroup = [msg];
      }
    }
  });

  if (currentGroup.length > 0) {
    groupedMessages.push({
      grouped: currentGroup,
      messageTime: currentGroup[currentGroup.length - 1].messageTime,
      userId: currentGroup[0].userId,
      role: currentGroup[0].role,
      user: currentGroup[0].user,
      reports: currentGroup[0].reports,
      message: currentGroup[0].message,
      totalReports: currentGroup[0].totalReports
    });
  }

  return groupedMessages;
}
