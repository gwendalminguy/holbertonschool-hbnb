const API_URL = 'http://127.0.0.1:5000/api/v1/';
const placesList = document.querySelector('#places ul');
const amenitiesList = document.querySelector('#amenities ul');
const reviewsList = document.querySelector('#reviews ul');

document.addEventListener('DOMContentLoaded', async () => {
  const loginForm = document.getElementById('login-form');
  const loginButton = document.getElementById('login-link');
  const logoutButton = document.getElementById('logout-link');

  const token = await checkAuthentication().then(
    data => { return data}
  );

  const filter = document.getElementById('filter');
  const filterButton = document.getElementById('filter-button');
  const resetButton = document.getElementById('reset-button');
  const placeDetails = document.getElementById('place-details');
  const animation = document.getElementById('animation');

  if (!token && (window.location.pathname === '/index.html')) {
    /* Displaying animation */
    animation.style.display = 'block';

    /* Redirecting to login page */
    window.setTimeout( function() {
      window.location.href = 'login.html';
    }, 5000);
  } else if (animation) {
    animation.style.display = 'none';
  }

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

      li.appendChild(input);
      li.appendChild(label);
      amenitiesList.appendChild(li);
      /* console.log(amenityItems[i].name, amenityItems[i].id); */
    }

    /* Setting number filters values */
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

    /* Setting amenities filter values */
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
    filterButton.addEventListener('click', (event) => {
      const places = document.querySelectorAll('#places li');
      filterPlaces(places, price, capacity, rooms, surface, amenities);
    });

    /* Reseting filters and places to display */
    resetButton.addEventListener('click', (event) => {
      const places = document.querySelectorAll('#places li');
      price = 0;
      capacity = 1;
      rooms = 1;
      surface = 10;
      amenities = [];
      resetFilters();
      filterPlaces(places, price, capacity, rooms, surface, amenities);
    });
  }

  if (placeDetails) {
    const id = getPlaceIdFromURL();
    fetchPlaceDetails(token, id);
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
  const response = await fetch(`${API_URL}auth/login`, {
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
      document.getElementById('filter').style.display = 'block';
      const places = await fetchPlaces(token);
      displayPlaces(places);
    }

    return token;
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
  const response = await fetch(`${API_URL}places/`, {
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
    li.setAttribute('amenities', places[i].amenities.join(';'));

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
    button.textContent = 'Details';
    button.addEventListener('click', (event) => {
      window.location.href = `place.html?=${places[i].id}`;
      /*location.search = `${places[i].id}`;*/
    })

    li.appendChild(div);
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(button);
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
      if (!isMissing(amenities, places[i].getAttribute('amenities'))) {
        places[i].style.display = 'block';
      } else {
        places[i].style.display = 'none';
      }
    }
  }
}

function isMissing(amenities, placeAmenities) {
  /* Checking placeAmenities */
  for (let i = 0; i < amenities.length; i++) {
    const array = placeAmenities.split(';');
    let missingAmenity = true;
    for (let j = 0; j < array.length; j++) {
      if (amenities[i] === array[j]) {
        missingAmenity = false;
        break;
      }
    }
    if (missingAmenity) {
      return true;
    }
  }
  return false;
}

function resetFilters() {
  /* Resetting all values to default */
  document.getElementById('price-filter').value = '0';
  document.getElementById('capacity-filter').value = '1';
  document.getElementById('rooms-filter').value = '1';
  document.getElementById('surface-filter').value = '10';

  /* Unchecking all amenities */
  for (const element of document.querySelectorAll('.amenities-filter input')) {
    element.checked = false
  }
}

function getPlaceIdFromURL() {
  const id = window.location.search.split('=');
  return id[1];
}

async function fetchPlaceDetails(token, placeId) {
  const response = await fetch(`${API_URL}places/${placeId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.ok) {
    const data = await response.json();
    displayPlaceDetails(data);
  } else {
    alert('Fetching place details failed: ' + response.statusText);
  }
}

function displayPlaceDetails(place) {
  /* Populating place details */
  const card = document.querySelector('.place-card');

  const title = document.createElement('h3');
  title.classList.add('place-title');
  title.textContent = place.title;

  const description = document.createElement('p');
  description.classList.add('place-description');
  description.textContent = place.description;

  const price = document.createElement('p');
  price.classList.add('place-price');
  price.textContent = `$${place.price} / night`;

  const owner = document.createElement('p');
  owner.classList.add('place-owner');
  owner.textContent = `${place.owner.first_name} ${place.owner.last_name}`;

  const capacity = document.createElement('p');
  capacity.classList.add('place-capacity');
  capacity.textContent = `Capacity: ${place.capacity} people`;

  const rooms = document.createElement('p');
  rooms.classList.add('place-rooms');
  rooms.textContent = `Rooms: ${place.rooms}`;

  const surface = document.createElement('p');
  surface.classList.add('place-surface');
  surface.textContent = `${place.surface} m`;
  const square = document.createElement('sup');
  square.textContent = '2';
  surface.appendChild(square);

  const h4 = document.createElement('h4');
  h4.textContent = 'Amenities:';
  const amenities = document.createElement('ul');
  amenities.classList.add('place-amenities');
  for (let i = 0; i < place.amenities.length; i++) {
    let amenity = document.createElement('li');
    amenity.classList.add('amenity-item');
    amenity.textContent = place.amenities[i].name;
    amenities.appendChild(amenity);
  };

  const button = document.createElement('button');
  button.classList.add('review-button');
  button.textContent = 'Review';
  button.addEventListener('click', (event) => {
    window.location.href = `add_review.html?=${place.id}`;
    /*location.search = `${places[i].id}`;*/
  })

  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(price);
  card.appendChild(owner);
  card.appendChild(capacity);
  card.appendChild(surface);
  card.appendChild(rooms);
  card.appendChild(h4);
  card.appendChild(amenities);
  card.appendChild(button)

  displayReviews(place);
}

function displayReviews(place) {
  /* Populating place reviews */
  for (let i = 0; i < place.reviews.length; i++) {
    let li = document.createElement('li');
    li.classList.add('col-3');

    let div = document.createElement('div');
    div.classList.add('review-card');

    let title = document.createElement('h3');
    title.classList.add('review-title');
    title.textContent = place.reviews[i].title;

    let rating = document.createElement('p');
    rating.classList.add('review-rating');
    rating.textContent = place.reviews[i].rating;

    let text = document.createElement('p');
    text.classList.add('review-text');
    text.textContent = place.reviews[i].text;

    li.appendChild(div);
    div.appendChild(title);
    div.appendChild(rating);
    div.appendChild(text);
    reviewsList.appendChild(li);
  }
}
