import Host, { Message } from "./host";
import Guesser from "./guesser";

const openAIKey = "OPEN_API_KEY";

const startGame = async () => {
  console.log("====================================");
  console.log("Game started");
  console.log("====================================");

  const host = new Host(openAIKey);

  const guesser = new Guesser(openAIKey);

  const topic = await host.defineTopic();

  const messageHistory: Message[] = host.messageHistory;

  console.log("====================================");
  console.log("Conversation");
  console.log("====================================");

  for (let i = 0; i < 21; i++) {
    const question = await guesser.askQuestion(messageHistory);

    await host.answerQuestion(question);

    console.log(messageHistory[i].content);

    if (host.messageHistory[host.messageHistory.length - 1].isCorrectTopic) {
      console.log("====================================");
      console.log("🏆🏆🏆🏆 WINNER 🏆🏆🏆🏆");
      console.log("Topic:", topic);
      console.log("====================================");
      break;
    }
  }

  if (
    host.messageHistory[host.messageHistory.length - 1].isCorrectTopic === false
  ) {
    console.log("====================================");
    console.log("❌❌❌❌ FAILED ❌❌❌❌");
    console.log("Correct Topic:", topic);
    console.log("====================================");
  }
  console.log("====================================");
  console.log("Game Over");
  console.log("====================================");
};

startGame();
