const { google } = require("googleapis");
const path = require("path");

const fs = require("fs");

const sheetId = "19jxl6emntwGhHRuRHz-0aAUO28lR0tlFciKELZmORDQ"; // Replace with your actual Google Sheet ID

async function authorize() {
  // Load client secrets from the provided file
  const keyFile = path.resolve(process.cwd(), "../../Acknowledgements.json");
  const credentials = JSON.parse(fs.readFileSync(keyFile, "utf8"));

  const { client_email, private_key } = credentials;

  // Authorize a client with credentials
  const auth = new google.auth.JWT(
    client_email,
    null,
    private_key,
    ["https://www.googleapis.com/auth/spreadsheets"] // Scope for reading/writing spreadsheets
  );

  return auth;
}

async function getSheetData(range) {
  const auth = await authorize();
  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: range,
  });

  return response.data.values;
}

module.exports = {
  getSheetData,
};
