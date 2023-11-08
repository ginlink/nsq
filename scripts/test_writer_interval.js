const nsq = require("nsqjs");

const w = new nsq.Writer("127.0.0.1", 4150);

w.connect();

w.on("ready", () => {
  i = 0;
  setInterval(() => {
    if (i >= 100) {
      w.close();
      return;
    }
    i++;

    w.publish(
      "sample_topic",
      {
        message: "Hello NSQ!",
        count: i,
      },
      (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("Message sent successfully");
      }
    );
  }, 1000);
});

w.on("closed", () => {
  console.log("Writer closed");
});
