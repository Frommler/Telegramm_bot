const Telegraf = require("telegraf").Telegraf,
  TOKEN = "5767772684:AAFIrs0zyy4klNzIEsu2kC40BA7nOkxIV_4";

const Bot = new Telegraf(TOKEN);

Bot.start((ctx) => {
  return ctx.reply("Welcome");
});

Bot.hears(/hi\W$/i, (ctx) => {
  return ctx.reply("\u{1f609}");
});

Bot.hears(/[A-Z]+/i, (ctx) => {
  console.log(ctx.message.text);
  fetch("https://russianwarship.rip/api/v1/statistics/latest", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return ctx.reply(data.data.stats[ctx.message.text.toLowerCase()]);
    })
    .catch((err) => ctx.reply("What do you mean?"));
});

Bot.launch();
