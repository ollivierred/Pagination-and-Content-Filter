
const ul = document.querySelector('ul.student-list');
const h3 = ul.querySelectorAll('h3');
const pageHeaderDiv = document.querySelector('div.page-header');
const pageDiv = document.querySelector('div.page');

const paginationDiv = document.createElement('div');
const paginationUl = document.createElement('ul');

const form = document.createElement('form');
const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');

paginationDiv.className = 'pagination';
searchDiv.className = 'student-search';
searchInput.type = 'text';
searchInput.placeholder = 'Search for students...';
searchButton.textContent = 'Search';

searchDiv.appendChild(form);
form.appendChild(searchInput);
form.appendChild(searchButton);
pageHeaderDiv.appendChild(searchDiv);

pageDiv.appendChild(paginationDiv);         //Appends 'div' with the class 'pagination' to page div
paginationDiv.appendChild(paginationUl);    //Appends a 'ul' to paginationDiv

/* ------------------- FUNCTIONS HERE -------------------- */

function searchFilter() {
  const filter = searchInput.value.toUpperCase();         //Converts string to uppercase, handles case sensetivity                                                        //Stores input value from input field
  for (let i = 0; i < h3.length; i++) {          //Outputs the students names to the console
    let studentNames = h3[i].textContent;           //Stores text content of the H3 element
    let li = h3[i].parentNode.parentNode;    //Parent node of h3 -> li
    if (studentNames.toUpperCase().indexOf(filter) > -1) {   //Returns index of any string entered into input field
      li.style.display = ''
    } else {
      li.style.display = 'none';
    }
    console.log(studentNames);
    console.log(li);
  }
};

//Creates pagination link elements and numbers
function attachPaginationLinks(i) {
  let li = document.createElement('li');
  let a = document.createElement('a');
  a.textContent = i + 1;
  li.appendChild(a);
  let link = paginationUl.appendChild(li);
  return link;
};

//Splits student list and generates link numbers dynamically
function getNumberOfPages(arr, sizePerPage) {
  let length = arr.length;
  return numOfPages = Math.ceil(length / sizePerPage);
  // for (let i = 0; i < numOfPages; i++) {
  //   attachPaginationLinks(i);
  // }
};

function loadPages(){
  let numPerPage = 10;
  let currentPage = 1;
  let begin = (currentPage - 1) * numPerPage);
  let end = begin + numPerPage;

  
}

/* ------------------- EVENT HANDLERS HERE -------------------- */
form.addEventListener('submit', (e) => {    //Event listener for search click
  e.preventDefault();
  const isClicked = e.target;               //Stores event refernce -> submit
  searchFilter();
});

paginationUl.addEventListener('click', (e) => {
  if (e.target.tagName == 'A') {}
});
