/* *************************
 *** USER SIGNUP ***
 ************************** */
function userSignUp() {
  console.log("userSignUp Function Called");
  let userEmail = document.getElementById("emailSignup").value;
  let userPass = document.getElementById("pwdSignup").value;
  let newUserData = { user: { email: userEmail, password: userPass } };
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(newUserData);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/user/create", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      let token = result.sessionToken;
      localStorage.setItem("SessionToken", token);
      tokenChecker();
      console.log(result);
    })
    .catch((error) => console.log("error", error));
}

/* *************************
 *** USER LOGIN ***
 ************************** */
function userLogin() {
  console.log("userLogin Function Called");
  let userEmail = document.getElementById("emailLogin").value;
  let userPass = document.getElementById("pwdLogin").value;
  let newUserData = { user: { email: userEmail, password: userPass } };
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(newUserData);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/user/login", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      let token = result.sessionToken;
      localStorage.setItem("SessionToken", token);
      tokenChecker();
      console.log(result);
    })
    .catch((error) => console.log("error", error));
}

/* *************************
 *** USER LOGOUT ***
 ************************** */
function userLogout() {
  console.log("userLogout Function Called");
  localStorage.setItem("SessionToken", undefined);
}

/* *************************
 *** TOKEN CHECKER FUNCTION ***
 ************************** */
function tokenChecker() {
  console.log("tokenChecker Function Called");
}
tokenChecker();
