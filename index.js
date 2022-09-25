const Telegraf = require("telegraf").Telegraf,
  TOKEN = "5767772684:AAFIrs0zyy4klNzIEsu2kC40BA7nOkxIV_4";

const Bot = new Telegraf(TOKEN);

let dataFromServer = [];
let dateOfServer = "";

Bot.start((ctx) => {
  fetch("https://russianwarship.rip/api/v1/statistics/latest", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // return ctx.reply(data.data.stats[ctx.message.text.toLowerCase()]);
      dateOfServer = data.data.date;
      var date = new Date();
      var current_date =
        date.getFullYear() + "-" + (("0"+ (date.getMonth() + 1)).slice(-2)) + "-" + date.getDate();
      dataFromServer = data.data.stats;
      console.log(dateOfServer);
      console.log(current_date);
    })
    .catch((err) => ctx.reply("What do you mean?"));
  return ctx.reply("Welcome");
});

Bot.hears(/hi+/i, (ctx) => {
  console.log("Hello!");
  ctx.reply("Hello!");
});

Bot.hears(/[А-Я]+/i, (ctx) => {
  let key = "";
  console.log(ctx.message.text);
  switch (ctx.message.text.toLowerCase()) {
    case "літаки":
      key = "planes";
      break;
    case "танки":
      key = "tanks";
      break;
    case "люди":
      key = "personnel_units";
      break;
    default:
      return ctx.reply("Sorry. I have no these word");
  }
  ctx.reply(dataFromServer[key]);
});

Bot.launch();
