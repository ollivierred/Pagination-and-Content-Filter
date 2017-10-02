/* ------------------- FUNCTIONS HERE -------------------- */
function listHidden(list) {
  for (let i = 0; i < list.length; i++) {
    list[i].style.display = 'none';
  };
};
function showPage(pageNumber, list) {
  //Hides the list of students
  listHidden(LIST);

  let indexBegin = (pageNumber) * SIZE;
  let indexEnd = indexBegin + SIZE;

  for (let i = indexBegin; i < indexEnd; i++) {
    const PAGE = list[i];
    if (PAGE) {
      PAGE.style.display = 'block';
    }
  }
};

//Tracks starting and ending index for each page, and hides other pages
function searchList (studentName, studentEmail, listLength, filter) {
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
/*--------------------------------------------*/
  FORM.addEventListener('keyup', (e) => {
    e.preventDefault();
    // Captures the input value

    let match = [];
    let filter = INPUT.value.toUpperCase();

    for (let i = 0; i < listLength; i++) {   //Outputs the students names to the console
      let names = studentName[i].textContent;
      let emails = studentEmail[i].textContent;
      // console.log(names);
      //names.toUpperCase().search(filter) > -1 || emails.toUpperCase().search(filter) > -1
      //Returns index of any string entered into input field
      if (names.toUpperCase().search(filter) !== -1 || emails.toUpperCase().search(filter) !== -1) {
        match.push(names);
        console.log(match);
      }
      if (match.length !== 0) {
      }
    }
  }, false);
};

//Creates and controls pagination links
function appendPageLinks(studentList, studentsPerPage){
  //Determine how many pages for this student list
  const PAGES = Math.ceil(studentList.length / studentsPerPage);
  let div = document.createElement('div');
  let ul = document.createElement('ul');
  div.appendChild(ul);
  PAGE.appendChild(div);

  function createLink(index) {
    //Create elements for pagination links
    let li = document.createElement('li');
    let a = document.createElement('a');
    //Assigns content to links
    div.className = 'pagination';
    a.style.cursor = 'pointer';
    a.textContent = index + 1;
    a.href = '#';
    //Append 'li' and 'a' tags to pagination 'ul'
    ul.appendChild(li);
    li.appendChild(a);
    return a;
  };

  //Loop to generate pagination link and page number
  for (let i = 0; i < PAGES; i++) {
    //Creates one link per loop rotation
    let anchorTag = createLink(i);
    //Attaches an active class on page link '1'...
    if (i === 0) {
      showPage(i, LIST);
      anchorTag.setAttribute('class','active');
      activeLink = anchorTag;
    }
    //Event listner on pagination anchor tag...
    anchorTag.addEventListener('click', (e) => {
      let currentLink = e.target;
        showPage(i, LIST);
        activeLink.removeAttribute('class');
        currentLink.setAttribute('class','active');
        activeLink = currentLink;
    }, false);
  }
};

/* ----------------------------------------------- */
//DOM Reference Nodes:
const PAGE = document.querySelector('.page'); //page
const PAGEHEADER = PAGE.querySelector('.page-header'); //page-header,
const UL = document.querySelector('.student-list'); //student-list 'ul',
const LIST = UL.querySelectorAll('.student-item'); //student-item 'li',
const NAME = document.querySelectorAll('.student-details h3'); //student-details 'h3'
const EMAIL = document.querySelectorAll('.student-details .email'); //student-details 'span'
const LISTLENGTH = LIST.length;
const SIZE = 10;
let pageNumber;
let activeLink;
/* ------------------- FUNCTIONS CALLED -------------------- */
appendPageLinks(LIST, SIZE);
searchList(NAME, EMAIL, LISTLENGTH);
