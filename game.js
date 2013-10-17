var
	ele = document.getElementById('savespacew'),
	winwidth=window.innerWidth,
	winheight=window.innerHeight;
var 
	forceaddpoint =0,
	addponitsheightp=0,
	addponitsheightc=0,
	addponitsheight=0,
	diffup=0,
	canupgrade=0,
	title = 'None', //for heightrecord
	highscorenames, //real name
	highscorename, //name added space
	fps=50,
	startofgame = 0,
	oLoop, //reserved
	gLoop, //Main loop
	points = 0,
	rev = 0,
	heightrecord = 0, //height reached by player
	state = false,
	canvas = document.getElementById('canvas'), 
	ctx = canvas.getContext('2d');
	var iconsize = 40;
	var iconpos = 10;
	var iconspacing =5;
	//canvas2 = document.getElementById('canvas2'), 
	//ctx2 = canvas.getContext('2d');
	
	var datastr = 'NO NAME   99999NO Name   99998NO Name   99997NO Name   99996NO Name   99995NO Name   99994NO Name   99993NO Name   99992NO Name   99991NO Name   99990';
//alert(datastr);
	var score=new Array(10);
	var username=new Array(10);
	var width,
		height;
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
		height = 426;

	}
	else {
	height = 450;
	
	}
		
	width = 320;


	canvas.width = width;
	canvas.height = height;
	//canvas2.width = width;
	//canvas2.height = height;
	var img2 = new Image();
	img2.src = 'instruction.png';

	
	
//Levels
var edulvl = 0;
var	inflvl = 0;
var	indlvl = 0;
var	govlvl = 0;
var	canlvl = 0;
var	maxlvl = 4;
var	minlvl = 0;//current minium level
	
//Pause State
var gamePaused=false;


//Upgrade icon

var eduimg = new Image();
	eduimg.src = 'img/edu.png';
var indimg = new Image();
	indimg.src = 'img/ind.png';
var infimg = new Image();
	infimg.src = 'img/inf.png';
var govimg = new Image();
	govimg.src = 'img/gov.png';
	
var clear = function(){
//Change Colour
if (heightrecord<100) ctx.fillStyle = '#D5EDFF';
else if (heightrecord<200) ctx.fillStyle = '#CBE3F5';
else if (heightrecord<300) ctx.fillStyle = '#C1D9EB';
else if (heightrecord<400) ctx.fillStyle = '#B7CFE1';
else if (heightrecord<500) ctx.fillStyle = '#ADC5D7';
else if (heightrecord<500) ctx.fillStyle = '#99B1C3';
else if (heightrecord<600) ctx.fillStyle = '#8FA7B9';
else if (heightrecord<700) ctx.fillStyle = '#859DAF';
else if (heightrecord<800) ctx.fillStyle = '#7B93A5';
else if (heightrecord<900) ctx.fillStyle = '#71899B';
else if (heightrecord<1000) ctx.fillStyle = '#677F91';
else if (heightrecord<1200) ctx.fillStyle = '#5D7587';
else if (heightrecord<1500) ctx.fillStyle = '#496173';
else if (heightrecord<1800) ctx.fillStyle = '#354D5F';
else if (heightrecord<2000) ctx.fillStyle = '#7D8F67';
else ctx.fillStyle = '#90677E';
	ctx.font = "9pt Arial";
	ctx.clearRect(0, 0, width, height);
	ctx.beginPath();
	ctx.rect(0, 0, width, height);
	ctx.closePath();
	ctx.fill();

}

var howManyCircles = 10, circles = [];
	var img2 = new Image();
	img2.src = 'img/instruction copy2.png';
	var img1 = new Image();
	img1.src = 'img/instruction copy.png';

var platformWidth = 65;

//Prestart
var count = 0;
var hcount = 0;
var prestart = function(){

	
	clear();
	MoveCircles(3);
	DrawCircles();
	
	

	if (count==0){
	ctx.drawImage(img1,0,0,width,height);
	}
	else if(count>0){
	
	ctx.drawImage(img2,0,0,width,height);
	count=2;
	}
	if(!state){
		if (83 in keysDown || 32 in keysDown) { // S
		if(count==0) {
		count=1;
		}
		else if (count==2){
		clearTimeout(gLoop);
		clearstat();
		state= true;
		gLoop = setTimeout(GameLoop, 1000 / fps);
		}
	}
	$("#canvas").click(function(){
		if(count==0) {
		
		count=1;
		
		}
		else if (count==2){
		clearTimeout(gLoop);
		//alert("Clear from Prestart");
		clearstat();
		state= true;
		$('#canvas').unbind('click');
		count=3;
			GameLoop();
		}
	});
	
	$('#canvas').bind('tap', function() {
		if(count==0) {
		count=1;
		}
		else if (count==2){
		clearTimeout(gLoop);
		//alert("Clear from Prestart");
		clearstat();
		state= true;
		$('#canvas').unbind('tap');
		count=3;
			GameLoop();
		}
	});	
	
	}
	if(!state)
	gLoop= setTimeout(prestart,1000/ fps);

}
var clearstat = function(){
	if(!state){
		platformWidth = 65;
	 	edulvl = 0;
		inflvl = 0;
		indlvl = 0;
		govlvl = 0;
		canlvl = 0;
		maxlvl = 4;
		minlvl = 0;
		heightrecord = 0;
		points = 0;
		rev = 0;
		diffup=0;
		canupgrade=0;
		hcount= 0;
		addponitsheight =0;
		addponitsheightc =0;
		addponitsheightp=0;
		forceaddpoint=0;
		}
}
//Highscore board
var highscoreboard = function(){
	clear();
	MoveCircles(3);
	DrawCircles();
			ctx.fillStyle = "Black";
			ctx.font = "10pt Arial";
			for(i=0;i<=8;i++){
				ctx.fillText("0"+(i+1)+': ' + username[i], 80, 80+i*30);
				ctx.fillText(score[i], width/2+50, 80+i*30);
				}
				ctx.fillText((10)+': ' + username[9], 80, 80+9*30);
				ctx.fillText(score[9], width/2+50, 80+9*30);
				
			ctx.fillStyle = "Black";
			ctx.font = "16pt Arial";
			ctx.fillText('Online High Scores', 75, 40);
			ctx.font = "14pt Arial";
			ctx.fillText("Click or touch anywhere to restart.", 22, 420);
			ctx.font = "9pt Arial";
	



	$("#canvas").click(function(){

		if (hcount==0){
		clearTimeout(gLoop);
		//alert("Clear from Prestart");
		clearstat();
		state= true;
		$('#canvas').unbind('click');
		hcount=1;
			GameLoop();
		}
	});
	
	$('#canvas').bind('tap', function() {
		if (hcount==0){
		clearTimeout(gLoop);
		//alert("Clear from Prestart");
		clearstat();
		state= true;
		$('#canvas').unbind('tap');
		hcount=1;
			GameLoop();
		}
	});	
	
	
	if(!state)
	gLoop= setTimeout(highscoreboard,1000/ fps);

}
//Game Over
var conclusion = function (){
	$(savespacec).simpledialog2({
    mode : 'button',
	animate: false,
    headerText : 'GAME OVER',
	headerClose: false,
	buttonPrompt : 'Congratulations!<br\>Your score: '+points +'. <br/>Height reached: '+heightrecord+'.<br/> Your title is '+title+'.<br/>Please enter your name and submit the score.',
	buttonInput: true,
    buttons : {
		
      'Submit Score': {
		touchstart:function () {
		insert();
		restart();
		submitscore();
      
		},
        click: function () {
		insert();
		restart();		
		submitscore();
		
		//alert('between check and restart');
        }
		}
	  }
    })
}	



var restart = function (){

	$(savespacer).simpledialog2({
    mode : 'button',
	animate: false,
    headerText : 'GAME OVER',
	headerClose: false,
	buttonPrompt : 'Congratulations!<br\>Your score: '+points +'. <br/>Height reached: '+heightrecord+'. <br/>Your title is '+title+'.',
	buttonInput: false,
    buttons : {
      'View online highscores': {
		touchstart:function () {
			hcount=0;
			highscoreboard();
		},
        click: function () {
			hcount=0;
			highscoreboard();
        }

      },
      'Restart': {
		touchstart:function () {
			clearTimeout(gLoop);
		clearstat();
		state= true;
		GameLoop();
		},
        click: function () {
        	clearTimeout(gLoop);
		clearstat();
		state= true;
		GameLoop();
        },
        icon: "delete",
        theme: "c"
      }
	  }
    })
}	

function dim(type){
	ctx.fillStyle = "rgba(0, 0, 0, 0.7)";  
	if(type==1)
	ctx.fillRect (0, 0, width,height/4 );  
	if(type==2)
	ctx.fillRect (0, height/4, width,height/2 );  
}



//Change Infrastructure Level
function ChangeInf(){
if (inflvl==0) platformWidth =65;
else if(inflvl==1) platformWidth=69; //+4
else if(inflvl==2) platformWidth=72; //+3
else if(inflvl==3) platformWidth=74; //+2
else if(inflvl==4) platformWidth=75; //+1

}

//Pause
function pauseGame() {
  if (!gamePaused) {
    gLoop = clearTimeout(gLoop);
    gamePaused = true;
  } else if (gamePaused) {
    gLoop = setTimeout(GameLoop, 1000 / fps);
    gamePaused = false;
  }
}
//After upgrade
function afterupgrade(){
	if(player.jumpSpeed < 17)
	player.jumpSpeed = 17 + govlvl*2;
	canlvl=0;
	pauseGame();
}



for (var i = 0; i < howManyCircles; i++) 
	circles.push([Math.random() * width, Math.random() * height, Math.random() * 100, Math.random() / 2+0.2]);
	//transparency-[3]
var DrawCircles = function(){
	for (var i = 0; i < howManyCircles; i++) {
		ctx.fillStyle = 'rgba(255, 255, 255, ' + circles[i][3] + ')';
		
		
		ctx.beginPath();
		//arc(x-[0], y-[1], radius-[2], startAngle, endAngle, anticlockwise)  
		ctx.arc(circles[i][0], circles[i][1], circles[i][2], 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
		
	}
};

var MoveCircles = function(e){
	for (var i = 0; i < howManyCircles; i++) {
	
		if (circles[i][1] - circles[i][2] > height) {
			circles[i][0] = Math.random() * width;
			circles[i][2] = Math.random() * 100;
			circles[i][1] = 0
			circles[i][3] = Math.random() / 2+0.2;
		}
		else {
		//alert(circles[i][1]);
			circles[i][1] += e;
		}
	}
};

var player = new (function(){
	var that = this;
	that.image = new Image();

	that.image.src = "player.png";
	that.width = 65;
	that.height = 95;
	//that.frames = 1;
	//that.actualFrame = 0;
	that.X = 0;
	that.Y = 0;	

	that.isJumping = false;
	that.isFalling = false;
	that.jumpSpeed = 0;
	that.fallSpeed = 0;
	
    that.jump = function() {
		if (!that.isJumping && !that.isFalling) {
			that.fallSpeed = 0;
			that.isJumping = true;
			
			
			
			that.jumpSpeed = 17 + govlvl*2;
		}
	}
	
	that.checkJump = function() {
		//a lot of changes here
				
		if (that.Y > height*0.4) {
			that.setPosition(that.X, that.Y - that.jumpSpeed);		
		}
		else {
			if (that.jumpSpeed > 10) {
				points++;
				rev++;
				heightrecord++;
				addponitsheight++;
				}
			if(that.jumpSpeed > 10 && that.jumpSpeed%5==0){
				points+=indlvl;
				rev+=indlvl;
				addponitsheight+=(indlvl);
			}
			// if player is in mid of the gamescreen
			// dont move player up, move obstacles down instead
			MoveCircles(that.jumpSpeed * 0.5);
			
			platforms.forEach(function(platform, ind){
				platform.y += that.jumpSpeed;

				if (platform.y > height) {
					var type = ~~(Math.random() * 5);
					if (type == 0) 
						type = 1;
					else 
						type = 0;
					
					platforms[ind] = new Platform(Math.random() * (width - platformWidth), platform.y - height, type, 0);
				}
			});
		}
		
		
		that.jumpSpeed--;
		if (that.jumpSpeed == 0) {
			that.isJumping = false;
			that.isFalling = true;
			that.fallSpeed = 1;
		}
	
	}
	
	that.fallStop = function(){
		that.isFalling = false;
		that.fallSpeed = 0;
		that.jump();	
	}
	
	that.checkFall = function(){
		if (that.Y < height - that.height) {
			that.setPosition(that.X, that.Y + that.fallSpeed);
			that.fallSpeed++;
		} else {
			if (points == 0) 
				that.fallStop();
			else {
				//alert("GAMEOVER IS CALLED");
				GameOver();
				}
		}
	}
	
	that.moveLeft = function(){
		if (that.X > 0) {
			that.image.src = "player2.png";
			that.setPosition(that.X - 5, that.Y);
		}
	}
	
	that.moveRight = function(){
		if (that.X + that.width < width) {
			that.image.src = "player.png";
			that.setPosition(that.X + 5, that.Y);
		}
	}

	
	that.setPosition = function(x, y){
		that.X = x;
		that.Y = y;
	}
	
	//that.interval = 0;
	that.draw = function(){
		try {
			ctx.drawImage(that.image, that.X, that.Y, that.width, that.height);
		} 
		catch (e) {
		};
		
		//if (that.interval == 4 ) {
		//	if (that.actualFrame == that.frames) {
		//		that.actualFrame = 0;
		//	}
		//	else {
		//		that.actualFrame++;
		//	}
		//	that.interval = 0;
		//}
		//that.interval++;		
	}
})();


player.setPosition(~~((width-player.width)/2), height - player.height);
player.jump();
//Mouse event
document.onmousemove = function(e){
	if (player.X + canvas.offsetLeft > e.pageX) {
		player.moveLeft();
	} else if (player.X + canvas.offsetLeft < e.pageX) {
		player.moveRight();
	}
	
}



//Keyboard event

var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);




//Touch events
document.ontouchstart= function(e){

	

	if (player.X + canvas.offsetLeft > e.changedTouches[0].clientX){
	player.moveLeft();
	player.moveLeft();
	}
	if (player.X + canvas.offsetLeft < e.changedTouches[0].clientX)
	{
	player.moveRight();
	player.moveRight();
	}
	
}

document.ontouchmove= function(e){
	event.preventDefault();
	if (player.X + canvas.offsetLeft > e.changedTouches[0].clientX){
	player.moveLeft();
	player.moveLeft();
	}
	if (player.X + canvas.offsetLeft < e.changedTouches[0].clientX)
	{
	player.moveRight();
	player.moveRight();
	}
}

	var nrOfPlatforms = 7, 
		platforms = [],
		
		platformHeight = 19;
		 
	var Platform = function(x, y, type, used){
		var that=this;
		that.image = new Image();
		that.image.src = "img/income.png"
		//that.firstColor = '#FF8C00';
		//that.secondColor = '#EEEE00';
		that.onCollide = function(){

			player.fallStop();
		};
		
		if (type === 1) {
			//that.firstColor = '#AADD00';
			//that.secondColor = '#698B22';
			that.image.src = "img/GST.png"
			that.onCollide = function(){
				player.fallStop();
				player.jumpSpeed = 50  + govlvl*2;
			};
		}
		
		
		that.x = ~~ x;
		that.y = y;
		that.type = type;
		
		//NEW IN PART 5
		that.isMoving = (Math.random()+(~~(heightrecord/500))/2);
		//alert((~~(heightrecord/500))+'  '+that.isMoving);
		if (that.isMoving >=1) that.isMoving =1;
		that.direction= ~~(Math.random() * 2) ? -1 : 1;
			
		that.draw = function(){
			ctx.drawImage(that.image, that.x, that.y, platformWidth, platformHeight);
			//ctx.fillStyle = 'rgba(255, 255, 255, 1)';
			//var gradient = ctx.createRadialGradient(that.x + (platformWidth/2), that.y + (platformHeight/2), 5, that.x + (platformWidth/2), that.y + (platformHeight/2), 45);
			//gradient.addColorStop(0, that.firstColor);
			//gradient.addColorStop(1, that.secondColor);
			//ctx.fillStyle = gradient;
			//ctx.fillRect(that.x, that.y, platformWidth, platformHeight);
		};
	
		return that;
	};
		
	var generatePlatforms = function(){
		var position = 0, type;
		for (var i = 0; i < nrOfPlatforms; i++) {
			type = ~~(Math.random()*5);
			if (type == 0) 
				type = 1;
			else 
				type = 0;
			platforms[i] = new Platform(Math.random() * (width - platformWidth), position, type, 0);
			if (position < height - platformHeight) 
				position += ~~(height / nrOfPlatforms);
		}
	}();
	
	var checkCollision = function(){
	platforms.forEach(function(e, ind){
		if (
		(player.isFalling) && 
		(player.X +15< e.x + platformWidth) && 
		(player.X + player.width -15> e.x) && 
		(player.Y + player.height > e.y) && 
		(player.Y + player.height < e.y + platformHeight)
		) {
			//Contact with platform && Education Effect
			if(e.used!=1) {
			if(e.type==1){
			points += edulvl*3+5;
			rev += edulvl*3+5;
			addponitsheight+=(edulvl*3+5);
			forceaddpoint =1;
			}
			else if(e.type==0){
			points += edulvl*2+2;
			rev += edulvl*2+2;	
			addponitsheight+=(edulvl*2+2);
			forceaddpoint =1;
			}
			e.used = 1;
			}	
			e.onCollide();
		}
	})
	}
	
//New Upgrade System********************************New Upgrade System****************************
var upgradenew = function(){

$("#canvas").click(function(e){
	if(canupgrade){
		//alert('offset'+canvas.offsetLeft+' x: '+e.pageX+' y: '+e.pageY);
		$('#canvas').unbind('click');
		if(e.pageX-canvas.offsetLeft < 55 && e.pageY>8 && e.pageY< 8+iconsize ){
			
			if(edulvl<maxlvl && rev>=(edulvl+1)*100){
			//alert(e.pageY+' Education upgraded!');
			canupgrade=0;
			edulvl++;
			rev-=edulvl*100;
			afterupgrade();
			}
			else if (rev<(edulvl+1)*100) Nomoney((edulvl+1)*100);
			else Maxlevel();
		

	}
		else if(e.pageX-canvas.offsetLeft < 55 && e.pageY>8+iconsize+iconspacing && e.pageY< 8+iconsize*2+iconspacing ){
			//alert(e.pageY+' Infrastructure upgraded!');
			if(inflvl<maxlvl && rev>=(inflvl+1)*100){
			canupgrade=0;
			inflvl++;
			ChangeInf();
			rev-=inflvl*100;
			afterupgrade();
			}
			else if (rev<(inflvl+1)*100) Nomoney((inflvl+1)*100);
			else Maxlevel();
		

	}
		else if(e.pageX-canvas.offsetLeft < 55 && e.pageY>8+iconsize*2+iconspacing*2 && e.pageY< 8+iconsize*3+iconspacing*2 ){
			//alert(e.pageY+' Industry upgraded!');
			if(indlvl<maxlvl && rev>=(indlvl+1)*100){
			canupgrade=0;
			indlvl++;
			rev-=indlvl*100;
			afterupgrade();
			}
			else if (rev<(indlvl+1)*100) Nomoney((indlvl+1)*100);
			else Maxlevel();

	}
		else if(e.pageX-canvas.offsetLeft < 55 && e.pageY>8+iconsize*3+iconspacing*3 && e.pageY< 8+iconsize*4+iconspacing*3 ){
			//alert(e.pageY+' Government upgraded!');
			if(govlvl<maxlvl && rev>=(govlvl+1)*100){
			canupgrade=0;
			govlvl++;
			rev-=govlvl*100;
			afterupgrade();
			}
			else if (rev<(govlvl+1)*100) Nomoney((govlvl+1)*100);
			else Maxlevel();

	}
		else{
			canupgrade=0;
			canlvl++;
			pauseGame();
		}
	}
});

document.ontouchstart= function(e){
	if(canupgrade){
		
		if(e.changedTouches[0].clientX-canvas.offsetLeft < 55 && e.changedTouches[0].clientY>8 && e.changedTouches[0].clientY< 8+iconsize ){
			//alert(e.pageY+' Education upgraded!');
			if(edulvl<maxlvl && rev>=(edulvl+1)*100){
			canupgrade=0;
			edulvl++;
			rev-=edulvl*100;
			afterupgrade();
			}
			else if (rev<(edulvl+1)*100) Nomoney((edulvl+1)*100);
			else Maxlevel();
		}
		else if(e.changedTouches[0].clientX-canvas.offsetLeft < 55 && e.changedTouches[0].clientY>8+iconsize+iconspacing && e.changedTouches[0].clientY< 8+iconsize*2+iconspacing ){
			//alert(e.pageY+' Infrastructure upgraded!');
			if(inflvl<maxlvl && rev>=(inflvl+1)*100){
			canupgrade=0;
			inflvl++;
			ChangeInf();
			rev-=inflvl*100;
			afterupgrade();
			}
			else if (rev<(inflvl+1)*100) Nomoney((inflvl+1)*100);
			else Maxlevel();
		

	}
		else if(e.changedTouches[0].clientX-canvas.offsetLeft < 55 && e.changedTouches[0].clientY>8+iconsize*2+iconspacing*2 && e.changedTouches[0].clientY< 8+iconsize*3+iconspacing*2 ){
			//alert(e.pageY+' Industry upgraded!');
			if(indlvl<maxlvl && rev>=(indlvl+1)*100){
			canupgrade=0;
			indlvl++;
			rev-=indlvl*100;
			afterupgrade();
			}
			else if (rev<(indlvl+1)*100) Nomoney((indlvl+1)*100);
			else Maxlevel();

	}
		else if(e.changedTouches[0].clientX-canvas.offsetLeft < 55 && e.changedTouches[0].clientY>8+iconsize*3+iconspacing*3 && e.changedTouches[0].clientY< 8+iconsize*4+iconspacing*3 ){
			//alert(e.pageY+' Government upgraded!');
			if(govlvl<maxlvl && rev>=(govlvl+1)*100){
			canupgrade=0;
			govlvl++;
			rev-=govlvl*100;
			afterupgrade();
			}
			else if (rev<(govlvl+1)*100) Nomoney((govlvl+1)*100);
			else Maxlevel();

	}		
		else{
		
			canupgrade=0;
			canlvl++;		
			pauseGame();
		}
	}
	
}
}
	

var Nomoney = function(e){
	alert('You only have S$ '+rev+'. S$ ' + e + ' is required.');
	upgradenew();
  /*$(savespacen).simpledialog2({
    mode : 'button',
	animate: false,
    headerText : 'Oops.',
    headerClose: false,
	buttonPrompt: 'You only have S$ '+rev+'. <br/>S$ ' + e + ' is required.',
    buttons : {
      'Back': {
		touchstart:function () {
		upgrade();
		},
        click: function () {
		upgrade();
        },
        icon: "delete",
        theme: "c"
      }
	  }
    })
  */
}

var Wait = function(){
	//alert("waitcalled");
	ele.style.display = "block";

  
}
  


var Maxlevel = function(){
	alert("'Maximum level for this upgrade has been reached.'");
	upgradenew();
  /*$(savespacem).simpledialog2({
    mode : 'button',
	animate: false,
    headerText : 'Oops.',
    headerClose: false,
	buttonPrompt: 'Maximum level for this upgrade has been reached.',
    buttons : {
      'Back': {
		touchstart:function () {
		upgrade();
		},
        click: function () {
		upgrade();
        },
        icon: "delete",
        theme: "c"
      }
	  }
    })
  */
}


//Old Upgrade system
	//-deleted
//Main
var GameLoop = function(){
	



	clear();
	//MoveCircles(5);
	DrawCircles();

	if (player.isJumping) player.checkJump();
	if (player.isFalling) player.checkFall();
	
	player.draw();

//Difficulty Level Platform Moving	
	platforms.forEach(function(platform, index){
		if (platform.isMoving) {
			if (platform.x < 0) {
				platform.direction = 1;
			} else if (platform.x > width - platformWidth) {
				platform.direction = -1;
			}
				if(heightrecord<=1000)
				platform.x += ~~ (platform.direction * (Math.random()*5) * (heightrecord / 500));
				else
				platform.x += platform.direction * (Math.random()*5) * 2;
			}
		platform.draw();
	});
	//Keyboard
	
	if (80 in keysDown) { // P
	pauseGame();
	}
	
	
	
	if (65 in keysDown) { // A
		player.moveLeft();
		player.moveLeft();
	}
	if (68 in keysDown) { // D
		player.moveRight();
		player.moveRight();
	}

	checkCollision();
	
//Display stats
	ctx.font = "9pt Arial";
	ctx.fillStyle = "Black";
	ctx.fillText("S$: " + rev, width-80, 22);
	//ctx.fillText("Height:" + heightrecord, width-80, 32);
	ctx.fillStyle = "#ffca00";
	ctx.font = "18pt Arial";
	ctx.fillText("Score:" + points, 110, 30);	

	
	ctx.font = "9pt Arial";
	
//Get points
if(addponitsheight!=0){
	//alert(addponitsheight);
	if(addponitsheightc>=0){
	if(forceaddpoint ==1){
		//alert(forceaddpoint);
		addponitsheightc+=20;
		forceaddpoint=0;
		addponitsheightp= addponitsheight;
	}
	else if(addponitsheight==1) {
	addponitsheightc+=20;
	addponitsheightp=1;
	
	}
	else if(addponitsheight>addponitsheightp){
	addponitsheightc=20;
	addponitsheightp= addponitsheight;
	}
	else{
	addponitsheightc--;
	}
	
	ctx.font = "18pt Arial";
	ctx.fillText("+ " + addponitsheight, 130, 53);
	}
	else{
	addponitsheightc=0;
	addponitsheight=0;
	}
}

//Upgrade Message& Controls
	if(canupgrade){
	dim(1);
		var edup='',
		infp='',
		indp='',
		govp='';
		if(rev>=(edulvl+1)*100)
		edup ='Education';
		if(rev>=(inflvl+1)*100)
		infp ='Infrastructure';
		if(rev>=(indlvl+1)*100)
		indp ='Industry';
		if(rev>=(govlvl+1)*100)
		govp ='Government';
		ctx.font = "9pt Arial";
	ctx.fillStyle = "#ffca00";
	ctx.fillText("The following upgrade available:", 60,48);
	ctx.fillText(edup+" "+infp+" "+indp+" "+govp, 60,60);
	ctx.fillText("<--Click or tap on the icons to upgrade.", 60,72);
	ctx.fillText("Click or tap anywhere else to skip.", 60,84);
	$('#canvas').bind('click');
	pauseGame();
	upgradenew();
	
	}
	ctx.fillStyle = "Black";
	//ctx.fillText("Pause:" + gamePaused, 10, height-80);
	//ctx.fillText("Height:" + heightrecord, 10, height-70);
	//ctx.fillText("Revenue:" + rev, 10, height-60);
	//ctx.fillText("Education:" + edulvl, 10, height-50);
	//ctx.fillText("Infrastructure:" + inflvl, 10, height-40);
	//ctx.fillText("Industry:" + indlvl, 10, height-30);
	//ctx.fillText("Government:" + govlvl, 10, height-20);
	ctx.globalAlpha = 0.6;
	ctx.drawImage(eduimg,10,iconpos,iconsize,iconsize);
	ctx.drawImage(infimg,10,iconpos+(iconsize+iconspacing),iconsize,iconsize);
	ctx.drawImage(indimg,10,iconpos+2*(iconsize+iconspacing),iconsize,iconsize);
	ctx.drawImage(govimg,10, iconpos+3*(iconsize+iconspacing),iconsize,iconsize);
	
	ctx.globalAlpha = 0.85;
	ctx.font = "14pt Arial";
	ctx.fillText(edulvl, 25, iconpos+iconsize/2+10);
	ctx.fillText(inflvl, 25, iconpos+(iconsize+iconspacing)+iconsize/2+10);
	ctx.fillText(indlvl, 25, iconpos+2*(iconsize+iconspacing)+iconsize/2+10);
	ctx.fillText(govlvl, 25, iconpos+3*(iconsize+iconspacing)+iconsize/2+10);
	ctx.font = "9pt Arial";
	ctx.globalAlpha = 1;
	
	//Upgrade system detection
	//if (points-100*totallevel>100&&points!=0)
	//if (edulvl+inflvl+indlvl+govlvl<16 && points-100*(edulvl+inflvl+indlvl+govlvl+canlvl)>100){
	if(!gamePaused){
	if (edulvl ==0 || inflvl==0 || indlvl==0 || govlvl==0){
		if(rev>=(minlvl+1)*100*(canlvl+1)){
		//if(rev>100+canlvl*100){
			//
			//upgrade();
			canupgrade=1;

			}

	}
	else if (edulvl ==1 || inflvl==1 || indlvl==1 || govlvl==1){
		minlvl=1;
		if(rev>=(minlvl+1)*100*(canlvl+1)){
		//if(rev>200+canlvl*200){
			//pauseGame();
			//upgrade();
			canupgrade=1;

			}
	}
	else if (edulvl ==2 || inflvl==2 || indlvl==2 || govlvl==2){
		minlvl=2;
		if(rev>=(minlvl+1)*100*(canlvl+1)){
		//if(rev>300+canlvl*300){
			//pauseGame();
			//upgrade();
			canupgrade=1;

			}
	}
	else if (edulvl ==3 || inflvl==3 || indlvl==3 || govlvl==3){
		minlvl=3;
		if(rev>=(minlvl+1)*100*(canlvl+1)){
		//if(rev>400+canlvl*400){
			//pauseGame();
			//upgrade();
			canupgrade=1;
			
			}
	}
	}
	if(heightrecord>100) nrOfPlatforms--;
	if (state&&!gamePaused)
	gLoop = setTimeout(GameLoop, 1000 / fps);
	
}

	var GameOver = function(){
		state = false;
		clearTimeout(gLoop);
			setTimeout(function(){
			clear();
			//ctx.fillStyle = "Black";
			//ctx.font = "9pt Arial";
			//ctx.fillText("GAME OVER", width / 2 - 60, height / 2 - 50);
			//ctx.fillText("YOUR RESULT:" + points, width / 2 - 60, height / 2 - 30);
		}, 100);
//Get title********************************
		if (points>50){
		
		if (points<100) title= 'Newbie Tax Collector'
		else if (points<200) title= 'Apprentice Tax Collector'
		else if (points<500) title= 'Graduate Tax Collector'
		else if (points<800) title= 'Pro Tax Collector'
		else if (points<1000) title= 'Veteran Tax Collector'
		else if (points<1500) title= 'Expert Tax Collector'
		else if (points<2000) title= 'Elite Tax Collector'
		else if (points<2500) title= 'Champion Tax Collector'
		else if (points<3000) title= 'Master Tax Collector'
		else title= 'Grand Master Tax Collector'
		}

		getData();
				
		
		


	};

	
  



	//gLoop = setTimeout(GameLoop, 1000 / fps);
$(document).ready(function() {
	//alert(height);
	clearTimeout(gLoop);
	prestart();
	GameLoop();

});

//highscorerelated

var loadscore = function(){


	//alert('in loadscore'+datastr);
	for (var i = 0; i < 10; i++) {
	username[i]=datastr.substr(15*i,10);
	score[i]=parseInt(datastr.substr(15*i+10,5),10);
	}
	
}

var check = function() {
//alert("check is called; " + points+'&'+score[9]);
	if ((points-score[9])>0) {
	conclusion();

	}
	else
	{restart();}
}

var submitscore = function(){
		savescore();
	postData();
	}

var insert= function(){
	for (var i = 9; score[i]<points; i--) {
		score[i]=score[i-1];
		username[i]=username[i-1];
	}
	//alert("position:"+i);
	score[i+1]=points;
	//alert($.mobile.sdLastInput);
	highscorenames=$.mobile.sdLastInput,
	highscorename=$.mobile.sdLastInput+'          ';
	highscorename=highscorename.substr(0,10);
	username[i+1]=highscorename;
	//alert(points+" "+username[i+1]);
}

var savescore = function(){
	datastr='';
	for (var i = 0; i<10; i++) {
	datastr=datastr+username[i];
	if (score[i]<10000) datastr=datastr+'0';
	if (score[i]<1000) datastr=datastr+'0';
	if (score[i]<100) datastr=datastr+'0';
	if (score[i]<10) datastr=datastr+'0';
	datastr=datastr+score[i];
	}
	//alert('savescore:'+datastr);
}


// *********************************************************************************

var sha1Value;
function ApplyTextForHash()
{
    
    var text4Hash = "ACJC"+datastr +"rmm5YLHWZxyxfU/0I/NJCO1o5l8=";
    sha1Value = Sha1.hash(text4Hash)
    $('#sha1_for_data').text(sha1Value);
    
}
function postData()
{	
		var UserName = "ACJC";
		var gameData = datastr;
		//alert('gameData:'+gameData);
		  ApplyTextForHash();
		var hash4Data = sha1Value;
		var postUrl = "http://iras20th.sg/User/SaveData";
		var jsonObjects = { UserName: UserName, TextData: gameData, HashedValue:hash4Data };
		//alert('jsonObj:'+jsonObjects);
		FlyJSONP.post({
        url: postUrl,
        parameters: jsonObjects,
        success:  function(datastr) {
        	//alert('success'+datastr);
		 alert(highscorenames+ ', your score has been successfully submitted.');
        },
		error: function (errorMsg) {
				alert("An error has occured, please resubmit your score.");
			},
			complete: function () {
				 
			}
		})
		};
function getData()
{
	Wait();
	var UserName = "ACJC";
	//var that = $("#savespacer").busy({ position : 'right', hide : false, img:'img/busy.gif' });
	var postUrl = "http://iras20th.sg/User/GetData";
	var jsonObjects = { UserName: UserName };
	FlyJSONP.post({
			url: postUrl,
			parameters: jsonObjects,
			success: function (data) {
		//		alert(JSON.stringify(data));
				datastr=JSON.parse(JSON.stringify(data)).Data;
				//datastr=JSON.stringify(data).substr(25,150);
				//alert('ingetdata datastr='+datastr);
			},
			error: function () {
				alert("Connection to server failed, your high score will not be saved");
			},
			complete: function () {
				ele.style.display = "none";
						loadscore();
		//alert('loadscore in GameOver end');
				check();
				
			}
		});
		
}

	