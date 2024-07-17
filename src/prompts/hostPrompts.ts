import { Message } from "../host";

export const hostSystemPrompt: Message = {
  role: "system",
  content: `You are an expert game show host. You will come up with a simple topic, between 1 and 2 words.,
  Once you have come up with a topic, a gusser with no knowledge of the topic will ask you questions.  The aim of the game is for the guesser to guess your topic.`,
};

export const hostDefineTopicPrompt: Message = {
  role: "user",
  content: `I will now ask you to generate a topic for me, returning it to me in json format. With type { topic: string }, Here are some topic examples: 'apple','banana', 'car', 'house', 'dog', 'Eiffel Tower', 'Great Wall of China', 'bird', 'The Lion King', 'Microwave', 'Vacuum Cleaner', 'Titanic', 'flower', 'mountain lion', 'formula 1' Begin `,
};

export const constructHostAnswerPrompt = (
  topic: string,
  question: string
): Message => {
  return {
    role: "user",
    content: `
      You provided me with a topic of ${topic}. Now I will ask you a question about your topic.
      
      
      You will return the answer to me in json format. With type { isYes: boolean, isCorrectTopic: boolean }.
      
      isYes is defined as the guesser's guess of the topic.
      
      Think carefully about your answer. Here is the question:
      
      
      ${question}

      Begin
    
    `,
  };
};

export const constructHostMessageHistory = (
  question: string,
  isYes: boolean,
  isCorrectTopic: boolean
): Message => {
  return {
    role: "user",
    content: `
      The guesser asked the question: ${question}
      The hosts response was ${isYes ? "Yes" : "No"}
      Was the guesser correct?: ${
        isCorrectTopic ? "Correct Guess" : "Incorrect Guess"
      }
    `,
  };
};
