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

    let extractedText = '';

    if (req.file.mimetype === 'application/pdf') {
      const pdfParse = require('pdf-parse');
      const data = await pdfParse(req.file.buffer);
      extractedText = data.text;
    } else {
      // For plain text files as fallback
      extractedText = req.file.buffer.toString('utf-8');
    }

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({ message: 'Could not extract text from the uploaded file.' });
    }

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

    // Broadcast to Community Feed
    const FeedEvent = require('../models/FeedEvent');
    await FeedEvent.create({
      user: req.user._id,
      userName: req.user.name,
      userRole: 'Tech Enthusiast', // Use a default since currentRole isn't passed here
      eventType: 'resume_analyzed',
      actionText: 'analyzed their resume for',
      target: targetRole,
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
