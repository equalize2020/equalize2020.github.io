//loading page thing

var facts = [
  "In New York City, 88% of police stops in 2018 involved Black and Latinx people, while 10% involved white people. (Of those stops, 70% were completely innocent.) - New York Civil Liberties Union, 2019",
  "In one US survey, 15.8% of students reported experiencing race-based bullying or harassment. Research has found significant associations between racial bullying and negative mental and physical health in students. - Russell et al., 2012 and Rosenthal et al., 2013",
  "From 2013 to 2017, white patients in the US received better quality health care than about 34% of Hispanic patients, 40% of Black patients, and 40% of Native American patients. - Agency for Healthcare Research and Quality, 2018",
  "Black women are 3 to 4 times more likely to experience a pregnancy-related death than white women, even at similar levels of income and education. - National Partnership for Women and Families, 2018",
  "Black Americans are more likely than white Americans to be arrested. Once arrested, they are more likely to be convicted, and once convicted, they are more likely to experience lengthy prison sentences. - The Sentencing Project, 2018",
  "Black Americans and white Americans use drugs at similar rates, but Black Americans are 6 times more likely to be arrested for it. - NAACP, 2016",
  "On average, Black men in the US receive sentences that are 19.1% longer than those of white men convicted for the same crimes. - US Sentencing Commission, 2017",
  "In the US, Black individuals are twice as likely to be unemployed than white individuals. Once employed, Black individuals earn nearly 25% less than their white counterparts. - Abdul Latif Jameel Poverty Action Lab, 2004",
  "One US study found that job resumes with traditionally white-sounding names received 50% more callbacks than those with traditionally Black names. - Abdul Latif Jameel Poverty Action Lab, 2004",
  "In the US, Black workers are less likely than white workers to be employed in a job that is consistent with their level of education. - Economic Policy Institute, 2019"
];

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

window.addEventListener("load", function() {
  var node = document.querySelector("[data-loading]");
  node.setAttribute("data-loading", "complete");

  var divs = document.getElementsByClassName("fadeout");
  document.getElementById("fadeout_container").style.display="flex";

  [].slice.call(divs).forEach(function(div) {
    div.innerHTML = facts[Math.floor(Math.random() * facts.length)];
    
    div.onclick = function() {
      window.location = 
        "https://www.dosomething.org/us/facts/11-facts-about-racial-discrimination"
      ;
    };
    
  });
  
  setTimeout(() => { document.getElementById("fadeout_container").style.display="none"; }, 7000);
  
  
});

    var showing = false;
    function show_function() {
      if (showing){
        document.getElementById("menu_dropdown").style.display = "none";
        showing = false;
      } else {
        document.getElementById("menu_dropdown").style.display = "flex";
        showing = true;
      }
    }

// //mobile hamburger animation
// (function(){
//     var burger = document.querySelector('.burger-container'),
//         header_mobile = document.querySelector('.header_mobile');
    
//     burger.onclick = function() {
//         header_mobile.classList.toggle('menu-opened');
//     }
// }());

// function show_mobile_menu(){
//   var header_mobile = document.querySelector('.header_mobile');
//   header_mobile.classList.toggle('menu-opened');
// }


// //database (all pages are connected to this js file)
// // Your web app's Firebase configuration
// var firebaseConfig = {
//   apiKey: "AIzaSyBLOfvjIMpmvPOFto7HTnMhZUvNvrXSHcw",
//   authDomain: "pay-gap.firebaseapp.com",
//   databaseURL: "https://pay-gap.firebaseio.com",
//   projectId: "pay-gap",
//   storageBucket: "pay-gap.appspot.com",
//   messagingSenderId: "666718819156",
//   appId: "1:666718819156:web:c4ce1baa3a19443fb86ec1",
//   measurementId: "G-NK5D35T60E"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();


/*












*/
