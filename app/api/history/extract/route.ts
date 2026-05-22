import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    const groq = new Groq({ apiKey });

    const prompt = `Extract from this health response:
    "${message}"
    
    1. condition name (one short phrase)
    2. list of symptoms mentioned
    3. list of medicines suggested
    4. severity (mild/moderate/severe based on context)
    5. feeling score 1-5 (5=healthy, 1=severe illness)
    
    Return ONLY JSON: { "condition": string, "symptoms": string[], "medicines": string[], "severity": "mild"|"moderate"|"severe", "feelingScore": number }`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
      response_format: { type: "json_object" }
    });

    const resultText = completion.choices[0]?.message?.content || "{}";
    const data = JSON.parse(resultText);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Extract API Error:", error);
    return NextResponse.json({ error: "Failed to extract data" }, { status: 500 });
  }
}
