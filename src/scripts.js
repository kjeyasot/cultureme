// cultureMe older version

window.onload =function () {
     carousel();
  };

  
  export function signIn() {
    var x = document.getElementById("signIn");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
  }
  
  export function signUp() {
    var y = document.getElementById("signUp");
    if (y.style.display === "block") {
        y.style.display = "none";
    } else {
        y.style.display = "block";
    }
  }
  
  export function signInsignUp() {
    var x = document.getElementById("signIn");
    var y = document.getElementById("signUp");
    if (y.style.display === "block") {
        y.style.display = "none";
        x.style.display = "block"
    } else {
        y.style.display = "block";
    }
    
  }
  
  export function span() {
    document.getElementById('signIn').style.display = "none";
    document.getElementById('signUp').style.display = "none";
  }
  
  var myIndex = 0;
  
  export function carousel() {
    var i;
    var x = document.getElementsByClassName("slide");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "block";  
    setTimeout(carousel, 2000); // Change image every 2 seconds
  }
  
 export function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
  
  