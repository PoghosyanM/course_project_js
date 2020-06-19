export function createUserInfoElem(userData, mainContent) {
  const { name, picture } = userData;

  const content = document.createElement("div");
  const image = document.createElement("img");
  const fullname = document.createElement("h2");

  image.setAttribute("src", picture.large);
  fullname.innerText = `${name.first} ${name.last}`;
  content.append(fullname, image);
  content.setAttribute("id", "userData");
  mainContent.append(content);
}

export function getFilteredUsers(data, usersContainer, searchInput) {
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
}
