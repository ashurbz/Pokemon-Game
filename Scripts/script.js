
let counter=0;
let gameover=false;
var myGamePiece;
let count=0;
var balls=[20];

// Start game

function startGame() {
    for(let ball=0; ball<20; ball++){
        balls[ball] = ball+"ball";
    }
    document.getElementById("counter").innerText="Score : "+counter;
    myGameArea.start();
    
let arrx = [];
let arry = [];

   let i=0;

   // random number of balls
   
      function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
     // interval of time 
    let as = setInterval(function(){
     
    i++;
    let x = getRandomInt(8);
    let y= getRandomInt(5);
    
    
    for(let m = 0; m<=arrx.length;m++){
      
       if(arrx[m] == x && arry[m] == y){
          console.log(true);
          i--;
          return;
          
       }
   
    }
    arrx.push(x);
    arry.push(y);
    
    
   // counter for score
  console.log(counter);
 
    if(counter>0 && (counter%15===0)){

        i=0;
        arrx =[];
        arry =[];

       
    }
  
    console.log(count)

    // pokeball image
  
    balls[i] = new componentBall(116, 116, "./Images/pokeball.png", 120*(x), 120*(y),"image");
    if(gameover){
        let a=5;
        
     function show(){
        document.getElementById('time').innerText=a--;
     }
     document.getElementsByTagName('h1')[0].style.width = '100vw' ;
     document.getElementsByTagName('h1')[0].style.height ='100vh';
     document.getElementsByTagName('h1')[0].style.fontSize ='xxx-large';

       let cele= document.getElementById("counter")
       cele.innerHTML="Game Over !!! <br> Your Score Is "+counter+ "<br> New Game Starting in ...";

       cele.style.float="none"
    
       // setting countdown meter
        
        setInterval(function(){
          show();
        },1000);
        document.getElementsByTagName("canvas")[0].className="hidden";
        document.getElementsByTagName("h1")[0].className="show";
    
     setTimeout(function(){
        location.reload();

     },5000)   
        
          
        clearInterval(as)
        
}
   
    }, 1000)
    
    



document.getElementsByTagName("button")[0].className="hidden";
document.getElementsByTagName("h1")[0].className="show";




}
// pokemon image
myGamePiece=new component(120, 120, "./Images/pokemon.png", 10, 120,"image");


var myGameArea = {
    canvas : document.createElement("canvas"),

    start : function() {

        // using arrow keys
       
        this.canvas.width = 960;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.getElementById("div").insertBefore(this.canvas, document.getElementById("div").childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
        document.getElementsByTagName("canvas")[0].className="show";
       
    },  clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
}

function component(width, height, color, x, y,type) {
    this.gamearea = myGameArea;
    
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
}
function componentBall(width, height, color, x, y,type) {
    this.width = width;
    this.type = type;
    this.height = height;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.x = x;
    this.y = y;
    this.update = function() {  

    ctx = myGameArea.context;
    if (type == "image") {
        ctx.drawImage(this.image, 
            this.x, 
            this.y,
            this.width, this.height);
    } else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }}
  
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;    
    if (myGameArea.key && myGameArea.key == 37 && myGamePiece.x > 0) {myGamePiece.speedX = -4; }
    if (myGameArea.key && myGameArea.key == 39 && myGamePiece.x < 960 -120) {myGamePiece.speedX = 4; }
    if (myGameArea.key && myGameArea.key == 38 && myGamePiece.y > 0) {myGamePiece.speedY = -4; }
    if (myGameArea.key && myGameArea.key == 40 && myGamePiece.y < 600-120 ) {myGamePiece.speedY = 4; }
    myGamePiece.newPos();    
     count=0;
    for(let j =0; j<20;j++){
           
        if( balls[j] && balls[j].update){
               count++;
            balls[j].update();
            if( (balls[j].x-myGamePiece.x >-30  && balls[j].x-myGamePiece.x <= 30 &&  balls[j].y-myGamePiece.y <= 30 &&  balls[j].y-myGamePiece.y >-30) ){
                var sound = new Audio("./Sounds/sound1.mp3");
                sound.play();
                
                balls[j] = "A";
                counter++;
                count--;
                document.getElementById("counter").innerText="Score : "+counter;
            }
            if(count==10)
            gameover=true;

    }}
     
      
    myGamePiece.update();
}






