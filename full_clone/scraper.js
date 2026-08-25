const scrape = require('website-scraper').default;

const options = {
  urls: [
    'https://www.solapurcorporation.gov.in/home_marathi.aspx'
  ],
  directory: './cloned_website',
  recursive: true,
  maxRecursiveDepth: 1, // Start with depth 1 to not take forever. Depth 1 gets all linked pages from homepage.
  urlFilter: function(url) {
    // Only scrape URLs from the same domain
    if (url.indexOf('https://www.solapurcorporation.gov.in') === -1) {
        return false;
    }
    // Skip heavy documents
    if (url.match(/\.(pdf|doc|docx|xls|xlsx|zip|rar)$/i)) {
        return false;
    }
    return true;
  }
};

console.log("Starting scraper...");
scrape(options).then((result) => {
    console.log("Entire website successfully downloaded into ./cloned_website");
}).catch((err) => {
    console.log("An error ocurred", err);
});