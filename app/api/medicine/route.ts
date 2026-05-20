import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { medicineName } = body;
    const groqKey = process.env.GROQ_API_KEY;

    if (!groqKey) {
      return NextResponse.json({ error: "Groq API Key not configured" }, { status: 500 });
    }

    if (!medicineName) {
      return NextResponse.json({ error: "No medicine name provided" }, { status: 400 });
    }

    const groq = new Groq({ apiKey: groqKey });

    // Text search - use Groq llama-3.3-70b-versatile
    const prompt = `You are a medical encyclopedia. Give detailed info about the medicine: "${medicineName}". 
    Auto-correct any spelling mistakes and identify closest medicine. 
    Return ONLY raw JSON, no markdown, no backticks: 
    { 
      "name": string, 
      "correctedFrom": string or null, 
      "genericName": string, 
      "category": string, 
      "description": string, 
      "uses": string[], 
      "dosage": { 
        "adult": string, 
        "child": string, 
        "frequency": string, 
        "timing": string 
      }, 
      "howToTake": string[], 
      "conditions": string[], 
      "sideEffects": string[], 
      "warnings": string[], 
      "storage": string, 
      "whenToSeeDoctor": string[] 
    }`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1500,
      response_format: { type: "json_object" }
    });

    const responseText = completion.choices[0]?.message?.content || "";
    
    // Clean and parse JSON
    try {
      const cleaned = responseText.replace(/```json|```/g, "").trim();
      const parsedData = JSON.parse(cleaned);

      if (parsedData.error) {
        return NextResponse.json({ error: parsedData.error }, { status: 400 });
      }

      return NextResponse.json(parsedData);
    } catch (parseError) {
      console.error("JSON Parse Error:", responseText);
      throw new Error("Failed to parse medical data from AI response");
    }

  } catch (error: any) {
    console.error("Medicine API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to find medicine. Please try again." },
      { status: 500 }
    );
  }
}
