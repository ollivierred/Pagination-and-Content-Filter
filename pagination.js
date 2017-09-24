let students = Array.from(document.querySelectorAll('li.student-item'));
const listLength = students.length;
var pageList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var chunk = 10;
var temp;

for (let j = 0; j < listLength; j++) {
  students[j].style.display = 'none';
}


function myFunc() {
  for (let i = 0; i < listLength; i += chunk) {
    temp = students.slice(i, i + chunk);
    return temp;
  }
};

console.log(myFunc());
console.log( 'list is ' + listLength);
