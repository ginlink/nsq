const nsq = require("nsqjs");

const [host, port] = ["127.0.0.1", 4150];
const w = new nsq.Writer(host, port, {
  authSecret: "xxx",
});
w.connect();
w.on("ready", () => {
  console.log("[ready]:");
  w.publish("sample_topic", "Wu?", (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Message sent successfully");
    w.close();
  });
});

w.on("error", (err) => {
  console.log("[err]:", err);
});
w.on("closed", () => {
  console.log("Writer closed");
});
