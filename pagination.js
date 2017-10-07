/* ------------------- DECLARED FUNCTIONS HERE -------------------- */
//Will hide any list arguement passed through it
function hideList(thisList) {
  //Loop hides targeted list...
  $(thisList).hide();
};

//Removes pagination links...
function removeOldLinks(pageNode) {
  let oldLinks = $('pageNode.pagination');
  if (oldLinks === null) {
    return;
  } else {
    pageNode.remove(oldLinks);
  }
};

//Removes message node from page
function removeMessage() {
  let messageNode = document.querySelector('.error');
  if (messageNode) { PAGE.removeChild(messageNode); }
};

//Generates error message for output...
function noMatchFound() {
  let messageCheck = document.querySelector('.error');
  if (messageCheck === null) {
    hideList(STUDENTLIST);
    let span = document.createElement('span');
    span.className = 'error';
    span.textContent = "Whoops, no match found...";
    PAGE.appendChild(span);
  } else {
    return;
  }
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
    if (thisPage) { thisPage.style.display = 'block'; }
  };
};

/*------------------------------------------------------*/
//Calculate number of pages based on list length
//Creates and appends pagination links
//Assigns a page number to each link
//Appends the pagination to the page
function appendPageLinks(thisList) {
  //Determine how many pages for this student list
  const NUMOFPAGES = Math.ceil(thisList.length / PERPAGE);
  //Creates pagination elements...
  let page = PAGE,
      div = document.createElement('div'),
      ul = document.createElement('ul'),
      li, a;
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
  };
  div.append(ul);
  div.className = 'pagination';
  page.append(div);
  //Event handlder attached to ul of pagination.
  linkWasClicked(ul, thisList);
};

/*------------------------------------------------------*/
//Controls actions when list is filtered...
function searchThisList (inputValue, thisList) {
  let searchInput = inputValue.toUpperCase();
  let matched = [];
  //NICE TRY, NO EMPTY STRINGS TODAY!
  if (searchInput === '') {
    removeMessage();
    removeOldLinks(PAGE);
    showPage(0, STUDENTLIST);
    appendPageLinks(STUDENTLIST);
    return; //Not sure if this best practice...
  } else {
    for (let i = 0; i < thisList.length; i++) {
      let name = thisList[i].querySelectorAll('.student-details h3')[0].textContent.toUpperCase();
      let email = thisList[i].querySelectorAll('.student-details .email')[0].textContent.toUpperCase();
      //Searching list of student names and emails for a match...
      if (name.indexOf(searchInput) > -1 || email.indexOf(searchInput) > -1) {
        matched.push(thisList[i]);
      };
    };
    removeOldLinks(PAGE);
    if (matched.length > PERPAGE) {
      removeMessage();
      showPage(0, matched);
      appendPageLinks(matched);
    } else if (matched.length === 0) {
      //Error message
      noMatchFound();
    } else {
      removeMessage();
      showPage(0, matched);
    }
  };
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
        };
      };
      /*------------------------------------------*/
      //Retrieves the page number of current link
      //ParseInt converts it to an integer
      //Subtracts 1 since the index starts at 0.
      let pageIndex = parseInt(currentLink.textContent) - 1;
      showPage(pageIndex, thisList);
    };
  }, false);
};

/* ----------------- DOM Reference Nodes ----------------- */

const PAGE = $('div.page');
const PAGEHEADER = $('div.page-header');
const STUDENTLIST = $('li.student-item');
//Creates elements...
let $paginationDiv = $('<div class="student-search"></div>');
let $paginationForm = $('<form class="search-form"><input type="text" placeholder="Search for students..."><button>Search</button></form>');
//Appends elements to the page
$paginationDiv.append($paginationForm);
PAGEHEADER.append($paginationDiv);

//Global Variables...
const PERPAGE = 10;

/* ----------------- FUNCTIONS CALLED ----------------- */
showPage(0, STUDENTLIST);
appendPageLinks(STUDENTLIST);

//Event listener on form element...
$('.search-form').on('submit', (e) => {
  e.preventDefault();
  let $searchValue = $('input:text').val();
  // console.log(searchValue);
  // searchThisList($searchValue, STUDENTLIST);
});
