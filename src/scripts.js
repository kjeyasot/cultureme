// cultureMe older version

// window.onload = function () {
//      carousel();
//   };
// window.onload = function() {
//     console.log(window.location.href)
//     if (window.location.href.indexOf('./popularsev') === -1) {
//       carousel();
//       console.log(window.location.href)

//     }
//   }
    
//   export function carousel() {
//     var i;
//     var x = document.getElementsByClassName("slide");
//     for (i = 0; i < x.length; i++) {
//        x[i].style.display = 'none';  
//     }
//     // myIndex++;
//     let no = x.length;
//     var y = Math.floor(no * Math.random());
//     // if (y > x.length) {y = 1}    
//     x[y].style.display = "inline";  
//     setTimeout(carousel, 6000); // Change image every 6 seconds
//   }
  
 export function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); return null;});
    return images;
  }
  
  