import { fetchUsers } from "./api/api.js";
import { createUserInfoElem, getFilteredUsers} from "./utils/helpers.js";
// import {setCurrentPage} from "./utils/pagination.js"
const rootElem = document.getElementById("root");
const usersContainer = document.createElement("div");
const header = document.createElement("header");
const searchInput = document.createElement("input");
const pagination = document.createElement("div");
const paginationContainer = document.createElement("div");
const nextPageButton = document.createElement("button");
const prevPageButton = document.createElement("button");
const nextSectionButton = document.createElement("button");
const prevSectionButton = document.createElement("button");

pagination.classList.add("pagination");
paginationContainer.classList.add("paginationContainer");
header.setAttribute("id", "header");
searchInput.setAttribute("id", "searchInput");


header.append(searchInput);
rootElem.append(header);






usersContainer.setAttribute("id", "usersContainer");

async function getUsersData() {
  try {
    const data = await fetchUsers(currentPage);

    getFilteredUsers(data, usersContainer, searchInput )

    data.results.forEach(function (user) {
      createUserInfoElem(user, usersContainer);
    });
  } catch (error) {
    console.log(error);
  }
}

let currentPage = 1;






// setCurrentPage( getUsersData, currentPage, usersContainer )

function setCurrentPage(paginationRootElem, i=1, numberOfUsers=10 ) {
  const paginationContent = document.createElement("div");
  paginationContent.classList.add("paginationContent");

  for (i; i <= numberOfUsers; i++) {
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
      setCurrentPage(paginationRootElem);
    });
    paginationContent.append(pageItem);
  }
   paginationRootElem.append(paginationContent);
}

 


prevPageButton.innerText = "<";
nextPageButton.innerText = ">";
prevSectionButton.innerText = "<<"
nextSectionButton.innerText = ">>"





prevPageButton.addEventListener("click", () => {
  const paginationContent = document.querySelector(".paginationContent");
  usersContainer.innerHTML = "";
  paginationContent.remove();
  
  currentPage--;
  setCurrentPage(pagination, 1, 10);
});

nextPageButton.addEventListener("click", () => {
  const paginationContent = document.querySelector(".paginationContent");
  usersContainer.innerHTML = "";
  paginationContent.remove();
  
  currentPage++;
  
  setCurrentPage(pagination);
});




prevSectionButton.addEventListener("click", () => {
  const paginationContent = document.querySelector(".paginationContent");
  usersContainer.innerHTML = "";
  paginationContent.remove();
  
  currentPage--;
  setCurrentPage(pagination, 11,  20);
});

nextSectionButton.addEventListener("click", () => {
  const paginationContent = document.querySelector(".paginationContent");
  usersContainer.innerHTML = "";
  paginationContent.remove();
  currentPage ++;
  setCurrentPage(pagination, 11,  20);
});







setCurrentPage(pagination);

 paginationContainer.append(prevSectionButton, prevPageButton, pagination, nextPageButton, nextSectionButton);
 
rootElem.append(usersContainer);
rootElem.append(paginationContainer);
