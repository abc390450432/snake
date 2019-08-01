var startPage = document.getElementsByClassName("startPage")[0];
var stopPage =  document.getElementsByClassName("stopPage")[0];
var content = document.getElementsByClassName("content")[0];
var spanScore = document.getElementsByClassName("span-score");
var over = document.getElementsByClassName("over")[0];
var closePage = document.getElementsByClassName("closePage")[0];
var stopOverPage = document.getElementsByClassName("stopOverPage")[0];
var snakeMove;
var speed = 140;
var score = 0;
var date = new Date();
var firstTime;
var lastTime;
var key = true;
startPage.addEventListener('click', start, false);
function start(){
	startPage.style.display = "none";//开始图标消失
	stopPage.style.display = "block";//暂停图标出现
	food();//食物出现
	snake();//贪吃蛇出现
	snakeMove = setInterval(function(){
		move();//贪吃蛇移动
	}, speed);
	firstTime = date.getTime();//设置时间戳
	bindEvent();//绑定事件
}
var foodX;
var foodY;
function food(){
	var food = document.createElement("div");
	food.style.width = '30px';
	food.style.height = '30px';
	food.style.position = 'absolute';
	foodX = Math.floor(Math.random() * 40) * 30;
	foodY = Math.floor(Math.random() * 20) * 30;
	food.style.left = foodX + 'px';
	food.style.top = foodY + 'px';
	content.appendChild(food).setAttribute('class','food');
	for (var i = 0; i < snakeBody.length; i++) {
		if (foodX == snakeBody[i][0]*30 && foodY == snakeBody[i][1]*30) {
			removeClass('food');
			food();
		}
	}
}
var snakeBody = [[3,0,'snakeHead'],[2,0,'snakeBody'],[1,0,'snakeBody']];
var direct = 'right';
var left = false;
var right = false;
var up = true;
var down = true;
function snake(){
	for (var i = 0; i < snakeBody.length; i++) {
		var snake = document.createElement('div');
		snake.style.width = '30px';
		snake.style.height = '30px';
		snake.style.position = 'absolute';
		snake.style.left = snakeBody[i][0] * 30 + 'px';
		snake.style.top = snakeBody[i][1] * 30 + 'px';
		content.appendChild(snake).setAttribute('class',snakeBody[i][2]);
		snake.classList.add('snake');
		switch (direct) {
			case 'right':
			break;
			case 'left':
				snake.style.transform = 'rotateY(180deg)';
				break;
			case 'up':
				snake.style.transform = 'rotate(270deg)';
				break;
			case 'down':
				snake.style.transform = 'rotate(90deg)';
				break;
			default:
			break;
		}
	}
}
function move(){
	for (var i = snakeBody.length - 1; i > 0; i--) {
		snakeBody[i][0] = snakeBody[i - 1][0];
		snakeBody[i][1] = snakeBody[i - 1][1];
	}
	switch (direct) {
		case 'right':
			snakeBody[0][0] += 1;
			break;
		case 'left':
			snakeBody[0][0] -= 1;
			break;
		case 'up':
			snakeBody[0][1] -= 1;
			break;
		case 'down':
			snakeBody[0][1] += 1;
			break;
		default:
			break;
	}
	removeClass('snake');
	snake();
	if(snakeBody[0][0]*30 == foodX && snakeBody[0][1]*30 == foodY){
		var snakeEndX = snakeBody[snakeBody.length - 1][0];
		var snakeEndY = snakeBody[snakeBody.length - 1][1];
		switch (direct) {
		case 'right':
			snakeBody.push([snakeEndX, snakeEndY, 'snakeBody']);
			break;
		case 'left':
			snakeBody.push([snakeEndX, snakeEndY, 'snakeBody']);
			break;
		case 'up':
			snakeBody.push([snakeEndX, snakeEndY, 'snakeBody']);
			break;
		case 'down':
			snakeBody.push([snakeEndX, snakeEndY, 'snakeBody']);
			break;
		default:
			break;
		}
		score += 1;
		spanScore[0].innerHTML = score;
		removeClass('food');
		food();
	}
	if (snakeBody[0][0] < 0 || snakeBody[0][0] >= 40) {
		relodGame();
	}
	if (snakeBody[0][1] < 0 || snakeBody[0][1] >= 20) {
		relodGame();
	}
	for (var i = 1; i < snakeBody.length; i++) {
		if (snakeBody[0][0] == snakeBody[i][0] && snakeBody[0][1] == snakeBody[i][1]) {
			relodGame();
		}
	}
}
function relodGame(){
	removeClass('snake');
	removeClass('food');
	clearInterval(snakeMove);
	over.style.display = 'block';
	spanScore[1].innerHTML = score;
	snakeBody = [[3,0,'snakeHead'],[2,0,'snakeBody'],[1,0,'snakeBody']];
	direct = 'right';
	left = false;
	right = false;
	up = true;
	down = true;
	score = 0;
}
function removeClass(className){
	var ele = document.getElementsByClassName(className);
	while(ele.length > 0){
		ele[0].parentNode.removeChild(ele[0]);
	}
}
function bindEvent(){
	document.onkeydown = function(e){
		var code = e.keyCode;
		date = new Date();
		lastTime = date.getTime();
		if (lastTime - firstTime > 100 && key) {
			setDerict(code);
		}
	}
	closePage.onclick = function(){
		over.style.display = "none";
		startPage.style.display = "block";
		stopPage.style.display = "none";
		spanScore[0].innerHTML = score;
	}
	stopPage.onclick = function(){
		clearInterval(snakeMove);
		stopPage.style.display = "none";
		stopOverPage.style.display = "block";
		key = false;
	}
	stopOverPage.onclick = function(){
		stopOverPage.style.display = "none";
		snakeMove = setInterval(function(){
			move();
		}, speed);
		stopPage.style.display = "block";
		key = true;
	}
}
function setDerict(code){
	switch (code) {
		case 37:
			if (left) {
				direct = 'left';
				left = false;
				right = false;
				up = true;
				down = true;
				firstTime = lastTime;
			}
			break;
		case 38:
			if (up) {
				direct = 'up';
				left = true;
				right = true;
				up = false;
				down = false;
				firstTime = lastTime;
			}
			break;
		case 39:
			if (right) {
				direct = 'right';
				left = false;
				right = false;
				up = true;
				down = true;
				firstTime = lastTime;
			}
			break;
		case 40:
			if (down) {
				direct = 'down';
				left = true;
				right = true;
				up = false;
				down = false;
				firstTime = lastTime;
			}
			break;
		default:
			break;
	}
}
