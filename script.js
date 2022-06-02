const field=document.querySelector(".field");
const info=document.querySelector(".info");
const container=document.querySelector(".container");
const bot =document.querySelector(".bot");
const reset = document.querySelector(".reset");
let coord= bot.getBoundingClientRect();
let botRight=coord.right;
let botLeft= coord.left;
let botTop = coord.top;
let botBottom= coord.bottom;
let goal =0;
let under=false;
let midX,midY
if (localStorage["score"]){
    goal=parseInt( localStorage.score);
}
else { goal = 5;}
info.textContent=`SCORE: ${goal}`;

reset.addEventListener("click",()=>resetScore())
container.addEventListener("mousemove",(e)=>calculateCoord(e))
setInterval(randomMove, 300);


function calculateCoord(e){
    let x= e.clientX;
    let y= e.clientY;
    info.textContent=`SCORE: ${goal}`;
    let elem= document.elementFromPoint(x,y);
    if(elem === bot){
        ;
        bot.style.backgroundColor="#900";
        if (!under){
            goal++;
            under=true;
        }
        localStorage.score=goal;
    } else {
         bot.style.backgroundColor="#090";
         under=false;

}
    coord= bot.getBoundingClientRect();
    botRight=coord.right;
    botLeft= coord.left;
    botTop = coord.top;
    botBottom= coord.bottom;
     midX= (botLeft+botRight)/2;
     midY=(botBottom+botTop)/2;
    let deltaX= Math.abs(x-midX);
    let deltaY = Math.abs(y-midY);
    if(deltaX<200 && deltaY<200){
        bot.style.transform= `translate(${deltaX}px,${deltaY}px)`
    }

}

function resetScore(){
    goal=0;
    localStorage.score=goal;
}

function randomMove(){
    let randomX= Math.random()*10;
    let randomY= Math.random()*10;
    bot.style.transform= `translate(${randomX+midX}px,${randomY+midY}px)`
}