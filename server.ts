import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARN: GEMINI_API_KEY is not defined in process.env");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "MOCK_KEY",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

const ai = getAiClient();

// API endpoint for AI Tutor / Advisor
app.post("/api/gemini/tutor", async (req, res) => {
  try {
    const { message, history, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Mesaj alanı zorunludur." });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Graceful fallback when API key is missing
      return res.json({
        text: "Selamun Aleyküm! Ben Al-Hikmah Ed Yapay Zeka Danışmanı. Şu anda sunucu tarafında GEMINI_API_KEY ayarlanmadığı için size statik bir yanıt veriyorum. Eğitim platformumuz, Kur'an-ı Kerim Tecvidi, Klasik Arapça, Hadis ve İslam Tarihi gibi konularda geniş ders içeriklerine sahiptir. Panel üzerinden dersleri inceleyebilir ve öğrenim durumunuzu takip edebilirsiniz. Size nasıl yardımcı olabilirim?"
      });
    }

    // Build the contents and system instruction
    const systemInstruction = `Sen Al-Hikmah Ed platformunun İslami İlimler ve Arapça Yapay Zeka Akademik Danışmanısın.
Adın 'Al-Hikmah Yapay Zeka Danışmanı'.
Görevin, Kur'an-ı Kerim, Tecvid kuralları, Arapça dil bilgisi (Nahiv, Sarf), Hadis ilimleri, İslam Tarihi ve genel İslami ilimler konularında öğrencilere yardımcı olmak, sorularını doğru, güvenilir, akademik ve saygılı bir dille yanıtlamaktır.

Yanıt verirken şu kurallara kesinlikle uy:
1. Türkçe dilini kusursuz, nazik ve saygılı bir dille kullan (hitaplarında 'Siz' veya 'Değerli Kursiyerimiz' kalıplarını tercih edebilirsin).
2. Konuları geleneksel Ehl-i Sünnet omurgasına ve muteber kaynaklara uygun olarak açıkla. Aynı zamanda akademik ve tarafsız perspektifleri de koru.
3. Sorulan sorular Arapça dil bilgisi ise, kuralları şematik ve anlaşılır şekilde açıkla. Örnek cümleler ve irab tahlilleri sun.
4. Sorulan soru Tecvid ile ilgiliyse, kuralı tanımıyla verip Kur'an'dan örnek kelimelerle zenginleştir.
5. Eğer sorulan soru İslam dışı veya platform ile alakasız aşırı uç siyasi/tartışmalı bir konu ise, nazikçe bu platformun amacının İslami ilimler ve Arapça eğitimi olduğunu belirterek konuyu eğitim sınırlarına çek.
6. Yanıtlarında Markdown biçimlendirmesini (kalın yazım, listeler, kod blokları veya tablolar) kullanarak bilgileri görsel olarak organize et.

${context ? `Şu anki bağlam (Seçili Kurs Detayı veya Öğrenci Paneli): ${context}` : ""}`;

    // Map history to the structure required by Gemini SDK
    // The history should be formatted as chat contents or passed inline.
    // Let's build a clean prompt containing context, history, and current message.
    let fullPrompt = "";
    if (history && history.length > 0) {
      fullPrompt += "Önceki Sohbet Geçmişi:\n";
      history.forEach((h: { sender: string; text: string }) => {
        const roleName = h.sender === "user" ? "Öğrenci" : "Yapay Zeka";
        fullPrompt += `${roleName}: ${h.text}\n`;
      });
      fullPrompt += "\n";
    }
    fullPrompt += `Öğrenci: ${message}\n`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: fullPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const outputText = response.text;
    res.json({ text: outputText || "Üzgünüm, şu an yanıt oluşturamadım." });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Sunucu hatası veya Gemini API hatası: " + error.message });
  }
});

// Mock simulation of contact form submit and progress tracking
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Lütfen zorunlu alanları doldurun." });
  }
  // Store or process contact form (simulated)
  res.json({ success: true, message: `Sayın ${name}, mesajınız başarıyla alındı. En kısa sürede geri dönüş yapacağız.` });
});

// Vite middleware configuration for full-stack architecture
const setupVite = async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
};

setupVite().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
});
