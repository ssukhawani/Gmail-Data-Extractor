const express = require("express");
const { getAuth } = require("./auth");
const { getMessages } = require("./gmail");
const { CLIENT_ID, REDIRECT_URI } = require("./config");

require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(cors());

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
  const auth = await getAuth(code);
  // console.log(auth, "auth");
  console.log(searchPayload, "searchPayload");
  const otp = await getMessages(auth, searchPayload);
  // extract the data you need from the messages
  console.log(otp, "OTP");
  res.send({ message: "You are now logged in!", otp: otp });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
