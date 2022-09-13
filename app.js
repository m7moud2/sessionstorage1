//Define an array to hold users as they're added in the new registration page
var userArray = [];

//On first load, skip this step (null check)
//But when returning to the main page after adding users, get all the added users
//out of the array passed between the pages and into the working userArray
if(JSON.parse(sessionStorage.getItem('passingArray')) != null){
	for(i=0;i<JSON.parse(sessionStorage.getItem('passingArray')).length;i++){
	 	userArray.push(JSON.parse(sessionStorage.getItem('passingArray'))[i]);
	};
};
//log the list of users for convenience and troubleshooting
console.log(userArray);

//When the enter button is clicked, call the fucntion to grab the id and pw entered
//and check user authentication
document.getElementById('enter').onclick = function (){authenticate()};

//Autheticate user function
function authenticate(){

	var un = document.getElementById('un').value;
	var pw = document.getElementById('pw').value;

//once users have been added to the user array,
//check the stored usernames and passwords against the known
//if there's a match let them in
//if you get to the end of the array of known users
//i will have incremented all the way to the array's length (less 1)
//this tells you there was no match and calls troubleshoot
//troubleshoot helps determine which fields to clear
//  Valid un and   valid pw -> clear both fields
//  Valid un and invalid pw -> clear pw only
//Invalid un and   valid pw -> clear both fields
//Invalid un and invalid pw -> clear both fields
	if(userArray.length>0){
		for(i=0; i<userArray.length; i++){
			if((un == userArray[i].un) && (pw == userArray[i].pw)){
				alert("You're in!");
				document.getElementById('un').value = "";
				document.getElementById('pw').value = "";
				break;
			}
			if(i==userArray.length-1 || userArray.length==0){
				console.log('working')
				troubleshoot(un, pw);
			}
		}
	}else{//enter here on first load when there are no users in the array yet
		alert("No match found. Please click the Create Account link to register a new username");
		document.getElementById('un').value = "";
		document.getElementById('pw').value = "";
	}

};
//If there is a match in the known usernames clear only the pw field so user
//doesn't have to retype un
//If there is no match in the known usernames clear both un and pw fields
function troubleshoot(un, pw){
		for(j=0; j<userArray.length; j++){
			if(un == userArray[j].un){
				alert("Bad password");
				document.getElementById('pw').value = "";
				break;
			};
			if(j==userArray.length-1 || userArray.length==0){
				alert("No match found. Please click the Create Account link to register a new username");
				document.getElementById('un').value = "";
				document.getElementById('pw').value = "";
			};
		};
};
// init
var maxx = document.body.clientWidth;
var maxy = document.body.clientHeight;
var halfx = maxx / 2;
var halfy = maxy / 2;
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = maxx;
canvas.height = maxy;
var context = canvas.getContext("2d");
var dotCount = 200;
var dots = [];
// create dots
for (var i = 0; i < dotCount; i++) {
  dots.push(new dot());
}

// dots animation
function render() {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, maxx, maxy);
  for (var i = 0; i < dotCount; i++) {
    dots[i].draw();
    dots[i].move();
  }
  requestAnimationFrame(render);
}

// dots class
// @constructor
function dot() {
  
  this.rad_x = 2 * Math.random() * halfx + 1;
  this.rad_y = 1.2 * Math.random() * halfy + 1;
  this.alpha = Math.random() * 360 + 1;
  this.speed = Math.random() * 100 < 50 ? 1 : -1;
  this.speed *= 0.1;
  this.size = Math.random() * 5 + 1;
  this.color = Math.floor(Math.random() * 256);
  
}

// drawing dot
dot.prototype.draw = function() {
  
  // calc polar coord to decart
  var dx = halfx + this.rad_x * Math.cos(this.alpha / 180 * Math.PI);
  var dy = halfy + this.rad_y * Math.sin(this.alpha / 180 * Math.PI);
  // set color
  context.fillStyle = "rgb(" + this.color + "," + this.color + "," + this.color + ")";
  // draw dot
  context.fillRect(dx, dy, this.size, this.size);
  
};

// calc new position in polar coord
dot.prototype.move = function() {
  
  this.alpha += this.speed;
  // change color
  if (Math.random() * 100 < 50) {
    this.color += 1;
  } else {
    this.color -= 1;
  }
  
};

// start animation
render();