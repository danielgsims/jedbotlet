var fs = require('fs');
var lr = require('readline');

let matchStart = function(str) {
    var pat = /^.*BARTLET*$/;
    return !!str.match(pat);
};

let matchEnd = function(str) {
    return str.trim() === "";
}

let quotes = [];

let readingFlags = 0;

fs.readdir('files', function(err, files) {
    for (let file of files) {
        readingFlags++;

        let path = 'files/' + file;
        let reader = lr.createInterface({
            input: fs.createReadStream(path, { encoding: 'utf8' })
        });

        let quote = [];
        var log = false;

        reader.on('line', function(line) {
            if (matchEnd(line)) {
                if (log) {
                    let wholeQuote = quote.join(' ');
                    quotes.push(wholeQuote);
                    quote = [];
                }

                log = false;
            }

            if (log) {
                quote.push(line);
            }

            if (matchStart(line)) {
                log = true;
            }
        });

        reader.on('close', function() {
            readingFlags--;
            if (readingFlags == 0) {
                process.stdout.write(JSON.stringify(quotes));
            }
        });
    }
});
