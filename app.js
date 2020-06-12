import { getUsers } from "./api/api.js";
import { createUserInfoElem } from "./utils/helpers.js";
const rootElem = document.getElementById("root");
console.log(rootElem);

async function users() {
  try {
    const data = await getUsers(10);
    data.results.forEach(function (userData) {
      createUserInfoElem(userData, rootElem);
    });
  } catch (error) {
    console.log(error);
  }
}

users();
