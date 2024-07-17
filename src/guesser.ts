import OpenAI from "openai";
import { Message } from "./host";
import {
  constructGuessingPrompt,
  guesserSystemPrompt,
} from "./prompts/guesserPrompts";
import { z } from "zod";

export default class Guesser {
  public client: OpenAI;

  constructor(openaiKey: string) {
    this.client = new OpenAI({
      apiKey: openaiKey,
    });
  }

  async askQuestion(previousMessages: Message[]) {

    const askQuestionResponse = await this.createChatCompletion(
      constructGuessingPrompt(previousMessages)
    );

    if (!askQuestionResponse) {
      throw new Error("Failed to get response from openAI");
    }

    const parsedAskQuestionRes = JSON.parse(
      askQuestionResponse.choices[0].message.content as string
    ) as {
      question: string;
    };

    const { question } = askQuestionResponseSchema.parse(parsedAskQuestionRes);

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

const askQuestionResponseSchema = z.object({
  question: z.string(),
});
