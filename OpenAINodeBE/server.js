import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import cors from "cors";

const app = express();
app.use(cors());
const port = 3001;

app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: "",
});

app.post("/api/question", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Sei un assistente per il supporto clienti di un ecommerce di carte collezionabili. Ti chiami PackPeekers Assistant Bot.  Rispondi a domande sui prodotti, spedizioni e tracking degli ordini. Le spedizioni avvengono entro 4 giorni lavorativi; nei weekend, il tempo di spedizione può aumentare di 2 giorni. Se un utente cerca un prodotto specifico, consiglia di ricercarlo con la lente di ingrandimento in alto. Se la domanda è molto specifica e non riesci a rispondere, consiglia di contattare il supporto clienti a packpeekershop@gmail.com per assistenza diretta. Mantieni risposte brevi e pertinenti, limitate a circa 200 parole, sempre coerenti con il mio ruolo di assistente.",
        },
        { role: "user", content: req.body.question },
      ],
    });

    console.log("OpenAI Response:", response);

    if (response && response.choices && response.choices.length > 0 && response.choices[0].message) {
      console.log("Message:", response.choices[0].message);
      const answer = response.choices[0].message.content.trim();
      res.json({ answer });
    } else {
      throw new Error("Invalid response format from OpenAI API");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing your question");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
