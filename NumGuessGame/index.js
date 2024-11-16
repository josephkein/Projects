const guesBtn = document.getElementById('guessBtn');
let randomNum = Math.floor(Math.random() * 100) + 1;

guesBtn.addEventListener('click', function(){

    let guessInput = document.getElementById('guessNum').value;
    let output = document.getElementById('result');
    let attempt = document.getElementById('attempt');
    let x = 0;
  
    if (guessInput > randomNum){

        output.style.color = 'yellow';
        output.textContent = guessInput + " is too high!";
        var audio = new Audio('images&audio/wrong-47985.mp3');
        audio.play();

    } else if (guessInput < randomNum){

        output.style.color = 'yellow';
        output.textContent = guessInput + " is too low!";
        var audio1 = new Audio('images&audio/wrong-47985.mp3');
        audio1.play();

    } else{

        output.style.color = '#4BB543';
        output.textContent = guessInput + " is correct!";
        var audio3 = new Audio('images&audio/correct-156911.mp3');
        audio3.play();

    }

});