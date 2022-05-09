const mailjet = require("node-mailjet").connect(
  process.env.APIKEY_PUBLIC,
  process.env.APIKEY_PRIVATE
);

const sendEmail = (email, subject, text, name) => {
  const request = mailjet
  .post("send", { 'version': "v3.1" })
  .request({
    "Messages": [{
      "From": {
        "Email": process.env.EMAIL,
        "Name": "E-Guide",
      },
      "To": [{
        "Email": email,
        "Name": name,
      }],
      "Subject": subject,
      "TextPart": text,
    }]
  });

  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = sendEmail;
