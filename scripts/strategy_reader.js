const { Consumer } = require("nsq-strategies");

function main() {
  const c = new Consumer("orderTopic", "orderChannel", {
    lookupdHTTPAddresses: ["127.0.0.1:4161"],
  });
  c.consume((msg) => {
    const result = handle(msg);
    console.log("[attempts]:", msg.attempts);
    if (result) {
      msg.finish();
    } else {
      msg.requeue(3000); //requeue with delay of 3000 milliseconds
    }
  });

  function handle(msg) {
    console.log("[msg]:", msg.body.toString());
    return true;
  }
}

main();
