import OpenAI from "openai";
import {
  constructHostAnswerPrompt,
  constructHostMessageHistory,
  hostDefineTopicPrompt,
  hostSystemPrompt,
} from "./prompts/hostPrompts";
import { z } from "zod";
export interface Message {
  role: "system" | "user";
  content: string;
  isYes?: boolean;
  isCorrectTopic?: boolean;
}

const openAiResponseErrorMsg = "Failed to get response from openAI";

export default class Host {
  public topic: string;
  public messageHistory: Message[];
  public client: OpenAI;
  constructor(openaiKey: string) {
    this.client = new OpenAI({
      apiKey: openaiKey,
    });
    this.topic = "";
    this.messageHistory = [];
  }

  public async defineTopic(this: Host) {
    const defineTopicResponse = await this.createChatCompletion(
      [hostDefineTopicPrompt],
      0.7
    );

    if (!defineTopicResponse) {
      throw new Error(openAiResponseErrorMsg);
    }
    const parsedDefineTopicResponse = JSON.parse(
      defineTopicResponse.choices[0].message.content as string
    ) as {
      topic: string;
    };

    const { topic } = defineTopicResponseSchema.parse(
      parsedDefineTopicResponse
    );

    
    this.topic = topic;
    return topic;
  }

  public async answerQuestion(this: Host, question: string) {
    const hostAnswerResponse = await this.createChatCompletion(
      [constructHostAnswerPrompt(this.topic, question)],
      0
    );

    if (!hostAnswerResponse) {
      throw new Error(openAiResponseErrorMsg);
    }

    const parsedHostAnswer = JSON.parse(
      hostAnswerResponse.choices[0].message.content as string
    ) as {
      isYes: boolean;
      isCorrectTopic: boolean;
    };
    const { isYes, isCorrectTopic } =
      hostAnswerResponseSchema.parse(parsedHostAnswer);

    this.messageHistory.push({
      ...constructHostMessageHistory(question, isYes, isCorrectTopic),
      isYes,
      isCorrectTopic,
    });
  }

  async createChatCompletion(messages: Message[], temperature: number) {
    return this.client.chat.completions.create({
      model: "gpt-4o",
      messages: [hostSystemPrompt, ...messages],
      temperature,
      response_format: {
        type: "json_object",
      },
    });
  }
}

const hostAnswerResponseSchema = z.object({
  isYes: z.boolean(),
  isCorrectTopic: z.boolean(),
});

const defineTopicResponseSchema = z.object({
  topic: z.string(),
});
