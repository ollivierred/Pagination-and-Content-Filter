/* ------------------- DECLARED FUNCTIONS HERE -------------------- */
function hideList(thisList) {
  //Loop hides targeted list...
  for (let i = 0; i < thisList.length; i++) {
    thisList[i].style.display = 'none';
  };
};
function removeOldLinks(pageNode) {
  let oldLinks;
  oldLinks = pageNode.lastChild;
  pageNode.removeChild(oldLinks);
};
/*------------------------------------------------------*/
//Shows STUDENTLIST as pages of 10...
function showPage(thePageNum, thisList) {
  hideList(STUDENTLIST);
  //Separates pages by start and ending index...
  let indexBegins = (thePageNum) * PERPAGE;
  let indexEnds = indexBegins + PERPAGE;
  for (let i = indexBegins; i < indexEnds; i++) {
    let thisPage = thisList[i];
    if (thisPage) {
      thisPage.style.display = 'block';
    }//END OF IF STATEMENT...
  }//END OF FOR LOOP...
};//END OF FUNCTION
/*------------------------------------------------------*/
//Creates pagination links...
function appendPageLinks(thisList){
  //Determine how many pages for this student list
  const NUMOFPAGES = Math.ceil(thisList.length / PERPAGE);
  //Creates pagination elements...
  let page = PAGE,
      div = document.createElement('div'),
      ul = document.createElement('ul'),
      li, a, activeLink;
  //Creates one link per iteration...
  for (let i = 0; i < NUMOFPAGES; i++) {
    let li = document.createElement('li');
    let a = document.createElement('a');
        a.style.cursor = 'pointer'; //Assigns content to links
        a.textContent = i + 1; //Adds page number to link...
        a.href = '#';
    //Append 'a' to 'li', then each 'li' to the unordered list...
    li.appendChild(a);
    ul.appendChild(li);
    //Attaches an active class on page link '1'...
    if (i === 0) { a.setAttribute('class','active'); }
  }//END OF LOOP...
  div.appendChild(ul);
  div.className = 'pagination';
  page.appendChild(div);
  //Event handlder attached to ul of pagination.
  linkWasClicked(ul, thisList);
};
/*------------------------------------------------------*/
//Controls actions when list is filtered...
function searchThisList (inputValue, thisList) {
  let searchInput = inputValue.toUpperCase();
  let matched = [];
  if (searchInput === '') {
    removeOldLinks(PAGE);
    showPage(0, STUDENTLIST);
    appendPageLinks(STUDENTLIST);
    return;   //Stops function from executeing on empty value...
  } else {
    for (let i = 0; i < thisList.length; i++) {   //Outputs the students names to the console
      let name = thisList[i].querySelectorAll('.student-details h3')[0].textContent.toUpperCase();
      let email = thisList[i].querySelectorAll('.student-details .email')[0].textContent.toUpperCase();
      //Searching list of student names and emails for a match...
      if (name.indexOf(searchInput) > -1 || email.indexOf(searchInput) > -1) { matched.push(thisList[i]); }
    }//END OF FOR LOOP...
    removeOldLinks(PAGE);
    if (matched.length < PERPAGE) {
      showPage(0, matched);
    } else {
      showPage(0, matched);
      appendPageLinks(matched);
    }//END OF IF, ELSE STATEMENT...
  }//END OF IF, ELSE STATEMENT...
};
/*------------------------------------------------------*/
//Controls pagination links...
function linkWasClicked(parentNode, thisList) {
  parentNode.addEventListener('click', (e) => {
    //Only executes if event is an 'a' tag...
    if (e.target.tagName === 'A') {
      //Stores targeted node -> 'a' tag
      let LINKS = document.querySelectorAll('.pagination a');
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
      showPage(pageIndex, thisList);
    }//END OF IF STATEMENT...
  }, false);
};//END OF FUNCTION...

/* ----------------- DOM Reference Nodes ----------------- */
//Creates elements...
const SEARCHDIV = document.createElement('div');
const FORM = document.createElement('form');
const INPUT = document.createElement('input');
const BUTTON = document.createElement('button');
//Assign content to elements
SEARCHDIV.className = 'student-search';
INPUT.setAttribute("type","text");
INPUT.setAttribute("placeholder","Search for students...");
BUTTON.textContent = 'Search';
//Captures HTML page related elements...
const PAGE = document.querySelector('.page'); //page
const PAGEHEADER = PAGE.querySelector('.page-header'); //page-header,
const STUDENTLIST = document.querySelectorAll('.student-item'); //student-item 'li',
//Appends elements to the page
FORM.appendChild(INPUT);
FORM.appendChild(BUTTON);
SEARCHDIV.appendChild(FORM);
PAGEHEADER.appendChild(SEARCHDIV);
//Captures HTML search related nodes...
const SEARCHFORM = document.querySelector('.student-search form');
const SEARCHINPUT = document.querySelector('.student-search input');
//Global Variables...
const PERPAGE = 10;
/* ----------------- FUNCTIONS CALLED ----------------- */
showPage(0, STUDENTLIST);
appendPageLinks(STUDENTLIST);

SEARCHFORM.addEventListener('submit', (e) => {
  e.preventDefault();
  searchThisList(SEARCHINPUT.value, STUDENTLIST);
}, false);
