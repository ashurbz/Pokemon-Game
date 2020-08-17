// let canvas = document.getElementById('canvas');
// let pokemon = new Image();
// pokemon.src = './pokemon.png';


let counter=0;
var myGamePiece;
var balls=[20];
for(let ball=0; ball<2000; ball++){
    balls[ball] = ball+"ball";
}

console.log(balls)

function startGame() {
    myGameArea.start();
    
   

    
let arrx = [];
let arry = [];

   // for(let i = 0; i<20; i++){
   let i=0;
   
      function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
     
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
    
    
   
   
 
   
   
  
  
   
  
    balls[i] = new componentBall(116, 116, "./pokeball.png", 120*(x), 120*(y),"image");
    // myGamePiece1=  new componentBall(116, 116, "./pokeball.png", 120*(x), 120*(y),"image");

    // myGamePiece = new component(30, 30, "pokemon.png", 10, 120,"image");
    if(i==20000){
    clearInterval(as)}
   
    }, 1000)
    
    
 //  }
   // myGamePiece2 = new component(40,40, "blue", 30, 100);
    






}
myGamePiece=new component(120, 120, "./pokemon.png", 10, 120,"image");










var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 960;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
       
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
   
    for(let i =0; i<1000;i++){
        if( balls[i] && balls[i].update){
              
            balls[i].update();
            if( (balls[i].x-myGamePiece.x >0  && balls[i].x-myGamePiece.x <= 60 &&  balls[i].y-myGamePiece.y <= 60 &&  balls[i].y-myGamePiece.y >0) || (balls[i].x-myGamePiece.x <0  && balls[i].x-myGamePiece.x > -60 &&  balls[i].y-myGamePiece.y > -60 &&  balls[i].y-myGamePiece.y <0)){
                balls[i] = null;
                counter++;
            }
    }}
   // myGamePiec.update();
     
      
    myGamePiece.update();
}


startGame();



