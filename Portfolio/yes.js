var menu = document.getElementById('menu');
var menuBar = document.getElementById('menav');

menu.addEventListener('click', function(){

   if (menuBar.style.display != 'none'){
        menuBar.style.display = 'none';
   } else {
        menuBar.style.display = 'block';
   }
});

let homePage = document.getElementById('menH');
let aboutPage = document.getElementById('menA');
let skillsPage = document.getElementById('menS');


homePage.addEventListener('click', function(){
     menuBar.style.display = 'none';
});
aboutPage.addEventListener('click', function(){
     menuBar.style.display = 'none';
});
skillsPage.addEventListener('click', function(){
     menuBar.style.display = 'none';
});