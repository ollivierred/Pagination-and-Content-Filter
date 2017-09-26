

const students = document.getElementsByTagName('h3');
const pageHeader = document.querySelector('div.page-header');
const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';

const form = document.createElement('form');
const searchField = document.createElement('input');
searchField.type = 'text';
searchField.placeholder = 'Search for students...';
const searchButton = document.createElement('button');
searchButton.textContent = 'Search';

searchDiv.appendChild(form);
form.appendChild(searchField);
form.appendChild(searchButton);
pageHeader.appendChild(searchDiv);



//Event listener for search click
form.addEventListener('submit', (e) => {
  e.preventDefault();

  function search() {
    // Declare variables
    //Stores event refernce -> submit
    const isClicked = e.target;
    //Stores input value from input field
    //Converts string to uppercase, handles case sensetivity
    const filter = searchField.value.toUpperCase();

    //Outputs the students names to the console
    for (let j = 0; j < students.length; j++) {
      //Stores text content of the H3 element
      //Converts string to uppercase, handles case sensetivity
      let listNames = students[j].textContent;
      //Parent node of h3 -> li
      let listLi = students[j].parentNode.parentNode;
      //Main part of filter***********
      if (listNames.toUpperCase().indexOf(filter) > -1) {
        listLi.style.display = ''
      } else {
        listLi.style.display = 'none';
      }
      // console.log(filter);
      // console.log(listNames);
      // console.log(listLi);
    }
  };
});
// console.log(students);

// function myFunc(arr, size) {
//   for (let i = 0; i < Math.ceil(listLength / size); i++) {
//     tempArr[i] = arr.slice(c, c + size);
//     c = c + size;
//   }
//   return tempArr;
// };
//
// myFunc(students, 10)
