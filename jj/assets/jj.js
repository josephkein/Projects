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
        }, 20000)
        
}
let ul = document.getElementById("ul");

document.getElementById("burger").addEventListener('click', (e) => {
    e.preventDefault();

    if (ul.style.display == "flex"){
        ul.style.display = "none";
        ul.style.width = "0%";
        ul.classList.remove("animate");
    }
    else{
        ul.style.animation = "slide 1s linear";
        ul.style.display = "flex";
        ul.style.width = "100%";
        
    }
})
let isPlaying = false;
let aud = new Audio('music/Ebe.mp3');

function playMusic(){
    if (!isPlaying){
        document.getElementById("playBtn").src = "images/pause-button.png";
        aud.play();
        isPlaying = true;
    }
    else{
        document.getElementById("playBtn").src = "images/play-button.png";
        aud.pause();
        isPlaying = false;
    }
}

let over = document.getElementById("overlay");
let letter = document.getElementById("jennycakes");
let env = document.getElementById("env");

env.addEventListener('click', (e) => {
    e.preventDefault();

    over.style.display = "flex";
    letter.style.display = "flex";
})

over.addEventListener('click', (e) => {
    e.preventDefault();

    over.style.display = "none";
    letter.style.display = "none";
})

const animate = document.querySelectorAll("[data-animate]");


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        const animation = entry.target.dataset.animate;

        if (entry.isIntersecting){
            entry.target.classList.add(animation);
        }
        else{
            entry.target.classList.remove(animation);
        }
    })
}, {
    threshold: 0.3
})


animate.forEach(a => observer.observe(a));