
// here render is display
let inputDir = { x: 0, y: 0 }; // abhi snake ruka hua hai
const moveSound = new Audio('music/move.mp3');
const foodSound = new Audio('music/hiss3-103123.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const musicSound = new Audio('music/mus.mp3');
let speed = 4; // yeh speed ki value  kuch bhi le skte hai apne acc ki hume kitne tym baadnscreen render krni hai
let score = 0;
let lastPaintTym = 0;
let snakeArr = [{ x: 13, y: 15 }];

// snake ka head snake ke bohot saare particles honge  vo kha kha kr badhta rhega esliye usko array mai liya hai
food = { x: 6, y: 7 }; // isko as a object liya hai coz  food bas  ek particle hai
// game function
function main(ctime) {
  // ctime=current tym
  //jab bhbi huym game khlete hai humari screen baar baar paint hoti hai and it is done by paint loop
  // to create a loop
  window.requestAnimationFrame(main); // yeh apne andr ek method leta hai eska phla argument hota hai function ka naam jo

  //console.log(ctime)// ab yeh values bohot jldi change ho rhi hai // ab humm fps kaam kese kr skta hai
  if ((ctime - lastPaintTym) / 1000 < 1 / speed) {
    // mili sec maim hai esliye thous se devide kiya hai
    return; // nhi chaiye rende
  }
  lastPaintTym = ctime;
  gameEngine();
}
function isCollide(snake) {
  // if   uh  bump into urself
  for (let i=1;i<snakeArr.length;i++){
    if(snake[i].x===snake[0].x && snake[i].y===snake[0].y)// agr head snake ki kisi bhi segment mai ghus jata hai toh
  {
    return true;
  }
}
// if uh bump into the wall
  if(snake[0].x>=18|| snake[0].x<=0  || snake[0].y>=18|| snake[0].y<=0){
    return true;
  }
  return false;
  }

function gameEngine() {
  // PART1 updating the snake array(containing the location of differnt body parts of snake ) and  food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("GAME OVER .PRESS ANY KEY TO PLAY AGAIN!");
     snakeArr = [{ x: 13, y: 15 }]; ///reset the snake position
    musicSound.play();
    score = 0;
  }
  // if u have eaten the food ,increment the score and regnerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    // yni jb snake aur food ke respective x,y co-ordinate match ho jeynge toh
    foodSound.play();
    score+= 1;
    // localstorage.clear command  on the console can be used to clear the highest score
    if (score>highestscoreval){
      highestscoreval= score;
      localStorage.setItem("highestscore",JSON.stringify(highestscoreval));
      highscorebox.innerHTML="highestscore :"+ highestscoreval ;
    }
    scoreBox.innerHTML="score:" + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    }); // array ke starting mai append krta hai elements,jese jese
    // ab muhe food ki pos ko update krna hoga so to generate a random no b/w a &b- a+(b-a)*math.round
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random())
    }
  }
  // moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
  
    snakeArr[i + 1] = { ...snakeArr[i] }; //  eg:isse last element seclast ke barabr krdo
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  // part 2:  display the snake and foood
  // display snake (snake ki position ko dekhkr isse grid mai stlle krna hai)
  snakeboard.innerHTML = ''; // phle hum snake board ki innner html khali kr denge in case to  avoid over lapping
  // snake jab khana khata jayega toh uski tail adti jayegi
  snakeArr.forEach((e, index) => {
    // for each loop lagayenge  array ke hr ek obj ke liye
    snakeElement = document.createElement('div'); // here we are crsating a div tag
    snakeElement.style.gridRowStart = e.y; // here u haev to specify the loc taki wha css lga sko
    snakeElement.style.gridColumnStart = e.x;

    //  snake naam ki class add kri hai to add css(snake class snake ke particles ko dikga rha hai head ke alaw jo hai)
    if (index === 0) {
      // yni agr snake ki body ka element head hai yni phla elemnt hai the add the head class also
      snakeElement.classList.add('head');
    } else {
      snakeElement.classList.add('snake');
    }
    snakeboard.appendChild(snakeElement); // yha humne snake elemnt ko board  ke andr daal diya
  });
  // display food
  foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  snakeboard.appendChild(foodElement);
}

// main logic starts here
musicSound.play();
let highestscore= localStorage.getItem("highestscore");// tto store highest score
if(highestscore=== null){
  highestscoreval=0;
  localStorage.setItem("highestscore",JSON.stringify(highestscoreval));
}
else{
  highestscoreval = JSON.parse(highestscore);
  highscorebox.innerHTML="highestscore :"+ highestscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
  // jab bhi koi key press hogi toh game start hoga
  inputDir = { x: 0, y: 1 }; // start the game ,yha  hum  top ryt corner ko origin consider krte hai
  moveSound.play();
  switch (e.key) {
    case 'ArrowUp':
      console.log('arrowUp ');
      
      inputDir.x = 0;
      inputDir.y = -1; // uper move krenge toh neeche se kam krna padega
      break;

    case 'ArrowDown':
      console.log('arrowDown ');
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case 'ArrowLeft':
      console.log('arrowLeft ');
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case 'ArrowRight':
      console.log('arrowRight ');
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
