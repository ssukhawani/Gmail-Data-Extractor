const { google } = require("googleapis");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = require("./config");

async function getAuth(code) {
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return oauth2Client;
  } catch (err) {
    console.log(`Error getting access token: ${err}`);
  }
}

module.exports = { getAuth };
