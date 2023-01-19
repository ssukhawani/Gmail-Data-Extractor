const express = require("express");
const { getAuth } = require("./auth");
const { getMessages } = require("./gmail");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = require("./config");
const app = express();

app.get("/login", (req, res) => {
  const scopes = ["https://www.googleapis.com/auth/gmail.readonly"];
  const url = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${REDIRECT_URI}&prompt=consent&response_type=code&client_id=${CLIENT_ID}&scope=${scopes.join(
    " "
  )}`;
  res.redirect(url);
});

app.get("/callback", async (req, res) => {
  const { code } = req.query;
  console.log(code, "code");
  const auth = await getAuth(code);
  console.log(auth, "auth");
  const messages = await getMessages(auth);
  // extract the data you need from the messages
  console.log(messages, "messages");
  res.send("You are now logged in!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
