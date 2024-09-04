import express from "express";
import fs from "fs";
import HTMLtoDOCX from "html-to-docx";
import cors from "cors";

const app = express();
app.use(cors());
// Middleware для обработки JSON и url-encoded запросов
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/docx", async (req, res) => {
  const htmlContent = req.body.html;
  if (!htmlContent) {
    return res.status(400).send("No HTML content provided");
  }
  try {
    const docx = await HTMLtoDOCX(htmlContent);
    const fileName = `document-${Date.now()}.docx`;
    // Создание папки для сохранения файлов, если она не существует
    if (!fs.existsSync("./output")) {
      fs.mkdirSync("./output");
    }

    // Запись DOCX в файл
    fs.writeFileSync(`./output/${fileName}`, docx);

    // Скачивание файла
    res.download(`./output/${fileName}`, fileName, (err) => {
      if (err) {
        res.status(500).send("Error downloading the file");
      }

      // Удаление файла после скачивания
      fs.unlinkSync(`./output/${fileName}`);
    });
  } catch (error) {
    console.log("Error converting HTML to DOCX:", error);
    res.status(500).send("Internal server error");
  }
});

export { app };
