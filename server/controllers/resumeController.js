const { openai } = require('../services/openaiService');

// @desc    Analyze uploaded resume and return feedback
// @route   POST /api/resumes/analyze
// @access  Private
const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a resume file' });
    }

    const { targetRole } = req.body;
    if (!targetRole) {
      return res.status(400).json({ message: 'Please provide a target role' });
    }

    // TODO: Parse PDF/DOCX file from req.file.buffer
    // For now, we will mock the text extraction. Next step will add parsing!
    const extractedText = "Dummy resume text (will be replaced with actual parser)";

    // Call OpenAI to analyze the resume
    const prompt = `Act as an expert technical recruiter. Analyze this resume text for the target role of "${targetRole}". Provide feedback on strengths, weaknesses, and a roadmap to improve. Resume Text: ${extractedText}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert tech recruiter and career coach.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    // Log the Activity
    const Activity = require('../models/Activity');
    await Activity.create({
      user: req.user._id,
      targetRole,
      action: 'Analyzed Resume via AI',
    });

    res.json({ analysis: response.choices[0].message.content });
  } catch (error) {
    console.error('Resume Analysis Error:', error);
    res.status(500).json({ message: 'Failed to analyze resume' });
  }
};

module.exports = {
  analyzeResume,
};
