let btn = document.getElementById("generate");
let motiv = document.getElementById("motiv");
let life = document.getElementById("life");
let love = document.getElementById("love");
let categ = document.getElementById("categ");
let p = document.getElementById("quotes");

//Chamged the text content of the category


motiv.addEventListener('click', function(){
    categ.textContent = motiv.textContent;
});
life.addEventListener('click', function(){
    categ.textContent = life.textContent;
});
love.addEventListener('click', function(){
    categ.textContent = love.textContent;
});

//Call the function of the category selected

btn.addEventListener('click', function(){
    if (categ.textContent == motiv.textContent)
    {
        motivationalQuotes();
    } else if (categ.textContent == life.textContent)
    {
        aboutlifeQuotes();
    } else if (categ.textContent == love.textContent)
    {
        lovelifeQuotes();
    }   
     else {
        p.textContent = "Please select a category before submitting!";
     }
});



async function motivationalQuotes(){

    const quotes = await fetch('motivational.json');
    const data = await quotes.json();

    let randomQuote = Math.floor(Math.random() * data.length);
    const {quote, author} = data[randomQuote];

    let spn = document.getElementById("quotes");
    let spn1 = document.getElementById("authors");

    spn1.textContent = `- ${author}`;
    spn.textContent = `"${quote}"`;

}


async function aboutlifeQuotes(){

    const quotes = await fetch('life.json');
    const data = await quotes.json();

    let randomQuote = Math.floor(Math.random() * data.length);
    const {quote, author} = data[randomQuote];

    let spn = document.getElementById("quotes");
    let spn1 = document.getElementById("authors");

    spn1.textContent = `- ${author}`;
    spn.textContent = `"${quote}"`;
    
}
    
async function lovelifeQuotes(){

    const quotes = await fetch('love.json');
    const data = await quotes.json();

    let randomQuote = Math.floor(Math.random() * data.length);
    const {quote, author} = data[randomQuote];

    let spn = document.getElementById("quotes");
    let spn1 = document.getElementById("authors");

    spn1.textContent = `- ${author}`;
    spn.textContent = `"${quote}"`;
    
}



/* let addQuote;
let addAuthor;

add.addEventListener('click', function(){
    addQuote = prompt("Add quote");
    addAuthor = prompt("Add its author");

    motivateQuotes.unshift(addQuote);
    motivateAuthors.unshift(addAuthor);

});


Romantic Love:
"Love is composed of a single soul inhabiting two bodies." – Aristotle
"Love is an endless act of forgiveness. Forgiveness is the key to action and freedom." – Maya Angelou
"When I saw you I fell in love, and you smiled because you knew." – Arrigo Boito
Friendship:
"A friend is someone who knows all about you and still loves you." – Elbert Hubbard
"Friendship is born at that moment when one person says to another, 'What! You too? I thought I was the only one.'" – C.S. Lewis
"A true friend is somebody who can make us feel better no matter how bad things may be." – Ralph Waldo Emerson
Family:
"Family is not an important thing. It’s everything." – Michael J. Fox
"Family means no one gets left behind or forgotten." – David Ogden Stiers
"The family is one of nature's masterpieces." – George Santayana
Self-Love:
"You yourself, as much as anybody in the entire universe, deserve your love and affection." – Buddha
"To love oneself is the beginning of a lifelong romance." – Oscar Wilde
"Self-love is not selfish; you cannot truly love another until you know how to love yourself." – RuPaul

*/