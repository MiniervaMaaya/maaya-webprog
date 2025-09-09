// // // // 

// // // const student1Grade = 85;
// // // const studetn2Grade = 92;
// // // const student3Grade = 78;

// // // const grades = [85, 92, 78, 96, 88];
// // // console.log(grades);

// // // console.log("=== ARRAYAS ===");

// // // const friends = ["Michael", "Lilo", "kimchi"];
// // // console.log(friends);

// // // const mixed = ["Dana", 27, true, friends];
// // // console.log(mixed);

// // // const years = new Array(1991, 1984, 2008, 2020);
// // // console.log(years);

// // // console.log(friends[0]);
// // // console.log(friends[1]); 
// // // console.log(friends[2]);

// // // console.log(friends.length);
// // // console.log(friends[friends.length - 1]);
// // // friends[2] = "chamy";
// // // console.log(friends);

// // // const firstName ="Dana";
// // // const dana = [firstName, "Maaya", 2037 - 1991, "teacher", friends];
// // // console.log(dana);

// // // const calAge = function (birthYear) {
// // //     return 2037 - birthYear;
// // // }
// // // const ages = [calAge(1991), calAge(1984), calAge(2008), calAge(2020)];
// // // console.log(ages);
// // // const newlength = friends.push("Jay");
// // // console.log(friends);
// // // console.log(newlength);

// // // friends.unshift("John");
// // // console.log(friends);

// // // const popped = friends.pop();
// // // console.log(popped);

// // // console.log(friends);

// // // const shifted = friends.shift();
// // // console.log(shifted);

// // // console.log(friends);

// // // console.log(friends.indexOf("Steven")); 
// // // console.log(friends.indexOf("Bob")); 

// // // console.log(friends.includes("Steven"));
// // // console.log(friends.includes("Bob")); 

// // // for (let i = 0; i < friends.length; i++) {
// // //     console.log(friends[i]);    
// // // }

// // // friends.forEach(function(friend, index) {
// // //     console.log(`${friend} is friend number ${index + 1}`);
// // // });

// // // friends.forEach((friend, index) => {
// // //     console.log(`${friend} is friend number ${index + 1}`);
// // // });


// // // Coding Challenge #2 - Student Grade Manager

// // const grades = [78, 85, 92, 67, 88, 95, 73, 82];

// // // Function to calculate average
// // function calculateAverage(grades) {
// //   let sum = 0;
// //   for (let grade of grades) {
// //     sum += grade;
// //   }
// //   return sum / grades.length;
// // }

// // // Function to find highest grade
// // function findHighestGrade(grades) {
// //   let highest = grades[0];
// //   for (let grade of grades) {
// //     if (grade > highest) {
// //       highest = grade;
// //     }
// //   }
// //   return highest;
// // }

// // // Function to find lowest grade
// // function findLowestGrade(grades) {
// //   let lowest = grades[0];
// //   for (let grade of grades) {
// //     if (grade < lowest) {
// //       lowest = grade;
// //     }
// //   }
// //   return lowest;
// // }

// // // Function to count passing students
// // function countPassing(grades, passingGrade) {
// //   let count = 0;
// //   for (let grade of grades) {
// //     if (grade >= passingGrade) {
// //       count++;
// //     }
// //   }
// //   return count;
// // }

// // // Generate complete report
// // const number= calculateAverage(grades);
// // const highest = findHighestGrade(grades);
// // const lowest = findLowestGrade(grades);
// // const passing = countPassing(grades, 70);

// // console.log("=== GRADE REPORT ===");
// // console.log(`Average: ${number.toFixed(2)}`);
// // console.log(`Highest: ${highest}`);
// // console.log(`Lowest: ${lowest}`);
// // console.log(`Passing students: ${passing} out of ${grades.length}`);

// const jonasArray = [
//   "Jonas",
//   "Schmedtmann",
//   2037 - 1991,
//   "teacher",
//   ["Michael", "Peter", "Steven"],
// ];

// console.log(jonasArray[0]); // What is this? firstName?
// console.log(jonasArray[1]); // lastName?
// console.log(jonasArray[2]);

// console.log("=== OBJECTS ===");

// // Object literal syntax - curly braces create objects
// const jonas = {
//   firstName: "Jonas", // property: string value
//   lastName: "Schmedtmann", // property: string value
//   age: 2037 - 1991, // property: calculated value
//   job: "teacher", // property: string value
//   friends: ["Michael", "Peter", "Steven"], // property: array value
// };
// console.log(jonas);

// // Dot notation - clean and readable
// console.log(jonas.firstName); // 'Jonas'
// console.log(jonas.lastName); // 'Schmedtmann'
// console.log(jonas.age); // 46
// console.log(jonas.job); // 'teacher'
// console.log(jonas.friends);

// const nameKey = "Name";
// console.log(jonas["first" + nameKey]); // 'Jonas'
// console.log(jonas["last" + nameKey]); 

// jonas.job = "programmer";
// jonas["age"] = 35;
// console.log(jonas);


// // Objects can grow - add properties after creation
// jonas.location = "Portugal";
// jonas["twitter"] = "@jonasschmedtman";
// jonas.hasDriversLicense = true;
// console.log(jonas);

// const listOfYears = [1991, 1984, 2008, 2020];
// const shoppingList = ["apples", "bananas", "milk", "bread"];
// const testScores = [85, 92, 78, 96];

// // Named, descriptive data - think entities
// const person = {
//   name: "Jonas",
//   age: 46,
//   occupation: "teacher",
// };

// const car = {
//   brand: "Toyota",
//   model: "Camry",
//   year: 2020,
//   color: "blue",
// };

// // Objects can contain arrays, arrays can contain objects
// const student = {
//   name: "Sarah",
//   grades: [85, 92, 78], // Array inside object
//   address: {
//     // Object inside object
//     street: "123 Main St",
//     city: "New York",
//   },
// };

// console.log(student.grades[0]); // 85
// console.log(student.address.city);


// const jonas = {
//   firstName: "Jonas",
//   lastName: "Schmedtmann",
//   birthYear: 1991,
//   job: "teacher",
//   friends: ["Michael", "Peter", "Steven"],
//   hasDriversLicense: true,

//   // Method - function inside object
//   calcAge: function (birthYear) {
//     return 2037 - birthYear;
//   },
// };

// // Call methods using dot notation
// console.log(jonas.calcAge(1991)); // 46
// console.log(jonas.calcAge(jonas.birthYear));

// const jonasAdvanced = {
//   firstName: "Jonas",
//   lastName: "Schmedtmann",
//   birthYear: 1991,
//   job: "teacher",
//   friends: ["Michael", "Peter", "Steven"],
//   hasDriversLicense: true,

//   calcAge: function () {
//     this.age = 2037 - this.birthYear; // Store result as new property
//     return this.age;
//   },

//   getSummary: function () {
//     return `${this.firstName} is a ${this.calcAge()}-year old ${
//       this.job
//     }, and he has ${this.hasDriversLicense ? "a" : "no"} driver's license.`;
//   },
// };

// console.log(jonasAdvanced.calcAge()); // 46
// console.log(jonasAdvanced.age); // 46 (now stored as property)
// console.log(jonasAdvanced.getSummary()); 

const message = document.querySelector(".message"); // Select by class
const button = document.querySelector("#btn"); // Select by ID
const heading = document.querySelector("h1"); // Select by tag
const input = document.querySelector(".guess"); // Select by class

console.log(message);
console.log(button);
console.log(heading);

// Different selector types
document.querySelector(".className"); // Class selector
document.querySelector("#idName"); // ID selector
document.querySelector("tagName"); // Tag selector
document.querySelector('[type="text"]'); // Attribute selector
document.querySelector("div p");

// getElementById - only works with IDs
const buttonById = document.getElementById("btn");
console.log(buttonById);
console.log(buttonById === button); // Same element, different method

// querySelectorAll - gets ALL matching elements
const allParagraphs = document.querySelectorAll("p");
console.log(allParagraphs); // NodeList (like an array)
console.log(allParagraphs[0]); // First paragraph
console.log(allParagraphs.length); 


// Changing element styles with the style property
