/// script to go through the Ilias and login pages for Uni Freiburg

const W_URL = window.location.href;

if (W_URL.indexOf("https://ilias.uni-freiburg.de/login.php") > -1 && !W_URL.includes("baseclass=ilrepositorygui")) {
  console.log("ILIAS login URL detected");
  clickButtonByClass("il-shib-login-button", 0);

} else if (W_URL.indexOf("https://ilias.uni-freiburg.de/") > -1 && !W_URL.includes("baseclass=ilrepositorygui")) {
  console.log("ILIAS URL detected");
  clickButtonByClass("il_ContainerItemTitle", 2, "Login")

} else if (
  W_URL.indexOf("mylogin.uni-freiburg.de") > -1
  || W_URL.indexOf("mylogin.ub.uni-freiburg.de") > -1
  ) {
  console.log("Freiburg Login (myLogin) URL detected");
  onUsernamePopulated(function() {
    var submitBtn = document.querySelector('input[type="submit"]');
    console.log(submitBtn)
    if (submitBtn) submitBtn.click();
    else console.log("Failed to locate submit button!")
  });

} else if (detectMoreComplexUrl()) {
  console.log("Complex URL detected");
  clickELementByAriaLabel('Anmelden');
}

function detectMoreComplexUrl() {
  // return false for a forum link
  if (W_URL.toLowerCase().indexOf("https://ilias.uni-freiburg.de/ilias.php?baseclass=ilrepositorygui&cmd=viewthread") > -1) {
    console.log("Forum Link detected, IliasLogin not executing because you should already be logged in.");
    return false;
  }

  // return true for any other URL which links to Magazin/Repository but is not a forum URL
  if (W_URL.toLowerCase().indexOf("https://ilias.uni-freiburg.de/ilias.php?baseclass=ilrepositorygui") > -1) {
    console.log("Magazin URL detected, Extension firing");
    return true;
  }
  return false;
}

function clickButtonByClass(className, index = 0, verification = "") {
  var shibButton = document.getElementsByClassName(className)[index];
  if (!shibButton) return false;
 
  if (verification === "" || shibButton.innerHTML.includes(verification)) {
    console.log("button about to be clicked: " + shibButton);
    shibButton.click();
    console.log("button clicked");

    return true;
  }

  console.log("No Login buttons found.")
  return false
}

function clickELementByAriaLabel(label) {
  var element = document.querySelector('[aria-label="' + label + '"]');
  if (element) {
    console.log("element about to be clicked");
    element.click();
    console.log("element clicked");
  }
}

function onUsernamePopulated(thenFunction) {
  var nameField = document.getElementById('LoginForm_username')
  var passField = document.getElementById('LoginForm_password');
  if (
    (!nameField || nameField.value == '')
    && !passField || passField.value == '') {
    window.setTimeout(onUsernamePopulated.bind(null, thenFunction), 100); /* checks every 100 milliseconds */
  } else {
    thenFunction();
  }
}