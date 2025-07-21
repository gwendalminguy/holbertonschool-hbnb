document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      loginUser(loginForm.email.value, loginForm.password.value);
    });
  }
});

async function loginUser (email, password) {
  const response = await fetch('http://127.0.0.1:5000/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (response.ok) {
    const data = await response.json();
    /*console.log(data);*/
    document.cookie = `token=${data.access_token}; path=/`;
    /*window.location.href = 'index.html';*/
  } else {
    alert('Login failed: ' + response.statusText);
  }
}
