
async function logoutbtn() {
    document.getElementById('logout-icon').style.display = "none";
    document.getElementById('logout-btn-loader').style.display = "block";
    console.log("Test");
    const email = localStorage.getItem("email1");
    const data = { email };
    console.log(data);
    const response = await fetch("https://newtiles-env.eba-mdsv5qca.ap-south-1.elasticbeanstalk.com/users/logout", {
        credentials: 'same-origin',
        method: 'POST',
        redirect: 'follow',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });
    response.json().then(() => {
        document.getElementById('logout-btn-loader').style.display = "none";
        document.getElementById('logout-icon').style.display = "block";
        localStorage.clear();
        window.location = "./index.html";

    }).catch((err) => {
        console.log(err);
    });
 
}

function deletestopImages(){
  document.getElementById("delchoose").style.display="none";
  document.getElementById("selectdel").style.display="block";
  document.getElementById("closedel").style.display="block";
  var elements = document.getElementsByClassName("stop");
for (var i = 0; i < elements.length; i++) {
  elements[i].style.display = "block";
}

}


function deletecancelImages(){
  document.getElementById("selectdel").style.display="none";
  document.getElementById("delchoose").style.display="block";
document.getElementById("closedel").style.display="none";
  var elements = document.getElementsByClassName("stop");
for (var i = 0; i < elements.length; i++) {
  elements[i].style.display = "none";
}

}



const deleteSelectedImages = () => {
    const selectedCheckboxes = document.querySelectorAll('input[name="imageIds"]:checked');
    const imageIdsToDelete = Array.from(selectedCheckboxes).map(checkbox => checkbox.value);
    deleteImages(imageIdsToDelete);
    document.getElementById("selectdel").style.display="none";
    document.getElementById("closedel").style.display="none";
    document.getElementById("delchoose").style.display="block";
    var elements = document.getElementsByClassName("stop");
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
    console.log(imageIdsToDelete);
  };


const deleteImages = (ids) => {
    fetch('https://newtiles-env.eba-mdsv5qca.ap-south-1.elasticbeanstalk.com/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ids),
    })
      .then(response => {
        if (response.ok) {
          console.log('Images deleted successfully');
    
        } else {
          console.error('Failed to delete images');
       
        }
      })
      .catch(error => {
        console.error('Error:', error);
   
      });
  };
  



  function openimage() {

    document.getElementById("img3").style.display = "block";
}

function openNav() {
    document.getElementById("mySidenav").style.width = "1100px";
    document.getElementById("mySidenav").style.display = "block";
    document.getElementById("img3").style.display = "none";
}

function closeNav() {
    document.getElementById("mySidenav").style.display = "none";
}


function tileselect() {

    document.getElementById("mySidenav").style.display = "none";
}           