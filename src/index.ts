import Host, { Message } from "./host";
import Guesser from "./guesser";

const openAIKey = "API_KEY_HERE";

export type Conversation = {
  speaker: "guesser" | "host";
  content: string;
  isYes?: boolean;
}[];

const startGame = async () => {
  console.log("Game started");

  const host = new Host(openAIKey);

  const guesser = new Guesser(openAIKey);

  console.log("The host is defining the topic");

  const topic = await host.defineTopic();

  const messageHistory: Message[] = host.messageHistory;

  console.log(
    "The Game has started, the topic will be revealed at the end of the game."
  );

  for (let i = 0; i < 21; i++) {
    const question = await guesser.askQuestion(messageHistory);

    await host.answerQuestion(question);

    console.log("Conversation History", messageHistory);

    if (host.messageHistory[host.messageHistory.length - 1].isCorrectTopic) {
      console.log("The guesser has guessed the topic correctly, it was", topic);
      break;
    }
  }

  if (
    host.messageHistory[host.messageHistory.length - 1].isCorrectTopic === false
  ) {
    console.log("The guesser has failed to guess the topic, it was", topic);
  }

  console.log("Game Over");
};

startGame();
