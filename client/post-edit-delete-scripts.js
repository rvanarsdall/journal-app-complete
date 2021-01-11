/* *************************
 *** POST JOURNAL ***
 ************************** */
function postJournal() {
  console.log("postJournal Function Called");
  let title = document.getElementById("title").value;
  let date = document.getElementById("date").value;
  let entry = document.getElementById("entry").value;

  let bodyObj = {
    journal: {
      title: title,
      date: date,
      entry: entry,
    },
  };

  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("SessionToken"));
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(bodyObj);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/journal/create", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

/* *************************
 *** UPDATE JOURNAL ***
 ************************** */
function editJournal(postId) {
  console.log("editJournal Function Called");
  let card = document.getElementById(postId);
  let input = document.createElement("input");

  if (card.childNodes.length < 2) {
    card.appendChild(input);
    input.setAttribute("type", "text");
    input.setAttribute("id", "updateEntry");
    input.setAttribute("placeholder", "Edit your journal entry");
  } else {
    let update = document.getElementById("updateEntry").value;
    let updateEntry = { journal: { entry: update } };
    const fetch_url = `http://localhost:3000/journal/update/${postId}`;
    const accessToken = localStorage.getItem("SessionToken");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", accessToken);

    const raw = JSON.stringify(updateEntry);
    requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(fetch_url, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then(displayMine())
      .catch((err) => console.log(err));

    card.removeChild(card.lastChild);
  }
}

/* *************************
 *** DELETE JOURNAL ***
 ************************** */
function deleteJournal(postId) {
  debugger;
  console.log("deleteJournal Function Called");
  const fetch_url = `http://localhost:3000/journal/delete/${postId}`;
  const accessToken = localStorage.getItem("SessionToken");
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", accessToken);
  debugger;
  requestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };
  fetch(fetch_url, requestOptions)
    .then((response) => {
      console.log(response);
      displayMine();
    })
    .catch((err) => console.error(err));
}
