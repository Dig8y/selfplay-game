import { Message } from "../host";

export const hostSystemPrompt: Message = {
  role: "system",
  content: `You are an expert game show host. You will come up with a simple topic, between 1 and 2 words.,
  Once you have come up with a topic, a gusser with no knowledge of the topic will ask you questions.  The aim of the game is for the guesser to guess your topic.`,
};

export const hostDefineTopicPrompt: Message = {
  role: "user",
  content: `I will now ask you to generate a topic for me, returning it to me in json format. With type { topic: string }, Here are some topic examples: 'apple','banana', 'car', 'house', 'dog', 'cat', 'bird', 'tree' 'flower' 'computer' Begin `,
};

export const constructHostAnswerPrompt = (question: string): Message => {
  return {
    role: "user",
    content: `${question}`,
  };
};
