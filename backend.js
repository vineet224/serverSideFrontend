const express = require("express");
const { google } = require("googleapis");
const sheets = google.sheets("v4");
const bodyParser = require("body-parser");
const path = require("path");

const API_KEY = "AIzaSyAq52fStKtdntpLlxRMw8xgZpTdZ97wySM"; // Replace with your API key
const spreadsheetId = "1R7MbHa95S5ErqqX-v29sOvQSnzgz-8YwDt3Vsb2Y2S0"; // Replace with your Google Sheets spreadsheet ID

const app = express();
app.use(bodyParser.json());

// Set up Google Sheets API client with your API key.
const auth = {
    key: API_KEY
};

// Serve the HTML file from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.post("/submit-data", async (req, res) => {
    try {
        // Authorize with Google Sheets API using your API key.
        const sheetsAPI = google.sheets({ version: "v4" });

        console.log(" connection is successful --------------------------------------");

        const { name, mobile } = req.body;

        // Define the range where you want to insert data.
        const range = "A:B"; // Example range

        // Create the values to be inserted into Google Sheets.
        const values = [[name, mobile]];

        // Update the spreadsheet.
        await sheetsAPI.spreadsheets.values.append({
            spreadsheetId: spreadsheetId,
            range: 'A:B',
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                "majorDimension": "ROWS",
                "values": [["Row 1 Col 1","Row 1 Col 2"], ["Row 2 Col 1","Row 2 Col 2"]]
            },
            key: API_KEY
        });

        console.log(" after writing data ----------------------");

        res.status(200).send("Data added to Google Sheets successfully.");
    } catch (error) {
        console.error("Error adding data to Google Sheets:", error);
        res.status(500).send("Error adding data to Google Sheets.");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


//   https://sheets.googleapis.com/v4/spreadsheets/1R7MbHa95S5ErqqX-v29sOvQSnzgz-8YwDt3Vsb2Y2S0?key=AIzaSyAq52fStKtdntpLlxRMw8xgZpTdZ97wySM