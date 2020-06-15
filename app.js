import { getUsers } from "./api/api.js";
import { createUserInfoElem } from "./utils/helpers.js";
const rootElem = document.getElementById("root");
const usersContainer = document.createElement("div");
const header = document.createElement("header");
const searchInput = document.createElement("input");

header.setAttribute("id", "header");
searchInput.setAttribute("id", "searchInput");

header.append(searchInput);
rootElem.append(header);

usersContainer.setAttribute("id", "usersContainer");

async function users() {
  try {
    const data = await getUsers(10);
    searchInput.addEventListener("input", (e) => {
      usersContainer.innerHTML = "";
      const inputValue = e.currentTarget.value;
      const filteredUsers = data.results.filter((user) => {
        const {
          name: { first, last },
        } = user;
        return (
          first.toUpperCase().includes(inputValue.toUpperCase()) ||
          last.toUpperCase().includes(inputValue.toUpperCase())
        );
      });
      filteredUsers.forEach(function (user) {
        createUserInfoElem(user, usersContainer);
      });
    });
    data.results.forEach(function (user) {
      createUserInfoElem(user, usersContainer);
    });
  } catch (error) {
    console.log(error);
  }
}

users();

rootElem.append(usersContainer);
