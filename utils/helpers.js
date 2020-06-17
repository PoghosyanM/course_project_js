export function createUserInfoElem(userData, mainContent) {
  const { name, picture, gender, nat, email, dob, location, login, phone } = userData;

  const content = document.createElement("div");
  const image = document.createElement("img");
  const fullName = document.createElement("h3");
  fullName.setAttribute("id", "id_h3")
  const infoUser = document.createElement("h4");
  infoUser.setAttribute("id", "id_h4")


  image.setAttribute("src", picture.large);
  fullName.innerHTML = `<table> <li> Name Surname - ${name.first} ${name.last} </li>
                                <li> Age - ${dob.age} </li>
                                <li> Country , City - ${location.country} , ${location.city} </li>
                                <li> Adress - ${location.street.name} </li>
                                <li> Phone - ${phone} </li> </table>`

  infoUser.innerHTML = `<table> <li> E-Mail - ${email} </li>
                                <li> National - ${nat} </li>
                                <li> Gender - ${gender} </li>
                                <li> Login - ${login.username} </li> </table>`

  
  content.append(image, fullName, infoUser );
  mainContent.append(content);
}

export function userSearch(data) {
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