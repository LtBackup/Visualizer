// Requiring our models
var User = require("../models/models.js");

// Routes
// =============================================================
module.exports = function(app) {
    //Testing route to get all users from database
    app.get("/api/allUsers", function(req, res) {
        User.findAll({}).then(function(data) {
          res.json(data);
        });
    });

    //Route to verify user in database
    app.post("/api/existingUsers", function(req, res){
        console.log(req.body.username, "request params username");
        console.log(req.body.password, "request params password");

        User.findOne({
            where: {
                username: req.body.username,
                password: req.body.password}
            }).then(function(userData) {
                res.send(userData);
        });
    });

     //Route to update preferences in database
     app.put("/api/existingUsers", function(req, res){
        console.log(req.body);
        User.update(
            {displayPreference: req.body.displayPreference,
            volumeLevel: req.body.volumeLevel},
            {returning: true, where: 
                {username: req.body.username}
            }).then(function(userData) {
                res.json(userData);
        });
    });


    //Route to create new user
    app.post("/api/createNew", function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        // var displayPreference = keypress;

        var uniqueUser = function (username){
            User.count({where: {username: username}
                }).then(count => {
                    console.log(count, "count");

                    if (count > 0){
                        console.log("user already exists with that name");
                        res.end();
                    }
                    else {
                        console.log("creating new user");
                        
                        User.create({
                            username: username,
                            password: password,
                            displayPreference: 1,
                            volumeLevel: 50

                            }).then(function(userData) {
                                console.log("new user was created");
                                res.json(userData);
                        });
                    }
                });
        
            } 
        uniqueUser(username);      
    });    
}