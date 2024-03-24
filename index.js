const partDataList = async () => {
  const response = await fetch("https://polling-backend-y7z7.onrender.com/api/party", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  displayPartyData(data);
};

const displayPartyData = (results) => {
  const table = document.createElement("table");
  const headerRow = table.insertRow();
  headerRow.innerHTML =
    "<th>Party Logo</th><th>Party Name</th><th>Party Id</th><th>Registered on</th><th>Vote Count</th>";

  results.forEach((result) => {
    const row = table.insertRow();
    row.innerHTML = `<td> <img src=${result.partyImage} style='border-radius:50%' height="60" width="60"> </td><td>${result.partyName}</td><td>${result.partyID}</td><td>${result.createdOn}</td><td>${result.totalVotes}</td>`;
  });

  document.getElementById("pollingTable").appendChild(table);
};

document
  .getElementById("partyRegistration")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const partyName = document.getElementById("partyName").value;
    const partyID = document.getElementById("partyID").value;
    const partyImage = document.getElementById("partyImage").value;

    let formData = {
      partyName,
      partyID,
      partyImage,
    };

    fetch("https://polling-backend-y7z7.onrender.com/api/party", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === 201 || data.status === "success") {
          alert(` ${partyName} party registered successfully`);
        } else {
          throw new Error(data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  });

document
  .getElementById("pollingForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const partyName = document.getElementById("pollingPartyName").value;
    const EVId = document.getElementById("EVId").value;
    const votingId = document.getElementById("votingId").value;
    let formData = {
      partyName,
      EVId,
      votingId,
    };

    fetch("https://polling-backend-y7z7.onrender.com/api/polling", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status == 201 || data.status == "success") {
          alert(`Your vote for ${partyName} party casted successfully`);
        } else {
          throw new Error(data.message);
        }
      })
      .catch((err) => {
        console.log("oh no");
        alert(err.message);
      });
  });

partDataList();
