/*
O que é o jogo? Quero transformar meu jogo do scratch para o html.

É um jogo que cai meteoros do céu e não posso deixar os meteoros tocarem no chão. Para fazer isso, eu preciso atirar nele tocando na barra.
*/

function colide(){  
  //1 - nave // 2 - meteoro
  //console.log("fui chamada")
  for (var i = 0; i < vMeteorosX.length; i++){
    if (xN < vMeteorosX[i] + 35 &&
      xN + 35 > vMeteorosX[i] &&
      yN < vMeteorosY[i] + 35 &&
      yN + 35 > vMeteorosY[i]){

      //decide = true;
      if (vConfMeteoros[i] == false){
        vidas--;
        s1.innerHTML = vidas;
        vConfMeteoros[i] = true;
        a1.play();
      }
      
      
    }
    if (vidas <=0){
      clearInterval(timer2);
      clearInterval(timer);
      contexto.clearRect(0, 0, cv.width, cv.height);	
      contexto.drawImage(game_over, 0, 0, cv.width, cv.height);
      h22.innerHTML = "Você perdeu"
      if (segundos > maiorSegundos){
        clearInterval(timer3);        
        maiorSegundos = segundos;
        s2.innerHTML = maiorSegundos;
      }
    }
  }
}

/*function decideColide(){
  
  if (decide == false){
    console.log("oi 1");
    colide();
  }
  else{
    console.log("oi 2");
    
    setTimeOut(colide, 2000);
  }
}*/

function movimentoNave(event){
  //console.log(event.keyCode)]

  switch(event.keyCode){
    case 38:
    case 87:// pra cima
      yN-=5;
      break;

    case 40:
    case 83:// pra baixo
      yN+=5;
      break;
      
    case 39:
    case 68://para direita
      xN+=5;
      break;
      

    case 37:
    case 65://para a esquerda
      xN-=5;    
      break;
  }
}

function desenhaElementos(){
  contexto.drawImage(cenario, 0, 0, cv.width, cv.height);
  contexto.drawImage(nave, xN, yN, 35, 35);
  for (var i = 0; i < vMeteorosX.length; i++){
    //console.log("oi");
    contexto.drawImage(meteoro, vMeteorosX[i], vMeteorosY[i], 35, 35);
    //setTimeout(2);
  }
}

function movimentoMeteoro(){
  //contexto.clearRect(0, 0, cv.width, cv.height);	
  //contexto.drawImage(cenario, 0, 0, cv.width, cv.height);
  
  desenhaElementos();
  for (var i = 0; i < vMeteorosX.length; i++){
    vMeteorosY[i]+= Math.random() * 8;
    
    if (vMeteorosY[i] + 35 >= cv.height){
      vMeteorosX[i] = Math.floor(Math.random()* ((cv.width - 32) + 2) - 2);
      vMeteorosY[i] = -5;
      vConfMeteoros[i] = false;
    }
  }  
}

function contaSegundo(){
  segundos++;
  console.log(segundos);
}

function comecaJogo(){
  //posicao nave
   xN = 40;
   yN = cv.height - 40;
  
  //posicao meteoro
   xM = Math.floor(Math.random()* ((cv.width - 32) + 2) - 2);// vai de -2 até cv.width - 32
   yM = -5;
  
  //velocidade
   dx = 2;
   dy = 2;
  
   vidas = 5;
  segundos = 0;
  
   x1 = Math.floor(Math.random()* ((cv.width - 32) + 2) - 2);
   x2 = Math.floor(Math.random()* ((cv.width - 32) + 2) - 2);
   x3 = Math.floor(Math.random()* ((cv.width - 32) + 2) - 2);
   x4 = Math.floor(Math.random()* ((cv.width - 32) + 2) - 2);
   x5 = Math.floor(Math.random()* ((cv.width - 32) + 2) - 2);
  
   vMeteorosX = [x1, x2, x3, x4, x5];
   vMeteorosY = [-5, -5, -5, -5, -5];
   vConfMeteoros = [false, false, false, false, false];
  
   decide = false;
  
  desenhaElementos()
  
  timer = window.setInterval(movimentoMeteoro, 50);
  timer2 = window.setInterval(colide, 100);
  timer3 = window.setInterval(contaSegundo, 1000);
  
  document.addEventListener("keydown", movimentoNave);
  
  s1.innerHTML = vidas;
  
  contexto.clearRect(0, 0, cv.width, cv.height);	
}

function recomecaJogo(){
  clearInterval(timer);
  clearInterval(timer2);
  clearInterval(timer3);
  h22.innerHTML = ""

  comecaJogo();
}




var cv = document.getElementById("canva");
var contexto = cv.getContext("2d");
var cenario = document.getElementById("cenario");
var nave = document.getElementById("nave");
var meteoro = document.getElementById("meteoro");
var title = document.getElementById("title");
var h2 = document.getElementById("h2");
var game_over = document.getElementById("game_over");
//var b1 = document.getElementById("b1");
var b2 = document.getElementById("b2");
var s1 = document.getElementById("s1");
var s2 = document.getElementById("s2");
var h22 = document.getElementById("h22");
var a1 = document.getElementById("a1");
//var h23 = document.getElementById("h23");

var timer;
var timer2;
var timer3;

//posicao nave
var xN;
var yN;

//posicao meteoro
var xM;// vai de -2 até cv.width - 32
var yM;

//velocidade
var dx;
var dy;

var vidas;
var segundos;
var maiorSegundos = 0;

var x1;
var x2;
var x3;
var x4;
var x5;

var vMeteorosX;
var vMeteorosY;
var vConfMeteoros;

var decide;

contexto.drawImage(title, 0, 0, cv.width, cv.height);

b1.onclick = recomecaJogo;
