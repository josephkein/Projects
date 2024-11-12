//Landing Functions

var exploreBtn = document.getElementById('explore');
var gallerySection = document.getElementById('gallery');
var frontTitle = document.getElementById('frontTitle');

exploreBtn.addEventListener('click', function(){
    gallerySection.scrollIntoView({ behavior: 'smooth'});
});
/*
var firstName;
var middleName;
var lastName;
var firstOutput = document.getElementById('firstname2');
var middleOutput = document.getElementById('middlename2');
var lastOutput = document.getElementById('lastname2');
var submitBtn = document.getElementById('submit');
var outputBtn = document.getElementById('outputBtn');

submitBtn.addEventListener('click', function(){
    firstName = document.getElementById('firstname').value;
    firstOutput.textContent = firstName;

    middleName = document.getElementById('middlename').value;
    middleOutput.textContent = middleName;

    lastName = document.getElementById('lastname').value;
    lastOutput.textContent = lastName;
});

outputBtn.addEventListener('click', function(){

    var form1 = document.getElementById('form');
    var form2 = document.getElementById('form1');

    form1.style.display = 'none';
    form2.style.display = 'block';
});

var editBtn = document.getElementById('edit');

editBtn.onclick = function(){

    var form1 = document.getElementById('form');
    var form2 = document.getElementById('form1');
    
    form1.style.display = 'block';
    form2.style.display = 'none';
}
*/

var signupf = document.getElementById('sign');
var form1 = document.getElementById('form');
var form2 = document.getElementById('form1');
var loginf = document.getElementById('log');

signupf.addEventListener('click', function(){
    form1.style.display = 'none';
    form2.style.display = 'block';

});
loginf.addEventListener('click', function(){
    form1.style.display = 'block';
    form2.style.display = 'none';

});

var signPass = document.getElementById('passSign');
var confirmPass = document.getElementById('conpass');
var warnPass = document.getElementById('passNot');
var logacc = document.getElementById('emailSign');

function styleNotMatch(){   
    signPass.style.border = '2px solid';
    signPass.style.borderColor = 'black';
    confirmPass.style.border = '2px solid';
    confirmPass.style.borderColor = 'black';
    warnPass.textContent = "Password not match!";
}

function styleMatch(){
    signPass.style.border = 'none';
    signPass.style.borderColor = 'none';
    confirmPass.style.border = 'none';
    confirmPass.style.borderColor = 'none';
    warnPass.textContent = "";
}
var signBtn = document.getElementById('signnow');

signBtn.addEventListener('click', function(){

    if (confirmPass.value != signPass.value){
        styleNotMatch();
    } else{
        styleMatch();
        confirmPass.value;
    }
});

//function for incorrect password

function PassNotMatch(){ 
    emailLog.style.border = '2px solid';
    emailLog.style.borderColor = 'red';
    passLog.style.border = '2px solid';
    passLog.style.borderColor = 'red';
}

//function for correct password

function PassMatch(){
    emailLog.style.border = 'none';
    emailLog.style.borderColor = 'none';
    passLog.style.border = 'none';
    passLog.style.borderColor = 'none';
}
var emailLog = document.getElementById('email');
var passLog = document.getElementById('pass');
var logBtn = document.getElementById('submit');
var incor = document.getElementById('incorrect');
var numGuessSec = document.getElementById('numberGuess');

logBtn.addEventListener('click', function(){
    if (emailLog.value == logacc.value && passLog.value == confirmPass.value){
        PassMatch();
        numGuessSec.scrollIntoView({behavior: 'smooth'});
    } else{
        PassNotMatch();
    } 
});
var showpass = document.getElementById('showpass');

function showPass(){
    
    if(passLog.type === "password"){
        passLog.type = 'text';
    } else{
        passLog.type = 'password';
    }
}