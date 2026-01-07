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
