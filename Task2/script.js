Basic email validation 
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}
function loadUsers() {
  const stored = localStorage.getItem("users");
  return stored ? JSON.parse(stored) : [];
}

Save users to localStorage
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function renderUserList() {
  const users = loadUsers();
  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  if (users.length === 0) {
    userList.innerHTML = "<li>No users yet.</li>";
    return;
  }

  users.forEach((user, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${user.name} (${user.email})`;
    userList.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("authForm");
  const errorMsg = document.getElementById("errorMsg");
  const successMsg = document.getElementById("successMsg");

  renderUserList();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    errorMsg.textContent = "";
    successMsg.textContent = "";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (name.length < 2) {
      errorMsg.textContent = "Name must be at least 2 characters.";
      return;
    }

    if (!isValidEmail(email)) {
      errorMsg.textContent = "Please enter a valid email address.";
      return;
    }

    if (password.length < 6) {
      errorMsg.textContent = "Password must be at least 6 characters.";
      return;
    }

    let users = loadUsers();
    const existingUser = users.find((u) => u.email === email);

    if (!existingUser) {
      // New user → add to app
      users.push({ name, email });
      saveUsers(users);
      successMsg.textContent =
        "Registration successful! You have been added to the application.";
    } else {
      // Existing user → treat as login success
      successMsg.textContent = `Welcome back, ${existingUser.name}! Login successful.`;
    }

    // Update user list UI
    renderUserList();

    Clear password 
    document.getElementById("password").value = "";
  });
});
