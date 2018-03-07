$(document).ready(function() {
  $(existing).on("submit", submitExisting);

  var existingUsernameInput = $("#existingUsername");
  var existingPasswordInput = $("#existingPassword");

  function submitExisting(event) {
    event.preventDefault();
    if (
      !existingUsernameInput.val().trim() || !existingPasswordInput.val().trim()) {
      return;
    }
    
    console.log("username", existingUsernameInput, "password", existingPasswordInput);

    $.get("api/allUsers", function(data) {
        console.log("here is the data", data);
    });

    // $.post("api/create", {
    //     username: existingUsernameInput.val().trim(),
    //     password: existingPasswordInput.val().trim()},
    //     function (data, status){
    //         console.log("Data: " + data);
    // });
  }
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
