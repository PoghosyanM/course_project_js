export async function getUsers(usersCount) {
  try {
    const response = await fetch(
      `https://randomuser.me/api/?results=${usersCount}&seed=abc`
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
