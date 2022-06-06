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
let midX,midY,x,y;
let randomPicture =1
if (localStorage["score"]){
    goal=parseInt( localStorage.score);
}
else { goal = 5;}
info.textContent=`SCORE: ${goal}`;

reset.addEventListener("click",()=>resetScore())
field.addEventListener("mousemove",(e)=>main(e))
setInterval(randomMove, 300);
setInterval(randomFace, 3000);


function main(e){
     x= e.clientX;
     y= e.clientY;
    info.textContent=`SCORE: ${goal}`;
    let elem= document.elementFromPoint(x,y);
    if(elem === bot){
        ;
        bot.style.backgroundImage=`url("./assets/images/smile-1.png")`;
        info.style.boxShadow=".1vmin .1vmin 10vmin red ";
        setTimeout(()=>info.style.boxShadow=".1vmin .1vmin 10vmin",300)
        if (!under){
            goal++;
            under=true;
        }
        localStorage.score=goal;
    } else {
        bot.style.backgroundImage=`url("./assets/images/smile-${randomPicture}.png")`
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

        bot.style.top=`calc(${y}px - 15vh)`;
        bot.style.left=`calc(${x}px - 10vw)`;
        
    }

}

function resetScore(){
    goal=0;
    localStorage.score=goal;
    info.textContent=`SCORE: ${goal}`;
    bot.style.top="0px";
}

function randomMove(){
    let randomAngle= Math.random()*60-30
    bot.style.transform= `rotateZ(${randomAngle}deg)`
}

function randomFace(){
    randomPicture =Math.floor(Math.random()*8);
    bot.style.backgroundImage=`url("./assets/images/smile-${randomPicture}.png")`
}