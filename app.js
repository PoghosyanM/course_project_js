import { fetchUsers } from "./api/api.js";
import { createUserInfoElem, getFilteredUsers } from "./utils/helpers.js";
import { nations } from "./utils/nationsData.js";
const rootElem = document.getElementById("root");
const usersContainer = document.createElement("div");
const header = document.createElement("header");
const searchInput = document.createElement("input");
const pagination = document.createElement("div");
const paginationContainer = document.createElement("div");
const nextPageButton = document.createElement("button");
const prevPageButton = document.createElement("button");
const nextPortionButton = document.createElement("button");
const prevPortionButton = document.createElement("button");
const selectNation = document.createElement("select");
const paginationContent = document.createElement("div");

paginationContent.classList.add("paginationContent");
pagination.classList.add("pagination");
paginationContainer.classList.add("paginationContainer");

header.setAttribute("id", "header");
searchInput.setAttribute("id", "searchInput");
usersContainer.setAttribute("id", "usersContainer");

nations.forEach(function (natData) {
  const option = document.createElement("option");
  option.setAttribute("value", natData.value);
  option.innerText = natData.text;
  selectNation.append(option);
});

header.append(searchInput);
header.append(selectNation);
rootElem.append(header);

async function getUsersData(currentPage, nat) {
  try {
    const data = await fetchUsers(currentPage, nat);
    getFilteredUsers(data, usersContainer, searchInput);
    data.results.forEach(function (user) {
      createUserInfoElem(user, usersContainer);
    });
  } catch (error) {
    console.log(error);
  }
}

const portionSize = 10;
let currentPage = 1;
let portionStartWith = 1;
let selectValue = "";

const bindedSetCurrentPage = setCurrentPage.bind(null, pagination);

selectNation.addEventListener("change", (event) => {
  selectValue = event.target.value;
  usersContainer.innerHTML = "";
  paginationContent.innerHTML = "";
  portionStartWith = 1;
  currentPage = 1;
  bindedSetCurrentPage(portionStartWith, selectValue);
});

function setCurrentPage(paginationRootElem, startWith, nation = "") {
  prevPageButton.disabled = currentPage === 1;
  prevPortionButton.disabled = currentPage <= portionSize;

  for (let i = startWith; i < startWith + portionSize; i++) {
    const pageItem = document.createElement("span");
    pageItem.innerText = i;
    pageItem.classList.add("pageItem");
    if (currentPage === i) {
      getUsersData(i, nation);
      pageItem.classList.add("active");
    }
    pageItem.addEventListener("click", function () {
      paginationContent.innerHTML = "";
      usersContainer.innerHTML = "";
      currentPage = i;
      setCurrentPage(paginationRootElem, portionStartWith, selectValue);
    });
    paginationContent.append(pageItem);
  }
  paginationRootElem.append(paginationContent);
}

prevPageButton.innerText = "<";
nextPageButton.innerText = ">";
prevPortionButton.innerText = "<<";
nextPortionButton.innerText = ">>";

prevPageButton.addEventListener("click", () => {
  const paginationContent = document.querySelector(".paginationContent");
  usersContainer.innerHTML = "";
  paginationContent.innerHTML = "";
  if (currentPage === portionStartWith) {
    currentPage--;
    portionStartWith -= portionSize;
    bindedSetCurrentPage(portionStartWith, selectValue);
  } else {
    currentPage--;
    bindedSetCurrentPage(portionStartWith, selectValue);
  }
});

nextPageButton.addEventListener("click", () => {
  const paginationContent = document.querySelector(".paginationContent");
  usersContainer.innerHTML = "";
  paginationContent.innerHTML = "";
  if (currentPage === portionStartWith + portionSize - 1) {
    currentPage++;
    portionStartWith = currentPage;
    bindedSetCurrentPage(portionStartWith, selectValue);
  } else {
    currentPage++;
    bindedSetCurrentPage(portionStartWith, selectValue);
  }
});

prevPortionButton.addEventListener("click", () => {
  const paginationContent = document.querySelector(".paginationContent");
  usersContainer.innerHTML = "";
  paginationContent.innerHTML = "";
  currentPage = portionStartWith -= portionSize;
  bindedSetCurrentPage(portionStartWith, selectValue);
});

nextPortionButton.addEventListener("click", () => {
  const paginationContent = document.querySelector(".paginationContent");
  usersContainer.innerHTML = "";
  paginationContent.innerHTML = "";
  currentPage = portionStartWith += portionSize;
  bindedSetCurrentPage(portionStartWith, selectValue);
});

bindedSetCurrentPage(portionStartWith);

paginationContainer.append(
  prevPortionButton,
  prevPageButton,
  pagination,
  nextPageButton,
  nextPortionButton
);

rootElem.append(usersContainer);
rootElem.append(paginationContainer);
