function search() {
  var id = document.getElementById("id1").value;

  firebase
    .database()
    .ref("User/" + id)
    .once("value")
    .then(
      function (snapshot) {
        if (snapshot.exists()) {
          var name_ = snapshot.val().name;
          var id_ = snapshot.val().id;
          var mail_ = snapshot.val().email;
          document.getElementById("name").value = name_;
          document.getElementById("id").value = id_;
          document.getElementById("email").value = mail_;
        } else {
        }
      },
      function (error) {
        if (error) {
        } else {
        }
      }
    );
}

function delete_() {
  var del_user = document.getElementById("for_del").value;
  let userRef = firebase.database().ref("User/" + del_user);
  userRef.remove();
  alert("Successfully Removed");
}

function view2(_n, _e, _m) {
  var a = document.getElementById("yo");
  var div = document.createElement("div");

  div.style.padding = "10px";
  div.style.margin = "10px";
  div.style.backgroundColor = "rgb(255,255,255)";
  div.style.borderRadius = "2%";

  div.innerHTML = `<h4 style='color: blue; font-weight: bolder; "font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;"'>${_n}</h4> <h6 style='color: black; font-size: medium'> ${_m}<br></h6>`;
  a.appendChild(div);
}
function view() {
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
          view2(n, e, m);
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
            view();
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

view();
