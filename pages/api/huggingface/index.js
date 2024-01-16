//handler

import { HfInference } from "@huggingface/inference";

const inference = new HfInference(process.env.HF_ACCESS_TOKEN);

export default async function handler(req, res) {
  const { text, lang } = req.body;

  // Map the languages to the correct models
  const languageModels = {
    "en-es": "Helsinki-NLP/opus-mt-en-es",
    "en-de": "Helsinki-NLP/opus-mt-en-de",
    "en-fr": "Helsinki-NLP/opus-mt-en-fr",
    // Add more models as needed
  };

  const translationResponse = await inference.translation({
    model: languageModels[lang], // Select the model based on the language
    inputs: text,
  });

  // Return the results
  res.status(200).json({
    translation_text: translationResponse.translation_text,
  });
}
