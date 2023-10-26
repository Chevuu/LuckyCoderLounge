document.addEventListener("DOMContentLoaded", () => {
  const addUserButton = document.getElementById("addUserButton");
  const getUserButton = document.getElementById("getUserButton");
  const userIdInput = document.getElementById("userIdInput");
  const output = document.getElementById("output");

  // Function to add a random user
  addUserButton.addEventListener("click", () => {
    fetch("http://localhost:3000/api/users/add", { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
        output.innerText = JSON.stringify(data, null, 2);
      })
      .catch((error) => {
        output.innerText = `Error: ${error.message}`;
      });
  });

  // Function to get a user by ID
  getUserButton.addEventListener("click", () => {
    const userId = userIdInput.value;
    if (userId) {
      fetch(`http://localhost:3000/api/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          output.innerText = JSON.stringify(data, null, 2);
        })
        .catch((error) => {
          output.innerText = `Error: ${error.message}`;
        });
    } else {
      output.innerText = "Please enter a User ID.";
    }
  });
});
