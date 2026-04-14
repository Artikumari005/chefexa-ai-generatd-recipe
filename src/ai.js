import { GoogleGenerativeAI } from "@google/generative-ai";

function getRecipeErrorMessage(err) {
    const message = err?.message || '';
    
    if (message.includes('503') || message.includes('high demand')) {
        return "Gemini 503 high demand – try again in 1min or use lighter model.";
    }
    
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
        return "Add VITE_GEMINI_API_KEY to .env";
    }
    
    if (message.includes('403')) {
        return "403: Enable billing/API at console.cloud.google.com";
    }
    
    if (message.includes('404')) {
        return "404 model not found – check model name";
    }
    
    return message;
}

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");
    const prompt = `You are Chefexa. Ingredients: ${ingredientsString}. Markdown recipe please.`;

    try {
        if (!import.meta.env.VITE_GEMINI_API_KEY) {
            throw new Error(getRecipeErrorMessage());
        }

        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent(prompt);
        return await result.response.text();
    } catch (error) {
        console.error("Gemini error:", error);
        throw new Error(getRecipeErrorMessage(error));
    }
}
