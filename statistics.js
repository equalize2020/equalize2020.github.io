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

//branch is the value held in the category
//num is number of the datapoint of that category

//retrieving data
var Stats = firebase.database().ref("Statistics/");

var statdata;
Stats.once("value").then(function(snapshot) {
  console.log("stats:");
  console.log(snapshot.key);
  console.log(snapshot.exists());
  console.log(snapshot.val()); // array with JSON objects (might have to stringify)
  localStorage.setItem("stats", JSON.stringify(snapshot.val()));
  statdata = snapshot.val();
  
//     var sstatsData = {
//   asian_female: downloaddata("Asian_Female", 0, statdata),
//   asian_male: downloaddata("Asian_Male", 0, statdata),
//   asian_gother: downloaddata("Asian_GOther", 0, statdata),
//   black_female: downloaddata("Black_Female", 0, statdata),
//   black_male: downloaddata("Black_Male", 0, statdata),
//   black_gother: downloaddata("Black_GOther", 0, statdata),
//   latinx_female: downloaddata("Latinx_Female", 0, statdata),
//   latinx_male: downloaddata("Latinx_Male", 0, statdata),
//   latinx_gother: downloaddata("Latinx_GOther", 0, statdata),
//   middleeastern_female: downloaddata("Middle Eastern_Female", 0, statdata),
//   middleeastern_male: downloaddata("Middle Eastern_Male", 0, statdata),
//   middleeastern_gother: downloaddata("Middle Eastern_GOther", 0, statdata),
//   multiracial_female: downloaddata("Multiracial_Female", 0, statdata),
//   multiracial_male: downloaddata("Multiracial_Male", 0, statdata),
//   multiracial_gother: downloaddata("Multiracial_GOther", 0, statdata),
//   nativeamerican_female: downloaddata("Native American_Female", 0, statdata),
//   nativeamerican_male: downloaddata("Native American_Male", 0, statdata),
//   nativeamerican_gother: downloaddata("Native American_GOther", 0, statdata),
//   southasian_female: downloaddata("South Asian_Female", 0, statdata),
//   southasian_male: downloaddata("South Asian_Male", 0, statdata),
//   southasian_gother: downloaddata("South Asian_GOther", 0, statdata),
//   white_female: downloaddata("White_Female", 0, statdata),
//   white_male: downloaddata("White_Male", 0, statdata),
//   white_gother: downloaddata("White_GOther", 0, statdata),
//   rother_female: downloaddata("ROther_Female", 0, statdata),
//   rother_male: downloaddata("ROther_Male", 0, statdata),
//   rother_gother: downloaddata("ROther_GOther", 0, statdata),
//   asian_range1: downloaddata("Asian_range1", 0, statdata),
//   asian_range2: downloaddata("Asian_range2", 0, statdata),
//   asian_range3: downloaddata("Asian_range3", 0, statdata),
//   asian_range4: downloaddata("Asian_range4", 0, statdata),
//   asian_range5: downloaddata("Asian_range5", 0, statdata),
//   asian_range6: downloaddata("Asian_range6", 0, statdata),
//   black_range1: downloaddata("Black_range1", 0, statdata),
//   black_range2: downloaddata("Black_range2", 0, statdata),
//   black_range3: downloaddata("Black_range3", 0, statdata),
//   black_range4: downloaddata("Black_range4", 0, statdata),
//   black_range5: downloaddata("Black_range5", 0, statdata),
//   black_range6: downloaddata("Black_range6", 0, statdata),
//   latinx_range1: downloaddata("Latinx_range1", 0, statdata),
//   latinx_range2: downloaddata("Latinx_range2", 0, statdata),
//   latinx_range3: downloaddata("Latinx_range3", 0, statdata),
//   latinx_range4: downloaddata("Latinx_range4", 0, statdata),
//   latinx_range5: downloaddata("Latinx_range5", 0, statdata),
//   latinx_range6: downloaddata("Latinx_range6", 0, statdata),
//   middleeastern_range1: downloaddata("Middle Eastern_range1", 0, statdata),
//   middleeastern_range2: downloaddata("Middle Eastern_range2", 0, statdata),
//   middleeastern_range3: downloaddata("Middle Eastern_range3", 0, statdata),
//   middleeastern_range4: downloaddata("Middle Eastern_range4", 0, statdata),
//   middleeastern_range5: downloaddata("Middle Eastern_range5", 0, statdata),
//   middleeastern_range6: downloaddata("Middle Eastern_range6", 0, statdata),
//   multiracial_range1: downloaddata("Multiracial_range1", 0, statdata),
//   multiracial_range2: downloaddata("Multiracial_range2", 0, statdata),
//   multiracial_range3: downloaddata("Multiracial_range3", 0, statdata),
//   multiracial_range4: downloaddata("Multiracial_range4", 0, statdata),
//   multiracial_range5: downloaddata("Multiracial_range5", 0, statdata),
//   multiracial_range6: downloaddata("Multiracial_range6", 0, statdata),
//   nativeamerican_range1: downloaddata("Native American_range1", 0, statdata),
//   nativeamerican_range2: downloaddata("Native American_range2", 0, statdata),
//   nativeamerican_range3: downloaddata("Native American_range3", 0, statdata),
//   nativeamerican_range4: downloaddata("Native American_range4", 0, statdata),
//   nativeamerican_range5: downloaddata("Native American_range5", 0, statdata),
//   nativeamerican_range6: downloaddata("Native American_range6", 0, statdata),
//   southasian_range1: downloaddata("South Asian_range1", 0, statdata),
//   southasian_range2: downloaddata("South Asian_range2", 0, statdata),
//   southasian_range3: downloaddata("South Asian_range3", 0, statdata),
//   southasian_range4: downloaddata("South Asian_range4", 0, statdata),
//   southasian_range5: downloaddata("South Asian_range5", 0, statdata),
//   southasian_range6: downloaddata("South Asian_range6", 0, statdata),
//   white_range1: downloaddata("White_range1", 0, statdata),
//   white_range2: downloaddata("White_range2", 0, statdata),
//   white_range3: downloaddata("White_range3", 0, statdata),
//   white_range4: downloaddata("White_range4", 0, statdata),
//   white_range5: downloaddata("White_range5", 0, statdata),
//   white_range6: downloaddata("White_range6", 0, statdata),
//   rother_range1: downloaddata("ROther_range1", 0, statdata),
//   rother_range2: downloaddata("ROther_range2", 0, statdata),
//   rother_range3: downloaddata("ROther_range3", 0, statdata),
//   rother_range4: downloaddata("ROther_range4", 0, statdata),
//   rother_range5: downloaddata("ROther_range5", 0, statdata),
//   rother_range6: downloaddata("ROther_range6", 0, statdata),
//   female_range1: downloaddata("Female_range1", 0, statdata),
//   female_range2: downloaddata("Female_range2", 0, statdata),
//   female_range3: downloaddata("Female_range3", 0, statdata),
//   female_range4: downloaddata("Female_range4", 0, statdata),
//   female_range5: downloaddata("Female_range5", 0, statdata),
//   female_range6: downloaddata("Female_range6", 0, statdata),
//   male_range1: downloaddata("Male_range1", 0, statdata),
//   male_range2: downloaddata("Male_range2", 0, statdata),
//   male_range3: downloaddata("Male_range3", 0, statdata),
//   male_range4: downloaddata("Male_range4", 0, statdata),
//   male_range5: downloaddata("Male_range5", 0, statdata),
//   male_range6: downloaddata("Male_range6", 0, statdata),
//   gother_range1: downloaddata("GOther_range1", 0, statdata),
//   gother_range2: downloaddata("GOther_range2", 0, statdata),
//   gother_range3: downloaddata("GOther_range3", 0, statdata),
//   gother_range4: downloaddata("GOther_range4", 0, statdata),
//   gother_range5: downloaddata("GOther_range5", 0, statdata),
//   gother_range6: downloaddata("GOther_range6", 0, statdata)
// };

//statsData variable
function statsData() {
  var srace = ["Asian","Black","Latinx","Middle Eastern", "Multiracial", "Native American", "South Asian", "White", "ROther"];
  var sraceids = ["asian","black","latinx","middleeastern", "multiracial", "nativeamerican", "southasian", "white", "rother"];

  var sgender = ["Female", "Male", "GOther"];
  var sgenderids = ["female", "male", "gother"];

  var sage = ["range1","range2","range3","range4","range5","range6"];
  var sageids = ["range1","range2","range3","range4","range5","range6"];

  var statsData = {};
  
  //asian_female: downloaddata("Asian_Female", 0, statdata),

  //race and gender
  var knd = 0;
  while (knd < srace.length) {
    var k = 0;
    while ( k < sgender.length) {
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
    while ( j < sage.length) {
      var key = sraceids[jnd] + "_" + sageids[j];
      var temp_n = srace[jnd] + "_" + sage[j];
      statsData[key] = downloaddata(temp_n, 0, statdata);
      //statsData[key] = "downloaddata(\"" + srace[jnd] + "_" + sage[j] + "\", 0, statdata)";
      j++;
    }
    jnd++;
  }

  //gender and age
  var ind = 0; 
  while (ind < sgender.length) {
    var i = 0;
    while ( i < sage.length) {
      var key = sgenderids[ind] + "_" + sageids[i];
      var temp_n = sgender[ind] + "_" + sage[i];
      statsData[key] = downloaddata(temp_n, 0, statdata);
      i++;
    }
    ind++;
  }

  // //testing
  // //ERROR RIGHT NOW: get rid of the "" around downloaddata() function and we shall be alright
  // if (statsData == sstatsData) {
  //   console.log("YOU ARE RIGHT");
  // } else {
  //   console.log("not equal");
  // }

  console.log("statsData:");
  console.log(statsData);
  // console.log(sstatsData);
  
  return statsData;
} 
  
  localStorage.setItem("stats_data", JSON.stringify(statsData())); // for now
  show_charts_after();
  show_charts_after2();
  toggleReturn(Math.round(Math.random()*11));
  console.log("stats data array added");
});

//turn data into floats
//var statdata = JSON.parse(localStorage.getItem("stats"));

function downloaddata(branch, num, statdata) {
  //specifying datapoint
  if (branch in statdata) {
    var category = statdata[branch];
    var data = category[num];
    return [category, data];
  } else {
    return [0];
  }
}

//console.log(downloaddata("Asian_Female", 0));

// MAKE A FUNCTION INSTEAD!
// var statsData = {
//   asian_female: downloaddata("Asian_Female", 0),
//   asian_male: downloaddata("Asian_Male", 0),
//   asian_gother: downloaddata("Asian_GOther", 0),
//   black_female: downloaddata("Black_Female", 0),
//   black_male: downloaddata("Black_Male", 0),
//   black_gother: downloaddata("Black_GOther", 0),
//   latinx_female: downloaddata("Latinx_Female", 0),
//   latinx_male: downloaddata("Latinx_Male", 0),
//   latinx_gother: downloaddata("Latinx_GOther", 0),
//   middleeastern_female: downloaddata("Middle Eastern_Female", 0),
//   middleeastern_male: downloaddata("Middle Eastern_Male", 0),
//   middleeastern_gother: downloaddata("Middle Eastern_GOther", 0),
//   multiracial_female: downloaddata("Multiracial_Female", 0),
//   multiracial_male: downloaddata("Multiracial_Male", 0),
//   multiracial_gother: downloaddata("Multiracial_GOther", 0),
//   nativeamerican_female: downloaddata("Native American_Female", 0),
//   nativeamerican_male: downloaddata("Native American_Male", 0),
//   nativeamerican_gother: downloaddata("Native American_GOther", 0),
//   southasian_female: downloaddata("South Asian_Female", 0),
//   southasian_male: downloaddata("South Asian_Male", 0),
//   southasian_gother: downloaddata("South Asian_GOther", 0),
//   white_female: downloaddata("White_Female", 0),
//   white_male: downloaddata("White_Male", 0),
//   white_gother: downloaddata("White_GOther", 0),
//   rother_female: downloaddata("ROther_Female", 0),
//   rother_male: downloaddata("ROther_Male", 0),
//   rother_gother: downloaddata("ROther_GOther", 0),
//   asian_range1: downloaddata("Asian_range1", 0),
//   asian_range2: downloaddata("Asian_range2", 0),
//   asian_range3: downloaddata("Asian_range3", 0),
//   asian_range4: downloaddata("Asian_range4", 0),
//   asian_range5: downloaddata("Asian_range5", 0),
//   asian_range6: downloaddata("Asian_range6", 0),
//   black_range1: downloaddata("Black_range1", 0),
//   black_range2: downloaddata("Black_range2", 0),
//   black_range3: downloaddata("Black_range3", 0),
//   black_range4: downloaddata("Black_range4", 0),
//   black_range5: downloaddata("Black_range5", 0),
//   black_range6: downloaddata("Black_range6", 0),
//   latinx_range1: downloaddata("Latinx_range1", 0),
//   latinx_range2: downloaddata("Latinx_range2", 0),
//   latinx_range3: downloaddata("Latinx_range3", 0),
//   latinx_range4: downloaddata("Latinx_range4", 0),
//   latinx_range5: downloaddata("Latinx_range5", 0),
//   latinx_range6: downloaddata("Latinx_range6", 0),
//   middleeastern_range1: downloaddata("Middle Eastern_range1", 0),
//   middleeastern_range2: downloaddata("Middle Eastern_range2", 0),
//   middleeastern_range3: downloaddata("Middle Eastern_range3", 0),
//   middleeastern_range4: downloaddata("Middle Eastern_range4", 0),
//   middleeastern_range5: downloaddata("Middle Eastern_range5", 0),
//   middleeastern_range6: downloaddata("Middle Eastern_range6", 0),
//   multiracial_range1: downloaddata("Multiracial_range1", 0),
//   multiracial_range2: downloaddata("Multiracial_range2", 0),
//   multiracial_range3: downloaddata("Multiracial_range3", 0),
//   multiracial_range4: downloaddata("Multiracial_range4", 0),
//   multiracial_range5: downloaddata("Multiracial_range5", 0),
//   multiracial_range6: downloaddata("Multiracial_range6", 0),
//   nativeamerican_range1: downloaddata("Native American_range1", 0),
//   nativeamerican_range2: downloaddata("Native American_range2", 0),
//   nativeamerican_range3: downloaddata("Native American_range3", 0),
//   nativeamerican_range4: downloaddata("Native American_range4", 0),
//   nativeamerican_range5: downloaddata("Native American_range5", 0),
//   nativeamerican_range6: downloaddata("Native American_range6", 0),
//   southasian_range1: downloaddata("South Asian_range1", 0),
//   southasian_range2: downloaddata("South Asian_range2", 0),
//   southasian_range3: downloaddata("South Asian_range3", 0),
//   southasian_range4: downloaddata("South Asian_range4", 0),
//   southasian_range5: downloaddata("South Asian_range5", 0),
//   southasian_range6: downloaddata("South Asian_range6", 0),
//   white_range1: downloaddata("White_range1", 0),
//   white_range2: downloaddata("White_range2", 0),
//   white_range3: downloaddata("White_range3", 0),
//   white_range4: downloaddata("White_range4", 0),
//   white_range5: downloaddata("White_range5", 0),
//   white_range6: downloaddata("White_range6", 0),
//   rother_range1: downloaddata("ROther_range1", 0),
//   rother_range2: downloaddata("ROther_range2", 0),
//   rother_range3: downloaddata("ROther_range3", 0),
//   rother_range4: downloaddata("ROther_range4", 0),
//   rother_range5: downloaddata("ROther_range5", 0),
//   rother_range6: downloaddata("ROther_range6", 0),
//   female_range1: downloaddata("Female_range1", 0),
//   female_range2: downloaddata("Female_range2", 0),
//   female_range3: downloaddata("Female_range3", 0),
//   female_range4: downloaddata("Female_range4", 0),
//   female_range5: downloaddata("Female_range5", 0),
//   female_range6: downloaddata("Female_range6", 0),
//   male_range1: downloaddata("Male_range1", 0),
//   male_range2: downloaddata("Male_range2", 0),
//   male_range3: downloaddata("Male_range3", 0),
//   male_range4: downloaddata("Male_range4", 0),
//   male_range5: downloaddata("Male_range5", 0),
//   male_range6: downloaddata("Male_range6", 0),
//   gother_range1: downloaddata("GOther_range1", 0),
//   gother_range2: downloaddata("GOther_range2", 0),
//   gother_range3: downloaddata("GOther_range3", 0),
//   gother_range4: downloaddata("GOther_range4", 0),
//   gother_range5: downloaddata("GOther_range5", 0),
//   gother_range6: downloaddata("GOther_range6", 0)
// };








/*
global google
*/

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

/*
 toggle (returns a number between 0-12 for sectors)
 
 if statement (if toggle == number)
 then you load from the database,
 asian_sectorcorresponding to the number (asian_education)
 var 1 = Technology
*/
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
  //get total in sector
  var race;
  var count = 0;
  var race_list = [];
  for (race of races) {
    race_list.push(races[count] + "_" + sector[toggleValue]);
    count++;
  }
  console.log(race_list);
  drawChart(race_list, sector[toggleValue]);
}

//list index - list is organized race_sector, sector is the same for 13 so [0,12] then [13,25] and so on
//statdata[list[numberwewant]]
//use list index to locate value in statdata
//add list index to our_new_array

function drawChart(race_list, sector_name) {
  console.log("drawing");
  console.log(race_list);
  console.log(statdata);
  
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
    //console.log(numbers_list);
  }
  console.log("numbers list");
  console.log(numbers_list);


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

  console.log(new_array);

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

  console.log("sorted");
  var sorted_array = sort_array(new_array);
  console.log(sorted_array);

  var data = google.visualization.arrayToDataTable(sorted_array);
  var options = {
    title: chart_title,
    colors:['#0d894d','#4d97a6','#d6d749','#2615a8',"#a4dde9",'#3480c9', '#faf843', '#4da67b', '#052f7c'],
    animation: {
      duration: 1000,
      asing: "in",
      startup: true,
    },
  
    chartArea:{left:0,top:50,width:'70%',height:'85%'},
    titleTextStyle:{
      color: "#10393f",
  fontSize: 20,
      //colors:["#4d97a6"],
  bold: true
    },
    legend:{position: 'right', 
            textStyle: 
            {color: '#10393f', fontSize: 16}}
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );

  chart.draw(data, options);

  var c = 0;
  // start the animation loop
  var handler = setInterval(function() {
    // values increment
    c += sorted_array[1][1] / 20;
    // apply new values
    data.setValue(0, 1, c);
    chart.draw(data, options);
    // check if we have reached the desired value

    if (c >= sorted_array[1][1]) {
      // stop the loop
      console.log("stopping loop");
      clearInterval(handler);
      data.setValue(0, 1, sorted_array[1][1]);
      data.setValue(1, 1, sorted_array[2][1]);
    }
  }, 30);

  var piechart = document.getElementById("piechart");
  chart.draw(data, options);
}

window.addEventListener("load", function() {
  var node = document.querySelector("[data-loading]");
  node.setAttribute("data-loading", "complete");
});

window.onload = function() {
  fadeOutEffect();
};

//end of pie chart

//graph is showing how much of each gender in each sector

function gender_sector(gender) {
  var sd = JSON.parse(localStorage.getItem("stats"))
  //make sure gender variable is "gender"
  var list = [];
  for (var i = 0; i < 12; i++) {
    list.push(gender + "_" + sector[i]);
  }
  //replace each element of the list with data from statdata
  var new_list = [];
  for (var l of list) {
    new_list.push(downloaddata(l, 1, sd));
  }
  return new_list;
}

function fadeOutEffect() {
  // var fadeTarget = document.getElementById("fadeout");
  // var fadeEffect = setInterval(function() {
  //   if (!fadeTarget.style.opacity) {
  //     fadeTarget.style.opacity = 1;
  //   }
  //   if (fadeTarget.style.opacity > 0) {
  //     fadeTarget.style.opacity -= 0.1;
  //   } else {
  //     clearInterval(fadeEffect);
  //   }
  // }, 150);
}




