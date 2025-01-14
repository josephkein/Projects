let btn = document.getElementById("generate");
let add = document.getElementById("add");
let motiv = document.getElementById("motiv");
let life = document.getElementById("life");
let love = document.getElementById("love");
let categ = document.getElementById("categ");
let p = document.getElementById("quotes");

motiv.addEventListener('click', function(){
    categ.textContent = motiv.textContent;
});
life.addEventListener('click', function(){
    categ.textContent = life.textContent;
});
love.addEventListener('click', function(){
    categ.textContent = love.textContent;
});


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

function motivationalQuotes(){

    let motivateQuotes = ["\"Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.\"", //Albert Schweitzer
        "\"There are no secrets to success. It is the result of preparation, hard work, and learning from failure.\"" , //Colin Powell
        "\"The future belongs to those who believe in the beauty of their dreams.\"", //Eleanor Roosevelt
        "\"Failure is simply the opportunity to begin again, this time more intelligently.\"", //Henry Ford
        "\"Your time is limited, so don’t waste it living someone else's life.\"", //Steve Jobs
        "\"It always seems impossible until it’s done.\"", //Nelson Mandela
        "\"The only way to do great work is to love what you do.\"", //Steve Jobs
        "\"Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.\"", //Christian D. Larson
        "\"Start where you are. Use what you have. Do what you can.\"", //Arthur Ashe
        "\"Do not wait to strike till the iron is hot, but make it hot by striking.\"", //William Butler Yeats
        ];

    let motivateAuthors = ["Albert Schweitzer",
        "Colin Powell",
        "Eleanor Roosevelt",
        "Henry Ford",
        "Steve Jobs",
        "Nelson Mandela",
        "Steve Jobs",
        "Christian D. Larson",
        "Arthur Ashe",
        "William Butler Yeats"
    ];

    let spn = document.getElementById("quotes");
    let spn1 = document.getElementById("authors");

    let randomQuotes = "";
    let authors = "- ";

    let randomQuote = Math.floor(Math.random() * motivateQuotes.length);
    randomQuotes += motivateQuotes[randomQuote];

    for (let i = 1; i <= motivateAuthors.length; i++)
    {
        switch (randomQuote)
        {
            case i:
            authors += motivateAuthors[i];
            spn1.textContent = authors;
            break;    
        }
    }


    spn.textContent = randomQuotes;

}


function aboutlifeQuotes(){

    let lifeQuotes = ["\"In the middle of every difficulty lies opportunity.\"", //Albert Einstein
        "\"Happiness is not something ready made. It comes from your own actions.\"" , //Dalai Lama
        "\"Knowing yourself is the beginning of all wisdom.\"", //Aristotle
        "\"Be the change that you wish to see in the world.\"", //Mahatma Gandhi    
        "\"Life is what happens when you’re busy making other plans.\"", //John Lennon
        "\"In three words I can sum up everything I’ve learned about life: it goes on.\"", //Robert Frost
        "\"Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.\"", //Buddha
        "\"Life isn’t about finding yourself. It’s about creating yourself.\"", //George Bernard Shaw
        "\"The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate, to have it make some difference that you have lived and lived well.\"", //Ralph Waldo Emerson
        "\"The greatest glory in living lies not in never falling, but in rising every time we fall.\"", //Nelson Mandela
        ];
    
    let lifeAuthors = ["Albert Einstein",
        "Dalai Lama",
        "Aristotle",
        "Mahatma Gandhi",
        "John Lennon",
        "Robert Frost",
        "Buddha",
        "George Bernard Shaw",
        "Ralph Waldo Emerson",
        "Nelson Mandela"
    ];
    
    let spn = document.getElementById("quotes");
    let spn1 = document.getElementById("authors");
    
    let randomQuotes = "";
    let authors = "- ";
    
    let randomQuote = Math.floor(Math.random() * lifeQuotes.length);
    randomQuotes += lifeQuotes[randomQuote];
    
    for (let i = 1; i <= lifeAuthors.length; i++)
    {
        switch (randomQuote)
        {
            case i:
            authors += lifeAuthors[i];
            spn1.textContent = authors;
            break;    
        }
    }
    
    
    spn.textContent = randomQuotes;
    
}
    
function lovelifeQuotes(){

    let loveQuotes = ["\"Love is composed of a single soul inhabiting two bodies.\"", //Aristotle
        "\"When I saw you I fell in love, and you smiled because you knew.\"" , //Arrigo Boito
        "\"A friend is someone who knows all about you and still loves you.\"", //Elbert Hubbard
        "\"Love is an endless act of forgiveness. Forgiveness is the key to action and freedom.\"", //Maya Angelou
        "\"Friendship is born at that moment when one person says to another, 'What! You too? I thought I was the only one.'\"", //C.S. Lewis
        "\"A true friend is somebody who can make us feel better no matter how bad things may be.\"", //Ralph Waldo Emerson
        "\"Family means no one gets left behind or forgotten.\"", //David Ogden Stiers
        "\"Family is not an important thing. It’s everything.\"", //Michael J. Fox
        "\"To love oneself is the beginning of a lifelong romance.\"", //Oscar Wilde
        "\"Self-love is not selfish; you cannot truly love another until you know how to love yourself.\"", //RuPaul
        ];
    
    let loveAuthors = ["Aristotle",
        "Arrigo Boito",
        "Elbert Hubbard",
        "Maya Angelou",
        "C.S. Lewis",
        "Ralph Waldo Emerson",
        "David Ogden Stiers",
        "Michael J. Fox",
        "Oscar Wilde",
        "RuPaul"
    ];
    
    let spn = document.getElementById("quotes");
    let spn1 = document.getElementById("authors");
    
    let randomQuotes = "";
    let authors = "- ";
    
    let randomQuote = Math.floor(Math.random() * loveQuotes.length);
    randomQuotes += loveQuotes[randomQuote];
    
    for (let i = 1; i <= loveAuthors.length; i++)
    {
        switch (randomQuote)
        {
            case i:
            authors += loveAuthors[i];
            spn1.textContent = authors;
            break;    
        }
    }
    
    
    spn.textContent = randomQuotes;
    
}

add.addEventListener('click', function(){
    alert("We apologize for the inconvenience!\n\nThank you for exploring our feature! We're currently working hard to add functionality to this section. We appreciate your patience and support as we continue improving. Please stay tuned for updates!");
});



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