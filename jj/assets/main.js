
let form = document.getElementById("unlock");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let code = document.getElementById("code").value;

    if (code == "love"){        
        window.location.href = "jj.html";
    }
});

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