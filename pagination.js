
/* Targets and stores: page-header, student-list UL, student-item LI,
and H3 element in student-item */
const PAGEHEADERDIV = document.querySelector('.page-header');
const UL = document.querySelector('.student-list');
const LI = UL.querySelectorAll('.student-item');
const H3 = document.querySelectorAll('.student-item > .student-details > h3');

//Create div container of form element
const DIV = document.createElement('div');
DIV.className = 'student-search';
PAGEHEADERDIV.appendChild(DIV);
//Create form element
const FORM = document.createElement('form');
DIV.appendChild(FORM);
//Create form, input element
const INPUT = document.createElement('input');
INPUT.setAttribute("type","text");
INPUT.setAttribute("placeholder","Search for students...");
FORM.appendChild(INPUT);
//Create form button
const BUTTON = document.createElement('button');
var btnText = document.createTextNode('Search');
BUTTON.appendChild(btnText);
FORM.appendChild(BUTTON);

// console.log(UL);
// for (let i = 0; i < H3.length; i++) {
//   console.log(LI[i]);
//   console.log(H3[i]);
//   LI[i].setAttribute("style","display: none");
// };

/* ------------------- FUNCTIONS HERE -------------------- */
function searchFilter (filter) {
  console.log(filter);
  for (let i = 0; i < LI.length; i++) {    //Outputs the students names to the console
    let liNames = H3[i].textContent;  //Stores text content of the H3 element
    if (liNames.toUpperCase().indexOf(filter) > -1) {   //Returns index of any string entered into input field
      LI[i].setAttribute("style","display: block");
    } else {
      LI[i].setAttribute("style","display: none");
    }
    // console.log(liNames);
    // console.log(li);
  }
};

/* ------------------- EVENT HANDLERS HERE -------------------- */
//Event listener for search submit
FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  let filter = INPUT.value.toUpperCase(); //Captures the input value
  searchFilter(filter);
}, false );





// //Creates pagination link elements and numbers
// function attachPaginationLinks(i) {
//   let li = document.createElement('li');
//   let a = document.createElement('a');
//   a.textContent = i + 1;
//   li.appendChild(a);
//   let link = paginationUl.appendChild(li);
//   return link;
// };

// //Splits student list and generates link numbers dynamically
// function getNumberOfPages(arr, sizePerPage) {
//   let length = arr.length;
//   return numOfPages = Math.ceil(length / sizePerPage);
//   // for (let i = 0; i < numOfPages; i++) {
//   //   attachPaginationLinks(i);
//   // }
// };

// function loadPages(){
//   let numPerPage = 10;
//   let currentPage = 1;
//   let begin = (currentPage - 1) * numPerPage);
//   let end = begin + numPerPage;
// }



// paginationUl.addEventListener('click', (e) => {
//   if (e.target.tagName == 'A') {}
// });
