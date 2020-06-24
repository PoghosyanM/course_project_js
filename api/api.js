export async function fetchUsers(
  currentPage,
  userNation = "",
  usersCount = 10
) {
  const baseUrl = "https://randomuser.me/api/";
  try {
    const response = await fetch(
      `${baseUrl}?page=${currentPage}&results=${usersCount}&nat=${userNation}&seed=abc`
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
