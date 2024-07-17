import OpenAI from "openai";
import {
  constructHostAnswerPrompt,
  hostDefineTopicPrompt,
  hostSystemPrompt,
} from "./prompts/hostPrompts";

export interface Message {
  role: "system" | "user";
  content: string;
}

export default class Host {
  public topic: string;
  public messageHistory: Message[];
  public client: OpenAI;
  constructor(openaiKey: string) {
    this.client = new OpenAI({
      apiKey: openaiKey,
    });
    this.topic = "";
    this.messageHistory = [hostSystemPrompt];
  }

  public async defineTopic(this: Host) {
    const res = await this.createChatCompletion([
      ...this.messageHistory,
      hostDefineTopicPrompt,
    ]);

    if (!res) {
      throw new Error("Failed to get ressponse");
    }
    const { topic } = JSON.parse(res.choices[0].message.content as string) as {
      topic: string;
    };
    this.topic = topic;
    return topic;
  }

  public async answerQuestion(this: Host, question: string) {
    const res = await this.createChatCompletion([
      ...this.messageHistory,
      constructHostAnswerPrompt(question),
    ]);
    return res.choices[0].message.content;
  }

  async createChatCompletion(messages: Message[]) {
    return this.client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0,
      response_format: {
        type: "json_object",
      },
    });
  }
}
