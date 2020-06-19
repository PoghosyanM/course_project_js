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

prevPageButton.classList.add("prevPage");
nextPageButton.classList.add("nextPage");
prevPortionButton.classList.add("prevPortion");
nextPortionButton.classList.add("nextPortion");

prevPageButton.classList.add("paginationButton");
nextPageButton.classList.add("paginationButton");
prevPortionButton.classList.add("paginationButton");
nextPortionButton.classList.add("paginationButton");

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
    getFilteredUsers(data, usersContainer, searchInput);
    data.results.forEach(function (user) {
      createUserInfoElem(user, usersContainer);
    });
  } catch (error) {
    console.log(error);
  }
}

let currentPage = 1;
let portionFirstPage = 1;
const portionSize = 10;

function setCurrentPage(paginationRootElem, startWith) {
  console.log(currentPage);
  if (currentPage === 1) {
    prevPageButton.disabled = true;
  } else {
    prevPageButton.disabled = false;
  }
  if (portionFirstPage < portionSize) {
    prevPortionButton.disabled = true;
  } else {
    prevPortionButton.disabled = false;
  }

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
      setCurrentPage(paginationRootElem, portionFirstPage);
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
  if (currentPage === 1) {
    return;
  }
  const paginationContent = document.querySelector(".paginationContent");
  usersContainer.innerHTML = "";
  paginationContent.remove();
  if (currentPage === portionFirstPage) {
    currentPage--;
    setCurrentPage(pagination, (portionFirstPage -= portionSize));
  } else {
    currentPage--;
    setCurrentPage(pagination, portionFirstPage);
  }
});

nextPageButton.addEventListener("click", () => {
  const paginationContent = document.querySelector(".paginationContent");
  usersContainer.innerHTML = "";
  paginationContent.remove();
  if (currentPage === portionFirstPage + portionSize - 1) {
    currentPage++;
    setCurrentPage(pagination, (portionFirstPage += portionSize));
  } else {
    currentPage++;
    setCurrentPage(pagination, portionFirstPage);
  }
});

prevPortionButton.addEventListener("click", () => {
  if (portionFirstPage < portionSize) {
    return;
  }
  const paginationContent = document.querySelector(".paginationContent");
  usersContainer.innerHTML = "";
  paginationContent.remove();
  currentPage = portionFirstPage - portionSize;
  setCurrentPage(pagination, (portionFirstPage -= portionSize));
});

nextPortionButton.addEventListener("click", () => {
  const paginationContent = document.querySelector(".paginationContent");
  usersContainer.innerHTML = "";
  paginationContent.remove();
  currentPage = portionFirstPage + portionSize;
  setCurrentPage(pagination, (portionFirstPage += portionSize));
});

setCurrentPage(pagination, portionFirstPage);

paginationContainer.append(
  prevPortionButton,
  prevPageButton,
  pagination,
  nextPageButton,
  nextPortionButton
);

rootElem.append(usersContainer);
rootElem.append(paginationContainer);
