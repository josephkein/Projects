let player = document.getElementById("player");
let computer = document.getElementById("computer");
const playAgain = document.getElementById("ag");

const choices = [{ choice: "papel", src: "papel-removebg-preview.png"},
                 { choice: "gunting", src: "gunting-removebg-preview.png"},
                 { choice: "bato", src: "bato-removebg-preview.png"}];
const [papel, gunting, bato] = choices;

function returnChoice(choice){
    let sr, comSr;
    let playerC, computerC;
    let ran = Math.floor(Math.random() * 3) + 1;

    player.style.animation = "batopick 1.8s ease infinite";
    computer.style.animation = "batopick 1.8s ease infinite";
    document.getElementById("choices").style.display = "none";

    if (choice == papel.choice){
        sr = papel.src;
        playerC = papel.choice;
    }
    else if (choice == gunting.choice){
        sr = gunting.src;
        playerC = gunting.choice;
    }
    else{
        sr = bato.src;
        playerC = bato.choice;
    }
    if (ran == 1){
        comSr = papel.src;
        computerC = papel.choice;
    }
    else if (ran == 2){
        comSr = gunting.src;
        computerC = gunting.choice;
    }
    else{
        comSr = bato.src;
        computerC = bato.choice;
    }
    let aud = null;
    setTimeout(() =>{
        computer.src = comSr;
        player.src = sr;
        player.style.animation = "none";
        computer.style.animation = "none";
        if (winner(playerC, computerC) == "PLAYER WINS"){
            aud = new Audio('kids-saying-yay-sound-effect_3.mp3');
            aud.play();
        }
        else if (winner(playerC, computerC) == "COMPUTER WINS"){
            aud = new Audio('malupiton-aray-ko.mp3');
            aud.play();
        }
        else{
            aud = new Audio('dry-fart.mp3');
            aud.play();
        }
        document.getElementById("wins").textContent = winner(playerC, computerC);
        document.getElementById("ag").style.display = "flex";
    }, 2000);
}

playAgain.addEventListener('click', function(){
    document.getElementById("wins").textContent = "BATO BATO PICK"
    player.src = bato.src;
    computer.src = bato.src;
    player.style.animation = "none";
    computer.style.animation = "none";
    document.getElementById("choices").style.display = "flex";
    document.getElementById("ag").style.display = "none";
});

function play(){

}

function winner(plyer, com){
    if (plyer === com) {
        return "DRAW";
    }
    if (
        (plyer === "bato" && com === "gunting") ||
        (plyer === "gunting" && com === "papel") ||
        (plyer === "papel" && com === "bato")
    ) {
        return "PLAYER WINS";
    } else {
        return "COMPUTER WINS";
    }
}