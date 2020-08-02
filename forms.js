/*
global firebase
*/

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

var current_slide = 1;
var next_slide;

function display_slide(change) {
  /* Displays the correct slide for the incident report form */
  next_slide = current_slide + change;
  if (next_slide == 1) {
    document.getElementById("back_btn_i").style.display = "none";
    document.getElementById("i_1").style.opacity = 1;
    document.getElementById("step1").style.display = "block";
    document.getElementById("step2").style.display = "none";
  } else if (next_slide == 2) {
    document.getElementById("back_btn_i").style.display = "block";
    document.getElementById("i_1").style.backgroundColor = "#10393f";
    document.getElementById("i_1").style.color = "#ffffff";
    document.getElementById("l_1_2").style.opacity = 1;
    document.getElementById("i_2").style.opacity = 1;
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";
    document.getElementById("step3").style.display = "none";
  } else if (next_slide == 3) {
    document.getElementById("i_2").style.backgroundColor = "#10393f";
    document.getElementById("i_2").style.color = "#ffffff";
    document.getElementById("l_2_3").style.opacity = 1;
    document.getElementById("i_3").style.opacity = 1;
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "block";
    document.getElementById("step4").style.display = "none";
  } else if (next_slide == 4) {
    document.getElementById("next_btn_i").style.display = "block";
    document.getElementById("submit_btn_i").style.display = "none";
    document.getElementById("i_3").style.backgroundColor = "#10393f";
    document.getElementById("i_3").style.color = "#ffffff";
    document.getElementById("l_3_4").style.opacity = 1;
    document.getElementById("i_4").style.opacity = 1;
    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "block";
    document.getElementById("step5").style.display = "none";
  } else if (next_slide == 5) {
    document.getElementById("next_btn_i").style.display = "none";
    document.getElementById("submit_btn_i").style.display = "block";
    document.getElementById("i_4").style.backgroundColor = "#10393f";
    document.getElementById("i_4").style.color = "#ffffff";
    document.getElementById("l_4_5").style.opacity = 1;
    document.getElementById("i_5").style.opacity = 1;
    document.getElementById("step4").style.display = "none";
    document.getElementById("step5").style.display = "block";
  } else if (next_slide == 6) {
    document.getElementById("back_btn_i").style.display = "none";
    document.getElementById("submit_btn_i").style.display = "none";
    document.getElementById("i_5").style.backgroundColor = "#10393f";
    document.getElementById("i_5").style.color = "#ffffff";
    document.getElementById("step5").style.display = "none";
    document.getElementById("step6").style.display = "block";
  }
  current_slide = next_slide;
}

function check_inputs(current_slide) {
  // Checks if the required inputs are filled out before going to the next page
  if (current_slide == 1) {
    if (
      document.getElementById("custom_title").value == "" &&
      (document.getElementById("t_1").value == "" ||
        document.getElementById("t_2").value == "")
    ) {
      document.getElementById("title_error").style.display = "block";
    } else {
      display_slide(1);
      document.getElementById("title_error").style.display = "none";
    }
  } else if (current_slide == 2) {
    if (document.getElementById("incident_description").value == "") {
      document.getElementById("description_error").style.display = "block";
    } else {
      display_slide(1);
      document.getElementById("description_error").style.display = "none";
    }
  } else {
    display_slide(1);
  }
}

/// DATABASE
var IncidentReports = firebase.database().ref("IncidentReports/");
var incident_id;
var reports;
var first = true;

IncidentReports.once("value").then(function(snap) {
  localStorage.setItem("reports", JSON.stringify(snap.val()));
  reports = snap.val();
  incident_id = snap.numChildren();
  if (first) {
    show_report_grid(6, -1);
    first = false;
  }
});

function save_incident_form() {
  // Puts the incident form into an object
  var title_template =
    "I was " +
    document.getElementById("t_1").value +
    " by " +
    document.getElementById("t_2").value;
  var title_custom = document.getElementById("custom_title").value;

  if (title_custom == "") {
    var title = title_template;
  } else {
    var title = title_custom;
  }
  var description = document.getElementById("incident_description").value;
  var tags = document.getElementById("tags").value.split(",");

  // if keywords in description and not in tags, push to tags
  var keywords = [
    "Harass",
    "Attack",
    "Overpower",
    "Violence",
    "Discriminate",
    "Race",
    "Sexist",
    "Racist",
    "Religion",
    "Disability",
    "Black",
    "Asian",
    "White",
    "Latinx",
    "Native",
    "Indian",
    "Bullying",
    "Bully",
    "Minor",
    "Children",
    "Parent",
    "Indigenous",
    "BLM",
    "Black Lives Matter"
  ];

  for (var word of keywords) {
    if (
      description.toLowerCase().includes(word.toLowerCase()) &&
      !tags.includes(word)
    ) {
      tags.push(word);
    }
  }

  tags.push(""); // show all results for an empty search

  var date = document.getElementById("incident_date").value;
  var ongoing = document.getElementById("incident_ongoing").checked;

  var location = document.getElementById("location").value;

  var share_employer = document.getElementById("share_employer").checked;

  if (share_employer) {
    var employer = document.getElementById("employer").value;
  } else {
    var employer = "Unavailable";
  }

  if (document.querySelector("input[name=race]:checked") == null) {
    var race = "Prefer not to say";
  } else {
    var race = document.querySelector("input[name=race]:checked").value;
  }

  if (document.querySelector("input[name=gender]:checked") == null) {
    var gender = "Prefer not to say";
  } else {
    var gender = document.querySelector("input[name=gender]:checked").value;
  }

  if (race == "other") {
    race = document.getElementById("race_other").value;
  }

  if (gender == "other") {
    gender = document.getElementById("gender_other").value;
  }

  var trans = document.getElementById("trans").checked;
  var ability = document.getElementById("disability").checked;
  var email = document.getElementById("email").value;

  var consent = document.getElementById("consent").checked;

  var today = new Date();
  var timestamp =
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds() +
    " " +
    today.getDate() +
    "/" +
    today.getMonth() +
    "/" +
    today.getFullYear();

  if (consent) {
    // package as object
    var incident_report = {
      title: title,
      description: description,
      tags: tags,
      date: date,
      ongoing: ongoing,
      location: location,
      employer: employer,
      race: race,
      gender: gender,
      trans: trans,
      ability: ability,
      email: email,
      incident_id: incident_id,
      submissiontime: timestamp
    };

    var incidentconnect = firebase
      .database()
      .ref("IncidentReports/" + incident_id)
      .set(incident_report);

    display_slide(1);
  } else {
    if (
      window.confirm(
        "Are you sure you do not want to share your report? Press OK if you do not want to share your report."
      )
    ) {
      display_slide(1);
      document.getElementById("form_final_msg").innerHTML =
        "Your report was not saved to our database<br/><a href='incidents.html' class='go_to_other'> Click here to see all the Incidents Reports</a>";
    }
  }
}

function check_wage_required() {
  // Checks if the salary field was filled out
  var salary = document.getElementById("salary").value;
  if (salary == "") {
    document.getElementById("salary_label").style.color = "	#FF0000";
    window.location = "#anchor";
    return false;
  } else {
    document.getElementById("salary_label").style.color = "#10393f";
    return true;
  }
}

function save_wage_form() {
  // Puts the wage form into an object
  var filled = check_wage_required();

  var salary = document.getElementById("salary").value;
  var bonus = document.getElementById("bonus").value;
  var company = document.getElementById("company").value;
  var field = document.getElementById("field_w").value;
  var location = document.getElementById("location_w").value;
  var years = document.getElementById("yrs_company").value;
  var years_exp = document.getElementById("yrs_exp").value;
  var age = document.getElementById("w_age").value;

  if (document.querySelector("input[name=wrace]:checked") == null) {
    var race = "Prefer not to say";
  } else {
    var race = document.querySelector("input[name=wrace]:checked").value;
  }

  if (document.querySelector("input[name=wgender]:checked") == null) {
    var gender = "Prefer not to say";
  } else {
    var gender = document.querySelector("input[name=wgender]:checked").value;
  }

  if (race == "other") {
    race = "ROther";
  }

  if (gender == "other" || gender == "Non-Binary") {
    gender = "GOther";
  }

  var trans = document.getElementById("wtrans").checked;
  var disability = document.getElementById("wdisability").checked;

  var additional = document.getElementById("wage_additional").value;

  var today = new Date();
  var timestamp =
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds() +
    " " +
    today.getDate() +
    "/" +
    today.getMonth() +
    1 +
    "/" +
    today.getFullYear();

  var consent = document.getElementById("wage_consent").checked;

  if (filled) {
    if (bonus == "") {
      var tot_comp = parseFloat(salary);
    } else {
      var tot_comp = parseFloat(salary) + parseFloat(bonus);
    }

    if (10000 <= tot_comp && tot_comp <= 2000000) {
      if (consent) {
        var wage_report = {
          // do keys have to be strings??
          salary: salary,
          bonus: bonus,
          company: company,
          field: field,
          location: location,
          years: years,
          years_exp: years_exp,
          age: age,
          race: race,
          gender: gender,
          disability: disability,
          additional: additional,
          submissiontime: timestamp
        };
        document.getElementById("wage_submit_button").style.display = "none";
        document.getElementById("wage_finished_text").innerHTML =
          "Thank you! Your wage report has been submitted. <br/><a href='statistics.html' class='go_to_other'> Click here to go to Statistics.</a>";

        sort_information(wage_report);

        var connectwage = firebase.database().ref();
        var wagebranch = connectwage.child("WageReports");
        wagebranch.push(wage_report);
      } else {
        if (
          window.confirm(
            "Are you sure you do not want to share your report? Press OK if you do not want to share your report."
          )
        ) {
          document.getElementById("wage_submit_button").style.display = "none";
          document.getElementById("wage_finished_text").innerHTML =
            "Your wage report has not been submitted.";
        }
      }
    } else {
      if (consent) {
        var wage_report = {
          // do keys have to be strings??
          salary: salary,
          bonus: bonus,
          company: company,
          field: field,
          location: location,
          years: years,
          years_exp: years_exp,
          age: age,
          race: race,
          gender: gender,
          disability: disability,
          additional: additional,
          submissiontime: timestamp
        };
        document.getElementById("wage_submit_button").style.display = "none";
        document.getElementById("wage_finished_text").innerHTML =
          "Thank you for your submission! Your wage report contains some abnormalities. Please contact us at equalize2020@gmail.com to confirm your submission.";
        var connectwage = firebase.database().ref();
        var abnormalwagebranch = connectwage.child("AbnormalWageReports");
        abnormalwagebranch.push(wage_report);
      } else {
        if (
          window.confirm(
            "Are you sure you do not want to share your report? Press OK if you do not want to share your report."
          )
        ) {
          document.getElementById("wage_submit_button").style.display = "none";
          document.getElementById("wage_finished_text").innerHTML =
            "Your wage report has not been submitted.";
        }
      }
    }
  }
}

//wages
var WageReports = firebase.database().ref("Statistics/");
WageReports.once("value").then(function(snapshot) {
  localStorage.setItem("stats_reports", JSON.stringify(snapshot.val()));
});

function sort_information(wr) {
  // Updates the averages for groups of people in the database
  var race_given = false;
  var gender_given = false;
  var age_given = false;
  var field_given = false;

  var existing_data = JSON.parse(localStorage.getItem("stats_reports"));

  if (!(wr.race == "Prefer not to say")) {
    race_given = true;
  }
  if (!(wr.gender == "Prefer not to say")) {
    gender_given = true;
  }
  if (wr.age != "") {
    age_given = true;
  }
  if (wr.field != "") {
    field_given = true;
  }

  // add salary and bonus
  if (isNaN(parseFloat(wr.bonus))) {
    var total_comp = parseFloat(wr.salary);
  } else {
    var total_comp = parseFloat(wr.salary) + parseFloat(wr.bonus);
  }

  function update_db_wage(temp_name) {
    if (temp_name in existing_data) {
      var temp_attr = existing_data[temp_name];
      var old_avg = parseFloat(temp_attr[0]);
      var old_num = parseFloat(temp_attr[1]);
      var new_num = old_num + 1;
      var new_avg = (old_avg * old_num + total_comp) / new_num;
    } else {
      var new_avg = total_comp;
      var new_num = 1;
    }

    var new_val = [new_avg, new_num];

    var newconnect = firebase
      .database()
      .ref("Statistics/" + temp_name)
      .set(new_val); // updates database
  }

  if (race_given && gender_given) {
    var temp_name = wr.race + "_" + wr.gender;
    update_db_wage(temp_name);
  }
  if (race_given && age_given) {
    var sage = parseFloat(wr.age);
    if (sage > 15 && sage < 25) {
      var temp_name = wr.race + "_" + "range1";
      update_db_wage(temp_name);
    }
    if (sage > 24 && sage < 35) {
      var temp_name = wr.race + "_" + "range2";
      update_db_wage(temp_name);
    }
    if (sage > 34 && sage < 45) {
      var temp_name = wr.race + "_" + "range3";
      update_db_wage(temp_name);
    }
    if (sage > 44 && sage < 55) {
      var temp_name = wr.race + "_" + "range4";
      update_db_wage(temp_name);
    }
    if (sage > 54 && sage < 65) {
      var temp_name = wr.race + "_" + "range5";
      update_db_wage(temp_name);
    }
    if (sage > 64) {
      var temp_name = wr.race + "_" + "range6";
      update_db_wage(temp_name);
    }
  }
  if (race_given && field_given) {
    var temp_name = wr.race + "_" + wr.field;
    update_db_wage(temp_name);
  }
  if (gender_given && field_given) {
    var temp_name = wr.gender + "_" + wr.field;
    update_db_wage(temp_name);
  }
  if (gender_given && age_given) {
    var sage = parseFloat(wr.age);
    if (sage > 15 && sage < 25) {
      var temp_name = wr.gender + "_" + "range1";
      update_db_wage(temp_name);
    }
    if (sage > 24 && sage < 35) {
      var temp_name = wr.gender + "_" + "range2";
      update_db_wage(temp_name);
    }
    if (sage > 34 && sage < 45) {
      var temp_name = wr.gender + "_" + "range3";
      update_db_wage(temp_name);
    }
    if (sage > 44 && sage < 55) {
      var temp_name = wr.gender + "_" + "range4";
      update_db_wage(temp_name);
    }
    if (sage > 54 && sage < 65) {
      var temp_name = wr.gender + "_" + "range5";
      update_db_wage(temp_name);
    }
    if (sage > 64) {
      var temp_name = wr.gender + "_" + "range6";
      update_db_wage(temp_name);
    }
  }
}

/// INCIDENTS VIEWING
function show_report_grid(grid_size, rep_array) {
  // Show the incident reports in incidents.html
  var incidents_container = document.getElementById("in_container");
  incidents_container.innerHTML = "";

  reports = JSON.parse(localStorage.getItem("reports"));

  if (rep_array == -1) {
    var reports_shuffled = shuffle(Array.from(reports));
  } else if (rep_array == 0) {
    var msg = document.createElement("h2");
    var msg_txt = document.createTextNode(
      "No Results Found! Try Searching for Something Else"
    );
    msg.appendChild(msg_txt);
    incidents_container.appendChild(msg);
  } else {
    var reports_shuffled = shuffle(rep_array);
  }

  for (var i = 0; i < grid_size; i++) {
    /*
      for each report from the start of reports_shuffled
      to the grid_size, make incidents_item with each
      story and a button that leads them to see the full
      thing
    */

    var incidents_item = document.createElement("div");
    incidents_item.classList.add("incidents_item");

    var header = document.createElement("h2");

    var header_txt = document.createTextNode(reports_shuffled[i].title);

    header.appendChild(header_txt);

    var char_length = Math.round(
      0.00015085686700459 * (window.innerWidth * window.innerHeight) + 148.6
    );
    var shortened =
      reports_shuffled[i].description.slice(0, char_length) + "...";

    var paragraph = document.createElement("p");
    var paragraph_txt = document.createTextNode(shortened);
    paragraph.appendChild(paragraph_txt);

    var btn_row = document.createElement("div");
    btn_row.classList.add("btn_row");
    var btn_r = document.createElement("div");
    btn_r.id = "b" + i.toString();
    btn_row.appendChild(btn_r);

    incidents_item.appendChild(header);
    incidents_item.appendChild(paragraph);
    incidents_item.appendChild(btn_row);

    incidents_container.appendChild(incidents_item);

    var b_id = "b" + i.toString();

    var identification = reports_shuffled[i].incident_id;
    var to_replace = `<div class="read_btns" id="b_id" onclick="set_incident(${identification})">Read Report</div>`;
    document.getElementById(b_id).innerHTML = to_replace;
  }
}

function set_incident(inc) {
  // Show correct incident report in incident_viewer.html
  for (var rep of reports) {
    if (rep.incident_id == inc) {
      break;
    }
  }

  window.location.href = "/incident_viewer.html";
  localStorage.setItem("chosen_report", JSON.stringify(rep));
}

function view_incident() {
  // View the correct incident
  var report = JSON.parse(localStorage.getItem("chosen_report"));
  document.getElementById("viewer_title").innerHTML = report.title;
  document.getElementById("viewer_description").innerHTML = report.description;
  var tags = report.tags;
  var tags_display = document.getElementById("tags_display");
  for (var tag of tags) {
    if (tag != "") {
      var ele = document.createElement("div");
      var ele_txt = document.createTextNode(tag);
      ele.appendChild(ele_txt);
      tags_display.appendChild(ele);
    }
  }
  if (report.employer == "Unavailable") {
    document.getElementById("employer_div").style.display = "none";
  } else {
    document.getElementById("employer_div").style.display = "block";
    document.getElementById("employer_name").innerHTML = report.employer;
  }
  if (report.date == "") {
    document.getElementById("date_div").style.display = "none";
  } else {
    document.getElementById("date_div").style.display = "block";
    if (report.ongoing) {
      document.getElementById("date_num").innerHTML =
        report.date + " (ongoing)";
    } else {
      document.getElementById("date_num").innerHTML = report.date;
    }
  }
  if (report.location == "") {
    document.getElementById("location_div").style.display = "none";
  } else {
    document.getElementById("location_div").style.display = "block";
    document.getElementById("location_txt").innerHTML = report.location;
  }

  if (
    report.race == "Prefer not to say" &&
    report.gender == "Prefer not to say" &&
    !report.trans &&
    !report.ability
  ) {
    document.getElementById("about_me_div").style.display = "none";
  } else {
    document.getElementById("about_me_div").style.display = "block";
    if (report.race == "Prefer not to say") {
      document.getElementById("view_race").style.display = "none";
    } else {
      document.getElementById("view_race").style.display = "block";
      document.getElementById("view_race").innerHTML =
        "&nbsp&nbsp&nbsp- am " + report.race + "\n";
    }

    if (report.gender == "Prefer not to say") {
      document.getElementById("view_gender").style.display = "none";
    } else {
      document.getElementById("view_gender").style.display = "block";
      if (report.gender == "Non-Binary") {
        document.getElementById("view_gender").innerHTML =
          "&nbsp&nbsp&nbsp- am Non-Binary" + "\n";
      } else if (report.gender == "Female") {
        document.getElementById("view_gender").innerHTML =
          "&nbsp&nbsp&nbsp- am a Woman" + "\n";
      } else if (report.gender == "Male") {
        document.getElementById("view_gender").innerHTML =
          "&nbsp&nbsp&nbsp- am a Man" + "\n";
      } else {
        document.getElementById("view_gender").innerHTML =
          "&nbsp&nbsp&nbsp- am a " + report.gender + "\n";
      }
    }

    if (!report.trans) {
      document.getElementById("view_trans").style.display = "none";
    } else {
      document.getElementById("view_trans").style.display = "block";
      document.getElementById("view_trans").innerHTML =
        "&nbsp&nbsp&nbsp- am transgender " + "\n";
    }

    if (!report.ability) {
      document.getElementById("view_disability").style.display = "none";
    } else {
      document.getElementById("view_disability").style.display = "block";
      document.getElementById("view_disability").innerHTML =
        "&nbsp&nbsp&nbsp- have a disability";
    }
  }
}

function search_incidents() {
  // Search through incidents
  var search_input = document.getElementById("incident_search").value;
  var search_input_split = search_input.split(" ");

  var search_results = [];

  for (var rep of reports) {
    var temp_lower_array = [];
    for (var t of rep.tags) {
      temp_lower_array.push(t.toLowerCase());
    }
    if (
      temp_lower_array.includes(search_input.toLowerCase()) &&
      search_results.length < 9
    ) {
      search_results.push(rep);
    }
  }

  if (search_results.length < 9) {
    // if more than one keyword was searched
    for (var splt_word of search_input_split) {
      for (var rep of reports) {
        var temp_lower_array = [];
        for (var t of rep.tags) {
          temp_lower_array.push(t.toLowerCase());
        }
        if (
          temp_lower_array.includes(splt_word.toLowerCase()) &&
          !search_results.includes(rep)
        ) {
          search_results.push(rep);
        }
      }
    }
  }

  show_report_grid(search_results.length, search_results);
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
