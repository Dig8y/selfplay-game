import { Message } from "../host";

// Guesser prompts
export const guesserSystemPrompt: Message = {
  role: "system",
  content: `
    You are a contestant on a guessing game. The host has selected a topic and you must guess what it is. You can ask the host questions to which he will respond with yes or no. He will also state if you guessed correctly. Be intelligent with asking your questions. For example if the response for a previous question is no then do not ask a question of a similar topic. You have 20 questions to guess the topic.

    You must response with the type : { question: string }
  
  `,
};

export const constructGuessingPrompt = (
  previousMessages: Message[]
): Message[] => {
  return [
    {
      role: "user",
      content: `
        Here is a readable conversation      
          
        ${previousMessages.map((message) => message.content).join("\n")}
        
        The response type is json with the following format: { question: string }

`,
    },
  ];
};
