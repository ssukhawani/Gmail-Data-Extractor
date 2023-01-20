const { google } = require("googleapis");
const { extractOTP } = require("./utils");

// in:inbox from:(no-reply@razorpay.com) subject:otp
async function getMessages(auth, payload) {
  const { from_email, subject } = payload;
  console.log(auth, "auth");
  const gmail = google.gmail({ version: "v1", auth });
  try {
    const res = await gmail.users.messages.list({
      userId: "me",
      q: `in:inbox from:(${from_email}) subject:${subject}`,
      maxResults: 10,
    });
    console.log(res.data, "OTP");
    const messages = res.data.messages;
    const messagesData = [];
    if (messages) {
      for (const message of messages) {
        const msg = await gmail.users.messages.get({
          userId: "me",
          id: message.id,
        });
        messagesData.push(msg.data);
      }
    }
    return extractOTP(messagesData[0].snippet);
  } catch (err) {
    console.log(`The API returned an error: ${err}`);
  }
}

module.exports = { getMessages };
