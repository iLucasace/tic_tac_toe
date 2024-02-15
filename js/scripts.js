let x = document.querySelector(".x");
let o = document.querySelector(".o");
let boxes = document.querySelectorAll(".box");
let buttons = document.querySelectorAll("#buttons-container button");
let messageContainer = document.querySelector("#message");
let messageText = document.querySelector("#message p");
let secondPlayer;

// Move counter...
let player1 = 0;
let player2 = 0;

//Choosing game mode...
for(let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        secondPlayer = this.getAttribute("id");
        for(let j = 0; j < buttons.length; j++) {
            buttons[j].style.display = "none";
        }

        setTimeout(function() {
            let container = document.querySelector("#container");
            container.classList.remove("hide");
        }, 500);
    });
}

// Click event in the boxes...
for(let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", function() {
        let el = checkEl(player1, player2);

        // Check if the box is already filled...
        if(this.childNodes.length == 0) {
            let cloneEl = el.cloneNode(true);
            this.appendChild(cloneEl);

            //Compute the move...
            if(player1 == player2) {
                player1++;

                if(secondPlayer == "ai-player") {
                    computerPlay();
                    player2++;
                }
            } else {
                player2++;
            }
        }

        checkWinCondition();
    });
}

// Check who's playing next...
function checkEl(player1, player2) {
    if(player1 == player2) {
        // X
        el = x;
    } else {
        // O
        el = o;
    }

    return el;
}

// Check who won after each move...
function checkWinCondition() {
    let b1 = document.getElementById("block-1");
    let b2 = document.getElementById("block-2");
    let b3 = document.getElementById("block-3");
    let b4 = document.getElementById("block-4");
    let b5 = document.getElementById("block-5");
    let b6 = document.getElementById("block-6");
    let b7 = document.getElementById("block-7");
    let b8 = document.getElementById("block-8");
    let b9 = document.getElementById("block-9");
   
    //Horizontal...
    if(b1.childNodes.length > 0 && b2.childNodes.length > 0 && b3.childNodes.length > 0) {
   
      let b1Child = b1.childNodes[0].className;
      let b2Child = b2.childNodes[0].className;
      let b3Child = b3.childNodes[0].className;
   
      if(b1Child == b2Child && b1Child == b3Child) {
        declareWinner(b1Child);
      }
    }
   
    if(b4.childNodes.length > 0 && b5.childNodes.length > 0 && b6.childNodes.length > 0) {
   
      let b4Child = b4.childNodes[0].className;
      let b5Child = b5.childNodes[0].className;
      let b6Child = b6.childNodes[0].className;
   
      if(b4Child == b5Child && b6Child == b5Child) {
        declareWinner(b5Child);
      }
    }
   
    if(b7.childNodes.length > 0 && b8.childNodes.length > 0 && b9.childNodes.length > 0) {
   
      let b7Child = b7.childNodes[0].className;
      let b8Child = b8.childNodes[0].className;
      let b9Child = b9.childNodes[0].className;
   
      if(b7Child == b8Child && b9Child == b8Child) {
        declareWinner(b8Child);
      }
    }
   
    //Vertical...
    if(b1.childNodes.length > 0 && b4.childNodes.length > 0 && b7.childNodes.length > 0) {
   
      let b1Child = b1.childNodes[0].className;
      let b4Child = b4.childNodes[0].className;
      let b7Child = b7.childNodes[0].className;
   
      if(b1Child == b4Child && b7Child == b4Child) {
        declareWinner(b4Child);
      }
    }
   
    if(b2.childNodes.length > 0 && b5.childNodes.length > 0 && b8.childNodes.length > 0) {
   
      let b2Child = b2.childNodes[0].className;
      let b5Child = b5.childNodes[0].className;
      let b8Child = b8.childNodes[0].className;
   
      if(b2Child == b5Child && b8Child == b5Child) {
        declareWinner(b5Child);
      }
    }
   
    if(b3.childNodes.length > 0 && b6.childNodes.length > 0 && b9.childNodes.length > 0) {
   
      let b3Child = b3.childNodes[0].className;
      let b6Child = b6.childNodes[0].className;
      let b9Child = b9.childNodes[0].className;
   
      if(b3Child == b6Child && b9Child == b6Child) {
        declareWinner(b6Child);
      }
    }
   
    //Diagonal...
    if(b1.childNodes.length > 0 && b5.childNodes.length > 0 && b9.childNodes.length > 0) {
   
      let b1Child = b1.childNodes[0].className;
      let b5Child = b5.childNodes[0].className;
      let b9Child = b9.childNodes[0].className;
   
      if(b1Child == b5Child && b9Child == b5Child) {
        declareWinner(b5Child);
      }
    }
   
    if(b3.childNodes.length > 0 && b5.childNodes.length > 0 && b7.childNodes.length > 0) {
   
      let b3Child = b3.childNodes[0].className;
      let b5Child = b5.childNodes[0].className;
      let b7Child = b7.childNodes[0].className;
   
      if(b3Child == b5Child && b7Child == b5Child) {
        declareWinner(b5Child);
      }
    }
    
    //Tie...
    let counter = 0;
   
    for(let i = 0; i < boxes.length; i++) {
   
      if(boxes[i].childNodes[0] != undefined) {
        counter++;
      }
   
    }
   
    if(counter == 9) {
      declareWinner("Tie");
    }
   
}

//Declare the winner, update the score and clear the board...
function declareWinner(winner) {
    let scoreBoardX = document.querySelector("#scoreboard-1");
    let scoreBoardO = document.querySelector("#scoreboard-2");
    let msg = "";

    if(winner == "x") {
        scoreBoardX.textContent = parseInt(scoreBoardX.textContent) + 1;
        msg = "Player 1 wins!"
    } else if(winner == 'o') {
        scoreBoardO.textContent = parseInt(scoreBoardO.textContent) + 1;
        msg = "Player 2 wins!"
    } else {
        msg = "Tie!"
    }

    //Displays victory message...
    messageText.innerHTML = msg;
    messageContainer.classList.remove("hide");

    //Remove victory message...
    setTimeout(function() {
        messageContainer.classList.add("hide");
    }, 3000);

    //Reset moves...
    player1 = 0;
    player2 = 0;

    //Clean board...
    let boxesToRemove = document.querySelectorAll(".box div")

    for(let i = 0; i < boxesToRemove.length; i++) {
        boxesToRemove[i].parentNode.removeChild(boxesToRemove[i]);
    }

}

//Execute AI moves...
function computerPlay() {
    let cloneO = o.cloneNode(true);

    let counter = 0;
    let filled = 0;

    for(let i = 0; i < boxes.length; i++) {
        let randomNumber = Math.floor(Math.random() * 5);

        //Only fill if the child is empty...
        if(boxes[i].childNodes[0] == undefined) {
            if(randomNumber <= 1) {
                boxes[i].appendChild(cloneO);
                counter++;
                break;
            } 
        //Check how many are filled...
        } else {
            filled++;
        }
    }

    if(counter == 0 && filled < 9) {
        computerPlay();
    }

}