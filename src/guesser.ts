import OpenAI from "openai";
import { Message } from "./host";
import {
  constructGuessingPrompt,
  guesserSystemPrompt,
} from "./prompts/guesserPrompts";

export default class Guesser {
  public client: OpenAI;

  constructor(openaiKey: string) {
    this.client = new OpenAI({
      apiKey: openaiKey,
    });
  }

  async askQuestion(previousMessages: Message[]) {
    console.log(constructGuessingPrompt(previousMessages));

    const res = await this.createChatCompletion(
      constructGuessingPrompt(previousMessages)
    );

    if (!res) {
      throw new Error("Failed to get response from openAI");
    }

    const { question } = JSON.parse(
      res.choices[0].message.content as string
    ) as {
      question: string;
    };

    return question;
  }

  async createChatCompletion(messages: Message[]) {
    return this.client.chat.completions.create({
      model: "gpt-4o",
      messages: [guesserSystemPrompt, ...messages],
      temperature: 0.5,
      response_format: {
        type: "json_object",
      },
    });
  }
}
