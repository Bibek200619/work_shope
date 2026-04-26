import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GOOGLE_AI_API_KEY;

export async function POST(req: Request) {
  if (!apiKey) {
    console.error("Missing GOOGLE_AI_API_KEY environment variable");
    return NextResponse.json(
      { error: "AI API key is not configured on the server." },
      { status: 500 }
    );
  }

  try {
    const { symptoms } = await req.json();

    if (!symptoms || !Array.isArray(symptoms)) {
      return NextResponse.json(
        { error: "Symptoms array is required" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });

    const prompt = `
    You are an expert medical AI symptom checker.
    The user has provided the following symptoms: ${symptoms.join(', ')}.

    Analyze these symptoms and provide a risk assessment and predictions.
    You MUST return ONLY valid JSON matching this exact structure, with no markdown formatting or extra text:

    {
      "predicted_diseases": [
        { "name": "Disease Name", "probability": 0.85, "description": "Short description" }
      ],
      "risk_score": 0.65,
      "risk_level": "LOW", "MEDIUM", "HIGH", or "EMERGENCY",
      "reasoning": "A short, professional explanation of why these diseases were predicted based on the symptoms.",
      "recommendation": "Clear, actionable medical advice (e.g., 'Rest and hydrate', 'Visit urgent care')."
    }

    Rules:
    1. risk_score must be a float between 0.0 and 1.0.
    2. risk_level must strictly be one of: LOW, MEDIUM, HIGH, EMERGENCY.
    3. Return exactly 3 possible predicted_diseases.
    4. If the symptoms indicate a heart attack, stroke, or severe bleeding, set risk_level to EMERGENCY and risk_score above 0.9.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text || '';
    
    // Clean up potential markdown from the LLM response
    const cleanJsonText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(cleanJsonText);

    return NextResponse.json(result);

  } catch (error: any) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze symptoms" },
      { status: 500 }
    );
  }
}
