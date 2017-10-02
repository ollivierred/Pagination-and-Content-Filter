/* ------------------- FUNCTIONS HERE -------------------- */
function searchList (filter) {
  //Create search form elements
  const DIV = document.createElement('div');
  const FORM = document.createElement('form');
  const INPUT = document.createElement('input');
  const BUTTON = document.createElement('button');

  //Assign content to elements
  DIV.className = 'student-search';
  INPUT.setAttribute("type","text");
  INPUT.setAttribute("placeholder","Search for students...");
  BUTTON.textContent = 'Search';

  //Appends form elements to the page
  PAGEHEADER.appendChild(DIV);
  DIV.appendChild(FORM);
  FORM.appendChild(INPUT);
  FORM.appendChild(BUTTON);

  // for (let i = 0; i < LI.length; i++) {   //Outputs the students names to the console
  //   let liNames = H3[i].textContent;      //Stores text content of the H3 element
  //   if (liNames.toUpperCase().indexOf(filter) > -1) {   //Returns index of any string entered into input field
  //     LI[i].style.display = '';
  //   } else {
  //     LI[i].style.display = 'none';
  //   }
  // }

  // Event listener for search submit
  FORM.addEventListener('submit', (e) => {
    e.preventDefault();
  // Captures the input value
    let filter = INPUT.value.toUpperCase();
  }, false);
};

//
function createLink(pageIndex){
  //Create elements for pagination links
  let li = document.createElement('li');
  let a = document.createElement('a');
  //Assigns content to links
  div.className = 'pagination';
  a.style.cursor = 'pointer';
  a.textContent = pageIndex + 1;
  a.href = '#';
  //Appends pagination elements to the page
  PAGE.appendChild(div);
  div.appendChild(ul);
  let anchorTag = li.appendChild(a);
  //Returns anchor tag reference node
  return anchorTag;
};

//Creates and controls pagination links
function appendPageLinks(numberOfPages){
  //Loop generates a link and page number
  let link = createLink(i);
  for (let i = 0; i < numberOfPages; i++) {
    ul.appendChild(li);
    if (i === 0) {
      link.setAttribute('class','active');
      activeLink = link;
      showPage(i, LIST);
    }
    //Event listner on A tag...
    link.addEventListener('click', (e) => {
      let currentLink = e.target;
        activeLink.removeAttribute('class');
        currentLink.setAttribute('class','active');
        activeLink = currentLink;
        showPage(i, LIST);
    }, false);
  }
};

//Tracks starting and ending index for each page, and hides other pages
function showPage(pageNumber, list) {
  //Hides the list of students
  for (let i = 0; i < LISTLENGTH; i++) {
    LIST[i].style.display = 'none';
  };

  let indexBegin = (pageNumber) * SIZE;
  let indexEnd = indexBegin + SIZE;

  for (let i = indexBegin; i < indexEnd; i++) {
    const PAGE = list[i];
    if (PAGE) {
      PAGE.style.display = 'block';
    }
  }
};

/* ------------------- FUNCTIONS CALLED -------------------- */
//DOM Reference Nodes:
//page
//page-header,
//student-list 'ul',
//student-item 'li',
//student-details 'h3' and 'span'
const PAGE = document.querySelector('.page');
const PAGEHEADER = PAGE.querySelector('.page-header');
const UL = document.querySelector('.student-list');
const LIST = UL.querySelectorAll('.student-item');
const NAME = document.querySelectorAll('.student-details h3');
const EMAIL = document.querySelectorAll('.student-details .email');

const SIZE = 10;
const LISTLENGTH = LIST.length;
let pages = Math.ceil(LIST.length / SIZE);
let pageNumber;
let activeLink;

appendPageLinks(pages);
searchList();
