import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-mock',
});

const PITCH_DECK_SYSTEM_PROMPT = `
You are an expert venture capitalist and startup advisor. A founder has submitted their pitch deck for analysis.
Your job is to critically evaluate it and provide structured, actionable feedback.
Evaluate the following areas:
1. Problem/Solution Fit
2. Market Size & Opportunity
3. Business Model
4. Go-To-Market / Traction
5. Team
6. Overall Presentation & Clarity

For each area, provide:
- A Score out of 10
- Key Strengths
- Critical Weaknesses / Missing Information
- Actionable Recommendations

Output the response in clean Markdown format with a professional tone. You must conclude with a final Executive Summary and an Overall Score.
`;

export async function analyzePitchDeckText(text: string): Promise<string> {
  // If no real API key is present, return a mock response for testing.
  if (!process.env.OPENAI_API_KEY) {
    console.log("No OPENAI_API_KEY found, using mock analysis.");
    return `# Pitch Deck Analysis Report

## 1. Problem/Solution Fit
**Score: 8/10**
- *Strengths*: Clear value proposition.
- *Weaknesses*: Needs more evidence of the pain point.
- *Recommendations*: Interview more users and cite their quotes.

## Executive Summary
This is a highly promising deck with a solid foundation. Focus on the go-to-market strategy to secure funding.
**Overall Score: 7.5/10**`;
  }

  // Real OpenAI call
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo", // or preferred model
      messages: [
        { role: "system", content: PITCH_DECK_SYSTEM_PROMPT },
        { role: "user", content: `Here is the extracted text from the pitch deck:\n\n${text.substring(0, 50000)}` }
      ],
      temperature: 0.7,
      max_tokens: 3000,
    });

    return response.choices[0].message.content || 'Failed to generate analysis.';
  } catch (error) {
    console.error("OpenAI Error:", error);
    throw new Error('Failed to communicate with OpenAI API.');
  }
}
