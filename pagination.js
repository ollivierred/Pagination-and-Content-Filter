
/* Targets and stores: page-header, student-list UL, student-item LI,
and H3 element in student-item */
const PAGE = document.querySelector('.page');
const PAGEHEADER = PAGE.querySelector('.page-header');
const UL = document.querySelector('.student-list');
const LI = UL.querySelectorAll('.student-item');
const H3 = document.querySelectorAll('.student-item > .student-details > h3');

//Create div container of form element
const DIV = document.createElement('div');
DIV.className = 'student-search';
PAGEHEADER.appendChild(DIV);

//Create div container of pagination Ul
const PAGINATION = document.createElement('div');
PAGINATION.className = 'pagination';
PAGE.appendChild(PAGINATION);

//Create div container of pagination Ul
const PAGINATIONUL = document.createElement('ul');
PAGINATION.appendChild(PAGINATIONUL);

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


/* ------------------- FUNCTIONS HERE -------------------- */

function appendPageLinks(list, size){
  const SIZE = size;
  let numOfPages = Math.ceil(list.length / SIZE);
  for (let i = 0; i < numOfPages; i++) {
    const PAGINATIONLI = document.createElement('li');
    const LINK = document.createElement('a');
    LINK.style.cursor = 'pointer';
    LINK.href = '#';
    LINK.textContent = i + 1;
    PAGINATIONLI.appendChild(LINK);
    PAGINATIONUL.appendChild(PAGINATIONLI);
  };
  console.log('Number of pages: ' + numOfPages);
  console.log(UL);
};
appendPageLinks(LI, 10);


function showPage(){
  let div = document.querySelector('.pagination');
  let ul = div.querySelector('ul');
  let links = ul.querySelectorAll('a');

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', (e) => {
      let current = e.target;
      let size = 10;
      for (let j = 0; j < size; j++) {
        if (current === links[0]) {
          LI[j].style.display = "block";
        } else if (current === links[1]) {
          LI[j].style.display = "none";
        } else if (current === links[2]) {
          LI[j].style.display = "none";
        } else {
          LI[j].style.display = "";
        }
      }
    }, false);
  }
};
showPage();


function searchList (filter) {
  console.log(filter);
  for (let i = 0; i < LI.length; i++) {   //Outputs the students names to the console
    let liNames = H3[i].textContent;      //Stores text content of the H3 element
    if (liNames.toUpperCase().indexOf(filter) > -1) {   //Returns index of any string entered into input field
      LI[i].style.display = '';
    } else {
      LI[i].style.display = 'none';
    }
    // console.log(liNames);
    // console.log(li);
  }
};

/* ------------------- FUNCTIONS HERE -------------------- */
//Hides the list of students
for (let i = 0; i < LI.length; i++) {
  LI[i].style.display = 'none';
}

//Event listener for search submit
FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  let filter = INPUT.value.toUpperCase(); //Captures the input value
  searchList(filter);
}, false);
