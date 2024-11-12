var menu = document.getElementById('menu');

menu.addEventListener('click', function(){
    let menuBar = document.getElementById('menav');

   if (menuBar.style.display != 'none'){
        menuBar.style.display = 'none';
   } else {
        menuBar.style.display = 'block';
   }
});