$(document).ready(function() {

  //////----------------EXISTING USER---------------//////
  $('#existingUserLogin').on("click", function(){
    event.preventDefault();

    var existingUsernameInput = $("#existingUsername").val().trim();
    var existingPasswordInput = $("#existingPassword").val().trim();

    //Send ajax request to validate existing user data 
    var existingUser = {
      username: existingUsernameInput,
      password: existingPasswordInput
    };
    console.log("existing user object sent to server", existingUser);

    $.post("api/existingUsers", existingUser)
      .then(function (data) {
        if (data){
          console.log("here is the user that matched", data);
          $('#existingUserModal').modal('hide');
        }
        else {
          $(".error").text("Either your username or password is incorrect. Please try again!");
          $("#existingUsername").val("");
          $("#existingPassword").val("");
        }
    });
  
});

  //////----------------NEW USER---------------//////

    $("#newUserLogin").on("click", function() {
      event.preventDefault();

      var newUsernameInput = $("#newUsername").val().trim();
      var newPasswordInput = $("#newPassword").val().trim();

      var newUser = {
        username: newUsernameInput,
        password: newPasswordInput
      };
        console.log("new user object", newUser);

      $.post("api/createNew", newUser, function (data){
        if (data){
          console.log("Data from server: ", data);
          $('#newUserModal').modal('hide');
          
        } else {
          console.log("user already exists with that name");
          $(".error").text("A user already exists with that name. Try again!");
          $("#newUsername").val("");
          $("#newPassword").val("");
        }
      });  
  });

//closes the function
});
