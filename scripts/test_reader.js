const nsq = require("nsqjs");

const reader = new nsq.Reader("sample_topic", "test_channel", {
  lookupdHTTPAddresses: "localhost:4161",
  maxInFlight: 1,
  authSecret: "xxx",
});

reader.connect();

reader.on("message", async (msg) => {
  console.log("Received message [%s]: %s", msg.id, msg.body);

  await sleep(2000);
  msg.finish();
});
reader.on("error", async (err) => {
  console.log("[err]:", err);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
