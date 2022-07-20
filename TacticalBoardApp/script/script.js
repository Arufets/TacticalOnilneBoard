/* --- OPTIMiZATION NEEDED --- */

const hamburger = document.getElementById("menu-button");
const imgBoard = document.getElementById("imgBoard");
const hamItems = document.querySelectorAll(".hamburger-item");
const boardContainer = document.getElementById("board-container")
const addButtonHome = document.getElementById("create-element-home");
const removeButtonHome = document.getElementById("remove-element-home");
const addButtonAway = document.getElementById("create-element-away");
const removeButtonAway = document.getElementById("remove-element-away");
const changeClrHomeBtn = document.getElementById("changePlayerColorHome");
const changeClrAwayBtn = document.getElementById("changePlayerColorAway");
const resetClrHomeBtn = document.getElementById("resetPlayerColorHome");
const resetClrAwayBtn = document.getElementById("resetPlayerColorAway");
const container = document.getElementById("content");
const playersListContainerHome = document.getElementById("plcHome");
const playersListContainerAway = document.getElementById("plcAway");
const playerSettingsBtn = document.getElementById("settings");
let nav = document.getElementById("nav");
let toolbar = document.getElementById("toolbar-container");
let draggablesHome = document.getElementsByClassName("circleHome");
let draggablesAway = document.getElementsByClassName("circleAway");
let numberOfcirclesAway = 1;
let numberOfcirclesHome = 1;


hamburger.addEventListener("click", showHamMenu);
function showHamMenu(){
	for(let i = 0; i < hamItems.length; i++){
		hamItems[i].classList.toggle("hidden");
	}
}

for(let i = 0; i < hamItems.length; i++){
	hamItems[i].addEventListener("click", changeImgBoard);
	function changeImgBoard(event){
		if (event.target.id == "imgFootball") {
			imgBoard.src = "../TacticalBoardApp/img/football_pitch.png";
			showHamMenu();
			
		} else if(event.target.id == "imgBasketball"){
			imgBoard.src = "../TacticalBoardApp/img/bball_court";
			showHamMenu();
			
		}
	}
}

window.addEventListener("scroll", stickyToolbar);
function stickyToolbar(){
	let scrollFromTop = document.documentElement.scrollTop;
	let height = nav.offsetHeight;
	if(scrollFromTop > height){
		toolbar.classList.add("fixed");
	} else {
		toolbar.classList.remove("fixed");
	}
}

addButtonHome.addEventListener("mousedown", addCircleHome)
function addCircleHome() {
	if(addButtonHome.parentElement.id == "box-left"){
		let colorHome = document.getElementById("selectPlayerColorHome").value;
		let div = document.createElement("div");
		let divBox = document.createElement("div");
		let span = document.createElement("span");
		let maxPlayerNumber;
		divBox.classList.add("circleBox")
		div.classList.add("circleHome");
		div.setAttribute("id", "idHome-" + numberOfcirclesHome);
		divBox.appendChild(div);
		divBox.appendChild(span);

		let playersSettings = `
			<p class="playerListItem">
				<label>Player number:</label><input type="text" placeholder="Set player number" class="setNumber"
				data="${"idHome-" + numberOfcirclesHome}">
				<label>Player surname:</label><input type="text" placeholder="Set player surname" class="setSurname" data="${"idHome-" + numberOfcirclesHome}">
			</p>
		`;

		let imgBoard = document.getElementById("imgBoard");
		if (imgBoard.src.match("../TacticalBoardApp/img/bball_court")) {
			maxPlayerNumber = 6;
		} else {
			maxPlayerNumber = 12;
		}

		if (numberOfcirclesHome < maxPlayerNumber) {
			dropboxHome.appendChild(divBox);
			playersListContainerHome.insertAdjacentHTML("beforeend", playersSettings);
			numberOfcirclesHome += 1;
		}

		if(document.getElementById("selectPlayerColorHome") == "#ff0000"){
			let colorHomeDefault = document.getElementById("selectPlayerColorHome").defaultValue;
			div.style.backgroundColor = colorHomeDefault;
		} else {
			div.style.backgroundColor = colorHome;
		}

		let setNumber = document.getElementsByClassName("setNumber");
		for(let i = 0; i < setNumber.length; i++){
			setNumber[i].addEventListener("change", setPlayerNumber);
			function setPlayerNumber(){
				if(setNumber[i].getAttribute("data") == div.id){
					div.innerText = setNumber[i].value;
				}
			}
		}

		let setSurname = document.getElementsByClassName("setSurname");
		for(let i = 0; i < setNumber.length; i++){
			setSurname[i].addEventListener("change", setPlayerNumber);
			function setPlayerNumber(){
				if(setSurname[i].getAttribute("data") == div.id){
					span.innerText = setSurname[i].value;
				}
			}
		}
	}
}

removeButtonHome.addEventListener("mousedown", removeCircleHome)
function removeCircleHome() {
	let ids = "idHome-" + (numberOfcirclesHome - 1);
	let removedCircle = document.getElementById(ids);

	let setNumber = document.querySelectorAll(".setNumber");

	for(let i = 0; i < setNumber.length; i++){
		if(setNumber[i].getAttribute("data") == ids){
			setNumber[i].parentNode.remove();
		}
	}

	if(removedCircle){
		removedCircle.remove();
	}

	numberOfcirclesHome -= 1;
}

addButtonAway.addEventListener("mousedown", addCircleAway)
function addCircleAway() {
	if(addButtonAway.parentElement.id == "box-right"){
		let colorAway = document.getElementById("selectPlayerColorAway").value;
		let div = document.createElement("div");
		let divBox = document.createElement("div");
		let span = document.createElement("span");
		let maxPlayerNumber;
		divBox.classList.add("circleBox")
		div.classList.add("circleAway");
		div.setAttribute("id", "idAway-" + numberOfcirclesAway);
		divBox.appendChild(div);
		divBox.appendChild(span);

		let playersSettings = `
			<p class="playerListItem">
				<label>Player number:</label><input type="text" placeholder="Set player number" class="setNumber"
				data="${"idAway-" + numberOfcirclesAway}">
				<label>Player surname:</label><input type="text" placeholder="Set player surname" class="setSurname" data="${"idAway-" + numberOfcirclesAway}">
			</p>
		`;

		let imgBoard = document.getElementById("imgBoard");
		if (imgBoard.src.match("../TacticalBoardApp/img/bball_court")) {
			maxPlayerNumber = 6;
		} else {
			maxPlayerNumber = 12;
		}

		if (numberOfcirclesAway < maxPlayerNumber) {
			dropboxAway.appendChild(divBox);
			playersListContainerAway.insertAdjacentHTML("beforeend", playersSettings);
			numberOfcirclesAway += 1;
		}

		if(document.getElementById("selectPlayerColorAway") == "#ff0000"){
			let colorAwayDefault = document.getElementById("selectPlayerColorAway").defaultValue;
			div.style.backgroundColor = colorAwayDefault;
		} else {
			div.style.backgroundColor = colorAway;
		}

		let setNumber = document.getElementsByClassName("setNumber");
		for(let i = 0; i < setNumber.length; i++){
			setNumber[i].addEventListener("change", setPlayerNumber);
			function setPlayerNumber(){
				if(setNumber[i].getAttribute("data") == div.id){
					div.innerText = setNumber[i].value;
				}
			}
		}

		let setSurname = document.getElementsByClassName("setSurname");
		for(let i = 0; i < setNumber.length; i++){
			setSurname[i].addEventListener("change", setPlayerNumber);
			function setPlayerNumber(){
				if(setSurname[i].getAttribute("data") == div.id){
					span.innerText = setSurname[i].value;
				}
			}
		}
	}
}

removeButtonAway.addEventListener("mousedown", removeCircleAway);
function removeCircleAway() {
	let ids = "idAway-" + (numberOfcirclesAway - 1);
	let removedCircle = document.getElementById(ids);

	let setNumber = document.querySelectorAll(".setNumber");

	for(let i = 0; i < setNumber.length; i++){
		if(setNumber[i].getAttribute("data") == ids){
			setNumber[i].parentNode.remove();
		}
	}

	if(removedCircle){
		removedCircle.remove();
	}
	
	numberOfcirclesAway -= 1;
}

changeClrHomeBtn.addEventListener("mousedown", changeColorHome);
function changeColorHome() {
	let colorHome = document.getElementById("selectPlayerColorHome").value;
	for (let i = 0; i < draggablesHome.length; i++) {
		draggablesHome[i].style.backgroundColor = colorHome;
	}
	console.log(colorHome);
}

changeClrAwayBtn.addEventListener("mousedown", changeColorAway);
function changeColorAway() {
	let colorAway = document.getElementById("selectPlayerColorAway").value;
	for (let i = 0; i < draggablesAway.length; i++) {
		draggablesAway[i].style.backgroundColor = colorAway;
	}
	console.log(colorAway);
}

resetClrHomeBtn.addEventListener("mousedown", resetColorHome);
function resetColorHome(){
	document.getElementById("selectPlayerColorHome").value = "#ff0000";
	for (let i = 0; i < draggablesHome.length; i++) {
		draggablesHome[i].style.backgroundColor = "#ff0000";
	}
}

resetClrAwayBtn.addEventListener("mousedown", resetColorAway);
function resetColorAway(){
	document.getElementById("selectPlayerColorAway").value = "#0000ff";
	for (let i = 0; i < draggablesAway.length; i++) {
		draggablesAway[i].style.backgroundColor = "#0000ff";
	}
}

container.addEventListener('mousedown', dragAndDrop)
function dragAndDrop(event){
	if (event.target.classList.contains('circleHome') || event.target.classList.contains('circleAway')) {
		const ball = event.target;

		let shiftX = event.clientX - ball.parentElement.getBoundingClientRect().left;
		let shiftY = event.clientY - ball.parentElement.getBoundingClientRect().top;

		ball.parentElement.style.position = "absolute";
		ball.parentElement.style.zIndex = 2000;

		container.append(ball.parentElement);

		function moveAt(pageX, pageY) {
			ball.parentElement.style.left = pageX - shiftX + "px";
			ball.parentElement.style.top = pageY - shiftY + "px";
		}

		moveAt(event.pageX, event.pageY);

		function onMouseMove(event) {
			moveAt(event.pageX, event.pageY);
		}

		document.addEventListener('mousemove', onMouseMove);

		ball.parentElement.addEventListener("mouseup", function() {
			document.removeEventListener('mousemove', onMouseMove);
			ball.parentElement.onmouseup = null;
		});

		ball.parentElement.addEventListener("dragstart", function() {
			return false;
		});		
	}
}

playerSettingsBtn.addEventListener("mousedown", showSettings);
function showSettings(){
	const settingsCont = document.getElementById("playerSettingsContainer");
	settingsCont.classList.toggle("hidden");
}

