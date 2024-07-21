let key = {};  


if (process.env.NODE_ENV === "production") {
  key = {
    secretOrKey: "test",
    mongoURI: "",
    port: 2053,
    siteUrl: "",

    // Email Gateway
    emailGateway: {
      fromMail: "",
      nodemailer: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "", // generated ethereal user
          pass: "", // generated ethereal password
        },
      },
    },
  };
} else {
  console.log("Set Development Config");
  key = {
    secretOrKey: "test",
    mongoURI: "mongodb://0.0.0.0:27017/CrimeReporter",
    port: 3001,
    siteUrl: "http://localhost:3001",
    // Email Gateway
    emailGateway: {
      fromMail: "demorayaz@gmail.com",
      nodemailer: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "demorayaz@gmail.com", // generated ethereal user
          pass: "rayaz@123S", // generated ethereal password
        },
      },
    },
  };
}

export default key;
