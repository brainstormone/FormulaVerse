
// ==========================================
// FORMULA DATABASE
// ==========================================

const formulas = [

{
    id:1,
    name:"Percentage",
    category:"Arithmetic",
    formula:"$Percentage = \\frac{Part}{Whole} \\times 100$",
    rawFormula:"Percentage = (Part / Whole) × 100",
    example:"If 20 out of 50 students passed, Percentage = (20/50) × 100 = 40%"
},

{
    id:2,
    name:"Simple Interest",
    category:"Arithmetic",
    formula:"$SI = \\frac{P \\times R \\times T}{100}$",
    rawFormula:"SI = (P × R × T) / 100",
    example:"P=1000, R=10%, T=2 years → SI = ₹200"
},

{
    id:3,
    name:"Compound Interest",
    category:"Arithmetic",
    formula:"$A = P(1+r)^n$",
    rawFormula:"A = P(1+r)^n",
    example:"1000 at 10% for 2 years → ₹1210"
},

{
    id:4,
    name:"Quadratic Formula",
    category:"Algebra",
    formula:"$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$",
    rawFormula:"x=(-b ± √(b²-4ac))/2a",
    example:"Solve x²-5x+6=0"
},

{
    id:5,
    name:"Area Of Circle",
    category:"Geometry",
    formula:"$Area = \\pi r^2$",
    rawFormula:"Area = πr²",
    example:"Radius = 7 → Area = 153.94"
},

{
    id:6,
    name:"Circumference",
    category:"Geometry",
    formula:"$C = 2\\pi r$",
    rawFormula:"C = 2πr",
    example:"Radius = 7 → Circumference = 43.98"
},

{
    id:7,
    name:"Distance Formula",
    category:"Geometry",
    formula:"$Distance = Speed \\times Time$",
    rawFormula:"Distance = Speed × Time",
    example:"60 km/h × 2h = 120 km"
}

];

// ==========================================
// DOM ELEMENTS
// ==========================================

const formulaContainer =
document.getElementById("formulaContainer");

const searchInput =
document.getElementById("searchInput");

const favoritesContainer =
document.getElementById("favoritesContainer");

// ==========================================
// DISPLAY FORMULAS
// ==========================================

function displayFormulas(data){

formulaContainer.innerHTML = "";

data.forEach(formula=>{

formulaContainer.innerHTML += `

<div class="col-lg-4 col-md-6">

<div class="glass-card formula-card">

<h4>${formula.name}</h4>

<p>
<span class="badge bg-primary">
${formula.category}
</span>
</p>

<div class="formula">
${formula.formula}
</div>

<div class="formula-buttons">

<button
class="copy-btn"
onclick="copyFormula('${formula.rawFormula}')">

Copy

</button>

<button
class="example-btn"
onclick="showExample('${formula.example}')">

Example

</button>

<button
class="favorite-btn"
onclick="saveFavorite(${formula.id})">

❤

</button>

</div>

</div>

</div>

`;

});

MathJax.typesetPromise();
}

displayFormulas(formulas);

// ==========================================
// SEARCH FUNCTION
// ==========================================

searchInput.addEventListener("keyup",()=>{

const value =
searchInput.value.toLowerCase();

const filtered =
formulas.filter(item=>

item.name
.toLowerCase()
.includes(value)

||

item.category
.toLowerCase()
.includes(value)

);

displayFormulas(filtered);

});

// ==========================================
// COPY FORMULA
// ==========================================

function copyFormula(formula){

navigator.clipboard.writeText(formula);

alert("Formula copied!");
}

// ==========================================
// EXAMPLE POPUP
// ==========================================

function showExample(example){

alert(example);
}

// ==========================================
// FAVORITES
// ==========================================

function saveFavorite(id){

const selected =
formulas.find(item=>item.id===id);

let favorites =
JSON.parse(
localStorage.getItem("favorites")
) || [];

const exists =
favorites.some(item=>item.id===id);

if(!exists){

favorites.push(selected);

localStorage.setItem(
"favorites",
JSON.stringify(favorites)
);

renderFavorites();
}
}

function renderFavorites(){

let favorites =
JSON.parse(
localStorage.getItem("favorites")
) || [];

if(favorites.length===0){

favoritesContainer.innerHTML =
"No formulas saved yet.";

return;
}

favoritesContainer.innerHTML = "";

favorites.forEach(item=>{

favoritesContainer.innerHTML +=

`
<div class="mb-2">

<strong>${item.name}</strong>

<span class="badge bg-success">
${item.category}
</span>

</div>
`;

});
}

renderFavorites();

// ==========================================
// FORMULA OF THE DAY
// ==========================================

function formulaOfDay(){

const index =
new Date().getDate()
%
formulas.length;

const formula =
formulas[index];

document.getElementById(
"formulaOfDay"
).innerHTML =

`
<h4>${formula.name}</h4>

<p>${formula.formula}</p>

<p>${formula.example}</p>
`;

MathJax.typesetPromise();
}

formulaOfDay();

// ==========================================
// QUIZ DATABASE
// ==========================================

const quizQuestions = [

{
question:
"Area of Circle formula?",

options:[
"πr",
"πr²",
"2πr",
"r²"
],

answer:"πr²"
},

{
question:
"Simple Interest formula?",

options:[
"P×R×T",
"(P×R×T)/100",
"P+R+T",
"None"
],

answer:"(P×R×T)/100"
},

{
question:
"Distance Formula?",

options:[
"Speed × Time",
"Speed / Time",
"Time / Speed",
"Speed²"
],

answer:"Speed × Time"
}

];

// ==========================================
// QUIZ ENGINE
// ==========================================

let currentQuestion = 0;

let score = 0;

const startQuizBtn =
document.getElementById(
"startQuizBtn"
);

startQuizBtn.addEventListener(
"click",
startQuiz
);

function startQuiz(){

currentQuestion = 0;

score = 0;

showQuestion();
}

function showQuestion(){

const q =
quizQuestions[currentQuestion];

let html =

`
<div class="quiz-question">

${q.question}

</div>
`;

q.options.forEach(option=>{

html +=

`
<button
class="quiz-option btn btn-light"
onclick="checkAnswer('${option}')">

${option}

</button>
`;

});

document.getElementById(
"quizContainer"
).innerHTML = html;
}

function checkAnswer(option){

const q =
quizQuestions[currentQuestion];

if(option===q.answer){

score++;
}

currentQuestion++;

if(
currentQuestion <
quizQuestions.length
){

showQuestion();
}

else{

document.getElementById(
"quizContainer"
).innerHTML =

`
<h3>

Quiz Completed

</h3>

<p>

Score:
${score} /
${quizQuestions.length}

</p>
`;
}
}

// ==========================================
// DARK MODE
// ==========================================

const themeToggle =
document.getElementById(
"themeToggle"
);

if(
localStorage.getItem("theme")
==="light"
){

document.body.classList.add(
"light-mode"
);
}

themeToggle.addEventListener(
"click",
()=>{

document.body.classList.toggle(
"light-mode"
);

if(
document.body.classList.contains(
"light-mode"
)
){

localStorage.setItem(
"theme",
"light"
);
}
else{

localStorage.setItem(
"theme",
"dark"
);
}
}
);

// ==========================================
// SEARCH AUTOFOCUS
// ==========================================

window.addEventListener(
"load",
()=>{

searchInput.focus();
});
