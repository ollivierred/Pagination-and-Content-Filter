
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


function appendPageLinks(list){
  const SIZE = 10;
  let numOfPages = Math.ceil(list.length / SIZE);
  for (let i = 0; i < numOfPages; i++) {
    const PAGINATIONLI = document.createElement('li');
    const LINK = document.createElement('a');
    LINK.style.cursor = 'pointer';
    LINK.textContent = i + 1;
    PAGINATIONLI.appendChild(LINK);
    PAGINATIONUL.appendChild(PAGINATIONLI);
  };
  console.log('Number of pages: ' + numOfPages);
  console.log(UL);
};
appendPageLinks(LI);



function showPage(pageNum){
  let div = document.querySelector('.pagination');
  let ul = div.querySelector('ul');
  let list = ul.querySelectorAll('li');
  ul.addEventListener('click', (e) => {
    if (e.target.tagName == 'A') {
      let link = e.target;
      link.classList.toggle('active');
      console.log(link);
    }
  }, false);
};
showPage();


/* ------------------- FUNCTIONS HERE -------------------- */
function searchList (filter) {
  console.log(filter);
  for (let i = 0; i < LI.length; i++) {    //Outputs the students names to the console
    let liNames = H3[i].textContent;  //Stores text content of the H3 element
    if (liNames.toUpperCase().indexOf(filter) > -1) {   //Returns index of any string entered into input field
      LI[i].style.display = '';
    } else {
      LI[i].style.display = 'none';
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
  searchList(filter);
}, false);





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
