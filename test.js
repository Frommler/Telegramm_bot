let equip = {"message":"Alex","data":{"date":"2022-09-27","day":216,"resource":"https:\/\/www.facebook.com\/MinistryofDefence.UA\/posts\/pfbid02SbJ7YBha2WRJ9EhcVBFMWbWUjxBLEQKzGAbdYogViURG4zHWBnGHpP9ssoksfexyl","stats":{"personnel_units":57750,"tanks":2306,"armoured_fighting_vehicles":4881,"artillery_systems":1378,"mlrs":331,"aa_warfare_systems":175,"planes":261,"helicopters":224,"vehicles_fuel_tanks":3730,"warships_cutters":15,"cruise_missiles":241,"uav_systems":977,"special_military_equip":131,"atgm_srbm_systems":4},"increase":{"personnel_units":550,"tanks":16,"armoured_fighting_vehicles":24,"artillery_systems":9,"mlrs":1,"aa_warfare_systems":3,"planes":1,"helicopters":0,"vehicles_fuel_tanks":19,"warships_cutters":0,"cruise_missiles":0,"uav_systems":7,"special_military_equip":0,"atgm_srbm_systems":0}}};

let stats = equip.data.stats;
let {tanks, mlrs, planes} = stats;
console.log(tanks, mlrs, planes);


/* console.log(equip.data.date);
console.log(equip.data['date']);
console.log(equip['data']['date']);

const setTimeout2 = require("node:timers/promises").setTimeout;

function Test1() {
  console.log("1");

  setTimeout(() => console.log("2"), 2000);
  console.log("3");
}

function Test2() {
  console.log("1");
  setTimeout2(2000).then(() => {
    console.log("22");
    console.log("3");
  });
}

async function Test3() {
  console.log("1");
  await setTimeout2(2000);
  console.log("22");
  console.log("3");
}

Test1();
Test2();
Test3();
 */