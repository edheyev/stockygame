// import { google } from "googleapis";
// import path from "path";
// import fs from "fs";

// export default async function handler(req, res) {
//   // Load credentials for Google Sheets from the service account JSON file
//   const keyFile = path.resolve(process.cwd(), "Acknowledgements.json");
//   const credentials = JSON.parse(fs.readFileSync(keyFile, "utf8"));

//   const { client_email, private_key } = credentials;

//   // Authorize with Google API
//   const auth = new google.auth.JWT(client_email, null, private_key, [
//     "https://www.googleapis.com/auth/spreadsheets",
//   ]);

//   const sheets = google.sheets({ version: "v4", auth });

//   try {
//     // Replace with the ID of your Google Sheet and the range you want to read
//     const sheetId = "19jxl6emntwGhHRuRHz-0aAUO28lR0tlFciKELZmORDQ";
//     const range = req.query.range || "Sheet1!A1:F6";

//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: sheetId,
//       range,
//     });

//     res.status(200).json(response.data.values);
//   } catch (error) {
//     console.error("Error fetching data from Google Sheets:", error);
//     res.status(500).json({ error: "Unable to fetch data" });
//   }
// }
