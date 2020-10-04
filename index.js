const https = require('https');
exports.handler = async (event) => {
    let dataString = '';
    
    const response = await new Promise((resolve, reject) => {
        const req = https.get("https://uselessfacts.jsph.pl/random.json?language=en", function(res) {
          res.on('data', chunk => {
            dataString += chunk;
          });
          res.on('end', () => {
            resolve({
                statusCode: 200,
                body: JSON.stringify(JSON.parse(dataString), null, 4)
            });
          });
        });
        
        req.on('error', (e) => {
          reject({
              statusCode: 500,
              body: 'Something went wrong!'
          });
        });
    });
    
    return response;
};
