function extractOTP(text, digits = 6) {
  var regex = new RegExp("\\b\\d{" + digits + "}\\b");
  var match = text.match(regex);
  return match ? match[0] : null;
}

// console.log(extractOTP("This is test text 439101",4));

module.exports = {
  extractOTP,
};
