import genai from 'genai';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "YOUR API KEY HERE";

genai.configure({ api_key: GEMINI_API_KEY });

const model = new genai.GenerativeModel('gemini-1.5-flash', {
    generation_config: {
        temperature: 0.3,
        top_p: 0.9,
        top_k: 40,
        max_output_tokens: 1024,
    },
});

export async function summarize(text: string): Promise<string> {
    const response = await model.generate(`Summarize this text: ${text}`);
    return response.generations[0].text.trim();
}

export async function translate(text: string, targetLang: string): Promise<string> {
    const response = await model.generate(`Translate this to ${targetLang}: ${text}`);
    return response.generations[0].text.trim();
}
