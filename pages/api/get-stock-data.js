// pages/api/get-stock-data.js
import { google } from "googleapis";

export default async function handler(req, res) {
  try {
    // Parse the service account credentials from the environment variable
    const credentials = JSON.parse(
      process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS
    );

    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key.replace(/\\n/g, "\n"), // Replace escaped newlines with actual newlines
      ["https://www.googleapis.com/auth/spreadsheets.readonly"]
    );

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = "19jxl6emntwGhHRuRHz-0aAUO28lR0tlFciKELZmORDQ"; // Replace with your Google Spreadsheet ID
    const range = "Sheet1!A1:F25"; // Adjust the range based on your data

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (rows && rows.length) {
      const formattedData = rows.slice(1).map((row) => ({
        Date: row[0],
        CompanyA: +row[1],
        CompanyB: +row[2],
        CompanyC: +row[3],
        CompanyD: +row[4],
        CompanyE: +row[5],
      }));

      res.status(200).json(formattedData);
    } else {
      res.status(404).json({ error: "No data found." });
    }
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    res.status(500).json({ error: error.message });
  }
}
