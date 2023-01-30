//Importing sound effects

const intro = new Audio("sound/introSong.mp3");
const gameover = new Audio("sound/gameOver.mp3");
const heavyWeapon = new Audio("sound/heavyWeapon.mp3");
const killEnemy = new Audio("sound/killEnemy.mp3");
const shoot = new Audio("sound/shoooting.mp3") ;
const bigweapon =  new Audio("sound/hugeWeapon.mp3");

intro.play();
// A canvas means the drawing paper on which we are making drawings
const canvas = document.createElement("canvas"); //craeting canvas element/tag

document.querySelector(".mygame").appendChild(canvas); //adding canvas element / tag into the class mygame
canvas.width = innerWidth; //setting the width of the canvas equal to the width of browser
canvas.height = innerHeight; //setting height of the canvas equal to the height of window/browser
// console.log(canvas.height);
const context = canvas.getContext("2d"); // tlling that we are making a 2d canvas

//-------logic for form and button-----
let difficulty  = 2 ;
const lightWeaponDamage = 10;
const heavyWeaponDamage = 20;

let playerscore = 0;

const form = document.querySelector("form");
const scoreboard = document.querySelector(".scoreboard");
//---Event listener for difficulty level---------
document.querySelector("input").addEventListener("click" , (e)=>{
  e.preventDefault();
  //--hide form and show scoreboard
  form.style.display = "none";
  scoreboard.style.display = "block";
  scoreboard.style.color = "white";

  let uservalue = document.getElementById("difficulty").value;
  // alert(uservalue);

  if(uservalue == "Easy"){
    setInterval(getEnimy , 2000)
    return (difficulty = 3);
    
  }
  if(uservalue == "Medium"){
    setInterval(getEnimy , 1400)
    return (difficulty = 5);
  }
  if(uservalue == "Hard"){
    setInterval(getEnimy , 1000)
    return (difficulty = 7 );
  }
  if(uservalue == "Insane"){
    setInterval(getEnimy , 700)
    return (difficulty = 12);
  }


})

/* This is the longer form to do the same as we are gona do now by using class 

context.beginPath();//to say begin from here
context.arc(100, 100, 10, Math.PI / 180 * 0, Math.PI / 180 * 360, 0);//used to draw the circle(distance from x - axis , distance from y axis , radius ,indtial angle , final angle)
context.stroke(); // for giving bounderies / border to the circle / the drawing we are making

// context.rect(50, 52, 12, 15);//Just for fun if u want to make a rectangle
// context.stroke();
context.beginPath();
context.arc(150, 100, 10, Math.PI / 180 * 0, Math.PI / 180 * 360, 0)
context.stroke();

context.beginPath();
context.arc(100, 150, 10, Math.PI / 180 * 0, Math.PI / 180 * 360, 0)
context.stroke();

context.beginPath();
context.arc(150, 150, 10, Math.PI / 180 * 0, Math.PI / 180 * 360, 0)
context.stroke();

console.log("hii");
*/

/*    using class  */

//----setting player position to centre
playerPosition = {
    x : innerWidth/2,
    y :  innerHeight/2
};

//-----------------------Endscreen--------------(when game gets over)--------------------------

const gameoverloader = () =>{
  //creating game div , button , highscore

  const gameoverbanner = document.createElement("div");
  const gameoverbutton = document.createElement("button");
  const highscore = document.createElement("div");

  //writting highscore of game when it ends

  highscore.innerHTML = `High Score : ${localStorage.getItem("highscore")? localStorage.getItem("highscore"):playerscore}`;

  const oldHighScore = localStorage.getItem("highscore") && localStorage.getItem("highscore");

  if(oldHighScore < playerscore){
    localStorage.setItem("highscore",playerscore); 

    //updating the highscore

    highscore.innerHTML=`High Score : ${playerscore}`;
  }

  gameoverbutton.innerText="Play again";

  gameoverbanner.appendChild(highscore);
  gameoverbanner.appendChild(gameoverbutton);

  //making reload on clicking play again button

  gameoverbutton.onclick = () => {
    window.location.reload();
  }

  gameoverbanner.classList.add("gameover");

  document.querySelector("body").appendChild(gameoverbanner);
}

//------------------------------This is player class-----------------
class player {
  //A constructor that takes position x , y ,  radius and this is the keyword that is used "x mai jo value pass hogi usko iss constructor function ke x mai daal do" we are using this caz we are using hte same name
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, (Math.PI / 180) * 0, (Math.PI / 180) * 360, 0);
    //context.stroke();
    //instead of giving just boundaries now we want to fill that shape

    context.fillStyle = this.color ;//to choose color
    context.fill();//fill function to fill the shape
  }
}

//------------End of player class


//const abhi = new player(playerPosition.x , playerPosition.y,"blue");//way to call a cosntructor of a class


//---------------Weapon class-----------------------
class Weapon {
    //A constructor that takes position x , y ,  radius and this is the keyword that is used "x mai jo value pass hogi usko iss constructor function ke x mai daal do" we are using this caz we are using hte same name
    constructor(x, y, radius, color , velocity,damage) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.velocity = velocity ;
      this.damage=damage;
    }
  
    draw() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, (Math.PI / 180) * 0, (Math.PI / 180) * 360, 0);
      //context.stroke();
      //instead of giving just boundaries now we want to fill that shape
  
      context.fillStyle = this.color ;//to choose color
      context.fill();//fill function to fill the shape
    }

    //to update the weapon shooter movement
    update(){
      this.draw();
      this.x += this.velocity.x ;
      this.y += this.velocity.y ;
    }
}

//---------------HugeWeapon class-----------------------
class HugeWeapon {
    //A constructor that takes position x , y ,  radius and this is the keyword that is used "x mai jo value pass hogi usko iss constructor function ke x mai daal do" we are using this caz we are using hte same name
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      
      this.color = color;
      
    }
  
    draw() {
      context.beginPath();
      context.fillStyle = this.color;//to choose color
      context.fillRect(this.x, this.y, 200,canvas.height);
      //context.stroke();
      //instead of giving just boundaries now we want to fill that shape
  
      
      context.fill();//fill function to fill the shape
    }

    //to update the weapon shooter movement
    update(){
      this.draw();
      this.x += 20;
    }
}

//--------Enemy class------

class Enemy {
    //A constructor that takes position x , y ,  radius and this is the keyword that is used "x mai jo value pass hogi usko iss constructor function ke x mai daal do" we are using this caz we are using hte same name
    constructor(x, y, radius, color , velocity) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.velocity = velocity ;
    }
  
    draw() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, (Math.PI / 180) * 0, (Math.PI / 180) * 360, 0);
      //context.stroke();
      //instead of giving just boundaries now we want to fill that shape
  
      context.fillStyle = this.color ;//to choose color
      context.fill();//fill function to fill the shape
    }

    //to update the weapon shooter movement
    update(){
        this.draw();
        this.x += this.velocity.x ;
        this.y += this.velocity.y ;
    }
}
//------------end of classes

//--------Enemy class------

//------------Particle class------------
const fraction = 0.98 ;
class Particle {
  //A constructor that takes position x , y ,  radius and this is the keyword that is used "x mai jo value pass hogi usko iss constructor function ke x mai daal do" we are using this caz we are using hte same name
  constructor(x, y, radius, color , velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity ;
    this.alpha = 1;
  }

  draw() {
    context.save();
    context.globalAlpha = this.alpha ;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
    //context.stroke();
    //instead of giving just boundaries now we want to fill that shape

    context.fillStyle = this.color ;//to choose color
    context.fill();//fill function to fill the shape
    context.restore();


  }

  //to update the particle  movement
  update(){
    //we are decesing the speed to make a better effect
      this.velocity.x *= fraction ;
      this.velocity.y *= fraction ;
      this.draw();
      this.x += this.velocity.x ;
      this.y += this.velocity.y ;
      this.alpha-=0.01;
  }
}

//-----------Main logic of the programmmm---------

//creating player object . weapon array and enemy array
const abhi = new player(playerPosition.x, playerPosition.y, 10 , "white");
const weapons = [];//weapons array
const enemys = [];//Enemy array
const particles = [];//splach effect particles
const hugeWapons = [];

//---function that handles all the feaurs of enemy
//Funtion to spawn enemies at random location
const getEnimy = ()=> {
    
    const enemySize = Math.random()*(40-5) + 5 ;//random size of enemy
    const color = `hsl(${Math.floor(Math.random()*360)},100%,50%)`;
    let random ;//generating random color for enemy
    //logic for the eniemes to come from the outside of canvas
    if(Math.random() < 0.5){
        random = {
            //setting X to very of left to the scree or very right to the screen  and Y at random vertcally
             x : Math.random() < 0.5 ? enemySize + canvas.width : 0 - enemySize , //if math.random has a value greater than 0.5 means it is somewher ahead of weapon than we add enemysize to it to move it outside the canvas as attack should be from outside the canvas else if it is left to the weapon than move it to the outside by subtractong enemysize from the initial position which is 0

             y : Math.random()*canvas.height//we mutiplied it to move it outside the canvs
        }

    }
    else{
        random = {
          //setting y to very of up to the scree or very down to the screen  and x at random horizontally
            x : Math.random()*canvas.width , //we mutiplied it to move it outside the canvas
            y : Math.random() < 0.5 ? enemySize + canvas.height : 0 - enemySize  //if math.random has a value greater than 0.5 means it is somewher ahead of weapon than we add enemysize to it to move it outside the canvas as attack should be from outside the canvas else if it is down to the weapon than move it to the outside by subtractong enemysize from the initial position which is 0

       }

    }
    
    //finding angle between centre (means player position) and enemy position
    const myAngle = Math.atan2(canvas.height/2 - random.y  , canvas.width/2 - random.x );

    //vmaking velocity or apeed my enemy by multiplying it with different difficulty level(easy , medium , hard, insane)
    const velocity = {
        x : Math.cos(myAngle)*difficulty , //multyply with any value to increase the speed of shooting balls

        y : Math.sin(myAngle)*difficulty
    } 

    //Adding enemy to enemies array
    enemys.push(new Enemy(random.x , random.y , enemySize ,color , velocity));
}

//-----------------------------------


//--- -----------------------------Creating animation function-----

let animationId;
function animation(){
    //making recursion
    animationId = requestAnimationFrame(animation);
    //clearing canvas on each frame
    // context.clearRect(0, 0, canvas.width, canvas.height);
    //istead of clearing the rectangle / canvas on each frame we can add new rectangel/canvas to each frame to make effect
    context.fillStyle = "rgba(76, 75, 75,0.2)"
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    //drawing player
    abhi.draw();
    //generating particles

    particles.forEach((particle,particleIndex) => {
      if(particle.alpha <= 0){
        particles.splice(particleIndex , 1);
      }
      else{
        particle.update();
      }
      
    });

    //Generating bullets
    weapons.forEach((weapon , weaponIndex) =>{
      weapon.update();
      //deleting the bullets if it is not used to kill enemy so that to incres=ase the gaming efficency by clearing the weapon array each time if it is not used .....if it used than add it in the array
        if(weapon.x + weapon.radius < 1 || weapon.y + weapon.radius < 1 || weapon.x - canvas.width > 1 || weapon.y - canvas.height  > 1){
          weapons.splice(weaponIndex , 1);
        }
    })

    //generating hugeweapons

    hugeWapons.forEach((hugeWeapon,hugeweaponIndex)=>{
      //consition to remove hugeweapon when it is out of scope of canvas
      if(hugeWeapon.x > canvas.width){
        hugeWapons.splice(hugeweaponIndex , 1);
      }
      else{
        hugeWeapon.update();
      }
    })

    //generating enemies
    enemys.forEach((enemy,enemyIndex) =>{
      enemy.update();
      //finding distance between enemy and player
      const distanceBetweenPlayerAndEnemy = Math.hypot(abhi.x - enemy.x , abhi.y - enemy.y)
      //if distance between enemy and player is 0 means they collide
      //by subtraction player radius and enemy radius
      //stoping game if enemy hit player
      if(distanceBetweenPlayerAndEnemy - abhi.radius - enemy.radius < 1){
        // console.log("Game over")


        //stop when enemy touch the player
        cancelAnimationFrame(animationId);
        gameover.play();
        return gameoverloader();
      }

      hugeWapons.forEach((hugeweapon)=>{
        //distance betweeen hugeweapon and enemy
        const distancebetweenhugeweaponandenemy = hugeweapon.x - enemy.x;

        if(distancebetweenhugeweaponandenemy <= 200 && distancebetweenhugeweaponandenemy >= -200){
          //increase score by 10 when it hits one enemy
          playerscore+=10;
          

          setTimeout(() => {
           
            //deleting the enemy 
          enemys.splice(enemyIndex , 1);            
          }, 0);
        }
      })
      // console.log(playerscore);
      //finding index of each weapon
      weapons.forEach((weapon , weaponIndex)=> {
        //distance betweeen enemy and weapon 
        const distanceBetweenWeaponAndEnemy = Math.hypot(weapon.x - enemy.x , weapon.y - enemy.y)
        //collison by subtractiong radius of weapons and enemy
        if(distanceBetweenWeaponAndEnemy - weapon.radius - enemy.radius < 1){
          // console.log("kill enemy");
         
          //reducing size of enemy if they hit
          if(enemy.radius > weapon.damage + 10){
            killEnemy.play();
            //previous
            // enemy.radius-=5;//reducing the size of enemy
            //after(Better version)
            //for smooth deletion effect of enemy we can use gsap library 
            gsap.to(enemy,{
              radius : enemy.radius - weapon.damage ,
            });
            setTimeout(() => {
            weapons.splice(weaponIndex , 1 );
              
            }, 0);

          }
          //deleting enemy if size is less than 18
          else{

            //increase score by 10 when it hits one enemy
            playerscore+=10;
            killEnemy.play();

            //increasing score of the player by using scoreboard html
            scoreboard.innerHTML =`Score : ${playerscore}`;
            
            for (let i = 0; i < enemy.radius*5; i++) {
            particles.push(new Particle(weapon.x , weapon.y ,Math.random()*2 , enemy.color ,
              {x:(Math.random()-0.5)*(Math.random()*7) , y:(Math.random() - 0.5)*Math.random()*7}
               )); 
          }

            setTimeout(() => {
             
              
              //deleting the enemy 
            enemys.splice(enemyIndex , 1);
            //deletinf the weapon
            weapons.splice(weaponIndex , 1 );
              
            }, 0);
          }
          
          
        }

        
      });

      


      
    });
};


//--------------Adding event listener------------

// setInterval(getEnimy,1000);//just fun
// This is to get the point where we click on the page

//eventlistener for weapon on left-click
canvas.addEventListener("click",(e)=>{
    intro.pause();
    shoot.play();
    //Finding angle at which we have to shoot balls
    //atan2 is a math function that takes to input x and y condinate to give angle in radian
    //finsing angle between player position and click co=ordinate
    const myAngle = Math.atan2(e.clientY - canvas.height / 2 , e.clientX - canvas.width / 2 );
    
    //making const speed for  weapon
    const velocity = { 
        x : Math.cos(myAngle)*6 , //multyply with any value to increase the speed of shooting balls

        y : Math.sin(myAngle)*6
    } ;
    //console.log(e.clientX,e.clientY); clientX , clientY gives the position of x and y c=cordinates in the page
    //adding weapon to the weapons array
    weapons.push(new Weapon(playerPosition.x , playerPosition.y ,5,"white", velocity,lightWeaponDamage))
})

//eventlistener for heavy-weapon on right-click
canvas.addEventListener("contextmenu",(e)=>{
    heavyWeapon.play();
    e.preventDefault() ;

    if(playerscore <= 0) return;
    //decreasing the score of the player if he is using specialWeapon
    playerscore-=2;

    scoreboard.innerHTML =`Score : ${playerscore}`;

    //Finding angle at which we have to shoot balls
    //atan2 is a math function that takes to input x and y condinate to give angle in radian
    //finsing angle between player position and click co=ordinate
    const myAngle = Math.atan2(e.clientY - canvas.height / 2 , e.clientX - canvas.width / 2 );
    
    //making const speed for  weapon
    const velocity = { 
        x : Math.cos(myAngle)*4 , //multyply with any value to increase the speed of shooting balls

        y : Math.sin(myAngle)*4
    } ;
    //console.log(e.clientX,e.clientY); clientX , clientY gives the position of x and y c=cordinates in the page
    //adding weapon to the weapons array
    weapons.push(new Weapon(playerPosition.x , playerPosition.y ,15,"#0861fc", velocity,heavyWeaponDamage))
})

addEventListener("keypress",(e)=>{
  if(e.key===" "){

    if(playerscore < 20) return;
    //decreasing the score of the player if he is using specialWeapon
    playerscore-=20;
    bigweapon.play();

    scoreboard.innerHTML =`Score : ${playerscore}`;
    hugeWapons.push(new HugeWeapon(0,0,"red"))
    // alert("afsa")
  }
});

addEventListener("contextmenu",(e)=>{
  e.preventDefault();
})
addEventListener("resize",()=>{
  window.location.reload();
})
animation();




