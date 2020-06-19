// export  function setCurrentPage(paginationRootElem, getUsersData, currentPage,  usersContainer  ) {
//     const paginationContent = document.createElement("div");
//     paginationContent.classList.add("paginationContent");
//     for (let i = 1; i <= 10; i++) {
//       const pageItem = document.createElement("span");
//       pageItem.innerText = i;
//       pageItem.classList.add("pageItem");
//       if (currentPage === i) {
//         getUsersData(i);
//         pageItem.classList.add("active");
//       }
//       pageItem.addEventListener("click", function () {
//         paginationContent.remove();
//         usersContainer.innerHTML = "";
//         currentPage = i;
//         setCurrentPage(paginationRootElem);
//       });
//       paginationContent.append(pageItem);
//     }
//     paginationRootElem.append(paginationContent);
//   }