let savings = document.getElementById("save");
let deposit = document.getElementById("dep");
let withdraw = document.getElementById("withdraw");
let depp = document.getElementById("deposit-pop");
var save = 0;
savings.textContent = save;
deposit.addEventListener('click', function(){
    let amount = document.getElementById("amt").value;
    let a = parseFloat(amount);
    depp.popover = this.hidePopover;
    if (a > 0){
    save += a;
    savings.textContent = save;
    alert("Successfully deposit!");
    }
    else {
        alert("Invalid amount to deposit.");
    }
    amount = 0;
})

withdraw.addEventListener('click', function(){
    let amountW = document.getElementById("amtW").value;
    let w = parseFloat(amountW);    
    if (amountW > save ){
        alert("Insufficient savings");
    }
    else if (save > 0){
        save -= w;
        alert("Successfully withdraw!");
    }
    savings.textContent = save;
})