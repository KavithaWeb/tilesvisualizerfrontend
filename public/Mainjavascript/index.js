// <!-- ============================================ VISUALIZER OPTIONS ============================================ -->
const password = localStorage.getItem("payemail");
console.log(password)

if (password) {

  document.getElementById("profile").style.display = "block";
  document.getElementById("loginfirst").style.display = "none";

}


else {

  document.getElementById("profile").style.display = "none";
  document.getElementById("header").style.padding = "10px 0";
  document.getElementById("loginfirst").style.display = "block";

}

function translatePage(language) {

  var translateElement = new google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: language });
  translateElement.translatePage();

}


const profname = localStorage.getItem("nameprof");
const emailname = localStorage.getItem("payemail");

if (profname) {
  console.log(profname);
  document.getElementById("profname").innerHTML = profname;

}

if (emailname) {

  document.getElementById("emailname").innerHTML = emailname;

}


function uploadbutton() {

  window.location = "/uploadimage.html"

}



function singlebathroom() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/planebathroomvisualizer.html"

  // }


  // else {
  //   window.location = "./registerandlogin.html"

  // }
}

function multiplebathroom() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/bathroomvisualizer.html"

  // }

  // else {
  //   window.location = "./registerandlogin.html"

  // }
}


function type1() {

  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/kitchenvisualizer.html"


  // }


  // else {
  //   window.location = "./registerandlogin.html"

  // }
}


function type2() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/kitchenvisualizer2.html"

  // }

  // else {
  //   window.location = "./registerandlogin.html"

  // }
}

function type3() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/kitchenvisualizer3.html"

  // }

  // else {
  //   window.location = "./registerandlogin.html"

  // }

}

function type4() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/kitchenvisualizer4.html"

  // }
  // else {

  //   window.location = "./registerandlogin.html"
  // }

}

function livingroom() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/livingroomvisualizer.html"
  // }
  // else {
  //   window.location = "./registerandlogin.html"
  // }
}

function livingroom1() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/livingroom1.html"

  // }
  // else {
  //   window.location = "./registerandlogin.html"
  // }

}


function livingroom2() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/livingroom2.html"
  // }
  // else {
  //   window.location = "./registerandlogin.html"
  // }
}


function livingroom3() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/livingroom3.html"

  // }
  // else {
  //   window.location = "./registerandlogin.html"
  // }

}

function livingroom4() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/livingroom4.html"

  // }
  // else {
  //   window.location = "./registerandlogin.html"
  // }

}



function commercial() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/commercial.html"

  // }
  // else {
  //   window.location = "./registerandlogin.html"
  // }

}

function commercial2() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/commercial2.html"

  // }
  // else {
  //   window.location = "./registerandlogin.html"
  // }

}

function commercial3() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/commercial3.html"

  // }
  // else {
  //   window.location = "./registerandlogin.html"
  // }

}

function commercial4() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/commercial4.html"

  // }
  // else {
  //   window.location = "./registerandlogin.html"
  // }

}


function commercial5() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/commercial5.html"

  // }
  // else {
  //   window.location = "./registerandlogin.html"
  // }

}

function commercial6() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/commercial6.html"
  // }
  // else {
  //   window.location = "./registerandlogin.html"
  // }
}

function commercial7() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/commercial7.html"
  // }
  // else {
  //   window.location = "./registerandlogin.html"
  // }
}

function bathroom2() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/bathroom2.html"
  // }
  // else {
  //   window.location = "./registerandlogin.html"
  // }
}

function bathroom3() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/bathroom3.html"
  // }
  // else {
  //   window.location = "./registerandlogin.html"
  // }
}


function bathroom4() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/bathroom4.html"
  // }
  // else {
  //   window.location = "./registerandlogin.html"
  // }
}



function bedroom() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/bedroomvisualizer.html"
  // }
  // else {
  //   window.location = "./registerandlogin.html"
  // }
}

function bedroom2() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/bedroom2.html"
  // }
  // else {
  //   window.location = "./registerandlogin.html"
  // }
}

function bedroom3() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/bedroom3.html"
  // }
  // else {
  //   window.location = "./registerandlogin.html"
  // }
}

function bedroom4() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/bedroom4.html"
  // }
  // else {
  //   window.location = "./registerandlogin.html"
  // }
}

function type5() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/kitchen5.html"
  // }
  // else {

  //   window.location = "./registerandlogin.html"
  // }
}

function type6() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "/kitchen6.html"
  // }
  // else {

  //   window.location = "./registerandlogin.html"
  // }
}
// function showResults(v1) {
//   if (v1.length == 0) {
//       if (document.getElementById("SLength").value.length <= 0 || document.getElementById("SWidth").value.length <= 0) {
//           if (document.getElementById("SLength").value.length <= 0) {
//               document.getElementById('SLength').style.border = "solid 1px #DD0000";
//               document.getElementById('SLength').style.borderRadius = "4px";
//               document.getElementById('SLength').style.boxShadow = "0px 0px 10px #BB0000";
//           }
//           if (document.getElementById("SWidth").value.length <= 0) {
//               document.getElementById('SWidth').style.border = "solid 1px #DD0000";
//               document.getElementById('SWidth').style.borderRadius = "4px";
//               document.getElementById('SWidth').style.boxShadow = "0px 0px 10px #BB0000";
//           }
//           return false;
//       } else if (document.getElementById("sizes").value == "Select Size" || document.getElementById("sizes").value.length <= 0) {
//           document.getElementById('sizes').style.border = "solid 1px #DD0000";
//           document.getElementById('sizes').style.borderRadius = "4px";
//           document.getElementById('sizes').style.boxShadow = "0px 0px 10px #BB0000";
//           return false;
//       } else {
//           calculate();
//           document.getElementById("Results").style.display = "";
//       }
//   }
// }
// function setpicimage(l, w) {
//   document.getElementById("xlength").innerText = l + ' Ft';
//   document.getElementById("ylength").innerText = w + ' Ft';
// }
// function calculate() {
//   var SLength = document.getElementById("SLength").value;
//   var SWidth = document.getElementById("SWidth").value;
//   var Smes_type = document.querySelector('.mes_type:checked').value;
//   if (SLength != "" && SWidth != "") {
//       if (Smes_type == 'sqft') {
//           document.getElementById("ar_feet").value = parseFloat(SLength) * parseFloat(SWidth);
//           document.getElementById("ar_mtr").value = parseFloat((parseFloat(SLength) * parseFloat(SWidth)) / (3.28 * 3.28), 3);
//       } else {
//           document.getElementById("ar_feet").value = (parseFloat(SLength) * parseFloat(SWidth) * 10.764).toFixed(3);
//           document.getElementById("ar_mtr").value = parseFloat(SLength) * parseFloat(SWidth);
//       }
//   }
//   var tileSize = document.getElementById("sizes").value;
//   var tilesinbox;
//   tilesinbox = document.getElementById("sizes").options[document.getElementById("sizes").selectedIndex].dataset.picperbox;
//   if (tileSize.indexOf("mm") > 0)
//       tileSize = tileSize.substr(0, tileSize.indexOf("mm"));
//   tileCoords = tileSize.split("x");
//   sLength = SLength * 304.8;
//   sWidth = SWidth * 304.8;
//   var doorSize, winSize;
//   var TileArea = (parseFloat(sLength) * parseFloat(sWidth));
//   xVal = tileCoords[0];
//   yVal = tileCoords[1];
//   var tileSize = (parseFloat(xVal) * parseFloat(yVal));
//   var TotalTilesRequired = TileArea / tileSize;
//   if ((TotalTilesRequired - Math.round(TotalTilesRequired)) > 0)
//       TotalTilesRequired = Math.round(TotalTilesRequired) + 1;
//   else
//       TotalTilesRequired = Math.round(TotalTilesRequired, 0);
//   document.getElementById("TotalTiles").value = TotalTilesRequired;
//   var boxcount = parseFloat(TotalTilesRequired / tilesinbox);
//   if ((boxcount - Math.round(boxcount)) > 0)
//       boxcount = Math.round(boxcount) + 1;
//   else
//       boxcount = Math.round(boxcount, 0);
//   document.getElementById("TotalBoxes").value = boxcount;
// }
// function showResultss(v1) {
//   if (v1.length == 0) {
//       if (document.getElementById("totalArea").value == "" || document.getElementById("totalArea").value.length <= 0) {
//           document.getElementById('totalArea').style.border = "solid 1px #DD0000";
//           document.getElementById('totalArea').style.borderRadius = "4px";
//           document.getElementById('totalArea').style.boxShadow = "0px 0px 10px #BB0000";
//           return false;
//       } else if (isNaN(document.getElementById("totalArea").value)) {
//           alert("Must input numbers");
//           document.getElementById('totalArea').style.border = "solid 1px #DD0000";
//           document.getElementById('totalArea').style.borderRadius = "4px";
//           document.getElementById('totalArea').style.boxShadow = "0px 0px 10px #BB0000";
//           return false;
//       } else if (document.getElementById("sizess").value == "Select Size") {
//           document.getElementById('sizess').style.border = "solid 1px #DD0000";
//           document.getElementById('sizess').style.borderRadius = "4px";
//           document.getElementById('sizess').style.boxShadow = "0px 0px 10px #BB0000";
//           return false;
//       } else {
//           calculates();
//           document.getElementById("Results").style.display = "";
//       }
//   }
// }
// function calculates() {
//   var area = document.getElementById("area").value;
//   var totalArea = document.getElementById("totalArea").value;
//   var sizes = document.getElementById("sizess").value;
//   var tilesinbox = 0;
//   if (tileSize == "300 x 450") {
//       tilesinbox = 6;
//   } else if (tileSize == "300 x 600") {
//       tilesinbox = 5;
//   }
//   if (area == 'sqft') {
//       var t_feet = totalArea;
//       var ar_mtr = t_feet * 0.092903;
//   } else if (area == 'sqmt') {
//       var ar_mtr = totalArea;
//       var t_feet = ar_mtr * 10.7639;
//   }
//   if (sizes.indexOf("mm") > 0)
//       sizes = sizes.substr(0, tileSize.indexOf("mm"));
//   tileCoords = sizes.split("x");
//   xVal = tileCoords[0];
//   yVal = tileCoords[1];
//   var onetilearea = (xVal / 1000) * (yVal / 1000)
//   var tot_tile = Math.round((ar_mtr / onetilearea), 0);
//   var tot_box = Math.round((tot_tile / tilesinbox), 0);
//   document.getElementById("ar_mtr").value = ar_mtr;
//   document.getElementById("ar_feet").value = t_feet;
//   document.getElementById("TotalTiles").value = tot_tile;
//   document.getElementById("TotalBoxes").value = tot_box;
// }

// <!-- ============================================ LOGIN ============================================ -->


function paymentpage() {



  window.location = "./Paymentpage.html"

}

function product() {



  window.location = "./About.html"

}

function pricing() {



  window.location = "./Paymentpage.html"

}

function partner() {



  window.location = "./Contactus.html"

}


function support() {



  window.location = "./support.html"

}


function login() {
  const password = localStorage.getItem("data1");
  console.log(password)
  if (password) {

    window.location = "./visualizer.html"
  }
  else {
    document.getElementById('id01').style.display = 'block'
  }
}


function freelogin() {

  const password = localStorage.getItem("data1");

  console.log(password)

  if (password) {

    window.location = "./freetrial.html"

  }

  else {

    document.getElementById('id05').style.display = 'block'

  }

}


function loginfirst() {
  // const password = localStorage.getItem("data1");
  // console.log(password)
  // if (password) {

  window.location = "./visualizer.html"
  // }
  // else {
  //   window.location = "./registerandlogin.html"
  // }
}

function registeralready() {
  document.getElementById("login").style.display = "block";
  document.getElementById("signup").style.display = "none";
}


function pleasesignup() {
  document.getElementById("login").style.display = "none";
  document.getElementById("signup").style.display = "block";
}


// function signupform() {
//   const username = document.getElementById("username").value
//   const email = document.getElementById("email").value
//   const password = document.getElementById("passwords").value

//   if (username != "" && email != "" && password != "") {

//     const data = { username, email, password };
//     console.log(data);

//     return fetch("https://newtiles-env.eba-mdsv5qca.ap-south-1.elasticbeanstalk.com/users/register", {
//       credentials: 'same-origin',
//       method: 'POST',
//       redirect: 'follow',
//       body: JSON.stringify(data),
//       headers: { 'Content-Type': 'application/json', },
//     })
//       .then(response => {
//         console.log(response);

//         return response.json().then((data) => {
//           console.log(data);
//           if (data === "SUCCESS") {
//             document.getElementById("id01").style.display = "none";
//             localStorage.setItem("payemail", email);
//             localStorage.setItem("nameprof", username);
//             window.location.href = "http://localhost:8080/Paymentpage.html";
//           }
//           else {
//             document.getElementById("id01").style.display = "block";
//             document.getElementById("id02").style.display = "none";
//             alert("User already signed up, please login");
//           }
//           return data;
//         }).catch((err) => {
//           console.log(err);
//         })
//       });
//   }
// }


function signupform() {

  const username = document.getElementById("username").value
  const email = document.getElementById("email").value
  const password = document.getElementById("passwords").value

  if (username != "" && email != "" && password != "") {

    const data = { username, email, password };
    console.log(data);

    return fetch("http://localhost:8080/users/register", {
      credentials: 'same-origin',
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', },
    })
      .then(response => response.text())
      .then(data => {
        if (data.includes("User registered successfully!")) {
          const userId = data.match(/ID: (\d+)/)[1]; // Extract the ID value from the response
          console.log('Registered user ID:', userId);
          localStorage.setItem("userid", userId);
          document.getElementById("id01").style.display = "none";
          localStorage.setItem("payemail", email);
          localStorage.setItem("nameprof", username);
          window.location = "./Paymentpage.html";
        } else {
          document.getElementById("id01").style.display = "block";
          document.getElementById("id02").style.display = "none";
          console.error('Error:', data);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

}




function signupform2() {
  document.getElementById('id01').style.display = 'block'
  const username = document.getElementById("username").value
  const email = document.getElementById("email").value
  const password = document.getElementById("passwords").value

  if (username != "" && email != "" && password != "") {

    const data = { username, email, password };
    console.log(data);

    return fetch("http://localhost:8080/users/register", {
      credentials: 'same-origin',
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', },
    })
      .then(response => response.text())
      .then(data => {
        if (data.includes("User registered successfully!")) {
          const userId = data.match(/ID: (\d+)/)[1]; // Extract the ID value from the response
          console.log('Registered user ID:', userId);
          localStorage.setItem("userid", userId);
          document.getElementById("id01").style.display = "none";
          localStorage.setItem("payemail", email);
          localStorage.setItem("nameprof", username);
          window.location = "./Paymentpage.html";
        }
        else {
          document.getElementById("id01").style.display = "block";
          document.getElementById("id02").style.display = "none";
          console.error('Error:', data);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}




function loginform() {
  const email = document.getElementById("email1").value;
  // localStorage.setItem("email1", email);
  const password = document.getElementById("password1").value;

  if (email !== "" && password !== "") {
    const data = { email, password };
    console.log(data);
    return fetch("http://localhost:8080/users/login", {
      credentials: 'same-origin',
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data.message == "Incorrect ID and password");
        if (data.message === "success") {
          // const emailed = data.email;  
          // const usernames = data.username;
          console.log(data.message);
          document.getElementById("id01").style.display = "none";
          localStorage.setItem("data1", data.token);
          localStorage.setItem("data2", data.username);
          localStorage.setItem("data3", data.email);
          localStorage.setItem("userid", data.userid);
          localStorage.setItem("payemail", data.email);
          localStorage.setItem("nameprof", data.username);
          window.location = "./visualizer.html";

          // document.getElementById("login").style.display = "none";
        }
        else {
          document.getElementById("id01").style.display = "block";
        }
      })
      .catch((error) => {
        // document.getElementById("login").style.display = "block";
        // alert("Login failed. Please try again.");
        console.error(error);
      });
  }
}


// <!-- ============================================ CONTACT FORM ============================================ -->


function contactform() {
  const username = document.getElementById("username").value
  const email = document.getElementById("email").value
  const subject = document.getElementById("subject").value
  const message = document.getElementById("message").value

  if (username != "" && email != "" && subject != "" && message != "") {

    const data = { username, email, subject, message };
    console.log(data);

    return fetch("http://localhost:8080/users/contact", {
      credentials: 'same-origin',
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', },
    })
      .then(response => {
        console.log(response);
        return response.json().then((data) => {
          console.log(data);
          if (data == "User registered successfully!") {
            alert("DATA SAVED");
          }
          else {
            alert("User already signup, please login");
          }
          return data;
        }).catch((err) => {
          console.log(err);
        })
      });
  }
}



function submitForm() {
  const enqname = document.getElementById("enqname").value;
  const enqemail = document.getElementById("enqemail").value;
  const selectElement = document.getElementById("enqsubject");
  const enqsubject = selectElement.options[selectElement.selectedIndex].text;
  const enqmessage = document.getElementById("enqmessage").value;


  if (enqname !== "" && enqemail !== "" && enqsubject !== "" && enqmessage !== "") {
    const data = { enqname, enqemail, enqsubject, enqmessage };

    return fetch("http://localhost:8080/users/enquiry", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.text().then((data) => {
            if (data === "User registered successfully!") {

              alert("Your message has been sent. Thank you!");
            } else {

              alert("An error occurred. Please try again.");
            }
          });
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}



function signups() {
  const username = document.getElementById("usernames").value
  const email = document.getElementById("emails").value
  const password = document.getElementById("passwordss").value

  if (username != "" && email != "" && password != "") {

    const data = { username, email, password };
    console.log(data);

    return fetch("http://localhost:8080/freetrialsignup", {
      credentials: 'same-origin',
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', },
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        if (data === "Signup successful") {
          window.location = "./freetrial.html";
        } else {
          alert("User already signed up, please login");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

}




function filesnew() {
  const username = "EC2";

  if (username != "") {

    const data = { username };
    console.log(data);

    return fetch("http://localhost:8081/discover", {
      credentials: 'same-origin',
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', },
    })

      .then(response => response.text())
      .then(data => {
        console.log(data);

      })
      .catch(err => {
        console.log(err);
      });
  }


}





//       .then(response => {
//         console.log(response);
//         return response.json().then((data) => {
//           console.log(data);
//           if (data == "Signup successful") {
//             window.location = "./freetrial.html";
//           }
//           else {
//             alert("User already signup, please login");
//           }
//           return data;
//         }).catch((err) => {
//           console.log(err);
//         })
//       });
//   }
// }
