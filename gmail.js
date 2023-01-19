const { google } = require("googleapis");

async function getMessages(auth) {
  const gmail = google.gmail({ version: "v1", auth });
  try {
    const res = await gmail.users.messages.list({
      userId: "me",
      q: "from:Otp",
    });
    const messages = res.data.messages;
    const messagesData = [];
    for (const message of messages) {
      const msg = await gmail.users.messages.get({
        userId: "me",
        id: message.id,
      });
      messagesData.push(msg.data);
    }
    return messagesData;
  } catch (err) {
    console.log(`The API returned an error: ${err}`);
  }
}

module.exports = { getMessages };
