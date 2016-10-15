let fs = require('fs');
let twit = require('./client');


let containsName = function(str) {
    let names = [ "Leo", "C.J", "Josh", "Toby", "Sam", "Donna", "Ainsley"];
    let includes = names.map((name) => str.includes(name));

    return includes.includes(true);
};

fs.readFile('quotes.json', 'utf8', function(err,data) {
    let quotes = JSON.parse(data);
    let found = false;
    let quote = '';

    while (!found) {
        quote = quotes[Math.floor(Math.random() * quotes.length)]
        quote = quote.replace(/\[.*\]/, '')
                     .replace(/\s{2,}/,' ')
                     .replace(/\(.*\)/,' ')
                     .trim();
        found = quote.length > 100 && quote.length <= 140 && !containsName(quote);
    }
    
    twit.post('statuses/update', { status: quote }, function(err, data, response) {
          if(err) {
                console.log("There was a problem tweeting the message.", err);
        }
    });
});


