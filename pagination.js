
const studentList = Array.from(document.getElementsByTagName('h3'));
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
     //Appends a 'li' the 'ul'




form.addEventListener('submit', (e) => {    //Event listener for search click
  e.preventDefault();
  const isClicked = e.target;               //Stores event refernce -> submit
  searchFilter();
});


function searchFilter() {
  const filter = searchInput.value.toUpperCase();         //Converts string to uppercase, handles case sensetivity
                                                          //Stores input value from input field
  for (let j = 0; j < studentList.length; j++) {          //Outputs the students names to the console
    let listNames = studentList[j].textContent;           //Stores text content of the H3 element
    let listLi = studentList[j].parentNode.parentNode;    //Parent node of h3 -> li
    if (listNames.toUpperCase().indexOf(filter) > -1) {   //Returns index any string entered into input field
      listLi.style.display = ''
    } else {
      listLi.style.display = 'none';
    }
    // console.log(filter); // console.log(listNames); // console.log(listLi);
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
function pageGenerator(arr, size) {
  const arrLength = arr.length;
  let arrGroups = [];

  for (let i = 0; i < arrLength; i += size) {
    pages = arr.slice(i , i + size);
    arrGroups.push(pages);
  }
  let numOfPages = arrGroups.length;

  for (let i = 0; i < numOfPages; i++) {
    attachPaginationLinks(i);
  }
  return arrGroups;
};


pagination = pageGenerator(studentList, 10);
console.log(pagination);
// console.log(attachPaginationLinks());
