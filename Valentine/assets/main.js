let no = document.getElementById("no");
let yes = document.getElementById("yes");
let add = 0;

no.addEventListener('click', function(){
    add += 80;

    yes.style.fontSize = add + "px";
});
