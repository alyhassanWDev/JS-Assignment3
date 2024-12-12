const siteNameInput = document.getElementById("siteName");
const siteUrlInput = document.getElementById("urlSite");
const form = document.getElementById("form");
const tableBody = document.getElementById("tbody");

const siteNameVali = /^[a-zA-Z0-9]{3,15}$/;
const siteUrlVali =
  /^(https?:\/\/)?[a-zA-Z0-9-]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/[a-zA-Z0-9-]*)*$/;

let siteList = [];
if (localStorage.getItem("urlLists") === null) {
  siteList = [];
} else {
  siteList = JSON.parse(localStorage.getItem("urlLists"));
  displayList();
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const siteValues = {
    siteNameValue: siteNameInput.value,
    siteUrlValue: siteUrlInput.value,
  };
  for (let i = 0; i < siteList.length; i++)
    if (siteUrlInput.value === siteList[i].siteUrlValue) {
      return alert("the URL is already exists");
    }

  if (
    siteNameInput.classList.contains("is-invalid") ||
    siteUrlInput.classList.contains("is-invalid")
  ) {
    return alert("Site Name & Site URL should be valid ");
  }
  siteList.push(siteValues);
  localStorage.setItem("urlLists", JSON.stringify(siteList));
  displayList();
  form.reset();
  validInputUrl();
  validInputName();
});
function validInputName() {
  document.getElementById("wirMass").classList.remove("d-none");
  if (siteNameInput.value === "") {
    siteNameInput.classList.remove("is-valid");
    siteNameInput.classList.remove("is-invalid");

    document.getElementById("wirMass").classList.add("d-none");
  } else if (siteNameVali.test(siteNameInput.value)) {
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
    document.getElementById("wirMass").classList.add("d-none");
  } else {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
  }
}
function validInputUrl() {
  document.getElementById("wirUrl").classList.remove("d-none");
  if (siteUrlInput.value === "") {
    siteUrlInput.classList.remove("is-valid");
    siteUrlInput.classList.remove("is-invalid");

    document.getElementById("wirUrl").classList.add("d-none");
  } else if (siteUrlVali.test(siteUrlInput.value)) {
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
    document.getElementById("wirUrl").classList.add("d-none");
  } else {
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");
  }
}
function displayList() {
  let cartona = "";
  for (let i = 0; i < siteList.length; i++) {
    cartona += `
         <tr>
                <th scope="row">${i + 1}</th>
                <td>${siteList[i].siteNameValue}</td>
                <td>
                  <a href="${
                    siteList[i].siteUrlValue
                  }" target="_blank" type="button" class="btn btn-outline-success"><i class="fa-solid fa-eye me-2"></i>Visit</a>
                </td>
                <td>
                  <button onclick="deleteItem(${i})" class="btn btn-outline-danger">
                    <i class="fa-solid fa-trash me-2"></i>Delete
                  </button>
                </td>
              </tr>
        
        
        
        `;
  }
  tableBody.innerHTML = cartona;
}
function deleteItem(index) {
  siteList.splice(index, 1);
  localStorage.setItem("urlLists", JSON.stringify(siteList));
  displayList();
}
