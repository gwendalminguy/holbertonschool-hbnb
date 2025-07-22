const placesList = document.querySelector('#places ul');

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  checkAuthentication();

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
    document.cookie = `token=${data.access_token};path=/`;
    /* document.cookie = `username=me;path=/`; */
    window.location.href = 'index.html';
  } else {
    alert('Login failed: ' + response.statusText);
  }
}

async function checkAuthentication() {
  const token = getCookie('token');
  const loginLink = document.getElementById('login-link');

  if (!token) {
    loginLink.style.display = 'block';
  } else {
    loginLink.style.display = 'none';

    if (placesList) {
      const places = await fetchPlaces(token);
      for (let i = 0; i < places.length; i++) {
        addPlaceCard(places[i]);
      }
    }
  }
}

function getCookie(name) {
  const cookieList = decodeURIComponent(document.cookie).split('; ');
  for (let i = 0; i < cookieList.length; i++) {
    const cookie = cookieList[i].split('=');
    if (name == cookie[0]) {
      return cookie[1];
    }
  }
}

async function fetchPlaces(token) {
  const response = await fetch('http://127.0.0.1:5000/api/v1/places/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    alert('Fetching places failed: ' + response.statusText);
  }
}

function addPlaceCard(place) {
  const li = document.createElement('li');
  li.classList.add('col-3');

  const div = document.createElement('div');
  div.classList.add('place-card');

  const h3 = document.createElement('h3');
  h3.classList.add('place-title');
  h3.textContent = place.title;

  const p = document.createElement('p');
  p.classList.add('place-price');
  p.textContent = `$${place.price}`;

  const button = document.createElement('button');
  button.classList.add('details-button');

  const a = document.createElement('a');
  a.href = 'place.html';
  a.textContent = 'Details';

  li.appendChild(div);
  div.appendChild(h3);
  div.appendChild(p);
  div.appendChild(button);
  button.appendChild(a);
  placesList.appendChild(li);
}
