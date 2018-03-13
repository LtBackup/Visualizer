$(document).ready(function() {
  

  //////----------------EXISTING USER---------------//////
  $('#existingUserLogin').on("click", function(){
    event.preventDefault();

    var existingUser = {
      username: $("#existingUsername").val().trim(),
      password: $("#existingPassword").val().trim()
    };
    console.log("existing user object sent to server", existingUser);
    
    validateUser(existingUser);
  });

    var validateUser = function (existingUser){
        $.post("api/existingUsers", existingUser)
            .then(function (data) {
                if (data){
                    loggedIn = true;
                    name = data.username;
                    keypress = data.displayPreference;
                    volumePref = data.volumeLevel;
                    console.log(data.volumeLevel);
                    console.log("here is the user that matched", data);
                    $('#existingUserModal').modal('hide');
                    $('#username').text("Welcome " + name);
                    loadVisuals(keypress);
                    setSoundLevel(volumeLevel);
                } else {
                    $(".error").text("Either your username or password is incorrect. Please try again!");
                    $("#existingUsername").val("");
                    $("#existingPassword").val("");
                }
            });
    }
  


  //////----------------NEW USER---------------//////
    $("#newUserLogin").on("click", function() {
      event.preventDefault();

      var newUser = {
        username: $("#newUsername").val().trim(),
        password: $("#newPassword").val().trim(),
      };
        console.log("new user object", newUser);

        createUser(newUser);
    });

      var createUser = function(newUser){
        $.post("api/createNew", newUser, function (data){
            if (data){
              loggedIn = true;
              console.log("logged in", loggedIn);
              console.log("Data from server: ", data);
              $('#newUserModal').modal('hide');
            
            } else {
              console.log("user already exists with that name");
              $(".error").text("A user already exists with that name. Try again!");
              $("#newUsername").val("");
              $("#newPassword").val("");
            }
        });  
      }


//closes the document ready function
});
