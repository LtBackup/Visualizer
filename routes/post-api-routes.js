// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
    //GET route for validating the user's information
    app.get("/api/users", function(req, res) {
        db.User.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
                }
            }).then(function(userData) {
          res.json(userData);
        });
    });
    
    //POST route for saving a new user
    function uniqueUser(username){
        return db.User.count({where: {username: username}})
            .then(count => {
                if (count != 0){
                    return false;
                }
                return true;
            });
    }

    app.post("/api/users", function(req, res) {
        var userName = req.body.username;
        var password = req.body.password;

        uniqueUser(username).then(data => {
            db.User.create({
                where: {
                    username: userName,
                    password: password
                    }
                }).then(function(userData) {
            res.json(userData);
            })
        })
    });
};