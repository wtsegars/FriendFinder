const fs = require('fs');

module.exports = function(app, path) {

    app.get('api/friends', function(req, res) {
        fs.readFile("app/data/friends.js", "utf8", function(err, data) {
            if (err) throw err;

            else {
                res.json(JSON.parse(data));
            }
        });
    });

    app.post('/api/friends', function(req, res) {
        let results = [];

        const postResponse = JSON.stringify(req.body);

        fs.readFile('app/data/friends.js', function (err, data) {
            let friendFile = JSON.parse(data);

            let closestMatch = 0;
            let matchScore = 999999999999999;

            if (err) throw err; 
            for (let i = 0; i < friendFile.length; i++) {
                let spaceBetween = 0;
                for (let j = 0; j < friendFile[i]['answers[]'].length; j++) {
                    console.log(req.body['answers[]'][j]);
                    spaceBetween += Math.abs((parseInt(req.body['answers[]'][j]) - parseInt(friendFile[i]['answers[]'][j])));
                }
                if (spaceBetween <= matchScore) {
                    matchScore = spaceBetween;
                    closestMatch == i;
                } 
            }

            results.push(friendFile[closestMatch]);

            friendFile.push(JSON.parse(postResponse));

            fs.writeFile("app/data/friends.js", JSON.stringify(friendFile));
                res.send(results[0]);
        })
    })
}