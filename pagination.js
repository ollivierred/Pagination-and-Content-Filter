/* ------------------- FUNCTIONS HERE -------------------- */
//Creates and appends elements related to the form and page links...
function createElements() {
  //Create search form elements
  // const PAGINATIONDIV = document.createElement('div');
  const SEARCHDIV = document.createElement('div');
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
/*------------------------------------------------------*/
//Shows list as pages of 10...
function showPage(pageNum, listName) {
  //Loop hides targeted list...
  for (let i = 0; i < listName.length; i++) {
    listName[i].style.display = 'none';
  };
  //Separates pages by start and ending index...
  let indexBegin = (pageNum) * SIZE;
  let indexEnd = indexBegin + SIZE;
  for (let i = indexBegin; i < indexEnd; i++) {
    const PAGETOSHOW = listName[i];
    if (PAGETOSHOW) {
      PAGETOSHOW.style.display = 'block';
    }//END OF IF STATEMENT...
  }//END OF FOR LOOP...
};//END OF FUNCTION
/*------------------------------------------------------*/
function searchThisList (value) {
  let input = value.toUpperCase();
  let matched = [];
  if (input === '') {
    //Stops function from executeing on empty value...
    return;
  } else {
    for (let i = 0; i < LIST.length; i++) {   //Outputs the students names to the console
      let name = LIST[i].querySelectorAll('.student-details h3')[0].textContent.toUpperCase();
      let email = LIST[i].querySelectorAll('.student-details .email')[0].textContent.toUpperCase();
      //Searching list of student names and emails for a match...
      if (name.search(input) > -1 || email.search(input) > -1) {
        matched.push(LIST[i]);
      }
    }//END OF FOR LOOP...
    if (matched.length < SIZE) {
      showPage(0, matched);
    } else {
      appendPageLinks(matched);
    }
  }//END OF IF, ELSE STATEMENT...
};
/*------------------------------------------------------*/
//Creates and controls pagination links
function appendPageLinks(list){
  //Determine how many pages for this student list
  const NUMOFPAGES = Math.ceil(list.length / SIZE);
  //Creates pagination elements...
  let page = PAGE,
      div = document.createElement('div'),
      ul = document.createElement('ul'),
      li,
      a,
      activeLink;
  //Creates one link per iteration...
  for (let i = 0; i < NUMOFPAGES; i++) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    //Assigns content to links
    a.style.cursor = 'pointer';
    //Adds page number to link...
    a.textContent = i + 1;
    a.href = '#';
    //Append 'a' to 'li', then each 'li' to the unordered list...
    li.appendChild(a);
    ul.appendChild(li);
    if (i === 0) {
      //Attaches an active class on page link '1'...
      a.setAttribute('class','active');
      activeLink = a;
      //Append 'li' and 'a' tags to pagination 'ul'
    }
  }//END OF LOOP...
  div.appendChild(ul);
  div.className = 'pagination';
  page.appendChild(div);

  const LINKS = document.querySelectorAll('a');
  //Event handlder attached to ul of pagination.
  ul.addEventListener('click', (e) => {
    //Only executes if event is an 'a' tag...
    if (e.target.tagName === 'A') {
      //Stores targeted node -> 'a' tag
      let currentLink = e.target;
      if (currentLink.className !== 'active') {
        for (let i = 0; i < LINKS.length; i++) {
          //Loops through all page links, and removes the class 'active'
          LINKS[i].removeAttribute('class');
          //Sets current link stored to 'active'
          currentLink.setAttribute('class','active');
        }//END OF FOR LOOP...
      }//END OF IF STATEMENT...
      /*------------------------------------------*/
      //Retrieves the page number of current link
      //ParseInt converts it to an integer
      //Subtracts 1 since the index starts at 0.
      let pageIndex = parseInt(currentLink.textContent) - 1;
      showPage(pageIndex, LIST);
    }//END OF IF STATEMENT...
  }, false);
};

/* ----------------- DOM Reference Nodes ----------------- */
const PAGE = document.querySelector('.page'); //page
const PAGEHEADER = PAGE.querySelector('.page-header'); //page-header,
const LIST = document.querySelectorAll('.student-item'); //student-item 'li',
const SIZE = 10;
/* ----------------- FUNCTIONS CALLED ----------------- */
createElements();
showPage(0, LIST);
appendPageLinks(LIST);
// Event listner on form tag...
const SEARCHFORM = document.querySelector('.student-search form');
SEARCHFORM.addEventListener('submit', (e) => {
  e.preventDefault();
  searchThisList(document.querySelector('input').value);
}, false);
