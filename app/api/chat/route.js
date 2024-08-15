import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://api.aimlapi.com",
    });

    const data = await req.json();
    console.log("test " + JSON.stringify(data));

    const completion = await openai.chat.completions.create({
      messages: data,
      // { role: "system", content: "You are a travel agent. Be descriptive and helpful" },
      // { role: "user", content: "Tell me about San Francisco" },
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      stream: true,
      temperature: 0.7,
      max_tokens: 128,
    });

    console.log("API: ", completion);
    console.log("API test: ", JSON.stringify(completion));

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              const text = encoder.encode(content);
              controller.enqueue(text);
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new NextResponse(stream, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error: ", error);
    return new NextResponse(
      JSON.stringify({
        role: "system",
        content:
          "I'm sorry, but I encountered an error. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
