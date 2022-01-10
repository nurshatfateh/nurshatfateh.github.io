function view2s(_n, _e, _m) {
  var aa = document.getElementById("aaa");
  var divs = document.createElement("div");

  divs.style.padding = "10px";
  divs.style.margin = "10px";
  divs.style.backgroundColor = "rgb(255,255,255)";
  divs.style.borderRadius = "2%";

  divs.innerHTML = `<h4 style='color: blue; font-weight: bolder; "font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;"'>${_n}</h4> <h6 style='color: black; font-size: medium'> ${_m}<br></h6>`;
  aa.appendChild(divs);
}
function views() {
  var myobj = document.getElementById("demo");
  myobj.remove();

  firebase
    .database()
    .ref("User/")
    .once("value")
    .then(
      function (snapshot) {
        snapshot.forEach(function (child) {
          var n = child.val().name;
          var e = child.val().email;
          var m = child.val().msg;
          view2s(n, e, m);
        });
      },
      function (error) {
        if (error) {
        } else {
        }
      }
    );
}

function show() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var msg = document.getElementById("msg").value;

  if (name == "" || email == "" || msg == "") {
    alert("ERROR! Provide all information");
  } else {
    firebase
      .database()
      .ref("User/" + name)
      .set(
        {
          name: name,
          email: email,
          msg: msg,
        },
        function (error) {
          if (error) {
            // The write failed...
          } else {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("msg").value = "";
            alert("Done!");
            location.reload();
          }
        }
      );
  }
}

views();

function home() {
  window.location = "index.html";
}
