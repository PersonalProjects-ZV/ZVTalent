export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  // Import the actual parser directly to avoid pdf-parse's index.js test file bug
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const pdfParse = require("pdf-parse/lib/pdf-parse.js");
  const data = await pdfParse(buffer);
  return data.text as string;
}
