const Telegraf = require("telegraf").Telegraf,
  TOKEN = "5767772684:AAFIrs0zyy4klNzIEsu2kC40BA7nOkxIV_4";

const Bot = new Telegraf(TOKEN);

let dataFromServer = [];
let dateOfServer = "";

function getCurrentDay() {
  var date = new Date();
  var current_date =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    date.getDate();
  return current_date;
}

Bot.start((ctx) => {
  return ctx.reply("Welcome");
});

Bot.hears(/hi+/i, (ctx) => {
  console.log("Hello!");
  ctx.reply("Hello!");
});

Bot.hears(/[A-Я]+/i, (ctx) => {
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
  if (getCurrentDay() != dateOfServer) {
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
        dataFromServer = data.data.stats;
        console.log("Went to server.");
        ctx.reply(dataFromServer[key]);
      })
      .catch((err) => ctx.reply("What do you mean?"));
  } else {
    ctx.reply(dataFromServer[key]);
    console.log("Didn`t go to server.");
  };
});

Bot.launch();
