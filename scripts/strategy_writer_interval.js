const { Producer, PRODUCER_STRATEGY } = require("nsq-strategies");

async function main() {
  const p = new Producer(
    {
      nsqdHost: "127.0.0.1",
      tcpPort: 4150,
    }
    // {
    //   strategy: PRODUCER_STRATEGY.FAN_OUT,
    // }
  );
  await p.connect();
  let i = 0;

  setInterval(async () => {
    await p.produce("orderTopic", {
      orderNo: "xx",
      tag: "PAID",
      index: i,
    });
    i++;
    console.log("[send topic success]:");
  }, 10);
}

main();
