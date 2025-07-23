const placesList = document.querySelector('#places ul');
const amenitiesList = document.querySelector('#amenities ul');

document.addEventListener('DOMContentLoaded', async () => {
  const loginForm = document.getElementById('login-form');
  const loginButton = document.getElementById('login-link');
  const logoutButton = document.getElementById('logout-link');
  const filter = document.getElementById('filter');
  const refresh = document.getElementById('filter-button');

  checkAuthentication();

  if (filter) {

    let price = 0;
    let capacity = 1;
    let rooms = 1;
    let surface = 1;
    let amenities = [];

    /* Retrieving all amenities */
    const amenityItems = await fetchAmenities().then(
      data => { return data }
    );

    /* Populating amenities filter */
    for (let i = 0; i < amenityItems.length; i++) {
      const li = document.createElement('li');

      const label = document.createElement('label');
      label.setAttribute('for', amenityItems[i].name);
      label.textContent = amenityItems[i].name;

      const input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      input.setAttribute('id', amenityItems[i].id);
      input.setAttribute('value', amenityItems[i].name);

      li.appendChild(label);
      label.appendChild(input);
      amenitiesList.appendChild(li);

      /* console.log(amenityItems[i].name, amenityItems[i].id); */
    }

    /* Setting filters values */
    document.getElementById('price-filter').addEventListener('change', (event) => {
      price = Number(document.getElementById('price-filter').value);
    });
    document.getElementById('capacity-filter').addEventListener('input', (event) => {
      capacity = Number(document.getElementById('capacity-filter').value);
    });
    document.getElementById('rooms-filter').addEventListener('input', (event) => {
      rooms = Number(document.getElementById('rooms-filter').value);
    });
    document.getElementById('surface-filter').addEventListener('input', (event) => {
      surface = Number(document.getElementById('surface-filter').value);
    });

    let list = document.querySelectorAll('.amenities-filter input');
    for (let i = 0; i < list.length; i++) {
      list[i].addEventListener('change', (event) => {
        if (list[i].checked) {
          amenities.push(list[i].defaultValue);
          /* console.log(amenities); */
        } else {
          let index = amenities.indexOf(list[i].defaultValue);
          amenities.splice(index, 1);
          /* console.log(amenities); */
        }
      })
    }

    /* Filtering places to display */
    refresh.addEventListener('click', (event) => {
      const places = document.querySelectorAll('#places li');
      filterPlaces(places, price, capacity, rooms, surface, amenities)
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      loginUser(loginForm.email.value, loginForm.password.value);
    });
  }

  if (loginButton) {
    loginButton.addEventListener('click', (event) => {
      window.location.href = 'login.html';
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', (event) => {
      deleteCookie('token');
      window.location.href = 'login.html';
    })
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
  /* Displaying login/logout button */
  const token = getCookie('token');
  const loginLink = document.getElementById('login-link');
  const logoutLink = document.getElementById('logout-link');

  if (!token) {
    loginLink.style.display = 'block';
    logoutLink.style.display = 'none';
  } else {
    loginLink.style.display = 'none';
    logoutLink.style.display = 'block';

    if (placesList) {
      const places = await fetchPlaces(token);
      displayPlaces(places);
    }
  }
}

function getCookie(name) {
  /* Getting a cookie value */
  const cookieList = decodeURIComponent(document.cookie).split('; ');
  for (let i = 0; i < cookieList.length; i++) {
    const cookie = cookieList[i].split('=');
    if (name == cookie[0]) {
      return cookie[1];
    }
  }
}

function deleteCookie(name) {
  /* Deleting a cookie */
  const cookieList = decodeURIComponent(document.cookie).split('; ');
  for (let i = 0; i < cookieList.length; i++) {
    const cookie = cookieList[i].split('=');
    if (name == cookie[0]) {
      document.cookie = `token=${cookie[1]}; expires=Thu, 01 Jan 1970 12:00:00 GMT; path=/`;
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

async function fetchAmenities() {
  /* Retrieving all amenities */
  const response = await fetch('http://127.0.0.1:5000/api/v1/amenities/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    alert('Fetching amenities failed: ' + response.statusText);
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
    li.setAttribute('price', places[i].price);
    li.setAttribute('capacity', places[i].capacity);
    li.setAttribute('rooms', places[i].rooms);
    li.setAttribute('surface', places[i].surface);

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

function filterPlaces(places, price, capacity, rooms, surface, amenities) {
  /* Filtering places to display */
  for (let i = 0; i < places.length; i++) {
    if (
      (Number(places[i].getAttribute('price')) > price && price > 0) ||
      (Number(places[i].getAttribute('capacity')) < capacity) ||
      (Number(places[i].getAttribute('rooms')) < rooms) ||
      (Number(places[i].getAttribute('surface')) < surface)
    ) {
      places[i].style.display = 'none';
    } else {
      places[i].style.display = 'block';
    }
  }
}
