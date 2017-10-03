


/* ------------------- FUNCTIONS HERE -------------------- */

//Hides the list of students
function hidePage(listToHide){
  for (let i = 0; i < listToHide.length; i++) {
    listToHide[i].style.display = 'none';
  };
};
//Shows list as pages of 10...
function showPage(pageNumber, listName) {
  hidePage(LIST);
  let indexBegin = (pageNumber) * SIZE;
  let indexEnd = indexBegin + SIZE;
  for (let i = indexBegin; i < indexEnd; i++) {
    const PAGE = listName[i];
    if (PAGE) {
      PAGE.style.display = 'block';
    }
  }
};
//Creates and appends elements related to the form and page links...
function appendElements() {
  //Create search form elements
  const SEARCHDIV = document.createElement('div');
  // const PAGINATIONDIV = document.createElement('div');
  const FORM = document.createElement('form');
  const INPUT = document.createElement('input');
  const BUTTON = document.createElement('button');
  //Assign content to elements
  // PAGINATIONDIV.className = 'pagination';
  SEARCHDIV.className = 'student-search';
  INPUT.setAttribute("type","text");
  INPUT.setAttribute("placeholder","Search for students...");
  BUTTON.textContent = 'Search';
  //Appends form elements to the page
  FORM.appendChild(INPUT);
  FORM.appendChild(BUTTON);
  SEARCHDIV.appendChild(FORM);
  PAGEHEADER.appendChild(SEARCHDIV);
  // PAGE.appendChild(PAGINATIONDIV);
  return FORM;
};
//Creates 'li' and 'a' pagination elements...
function createLi(index) {
  let li = document.createElement('li');
  let a = document.createElement('a');
  //Assigns content to links
  a.style.cursor = 'pointer';
  a.textContent = index + 1;
  a.href = '#';
  //Append 'a' to 'li', then each 'li' to the unordered list...
  li.appendChild(a);
  if (index === 0) {
    //Attaches an active class on page link '1'...
    a.setAttribute('class','active');
    activeLink = a;
  }
  // // Event listner on pagination anchor tag...
  // a.addEventListener('click', (e) => {
  //   showPage(i, LIST);
  //   let currentLink = e.target;
  //     activeLink.removeAttribute('class');
  //     currentLink.setAttribute('class','active');
  //     activeLink = currentLink;
  // }, false);
  return li;
}//END OF FUNCTION...
//Creates and controls pagination links
function appendPageLinks(list){
    //Creates pagination elements...
    let div = document.createElement('div');
    let ul = document.createElement('ul');
    div.className = 'pagination';
    //Determine how many pages for this student list
    const NUMOFPAGES = Math.ceil(list.length / SIZE);
    //Loop to generate pagination link and page number
    for (let i = 0; i < NUMOFPAGES; i++) {
      //Creates one link per iteration...
      //Append 'li' and 'a' tags to pagination 'ul'
      ul.appendChild(createLi(i));
    }//END OF LOOP...
  div.appendChild(ul);
  return div;
};

//Tracks starting and ending index for each page, and hides other pages
function searchThisList (value) {
  pageLinks = document.querySelector('.pagination');
  let input = value.toUpperCase();
  let matched = [];
  if (input !== '') {
    for (let i = 0; i < LIST.length; i++) {   //Outputs the students names to the console
      let name = LIST[i].querySelectorAll('.student-details h3')[0].textContent.toUpperCase();
      let email = LIST[i].querySelectorAll('.student-details .email')[0].textContent.toUpperCase();
      //Searching list of student names and emails for a match...
      if (name.search(input) !== -1 || email.search(input) !== -1) {
        matched.push(LIST[i]);
      }
    };//END OF FOR LOOP...
  } else {
    alert('ENTER SOMETHING FFS!');
    return false;
  }//END OF IF, ELSE LOOP...
  if (matched.length > SIZE) {
    PAGE.removeChild(pageLinks);
    appendPageLinks(matched);
  } else {
    showPage(0, matched);
  }
};
/* ------------------- FUNCTIONS CALLED -------------------- */
//DOM Reference Nodes:
const PAGE = document.querySelector('.page'); //page
const PAGEHEADER = PAGE.querySelector('.page-header'); //page-header,
const LIST = document.querySelectorAll('.student-item'); //student-item 'li',
const LISTLENGTH = LIST.length;
const SIZE = 10;
let pageNumber;
let activeLink;

appendElements();
showPage(0, LIST);
appendPageLinks(LIST);

// const PAGINATION = document.querySelector('.pagination');
// console.log(PAGINATION);
PAGE.appendChild(appendPageLinks(LIST));

const PAGINATION = document.querySelector('.pagination ul');
// const PAGELINKS = document.querySelectorAll()
console.log(PAGINATION);
//Event listner on pagination anchor tag...
PAGINATION.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    let currentLink = e.target;
    console.log(currentLink);
    // showPage(i, LIST);
    if (currentLink.className === 'active') {
      console.log('It is active');
      // currentLink.removeAttribute('class');
      // currentLink.setAttribute('class','active');
      // activeLink = currentLink;
    }//END OF IF STATEMENT...
  }//END OF IF STATEMENT...
}, false);

const SEARCHFORM = document.querySelector('.student-search form');
SEARCHFORM.addEventListener('submit', (e) => {
  e.preventDefault();
  searchThisList(document.querySelector('input').value, e);
}, false);
