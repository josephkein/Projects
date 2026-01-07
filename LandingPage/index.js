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

const burgerBtn =document.getElementById("burger");
let isOpen = false;

burgerBtn.addEventListener('click', () => {

    if (!isOpen){
        document.getElementById("navUL").style.display = "flex";
        isOpen = true;
    }
    else{
        document.getElementById("navUL").style.display = "none";
        isOpen = false;
    }
})