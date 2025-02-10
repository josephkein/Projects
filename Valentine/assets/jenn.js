let bck = document.getElementById("bck");
let title = document.getElementById("tit");
let gf1 = document.getElementById("gif1");
let anm = document.getElementById("anm");

bck.addEventListener('click', function(){
    title.style.display = "none";
    gf1.style.display = "none";
    bck.style.display = "none";
    for (let card of cards)
        {
            card.style.display = "flex";
        }
        tf.style.display = "flex";
        anm.style.display = "flex";
});

let card1 = document.getElementById("card1");
let card2 = document.getElementById("card2");
let card3 = document.getElementById("card3");
let card4 = document.getElementById("card4");
let card5 = document.getElementById("card5");
let card6 = document.getElementById("card6");
let cards = [card1, card2, card3, card4, card5, card6];
let sgBtn = document.getElementById("sg");
let tf = document.getElementById("tf");
let fd = document.getElementById('food');
let lst = document.getElementById("lst");
let bruh = document.getElementById("bruh");
let cat = document.getElementById("cat");
let yum = document.getElementById("ano");

sgBtn.addEventListener('click', function(){
    for (let card of cards)
        {
            card.style.display = "none";
        }
        tf.style.display = "none";
        lst.style.display = "flex";
        bruh.style.display = "flex";
        cat.style.display = "flex";
        yum.style.display = "flex";
        fd.textContent = "PORK SISIG";
        var audio1 = new Audio('mm.mp3');
        audio1.play();
        
});
let pcBtn = document.getElementById("pc");

pcBtn.addEventListener('click', function(){
    for (let card of cards)
        {
            card.style.display = "none";
        }
        tf.style.display = "none";
        lst.style.display = "flex";
        bruh.style.display = "flex";
        cat.style.display = "flex";
        yum.style.display = "flex";
        fd.textContent = "PORK CHOP";
        var audio1 = new Audio('mm.mp3');
        audio1.play();
});
let bfBtn = document.getElementById("bf");

bfBtn.addEventListener('click', function(){
    for (let card of cards)
        {
            card.style.display = "none";
        }
        tf.style.display = "none";
        lst.style.display = "flex";
        bruh.style.display = "flex";
        cat.style.display = "flex";
        yum.style.display = "flex";
        fd.textContent = "BUFFALO WINGS";
        var audio1 = new Audio('mm.mp3');
        audio1.play();
});
let bqBtn = document.getElementById("bq");

bqBtn.addEventListener('click', function(){
    for (let card of cards)
        {
            card.style.display = "none";
        }
        tf.style.display = "none";
        lst.style.display = "flex";
        bruh.style.display = "flex";
        cat.style.display = "flex";
        yum.style.display = "flex";
        fd.textContent = "BARBECUE";
        var audio1 = new Audio('mm.mp3');
        audio1.play();
});
let sfBtn = document.getElementById("sf");

sfBtn.addEventListener('click', function(){
    for (let card of cards)
        {
            card.style.display = "none";
        }
        tf.style.display = "none";
        lst.style.display = "flex";
        bruh.style.display = "flex";
        cat.style.display = "flex";
        yum.style.display = "flex";
        fd.textContent = "SEAFOOD BOIL";
        var audio1 = new Audio('mm.mp3');
        audio1.play();
});