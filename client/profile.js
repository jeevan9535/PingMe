document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("email");

  if (!token || !userEmail) {
    alert("No user logged in");
    window.location.href = "/login.html";
    return;
  }

  try {
    const res = await fetch(`/api/users/profile/${encodeURIComponent(userEmail)}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    const data = await res.json();

    if (res.ok) {
      document.getElementById("name").textContent = data.name || "User";
      document.getElementById("email").textContent = data.email || "-";
      document.getElementById("username").textContent = data.username || "-";
      document.getElementById("createdAt").textContent = new Date(data.createdAt).toLocaleString('default', {
        month: 'long',
        year: 'numeric'
      });
      document.getElementById("totalNotes").textContent = data.totalNotes || 0;
    } else {
      alert(data.message || "Unauthorized. Please login again.");
      window.location.href = "/login.html";
    }
  } catch (err) {
    console.error("Error fetching profile", err);
    alert("Error fetching user data");
    window.location.href = "/login.html";
  }
});
