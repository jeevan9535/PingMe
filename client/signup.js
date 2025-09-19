document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ signup.js loaded!");

  const signupForm = document.getElementById('signupForm');
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim().toLowerCase();
    let password = document.getElementById('password').value.trim();

    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Signup successful! Auto logging in...');

        // ✅ Save token + email
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);

        // Redirect to main page (already logged in)
        window.location.href = '/main.html';
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  });
});
