const express = require("express");
require("dotenv").config();
const bp = require("body-parser");

// Creating a new Express app
const app = express();

// Using body-parser middleware to parse incoming request bodies as JSON
app.use(bp.json());

// Using body-parser middleware to parse incoming request bodies as URL encoded data
app.use(bp.urlencoded({ extended: true }));

// Importing and setting up the OpenAI API client
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Defining the system message for the chat context
const systemMessage = {
  role: "system",
  content: "You are Jarvis, a personal AI assistant",
};

// Defining an endpoint to handle incoming requests
app.post("/converse", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are Jarvis, a personal AI assistant.",
        },
        { role: "user", content: userMessage },
      ],
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });

    res.send({ response: response.data.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error occurred:", error); // Log the error details
    res
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  }
});

// Starting the Express app and listening on port 3000
app.listen(3000, () => {
  console.log("Jarvis, your personal AI assistant, is listening on port 3000!");
});
