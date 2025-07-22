const placesList = document.querySelector('#places ul');

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  checkAuthentication();

  if (placesList) {
    document.getElementById('price-filter').addEventListener('change', (event) => {
      const value = document.getElementById('price-filter').value;
      filterPlaces(value);
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      loginUser(loginForm.email.value, loginForm.password.value);
    });
  }
});

async function loginUser (email, password) {
  /* Authenticating a user */
  const response = await fetch('http://127.0.0.1:5000/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  /* Saving token in a cookie */
  if (response.ok) {
    const data = await response.json();
    document.cookie = `token=${data.access_token}; path=/`;
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
      displayPlaces(places);
    }
  }
}

function getCookie(name) {
  /* Getting cookie value */
  const cookieList = decodeURIComponent(document.cookie).split('; ');
  for (let i = 0; i < cookieList.length; i++) {
    const cookie = cookieList[i].split('=');
    if (name == cookie[0]) {
      return cookie[1];
    }
  }
}

async function fetchPlaces(token) {
  /* Retrieving all places */
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

function displayPlaces(places) {
  /* Clearing placesList */
  let lastItem = placesList.lastElementChild;
  while (lastItem) {
    placesList.removeChild(lastItem);
    lastItem = placesList.lastElementChild;
  }

  /* Populating placesList */
  for (let i = 0; i < places.length; i++) {
    const li = document.createElement('li');
    li.classList.add('col-3');

    const div = document.createElement('div');
    div.classList.add('place-card');

    const h3 = document.createElement('h3');
    h3.classList.add('place-title');
    h3.textContent = places[i].title;

    const p = document.createElement('p');
    p.classList.add('place-price');
    p.textContent = `$${places[i].price}`;

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
}

function filterPlaces(value) {
  if (value > 0) {
    for (let i = 0; i < placesList.length; i++) {
      if (placesList[i].price > value) {
        placesList[i].style.display = none;
      }
    }
  }
}
