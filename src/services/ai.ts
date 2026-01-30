// src/services/ai.ts
import type { AIAnalysis } from '../types';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const SITE_URL = "http://localhost:5173";
const SITE_NAME = "HR AI Recruiter";

export async function screenCandidateWithAI(
  resumeText: string,
  jobDescription: string,
  requirements: string[]
): Promise<AIAnalysis> {

  // Validasi API key
  if (!OPENROUTER_API_KEY) {
    console.error("❌ API Key tidak ditemukan!");
    console.error("Pastikan file .env sudah dibuat dan berisi VITE_OPENROUTER_API_KEY");
    console.error("Restart dev server setelah membuat .env file");
    throw new Error("API Key tidak ditemukan. Silakan setup .env file dan restart server.");
  }

  const prompt = `
    You are an expert HR Recruiter AI. Analyze the following candidate for the job.
    
    JOB DESCRIPTION:
    ${jobDescription}
    
    REQUIREMENTS:
    ${requirements.join(', ')}
    
    CANDIDATE RESUME/PROFILE:
    ${resumeText}
    
    Output strictly in JSON format with the following structure:
    {
      "score": number (0-100),
      "summary": "Brief professional summary of the match",
      "pros": ["point 1", "point 2"],
      "cons": ["point 1", "point 2"],
      "matchReasoning": "Why this score was given"
    }
  `;

  try {
    console.log("🤖 Mengirim request ke OpenRouter AI...");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": SITE_URL,
        "X-Title": SITE_NAME,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "openai/gpt-3.5-turbo",
        "messages": [
          { "role": "system", "content": "You are a helpful HR assistant. Always respond with valid JSON only." },
          { "role": "user", "content": prompt }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ API Error Response:", errorData);
      throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log("✅ Response dari AI:", data);

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("❌ Invalid response structure:", data);
      throw new Error("Invalid response from AI");
    }

    const content = data.choices[0].message.content;
    console.log("📝 AI Content:", content);

    // Parse JSON response
    let result;
    try {
      result = JSON.parse(content);
    } catch (parseError) {
      console.error("❌ Failed to parse JSON:", content);
      throw new Error("Failed to parse AI response");
    }

    console.log("🎯 Parsed Result:", result);
    return result as AIAnalysis;

  } catch (error) {
    console.error("❌ AI Error:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to screen candidate");
  }
}