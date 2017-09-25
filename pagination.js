const students = document.querySelectorAll('.student-item');
const pageHeader = document.querySelector('div.page-header');
const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';

const searchField = document.createElement('input');
searchField.type = 'text';
searchField.placeholder = 'Search for students...';

const searchButton = document.createElement('button');
searchButton.textContent = 'Search';

searchDiv.appendChild(searchField);
searchDiv.appendChild(searchButton);
pageHeader.appendChild(searchDiv);

searchButton.addEventListener('click', (e) => {
  const isClicked = e.target;
  const lis = document.querySelectorAll('div.student-details');
  for (var i = 0; i < lis.length; i++) {
    lis[i].style.backgroundColor = 'red';
  }
  console.log(lis);
});

// let students = Array.from(document.querySelectorAll('li.student-item'));
// const listLength = students.length;
// var tempArr = [];
// var c = 0;
// var size;
//
// for (let j = 0; j < listLength; j++) {
//   students[j].style.display = 'none';
// }
//
// function myFunc(arr, size) {
//   for (let i = 0; i < Math.ceil(listLength / size); i++) {
//     tempArr[i] = arr.slice(c, c + size);
//     c = c + size;
//   }
//   return tempArr;
// };
//
// myFunc(students, 10)
// console.log( 'list is ' + listLength);
