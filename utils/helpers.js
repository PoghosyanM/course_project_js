export function createUserInfoElem(userData, mainContent) {
  const { name, picture, dob, location, phone, email, nat, gender, login } = userData;

  const content = document.createElement("div");
  const image = document.createElement("img");
  const fullname = document.createElement("h3");
  const age = document.createElement("p")
  const country = document.createElement("p")
  const street = document.createElement("p")
  const phon = document.createElement("p")
  const emailUs = document.createElement("p")
  const national = document.createElement("p")
  const genderUs = document.createElement("p")
  const username = document.createElement("p")

  content.setAttribute("class", "cont")
  image.setAttribute("class", "img")

content.onmouseenter = function() { 
  this.style.background = "rgb(199, 214, 212)";
};

content.onmouseleave = function() { 
  this.style.background =" #eaeaea";
};





  image.setAttribute("src", picture.large);
  fullname.innerText = `${name.first} ${name.last}`;
  age.innerHTML = `<b>Age:</b> ${dob.age}`;
  country.innerHTML = `<b>Country:</b> ${location.city} ${location.country}`;
  street.innerHTML = `<b>Adress:</b> ${location.street.number} ${location.street.name}`;
  phon.innerHTML = `<img src="./img/phone.png" alt="" style="width: 15px"> ${phone}`;
  emailUs.innerHTML = `<img src="./img/email.png" alt="" style="width: 15px"> ${email}`;
  national.innerHTML = `<b>National:</b> ${nat}`;
  genderUs.innerHTML = `<b>Gender:</b> ${gender}`;
  username.innerHTML = `<b>Username:</b> ${login.username}`;
  content.append(image, fullname, age, country, street, phon, emailUs, national, genderUs, username);
  mainContent.append(content);
}



export  function getFilteredUsers(data, usersContainer, searchInput) {
  searchInput.addEventListener("input", (e) => {
    usersContainer.innerHTML = "";
    const inputValue = e.currentTarget.value;
    const filteredUsers =  data.results.filter((user) => {
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
