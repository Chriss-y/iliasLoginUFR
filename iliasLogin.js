/// script to go through the Ilias and login pages for Uni Freiburg

if (window.location.href.indexOf("https://ilias.uni-freiburg.de/") > -1 && !window.location.href.includes("baseclass=ilrepositorygui")) {
  console.log("ILIAS URL detected");
  if (!clickButtonByClass("il_ContainerItemTitle", 2)) clickButtonByClass("il-shib-login-button", 0);

} else if (
  window.location.href.indexOf("mylogin.uni-freiburg.de") > -1
  || window.location.href.indexOf("mylogin.ub.uni-freiburg.de") > -1
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
  if (window.location.href.toLowerCase().indexOf("https://ilias.uni-freiburg.de/ilias.php?baseclass=ilrepositorygui&cmd=viewthread") > -1) {
    console.log("Forum Link detected, IliasLogin not executing because you should already be logged in.");
    return false;
  }

  // return true for any other URL which links to Magazin/Repository but is not a forum URL
  if (window.location.href.toLowerCase().indexOf("https://ilias.uni-freiburg.de/ilias.php?baseclass=ilrepositorygui") > -1) {
    console.log("Magazin URL detected, Extension firing");
    return true;
  }
  return false;
}

/*  Ilias UFR only assigns classes to the button
function clickButtonById(id) {
  var element = document.getElementById(id);
  if (element) {
    element.click();
    console.log("button clicked");
  }
}
*/

function clickButtonByClass(className, index = 0) {
  var shibButton = document.getElementsByClassName(className)[index];
 
  if (shibButton) {
    console.log("button about to be clicked: " + shibButton);
    shibButton.click();
    console.log("button clicked");
  } else {
    return false
  }
  return true
}

function clickELementByAriaLabel(label) {
  var element = document.querySelector('[aria-label="' + label + '"]');
  if (element) {
    console.log("element about to be clicked");
    element.click();
    console.log("element clicked");
  }
}

/*  Dunno what this does or what it is for...
function clickListElement(listId, elementNumber) {
  console.log("ClickListElementFct firing");
  var list = document.getElementById(listId);
  if (list) {
    var listElement = list.getElementsByTagName("li")[elementNumber].getElementsByTagName("a")[0];
    if (listElement) {
      console.log("listElement URL: " + listElement + " about to be clicked");
      listElement.click();
      console.log("listElement URL clicked on");
    }
  }
}
*/

function onUsernamePopulated(thenFunction) {
  var nameField = document.getElementById('LoginForm_username');
  if (!nameField || nameField.value == '') {
    window.setTimeout(onUsernamePopulated.bind(null, thenFunction), 100); /* checks every 100 milliseconds */
  } else {
    thenFunction();
  }
}