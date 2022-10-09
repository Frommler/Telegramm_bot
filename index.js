const Telegraf = require("telegraf").Telegraf,
  TOKEN = "5767772684:AAFIrs0zyy4klNzIEsu2kC40BA7nOkxIV_4";

const Bot = new Telegraf(TOKEN);

let dataFromServer = [];
let dateOfServer = "";
let userChoise = "stats";

function getCurrentDay() {
  var date = new Date();
  var current_date =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);
  return current_date;
}

function getDataFromServer(isDoingFetch) {
  if (!isDoingFetch) {
    return;
  }
  return fetch("https://russianwarship.rip/api/v1/statistics/latest", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // return ctx.reply(data.data.stats[ctx.message.text.toLowerCase()]);
      dateOfServer = data.data.date;
      dataFromServer = data;
      console.log("Go to server");
    });
}

Bot.start((ctx) => {
  ctx.reply("Welcome");
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "All stats", callback_data: "all" },
          { text: "Last day", callback_data: "day" },
        ],
        [
          {
            text: "Resource",
            url: "https://russianwarship.rip/api/v1/statistics/latest",
          },
        ],
      ],
    },
  };
  ctx.replyWithHTML("Kuku", opts);
});

Bot.action("all", (ctx) => {
  ctx.reply("You choise all");
  userChoise = "stats";
});

Bot.action("day", (ctx) => {
  ctx.reply("You choise day");
  userChoise = "increase";
});

Bot.command("tanks", async (ctx) => {
  await getDataFromServer(getCurrentDay() != dateOfServer); // use 'await' ONLY if function return promise!!!
  ctx.reply(
    "Всього " +
      dataFromServer.data.stats.tanks +
      "\nЗа день " +
      dataFromServer.data.increase.tanks
  );
});

Bot.command("airplanes", async (ctx) => {
  await getDataFromServer(getCurrentDay() != dateOfServer); // use 'await' ONLY if function return promise!!!
  ctx.reply(
    "Всього \u{2708}	 " +
      dataFromServer.data.stats.planes +
      "\nЗа день " +
      dataFromServer.data.increase.planes
  );
});

Bot.command("all", async (ctx) => {
  await getDataFromServer(getCurrentDay() != dateOfServer); // use 'await' ONLY if function return promise!!!
  let stats = dataFromServer.data.stats;
  let { tanks, mlrs, planes } = stats;
  ctx.reply(
    "Всього \n\u{2708}	 " +
      planes +
      "Всього \n\u{1f69c}	 " +
      tanks +
      "Всього \n\u{1f680}	 " +
      mlrs
  );

  let { increase } = dataFromServer.data;
  ({ tanks, mlrs, planes } = increase);
  ctx.reply(
    "\u{2708}" +
      "За день " +
      planes +
      "\n\u{1f69c}	 " +
      "За день " +
      tanks +
      "\n\u{1f680}" +
      "За день " +
      mlrs
  );
});

Bot.hears(/hi+/i, (ctx) => {
  console.log("Hello!");
  ctx.reply("Hello!");
});

Bot.hears(/[A-Я]+/i, async (ctx) => {
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
  await getDataFromServer(getCurrentDay() != dateOfServer);
  ctx.reply(
    "Всього " +
      dataFromServer.data.stats[key] +
      "\nЗа день " +
      dataFromServer.data.increase[key]
  );
});

Bot.launch();
