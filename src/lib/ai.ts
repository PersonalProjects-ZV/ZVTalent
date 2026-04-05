import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface AIAnalysis {
  score: number;
  reason: string;
  strengths: string[];
  weaknesses: string[];
  matchPercent: number;
  interviewQuestions: string[];
  recommendation: "shortlisted" | "rejected";
}

export async function analyzeCV(
  resumeText: string,
  jobTitle: string,
  jobDescription: string
): Promise<AIAnalysis> {
  const prompt = `You are an expert HR recruiter AI. Analyze the following candidate's resume against the job posting.

JOB TITLE: ${jobTitle}

JOB DESCRIPTION: ${jobDescription}

CANDIDATE RESUME:
${resumeText}

Analyze this candidate and respond in ONLY valid JSON format (no markdown, no code blocks):
{
  "score": <number 1-10>,
  "reason": "<2-3 sentence explanation of why this score>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>"],
  "matchPercent": <number 0-100>,
  "interviewQuestions": ["<custom question 1>", "<custom question 2>", "<custom question 3>"],
  "recommendation": "<shortlisted if score >= 6, rejected if score < 6>"
}

Be fair, objective, and base your analysis on the actual resume content vs job requirements. If score is 6 or above, recommend "shortlisted". If below 6, recommend "rejected".`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    max_tokens: 1024,
  });

  const content = completion.choices[0]?.message?.content || "{}";

  // Extract JSON from response (handle potential markdown wrapping)
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("AI did not return valid JSON");
  }

  const analysis: AIAnalysis = JSON.parse(jsonMatch[0]);

  // Ensure recommendation is valid
  if (analysis.recommendation !== "shortlisted" && analysis.recommendation !== "rejected") {
    analysis.recommendation = analysis.score >= 6 ? "shortlisted" : "rejected";
  }

  return analysis;
}
