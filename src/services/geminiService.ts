import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateProposal(jobDescription: string, tone: string, userProfile: any) {
  const prompt = `
    You are an expert freelance proposal writer. Create a high-converting proposal for the following job description.
    
    User Profile:
    Name: ${userProfile.name}
    Title: ${userProfile.title}
    Experience: ${userProfile.experienceYears} years
    Skills: ${userProfile.skills.join(', ')}
    Bio: ${userProfile.bio}
    
    Job Description:
    ${jobDescription}
    
    Desired Tone: ${tone}
    
    Requirements:
    1. Hook the client in the first paragraph.
    2. Address the specific pain points mentioned in the job description.
    3. Highlight relevant skills and experience.
    4. Include a clear call to action.
    5. Keep it professional yet engaging.
    6. Do not include placeholders like [Your Name] - use the user profile name provided.

    Return 3 distinct versions of the proposal in a JSON format:
    {
      "versions": ["version 1 text here", "version 2 text here", "version 3 text here"]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const data = JSON.parse(response.text || '{"versions": []}');
    return data.versions;
  } catch (error) {
    console.error("Gemini generation error:", error);
    return [];
  }
}
