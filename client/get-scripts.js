/* *************************
 *** DISPLAY BY USER ***
 ************************** */
function displayMine() {
  console.log("displayMine Function Called");
  const accessToken = localStorage.getItem("SessionToken");
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  myHeaders.append("Authorization", accessToken);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("http://localhost:3000/journal/mine", requestOptions)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      let display = document.getElementById("journals");
      for (i = 0; (i = display.childNodes.length); i++) {
        display.removeChild(display.firstChild);
      }

      if (response.length === 0) {
        let header = document.createElement("h5");
        display.appendChild(header);
        header.textContent = "You have not made any posts yet!";
        header.setAttribute("class", "noPosts");
      } else {
        displayCards(response);
      }
    })
    .catch((error) => console.error(("Error", error)));
}

/* *************************
 *** DISPLAY ALL ***
 ************************** */
function displayAll() {
  console.log("displayAll Function Called");
  const accessToken = localStorage.getItem("SessionToken");
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  myHeaders.append("Authorization", accessToken);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("http://localhost:3000/journal/", requestOptions)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      let display = document.getElementById("journals");
      for (i = 0; (i = display.childNodes.length); i++) {
        display.removeChild(display.firstChild);
      }

      if (response.length === 0) {
        let header = document.createElement("h5");
        display.appendChild(header);
        header.textContent = "You have not made any posts yet!";
        header.setAttribute("class", "noPosts");
      } else {
        displayCards(response);
      }
    })
    .catch((error) => console.error(("Error", error)));
}

/* *************************
 *** DISPLAY BY TITLE ***
 ************************** */
function displayByTitle() {
  console.log("displayByTitle Function Called");

  let journalTitle = document.getElementById("searchBar").value;

  fetch(`http://localhost:3000/journal/${journalTitle}`, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.length === 0) {
        let display = document.getElementById("journals");
        let header = document.createElement("h5");
        display.appendChild(header);
        header.textContent = "You have not made any posts yet!";
        header.setAttribute("class", "noPosts");
      } else {
        displayCards(response);
      }
    });
}

function displayCards(response) {
  let display = document.getElementById("journals");

  for (i = 0; i < response.length; i++) {
    let card = document.createElement("div");
    let body = document.createElement("div");
    let header = document.createElement("h5");
    let subtitle = document.createElement("h6");
    let para = document.createElement("p");
    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    let current = response[i];
    let title = current.title;
    let date = current.date;
    let entry = current.entry;

    display.appendChild(card);
    card.appendChild(body);
    body.appendChild(header);
    body.appendChild(subtitle);

    body.appendChild(para);

    body.appendChild(editBtn);
    body.appendChild(deleteBtn);

    card.setAttribute("id", current.id);
    card.setAttribute("class", "card");
    body.setAttribute("class", "card-body");
    header.setAttribute("class", "card-title");
    subtitle.setAttribute("class", "card-subtitle mb-2 text-muted");
    para.setAttribute("class", "card-text");

    editBtn.setAttribute("class", "btn btn-dark editBtn");
    editBtn.setAttribute("type", "button");
    editBtn.setAttribute("onclick", `editJournal(${current.id})`);

    deleteBtn.setAttribute("class", "btn btn-dark deleteBtn");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.setAttribute("onclick", `deleteJournal(${current.id})`);

    header.textContent = title;
    subtitle.textContent = date;
    para.textContent = entry;

    editBtn.textContent = "Edit";
    deleteBtn.textContent = "Delete";
  }
}
