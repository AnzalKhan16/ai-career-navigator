const { OpenAI } = require('openai');

// Initialize the OpenAI client
// It will automatically use the OPENAI_API_KEY from your .env file
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate a career roadmap based on user inputs
 * @param {string} currentRole - The user's current job or skill level
 * @param {string} targetRole - The user's desired career goal
 * @returns {string} - The AI generated roadmap response
 */
const generateCareerRoadmap = async (currentRole, targetRole) => {
  try {
    const prompt = `Act as an expert career counselor. Create a detailed, step-by-step career roadmap for someone moving from "${currentRole}" to "${targetRole}". Include necessary skills to learn, estimated timelines, and potential projects or certifications.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using a fast/efficient model for standard queries
      messages: [
        { role: 'system', content: 'You are a highly experienced AI career advisor.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI Service Error:', error.message);
    throw new Error('Failed to generate roadmap from AI');
  }
};

module.exports = {
  openai,
  generateCareerRoadmap,
};
