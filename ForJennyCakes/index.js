let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');
let btn2y = document.getElementById('btn2Y');
let btn3 = document.getElementById('btn3');
let kidBtn = document.getElementById('kidBtn');
let btn5 = document.getElementById('btn5');
let btn6 = document.getElementById('btn6');
let flowerBtn = document.getElementById('btn4');
let letterBtn = document.getElementById('btn4Y');

btn1.addEventListener('click', function(){
    let form1 = document.getElementById('kumusta');
    let form2 = document.getElementById('second-kumusta');

    form1.style.display = 'none';
    form2.style.display = 'flex';
});

btn2.addEventListener('click', function(){
    let form2 = document.getElementById('second-kumusta');
    let form3 = document.getElementById('third-kumusta');
    let aud = new Audio('wehh-di-nga.mp3');

    aud.play();
    form2.style.display = 'none';
    form3.style.display = 'flex';
});
btn2y.addEventListener('click', function(){
    let form2 = document.getElementById('second-kumusta');
    let form3 = document.getElementById('third-kumusta');
    let aud1 = new Audio('wehh-di-nga.mp3');

    aud1.play();
    form2.style.display = 'none';
    form3.style.display = 'flex';
});

btn3.addEventListener('click', function(){
    let form3 = document.getElementById('third-kumusta');
    let kidAs = document.getElementById('kidding-kumusta');

    form3.style.display = 'none';
    kidAs.style.display = 'flex';
});

kidBtn.addEventListener('click', function(){
    let kidAs = document.getElementById('kidding-kumusta');
    let form4 = document.getElementById('fourth-kumusta');

    form4.style.display = 'flex';
    kidAs.style.display = 'none';
});

var flowAud = new Audio('ssstik.io_1731765167598.mp3');

flowerBtn.addEventListener('click', function(){
    let form4 = document.getElementById('fourth-kumusta');
    let flower = document.getElementById('flower');

    flowAud.play();
    form4.style.display = 'none';
    flower.style.display = 'flex';

});

btn5.addEventListener('click', function(){
    let flower = document.getElementById('flower');
    let form4 = document.getElementById('fourth-kumusta');

    flowAud.pause();
    flower.style.display = 'none';
    form4.style.display = 'flex';
});

var aud2 = new Audio('ssstik.io_1730202009660.mp3');

letterBtn.addEventListener('click', function(){
    let letter = document.getElementById('letter-form');
    let form4 = document.getElementById('fourth-kumusta');

    aud2.play();
    form4.style.display = 'none';
    letter.style.display = 'flex';
});

btn6.addEventListener('click', function(){
    let letter = document.getElementById('letter-form');
    let form4 = document.getElementById('fourth-kumusta');

    aud2.pause();
    letter.style.display = 'none';
    form4.style.display = 'flex';
});