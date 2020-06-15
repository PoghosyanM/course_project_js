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
