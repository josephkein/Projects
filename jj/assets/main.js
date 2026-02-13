
let form = document.getElementById("unlock");
let err = document.getElementById("err");
let over = document.getElementById("overlay");
let alert = document.getElementById("alert");
let ok = document.getElementById("ok");

document.getElementById("code").addEventListener('keydown', (e) => {
    err.style.display = "none";
});
let aud = new Audio('./music/dry-fart.mp3');
let aud2 = new Audio('./music/wow.mp3');
over.style.display = "none";
alert.style.display = "none";

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let code = document.getElementById("code").value;
    if (code == "buldagol"){
        over.style.display = "flex";
        alert.style.display = "flex";
        aud2.play();
        // window.location.href = "jj.html";
    }
    else{
        err.style.display = "flex";
        aud.play();
    }
});

function navigate(){
    window.location.href = "jj.html";
}

setInterval(hearts, 1000);

    function hearts(){
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "❤️";

        heart.style.left = Math.random() * 90 + "%";
        heart.style.fontSize = Math.random() * 10 + 10 + "px";
        // heart.style.animationDuration = Math.random() * 3 + 3 + "s";
        document.body.append(heart);

        setTimeout(() => {
            heart.remove();
        }, 10000)
        
    }



