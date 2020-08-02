// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBLOfvjIMpmvPOFto7HTnMhZUvNvrXSHcw",
  authDomain: "pay-gap.firebaseapp.com",
  databaseURL: "https://pay-gap.firebaseio.com",
  projectId: "pay-gap",
  storageBucket: "pay-gap.appspot.com",
  messagingSenderId: "666718819156",
  appId: "1:666718819156:web:c4ce1baa3a19443fb86ec1",
  measurementId: "G-NK5D35T60E"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//retrieving data
var Stats = firebase.database().ref("Statistics/");

var statdata;
Stats.once("value").then(function(snapshot) {
  localStorage.setItem("stats", JSON.stringify(snapshot.val()));
  statdata = snapshot.val();

  function statsData() {
    // creates the statsData variable
    var srace = [
      "Asian",
      "Black",
      "Latinx",
      "Middle Eastern",
      "Multiracial",
      "Native American",
      "South Asian",
      "White",
      "ROther"
    ];
    var sraceids = [
      "asian",
      "black",
      "latinx",
      "middleeastern",
      "multiracial",
      "nativeamerican",
      "southasian",
      "white",
      "rother"
    ];

    var sgender = ["Female", "Male", "GOther"];
    var sgenderids = ["female", "male", "gother"];

    var sage = ["range1", "range2", "range3", "range4", "range5", "range6"];
    var sageids = ["range1", "range2", "range3", "range4", "range5", "range6"];

    var statsData = {};

    //race and gender
    var knd = 0;
    while (knd < srace.length) {
      var k = 0;
      while (k < sgender.length) {
        var key = sraceids[knd] + "_" + sgenderids[k];
        var temp_n = srace[knd] + "_" + sgender[k];
        statsData[key] = downloaddata(temp_n, 0, statdata);
        k++;
      }
      knd++;
    }

    //race and age
    var jnd = 0;
    while (jnd < srace.length) {
      var j = 0;
      while (j < sage.length) {
        var key = sraceids[jnd] + "_" + sageids[j];
        var temp_n = srace[jnd] + "_" + sage[j];
        statsData[key] = downloaddata(temp_n, 0, statdata);
        j++;
      }
      jnd++;
    }

    //gender and age
    var ind = 0;
    while (ind < sgender.length) {
      var i = 0;
      while (i < sage.length) {
        var key = sgenderids[ind] + "_" + sageids[i];
        var temp_n = sgender[ind] + "_" + sage[i];
        statsData[key] = downloaddata(temp_n, 0, statdata);
        i++;
      }
      ind++;
    }

    return statsData;
  }

  localStorage.setItem("stats_data", JSON.stringify(statsData()));
  show_charts_after();
  show_charts_after2();
  toggleReturn(Math.round(Math.random() * 11));
});

function downloaddata(branch, num, statdata) {
  // helps in the creation of statsData
  if (branch in statdata) {
    var category = statdata[branch];
    var data = category[num];
    return [category, data];
  } else {
    return [0];
  }
}

/*
global google
*/

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

var sector = {
  0: "Technology",
  1: "Engineering",
  2: "Business",
  3: "Retail",
  4: "Healthcare",
  5: "Finance",
  6: "Real Estate",
  7: "Legal Services",
  8: "Government",
  9: "Manufacturing",
  10: "Education",
  11: "Arts"
};

var races = [
  "Asian",
  "Black",
  "Latinx",
  "Middle Eastern",
  "Multiracial",
  "Native American",
  "South Asian",
  "White",
  "Other"
];

var genders = ["Male", "Female", "Other"];

function toggleReturn(toggleValue) {
  //gets total in sector
  var race;
  var count = 0;
  var race_list = [];
  for (race of races) {
    race_list.push(races[count] + "_" + sector[toggleValue]);
    count++;
  }
  drawChart(race_list, sector[toggleValue]);
}

function drawChart(race_list, sector_name) {
  var chart_title = "Diversity in " + sector_name;

  var numbers_list = [];
  var sum_list = 0;
  for (var r of race_list) {
    var temp_hold = statdata[r];
    if (typeof temp_hold !== "undefined") {
      numbers_list.push(temp_hold[1]);
      sum_list += temp_hold[1];
    } else {
      numbers_list.push(0);
    }
  }

  var new_array = [["Race/Ethnicity", "amount"]];

  var races_array = [
    "Asian",
    "Black",
    "Latinx",
    "Middle Eastern",
    "Multiracial",
    "Native American",
    "South Asian",
    "White",
    "Other"
  ];

  for (let c = 0; c < races_array.length; c++) {
    if (numbers_list[c] !== 0) {
      new_array.push([races_array[c], numbers_list[c]]);
    }
  }

  Array.prototype.insert = function(index, item) {
    this.splice(index, 0, item);
  };

  function sort_array(arr) {
    arr.sort(function(f, s) {
      if (f[1] > s[1]) return -1;
      if (f[1] < s[1]) return 1;
    });
    return arr;
  }

  var sorted_array = sort_array(new_array);

  var data = google.visualization.arrayToDataTable(sorted_array);
  var options = {
    title: chart_title,
    colors: [
      "#0d894d",
      "#4d97a6",
      "#d6d749",
      "#2615a8",
      "#a4dde9",
      "#3480c9",
      "#faf843",
      "#4da67b",
      "#052f7c"
    ],
    animation: {
      duration: 1000,
      asing: "in",
      startup: true
    },

    chartArea: { left: 0, top: 50, width: "70%", height: "85%" },
    titleTextStyle: {
      color: "#10393f",
      fontSize: 20,
      //colors:["#4d97a6"],
      bold: true
    },
    legend: { position: "right", textStyle: { color: "#10393f", fontSize: 16 } }
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );

  chart.draw(data, options);

  var c = 0;
  var handler = setInterval(function() {
    c += sorted_array[1][1] / 20;
    data.setValue(0, 1, c);
    chart.draw(data, options);

    if (c >= sorted_array[1][1]) {
      clearInterval(handler);
      data.setValue(0, 1, sorted_array[1][1]);
      data.setValue(1, 1, sorted_array[2][1]);
    }
  }, 30);

  var piechart = document.getElementById("piechart");
  chart.draw(data, options);
}

function gender_sector(gender) {
  var sd = JSON.parse(localStorage.getItem("stats"));
  var list = [];
  for (var i = 0; i < 12; i++) {
    list.push(gender + "_" + sector[i]);
  }
  var new_list = [];
  for (var l of list) {
    new_list.push(downloaddata(l, 1, sd));
  }
  return new_list;
}
