
let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let eymail = document.getElementById('email');
let conNo = document.getElementById('conNo');

var details = [fname, lname, eymail, conNo];
let add = document.getElementById('add');

add.addEventListener('click', function(){
    let fnameAd = prompt("First name");
    let lnameAd = prompt("Last name");
    let emailAd = prompt("Email");
    let conNoAd = prompt("Contact No.");

    let detailsAd = [fnameAd, lnameAd, emailAd, conNoAd];

    details.push(detailsAd);
});