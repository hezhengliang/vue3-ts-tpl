"use strict";
import Hammer from 'hammerjs'



let num = 5;

//create cards for page
export function initCards(card, index) {
  let tinderContainer = document.querySelector(".tinder");
  let allCards = document.querySelectorAll(".tinder--card");
	//the cards that haven't been removed
	var newCards = document.querySelectorAll(".tinder--card:not(.removed)");

	newCards.forEach(function (card, index) {
		//put the card in front
		card.style.zIndex = allCards.length - index;
		//angle the card and make it smaller the further back it goes
		card.style.transform =
			"scale(" + (20 - index) / 20 + ") translateY(-" + 50 * index + "px)";
		//change how opaque it is depending where it is in the stack (index 0 is fully opaque). uses 5 so that anything loaded after 5 is fully transparent
		// card.style.opacity = (5 - index) / 5;
	});

	//give the ones that get initialized a "loaded" class
	tinderContainer.classList.add("loaded");
}


function nodeToString(node) {
	var tmpNode = document.createElement("div");
	tmpNode.appendChild(node.cloneNode(true));
	var str = tmpNode.innerHTML;
	tmpNode = node = null; // prevent memory leaks in IE
	return str;
}

function cleanCurrentCard(thisCard) {
	let cleanedCard = nodeToString(thisCard)
		.replace(/(\r\n|\n|\r)/gm, "")
		.replace(" removed", "");
	return cleanedCard;
}

function removeRemoveClass() {
	var element = document.querySelector(".tinder--card");
	element.classList.remove("removed");
}

//my custom function
function addNewCard(thisCard) {
	console.log(thisCard);
	let cleanedCard = cleanCurrentCard(thisCard);

	//increment the number to be given to the card
	num++;

	//card area
	var allCardsArea = document.querySelector(".tinder--cards");

	//add a card to the end of the innerHTML
	setTimeout(function () {
		allCardsArea.innerHTML += cleanedCard;
		//remove the .removed ones
		const paras = document.getElementsByClassName("removed");
		while (paras[0]) {
			paras[0].parentNode.removeChild(paras[0]);
		}
		// removeRemoveClass();
	}, 300);

	//try to get newest card at back to fade in
	//ooor just add so many that the last one is completely transparent since the opacity changes by .10 each card

	//run these two after a delay that is slightly longer than the delay for adding the new card
	//this makes a new card at the back and then transitions it smoothly to the smaller size
	setTimeout(initCards, 301);
	setTimeout(addHammers, 301);
}

export function addHammers() {
	//redefined to be able to reinitialize on new card add
	let allCards = document.querySelectorAll(".tinder--card");

	allCards.forEach(function (el) {
		//initialize hammer on each card
		const hammertime = new Hammer(el);

		//add the moving class if the card is being panned
		hammertime.on("pan", function (event) {
			el.classList.add("moving");
		});

		//don't do anything if the movement hasn't changed
		hammertime.on("pan", function (event) {
			if (event.deltaX === 0) return;
			if (event.center.x === 0 && event.center.y === 0) return;

			//angle the further it goes right or left
			const xMulti = event.deltaX * 0.03;
			//angle the further it goes up or down
			const yMulti = event.deltaY / 80;

			//rotation is a combo of both
			const rotate = xMulti * yMulti;

			//apply the movement and rotation
			event.target.style.transform =
				"translate(" +
				event.deltaX +
				"px, " +
				event.deltaY +
				"px) rotate(" +
				rotate +
				"deg)";
		});

		//when you're done with the panning event
		hammertime.on("panend", function (event) {
			//remove the 'moving' class from the card
			el.classList.remove("moving");

			//set var for width of the body (including padding)
			const moveOutWidth = document.body.clientWidth;

			//determine if the card should be kept on screen. (Gotta be changed by a certain amount and be moving)
		  const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

			//toggle the removed class if the keep var has not evaluated to true
			event.target.classList.toggle("removed", !keep);

			//if the keep value evaluates true, set transform to nothing
			if (keep) {
				event.target.style.transform = "";
			} else {
				//if it's not being kept onscreen, move it on out
				//calculate all of the movements and whatnot
				const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
				const toX = event.deltaX > 0 ? endX : -endX;
				const endY = Math.abs(event.velocityY) * moveOutWidth;
				const toY = event.deltaY > 0 ? endY : -endY;
				const xMulti = event.deltaX * 0.03;
				const yMulti = event.deltaY / 80;
				const rotate = xMulti * yMulti;

				event.target.style.transform =
					"translate(" +
					toX +
					"px, " +
					(toY + event.deltaY) +
					"px) rotate(" +
					rotate +
					"deg)";

				//add the card to the back
				addNewCard(event.target);
			}
		});
	});
}
