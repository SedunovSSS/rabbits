let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let height = window.innerHeight;
let width = window.innerWidth;

canvas.width = width;
canvas.height = height;

let img_w = 42;
let img_h = 42;

let rabbit_image = new Image();
rabbit_image.src = 'src/img/rabbit.png'

let rabbit_speed = 5;
let rabbits = [];

let fps = 120;

function randint(start, end){
    return parseInt(Math.random() * (end - start) + start)
}

function round(num){
  return Math.round((num + Number.EPSILON) * 100) / 100
}


class Rabbit{
    constructor(){
        this.x = randint(width * 0.25, width * 0.75);
        this.y = randint(height * 0.25, height * 0.75);
        this.dx = randint(0, 1);
        this.dy = randint(0, 1);
        if (this.dx == 0) this.dx = -1;
        if (this.dy == 0) this.dy = -1;
        this.dx = this.dx * Math.random();
        this.dy = this.dy * Math.random();
    }
    move(){
        this.x += this.dx * rabbit_speed;
        this.y += this.dy * rabbit_speed;

        if (this.x >= width - img_w){
            this.dx = -this.dx;
        }
        if (this.x <= 0){
            this.dx = -this.dx ;
        }
        if (this.y >= height - img_h){
            this.dy = -this.dy ;
        }
        if (this.y <= 0){
            this.dy = -this.dy;
        }
    }
    draw(){
        ctx.drawImage(rabbit_image, this.x, this.y, img_w, img_h);
    }
}

let fpscount = 0;

window.onclick = () => {
    for (let i = 0; i < 100; i++){
        rabbits.push(new Rabbit())
    }
}

function loop(){
    let start_time = new Date().getTime();
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < rabbits.length; i++){
        let rabbit = rabbits[i];
        rabbit.draw();
        rabbit.move();
    }
    ctx.font = "16px bold serif";
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 140, 60);
    ctx.fillStyle = 'cyan';
    ctx.fillText("FPS: " + fpscount.toString(), 20, 20);
    ctx.fillText("Rabbits: " + rabbits.length.toString(), 20, 50);
    setTimeout(() => {
        requestAnimationFrame(loop);
        let end_time = new Date().getTime();
        fpscount = round(1000/(end_time-start_time));
        
    }, 1000 / fps);
        
}
requestAnimationFrame(loop);
