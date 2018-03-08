// Requiring our models
var User = require("../models/models.js");

// Routes
// =============================================================
module.exports = function(app) {
    //Testing route
    app.get("/api/allUsers", function(req, res) {
        User.findAll({}).then(function(data) {
          res.json(data);
        });
    });

    app.post("/api/createNew", function(req, res) {
        User.create({
            username: req.body.username,
            password: req.body.password
        }).then(function(userData) {
          res.json(userData);
        });
    });

      // Route to validate existing user login information
    //   app.post("/api/users", function(req, res) {
    //     db.User.findOne({
    //         where: {
    //             username: req.body.username,
    //             password: req.body.password
    //             }
    //         }).then(function(userData) {
    //       res.json(userData);
    //     });
    // });

    // app.post("/api/?", function(req, res) {
    //     db.User.findOne({
    //         where: {
    //             username: req.body.username,
    //             password: req.body.password
    //             }
    //         }).then(function(userData) {
    //       res.json(userData);
    //     });
    // });
    
    // //POST route for saving a new user
    // function uniqueUser(username){
    //     return db.User.count({where: {username: username}})
    //         .then(count => {
    //             if (count != 0){
    //                 return false;
    //             }
    //             return true;
    //         });
    // }

    // app.post("/api/users", function(req, res) {
    //     var userName = req.body.username;
    //     var password = req.body.password;

    //     uniqueUser(username).then(data => {
    //         db.User.create({
    //             where: {
    //                 username: userName,
    //                 password: password
    //                 }
    //             }).then(function(userData) {
    //         res.json(userData);
    //         })
    //     })
    // });
};