// gemini.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3020;

app.use(cors());
app.use(express.json());

const API_KEY = 'AIzaSyCBnO_Pyn82r-xim5hYwb2C0DC5NiVpbPk';

app.post('/ask', async (req, res) => {
  let fpromp = req.body + " you are an A.I therpists so act like it"  
  const { prompt } = req.body

  try {
    const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-001:generateContent?key=${API_KEY}`,
        {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "I’m here for you.";
    res.json({ reply });
  } catch (error) {
    console.error('Gemini error:', error.response?.data || error.message);
    res.status(500).json({ reply: "Sorry, I couldn’t respond right now." });
  }
});

app.listen(PORT, () => {
  console.log(`Gemini proxy server running on http://localhost:${PORT}`);
});
