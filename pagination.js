/* ------------------- FUNCTIONS HERE -------------------- */
//Creates and appends elements related to the form and page links...
function hideList(list) {
  //Loop hides targeted list...
  for (let i = 0; i < list.length; i++) {
    list[i].style.display = 'none';
  };
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
function searchThisList (value, thisList) {
  let searchInput = value.toUpperCase();
  console.log(searchInput);
  let matched = [],
      oldPageLinks;

  if (searchInput === '') {
    showPage(0, STUDENTLIST);
    appendPageLinks(STUDENTLIST);
    return;   //Stops function from executeing on empty value...
  } else {

    oldPageLinks = PAGE.lastChild;
    PAGE.removeChild(oldPageLinks);

    for (let i = 0; i < thisList.length; i++) {   //Outputs the students names to the console
      let name = thisList[i].querySelectorAll('.student-details h3')[0].textContent.toUpperCase();
      let email = thisList[i].querySelectorAll('.student-details .email')[0].textContent.toUpperCase();
      //Searching list of student names and emails for a match...
      if (name.indexOf(searchInput) > -1 || email.indexOf(searchInput) > -1) {
        matched.push(thisList[i]);
      }
    }//END OF FOR LOOP...
    if (matched.length < PERPAGE) {
      showPage(0, matched);
    } else {
      showPage(0, matched);
      appendPageLinks(matched);
    }
  }//END OF IF, ELSE STATEMENT...
};
/*------------------------------------------------------*/
//Creates and controls pagination links
function appendPageLinks(thisList){
  //Determine how many pages for this student list
  const NUMOFPAGES = Math.ceil(thisList.length / PERPAGE);
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

  const LINKS = document.querySelectorAll('.pagination a');
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
      showPage(pageIndex, STUDENTLIST);
    }//END OF IF STATEMENT...
  }, false);
};

/* ----------------- DOM Reference Nodes ----------------- */

//Creates elements
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
// PAGE.appendChild(PAGINATIONDIV);
const PAGE = document.querySelector('.page'); //page
const PAGEHEADER = PAGE.querySelector('.page-header'); //page-header,
const STUDENTLIST = document.querySelectorAll('.student-item'); //student-item 'li',

//Appends elements to the page
FORM.appendChild(INPUT);
FORM.appendChild(BUTTON);
SEARCHDIV.appendChild(FORM);
PAGEHEADER.appendChild(SEARCHDIV);

const querySelectorAll('.student-details h3')[0].textContent.toUpperCase();
const querySelectorAll('.student-details .email')[0].textContent.toUpperCase();
const SEARCHFORM = document.querySelector('.student-search form');
const SEARCHINPUT = document.querySelector('.student-search input');
//Variables...
const PERPAGE = 10;
/* ----------------- FUNCTIONS CALLED ----------------- */
showPage(0, STUDENTLIST);
appendPageLinks(STUDENTLIST);
// Event listner on form tag...

SEARCHFORM.addEventListener('submit', (e) => {
  e.preventDefault();
  searchThisList(SEARCHINPUT.value, STUDENTLIST);
}, false);
