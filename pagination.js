
//DOM Reference Nodes:
const PAGE = document.querySelector('.page'); //page
const PAGEHEADER = PAGE.querySelector('.page-header'); //page-header,
const UL = document.querySelector('.student-list'); //student-list 'ul',
const LIST = UL.querySelectorAll('.student-item'); //student-item 'li',
const LISTLENGTH = LIST.length;
const SIZE = 10;
let pageNumber;
let activeLink;

/* ------------------- FUNCTIONS HERE -------------------- */
(() => {
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
  FORM.appendChild(INPUT);
  FORM.appendChild(BUTTON);
  DIV.appendChild(FORM);
  PAGEHEADER.appendChild(DIV);
})();

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

//Creates and controls pagination links
function appendPageLinks(list, studentsPerPage){
  //Determine how many pages for this student list
  const NUMOFPAGES = Math.ceil(list.length / studentsPerPage);
  //Creates pagination elements...
  let div = document.createElement('div');
  let ul = document.createElement('ul');
  div.className = 'pagination';
  let anchorTags = function () {

  }
  //Loop to generate pagination link and page number
  for (let i = 0; i < NUMOFPAGES; i++) {
    //Creates one link per iteration...
    let li = document.createElement('li');
    let a = document.createElement('a');
    //Append 'li' and 'a' tags to pagination 'ul'
    li.appendChild(a);
    ul.appendChild(li);
    div.appendChild(ul);
    //Attaches an active class on page link '1'...
    if (i === 0) {
      a.setAttribute('class','active');
      activeLink = a;
      showPage(i, LIST);
    }
      //Assigns content to links
      a.href = '#';
      a.style.cursor = 'pointer';
      a.textContent = i + 1;

    //Event listner on pagination anchor tag...
    a.addEventListener('click', (e) => {
      showPage(i, LIST);
      let currentLink = e.target;
        activeLink.removeAttribute('class');
        currentLink.setAttribute('class','active');
        activeLink = currentLink;
    }, false);
  }//END OF FOR LOOP...
  return div;
};

//Tracks starting and ending index for each page, and hides other pages
function searchList (value) {
  let input = value.toUpperCase();
  let matched = [];
  for (let i = 0; i < LIST.length; i++) {   //Outputs the students names to the console
    let name = LIST[i].querySelectorAll('.student-details h3')[0].textContent.toUpperCase();
    let email = LIST[i].querySelectorAll('.student-details .email')[0].textContent.toUpperCase();
      if (name.search(input) !== -1 || email.search(input) !== -1) {
        matched.push(LIST[i]);
      }
  };//END OF FOR LOOP...
  if (matched.length > SIZE) {
    appendPageLinks(matched, SIZE);
  } else {
    showPage(1, matched);
  }
};
  const SEARCHFORM = document.querySelector('.student-search form');
  SEARCHFORM.addEventListener('submit', (e) => {
    e.preventDefault();
    searchList(document.querySelector('input').value);
  }, false);

/* ------------------- FUNCTIONS CALLED -------------------- */
PAGE.appendChild(appendPageLinks(LIST, SIZE));
