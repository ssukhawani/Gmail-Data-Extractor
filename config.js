// This client id and secret has been created from https://console.cloud.google.com
const CLIENT_ID =
  process.env.CLIENT_ID ||
  "1089926294577-udjqsnucud7h71oa6ihhoa94f5is3b4l.apps.googleusercontent.com";
const CLIENT_SECRET =
  process.env.CLIENT_ID || "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";
const REDIRECT_URI = `${
  process.env.BASE_URL || "http://localhost:3000"
}/callback`;

module.exports = {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
};
