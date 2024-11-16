//Landing Functions

var exploreBtn = document.getElementById('explore');
var gallerySection = document.getElementById('gallery');
var frontTitle = document.getElementById('frontTitle');

exploreBtn.addEventListener('click', function(){
    gallerySection.scrollIntoView({ behavior: 'smooth'});
});