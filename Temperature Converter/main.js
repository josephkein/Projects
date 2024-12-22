let inpt = document.getElementById('inpTem');
let Tofar =  document.getElementById('far');
let Tocel =  document.getElementById('cel');
let res =  document.getElementById('reslt');
let con =  document.getElementById('con');
let temp;

con.addEventListener('click', function(){
    
    if (Tofar.checked)
    {
        toFar();
    }
    else if (Tocel.checked)
    {
        toCel();
    }
    else
    {
        confirm("Please Select!");
    }
});


function toFar(){
    temp = Number(inpt.value);
    temp = (temp * 1.8) + 32;

    res.textContent = temp.toFixed(1) + "°F";
}

function toCel(){
    temp = Number(inpt.value);
    temp = (temp - 32) * 0.5556;

    res.textContent = temp.toFixed(1) + "°C";
}