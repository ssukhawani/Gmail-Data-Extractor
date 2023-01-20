const express = require("express");
const { getAuth } = require("./auth");
const { getMessages } = require("./gmail");

require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(cors());

// This client id and secret has been created from https://console.cloud.google.com
const CLIENT_ID =
  process.env.CLIENT_ID ||
  "1089926294577-udjqsnucud7h71oa6ihhoa94f5is3b4l.apps.googleusercontent.com";
const CLIENT_SECRET =
  process.env.CLIENT_ID || "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";
const REDIRECT_URI = `${
  process.env.BASE_URL || "https://gmail-data-extractor.vercel.app"
}/callback`;

let searchPayload;
app.get("/login", (req, res) => {
  // console.log(req._parsedUrl.search, "params");
  searchPayload = req.query;
  const scopes = ["https://www.googleapis.com/auth/gmail.readonly"];
  const url = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${REDIRECT_URI}&prompt=consent&response_type=code&client_id=${CLIENT_ID}&scope=${scopes.join(
    " "
  )}`;
  res.redirect(url);
});

app.get("/callback", async (req, res) => {
  const { code } = req.query;
  // console.log(code, "code");
  const auth = await getAuth(code, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  // console.log(auth, "auth");
  const otp = await getMessages(auth, searchPayload);
  // extract the data you need from the messages
  console.log(otp, "OTP");
  res.send({ message: "You are now logged in!", otp: otp });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
