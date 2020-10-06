let quoteText = document.getElementById('quote');
let authorText = document.getElementById('author');
let twitterBtn = document.getElementById('twitter');
let newQuoteBtn = document.getElementById('newQuote');
let loader = document.getElementById('loader');
let quoteContainer = document.getElementById('quote-container');
//On Loading
function showLoader() {
    if(loader) {
        loader.style.display = 'block';
        quoteContainer.hidden = true;
    }
}
// On Completed rendering
function removeLoader() {
    if(!loader.hidden) {
        loader.style.display = 'none';
        quoteContainer.hidden = false
    }
}

//Get quote from API
async function getQuote() {
    showLoader();
    const proxyURL = 'https://cors-anywhere.herokuapp.com/'
    const apiRUL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try{
     const response = await fetch(proxyURL + apiRUL);
     const data = await response.json();
     quoteText.innerText = data.quoteText;
     authorText.innerText = data.quoteAuthor;
     removeLoader();
    } catch(error) {
     getQuote();
    }
}
//open twitter page with quote content
function tweetQuote() {
    let quote = quoteText.innerText;
    let author = authorText.innerText;
    author = (author === '') ? 'Unknown' : author;
    // If quote chars more than 120 will reduce the font size by toggling the class
    if (quote.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }  
    let tweetURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweetURL, '_blank');
}

// EventHandlers
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getQuote);

getQuote();