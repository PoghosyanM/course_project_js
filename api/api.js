export async function fetchUsers(currentPage, usersCount = 10) {
  try {
    const response = await fetch(
      `https://randomuser.me/api/?page=${currentPage}&results=${usersCount}&seed=abc`
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
