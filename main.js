/**/
"use strict";
window.addEventListener("load", init);

const settings = {
    speed: 5,
    width: 600,
    height: 400,
    carWidth: 100,
    bulletSpeed: 10,
    keys: {
        left: false,
        right: false,
        up: false,
        down: false
    }
}
let stage, car, bullets=[];
function init(){
    stage = new createjs.Stage("stage");//the id of the canvas
    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", tock);
    console.log("load event happened");

    car = new createjs.Container();
    car.brand = "Ferrari";
    car.direction="right";
    car.x = settings.width/2-settings.carWidth/2;
    car.y=settings.height-60;
    let box = new createjs.Shape();
    box.graphics.beginFill("#bada55");
    box.graphics.drawRect(0,0, settings.carWidth, 60);
    car.addChild(box);

    let circle = new createjs.Shape();
    circle.graphics.beginFill("#c0ffee");
    circle.graphics.drawCircle(0,0, 10);
    circle.x=20;
    circle.y=60;
    car.addChild(circle);

    let circle2 = new createjs.Shape();
    circle2.graphics.beginFill("#c0ffee");
    circle2.graphics.drawCircle(0,0, 10);
    circle2.x=80;
    circle2.y=60;
    car.addChild(circle2);
    stage.addChild(car);
    car.addEventListener("click", ()=>{
        if(car.direction==="right"){
            car.direction="left";
        } else {
            car.direction="right";
        }
    });
    window.addEventListener("keydown", e=>{
        console.log(e.key);
        if(e.key === "ArrowLeft"){
            settings.keys.left=true;
        }
        if(e.key === "ArrowRight"){
            settings.keys.right=true;
        }
        if(e.key === "ArrowUp"){
            settings.keys.up=true;
        }
        if(e.key === "ArrowDown"){
            settings.keys.down=true;
        }
    })
    window.addEventListener("keyup", e=>{
        console.log(e.key);
        if(e.key === "ArrowLeft"){
            settings.keys.left=false;
        }
        if(e.key === "ArrowRight"){
            settings.keys.right=false;
        }
        if(e.key === "ArrowUp"){
            settings.keys.up=false;
        }
        if(e.key === "ArrowDown"){
            settings.keys.down=false;
        }
        if(e.key === " "){
            shoot();
        }
    })
}
function shoot(){
    let bullet = new createjs.Shape();
    bullet.graphics.beginFill("#fff").drawCircle(0,0,4);
    bullet.x = car.x;
    bullet.y=car.y;
    bullets.push(bullet);
    stage.addChild(bullet);
}
//github.com/jofhatkea/

function moveBullets(){
    bullets.forEach(b=>{
        b.y-=settings.bulletSpeed;
    });
;}

function moveHero(){
    if(settings.keys.left){
        car.x-=settings.speed;
        if(car.x<0){
            // console.log("please stop")
            car.x=0;
        }
    }
    if(settings.keys.right){
        car.x+=settings.speed;
        if(car.x+settings.carWidth>settings.width){
            // console.log("please don't leave")
            car.x=settings.width-settings.carWidth;
        }
    }
    if(settings.keys.up){
        car.y-=settings.speed;
    }
    if(settings.keys.down){
        car.y+=settings.speed;
    }
}

function tock(e){//refractoring
    moveBullets();
    moveHero();
    stage.update(e);
}



//1 a game, 

//2 code journey

//3 what createjs can do
