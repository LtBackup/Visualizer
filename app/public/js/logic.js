$(document).ready(function() {

  //////----------------EXISTING USER---------------//////
  $('#existingUserLogin').on("click", function(){
    event.preventDefault();
    $('#existingUserModal').modal('hide');

    var existingUsernameInput = $("#existingUsername").val().trim();
    var existingPasswordInput = $("#existingPassword").val().trim();

    if (!existingUsernameInput || !existingPasswordInput) {
      alert("You already have an account!");
      return;
    }

    //Send ajax request to validate existing user data 
    var existingUser = {
      username: existingUsernameInput,
      password: existingPasswordInput
    };
    console.log("existing user object sent to server", existingUser);

    $.post("api/existingUsers", existingUser)
      .then(function (data) {
        console.log("here is the user that matched", data.username);
        // $('#username').text(data.username);
    });
  
});

  //////----------------NEW USER---------------//////

    $("#newUserLogin").on("click", function() {
      event.preventDefault();
      $('#loginModal').modal('hide');

      var newUsernameInput = $("#newUsername").val().trim();
      var newPasswordInput = $("#newPassword").val().trim();

      var newUser = {
        username: newUsernameInput,
        password: newPasswordInput
      };
        console.log("new user object", newUser);

      $.post("api/createNew", newUser, function (data){
          console.log("Data from server: ", data);
          $("#newUsername").val("");
          $("#newPassword").val("");
      });  
  });

//closes the function
});
