import Groq from "groq-sdk";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    const groq = new Groq({
      apiKey: apiKey,
    });

    // Convert chat history to Groq format (OpenAI compatible)
    const formattedMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: formattedMessages,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      response_format: { type: "json_object" } // Force JSON response
    });

    const reply = chatCompletion.choices[0]?.message?.content || "";
    
    // Attempt to parse to ensure it's valid JSON
    let parsedReply;
    try {
      parsedReply = JSON.parse(reply);
    } catch (e) {
      console.error("Failed to parse AI response as JSON:", reply);
      // If parsing fails, wrap it in an answer type to prevent frontend crash
      parsedReply = { type: "answer", message: reply };
    }

    return NextResponse.json({ reply: parsedReply });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    
    if (error.status === 429) {
      return NextResponse.json(
        { error: "MediMate is a bit busy (Groq API Quota exceeded). Please try again in a few seconds." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch response from MediMate" },
      { status: 500 }
    );
  }
}
