export function createUserInfoElem(userData, mainContent) {
  const { name, picture } = userData;

  const content = document.createElement("div");
  const image = document.createElement("img");
  const fullname = document.createElement("h3");

  image.setAttribute("src", picture.medium);
  fullname.innerText = `${name.first} ${name.last}`;
  content.append(image, fullname);
  mainContent.append(content);
}
