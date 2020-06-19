import { fetchUsers } from "./api/api.js";
import { createUserInfoElem, getFilteredUsers } from "./utils/helpers.js";
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

pagination.classList.add("pagination");
paginationContainer.classList.add("paginationContainer");
header.setAttribute("id", "header");
searchInput.setAttribute("id", "searchInput");
header.append(searchInput);
rootElem.append(header);

usersContainer.setAttribute("id", "usersContainer");

async function getUsersData(currentPage) {
  try {
    const data = await fetchUsers(currentPage);
    console.log(data);
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

const bindedSetCurrentPage = setCurrentPage.bind(null, pagination);

function setCurrentPage(paginationRootElem, startWith) {
  prevPageButton.disabled = currentPage === 1;
  prevPortionButton.disabled = currentPage <= portionSize;

  const paginationContent = document.createElement("div");
  paginationContent.classList.add("paginationContent");
  for (let i = startWith; i < startWith + portionSize; i++) {
    const pageItem = document.createElement("span");
    pageItem.innerText = i;
    pageItem.classList.add("pageItem");
    if (currentPage === i) {
      getUsersData(i);
      pageItem.classList.add("active");
    }
    pageItem.addEventListener("click", function () {
      paginationContent.remove();
      usersContainer.innerHTML = "";
      currentPage = i;
      setCurrentPage(paginationRootElem, portionStartWith);
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
  paginationContent.remove();
  if (currentPage === portionStartWith) {
    currentPage--;
    bindedSetCurrentPage((portionStartWith -= portionSize));
  } else {
    currentPage--;
    bindedSetCurrentPage(portionStartWith);
  }
});

nextPageButton.addEventListener("click", () => {
  const paginationContent = document.querySelector(".paginationContent");
  usersContainer.innerHTML = "";
  paginationContent.remove();
  if (currentPage === portionStartWith + portionSize - 1) {
    currentPage++;
    bindedSetCurrentPage((portionStartWith = currentPage));
  } else {
    currentPage++;
    bindedSetCurrentPage(portionStartWith);
  }
});

prevPortionButton.addEventListener("click", () => {
  const paginationContent = document.querySelector(".paginationContent");
  usersContainer.innerHTML = "";
  paginationContent.remove();
  currentPage = portionStartWith -= portionSize;
  bindedSetCurrentPage(portionStartWith);
});

nextPortionButton.addEventListener("click", () => {
  const paginationContent = document.querySelector(".paginationContent");
  usersContainer.innerHTML = "";
  paginationContent.remove();
  currentPage = portionStartWith += portionSize;
  bindedSetCurrentPage(portionStartWith);
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
