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
            if (err) throw err; 

            let friendFile = JSON.parse(data);
            console.log(friendFile[0].answers);
            let closestMatch = 0;
            let matchScore = 999999999999999;

            for (let i = 0; i < friendFile.length; i++) {
                console.log(friendFile.length);
                let spaceBetween = 0;
                for (let j = 0; j < friendFile[i].answers.length; j++) {
                    // ['answers[]'][j]
                    console.log(req.body.answers[j]);
                    spaceBetween += Math.abs((parseInt(req.body.answers[j]) - parseInt(friendFile[i].answers[j])));
                }
                if (spaceBetween <= matchScore) {
                    matchScore = spaceBetween;
                    closestMatch == i;
                } 
            }

            results.push(friendFile[closestMatch]);

            friendFile.push(JSON.parse(postResponse));

            let callBack = function(err) {
                if (err) throw err;
                 console.log('The file has been saved!');
            };

            fs.writeFile("app/data/friends.js", JSON.stringify(friendFile), callBack);
                res.send(results[0]);
        })
    })
}