$(document).ready(function() {

  //////----------------EXISTING USER---------------//////
  $("existingUserLogin").on("click", function(){
    event.preventDefault();

    var existingUsernameInput = $("#existingUsername").val().trim();
    var existingPasswordInput = $("#existingPassword").val().trim();
      console.log("username", existingUsernameInput, "password", existingPasswordInput);

    if (
      !existingUsernameInput || !existingPasswordInput) {
      return;
    }
    
    $.get("api/allUsers", function(data) {
        console.log("here is the data", data);
    });
});

  //////----------------NEW USER---------------//////

    $("#newUserLogin").on("click", function() {
      event.preventDefault();

      var newUsernameInput = $("#newUsername").val().trim();
      var newPasswordInput = $("#newPassword").val().trim();
        console.log("username", newUsernameInput, "password", newPasswordInput);
    
      if (
        !newUsernameInput || !newPasswordInput) {
        return;
      }

      var newUser = {
        username: newUsernameInput,
        password: newPasswordInput
      };
        console.log(newUser);

      $.post("api/createNew", newUser, function (data, status){
          console.log("Data from server: " + data);
      });  
  });

  
  // Constructing a userData object to hand to the database
  //     var loginInfo = {
  //       username: existingUsernameInput.val().trim(),
  //       password: existingPasswordInput.val().trim()
  //     };
  //     console.log(loginInfo);
  //     return loginInfo;
  //   }
  //   //FIX THIS
  //   $.post("/api/users", loginInfo, function(data, status){
  //         console.log("Data: " + data);
  //     });
});
