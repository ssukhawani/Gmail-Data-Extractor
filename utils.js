function extractOTP(text) {
  var regex = /(\d{6})/;
  var match = text.match(regex);
  return match ? match[0] : null;
}

module.exports = {
  extractOTP,
};
