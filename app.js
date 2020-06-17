import { getUsers } from "./api/api.js";
import { createUserInfoElem, userSearch } from "./utils/helpers.js";
const rootElem = document.getElementById("root");
console.log(rootElem);
const usersContainer = document.createElement("div");
const header = document.createElement("header");
const searchInput = document.createElement("input");

header.setAttribute("id", "header");
searchInput.setAttribute("id", "searchInput");
header.innerHTML = `Search User `
header.append(searchInput);
rootElem.append(header);

usersContainer.setAttribute("id", "usersContainer");


async function users() {
  try {
    const data = await getUsers(10);

    userSearch(data);   

    data.results.forEach(function (user) {
      createUserInfoElem(user, usersContainer);
      console.log(user);
      
    });
  } catch (error) {
    console.log(error);
  }
}

users();

rootElem.append(usersContainer);