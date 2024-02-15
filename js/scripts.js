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
            } else {
                player2++;
            }
        }
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

