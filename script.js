async function loadAnnouncements() {
  const banner = document.getElementById('announcements');
  const response = await fetch('data/announcement.json');
  const data = await response.json();

  banner.innerHTML = data.announcements
    .map((item) => `<p class="announcement"><strong>${item.title}</strong> ${item.message}</p>`)
    .join('');
}

async function loadHours() {
  const list = document.getElementById('hours');
  const response = await fetch('data/hours.json');
  const data = await response.json();

  list.innerHTML = data.hours
    .map((entry) => `<li><span class="day">${entry.day}</span><span>${entry.hours}</span></li>`)
    .join('');
}

function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

function createEventCard(event) {
  const card = document.createElement('article');
  card.className = 'event-card';
  card.innerHTML = `
    <h3>${event.title}</h3>
    <p class="event-meta">${formatDate(event.date)} · ${event.time}</p>
    <p class="event-desc">${event.description}</p>
    <p class="event-location">📍 ${event.location.name}, ${event.location.room}</p>
  `;
  return card;
}

async function loadEvents() {
  const container = document.getElementById('events');
  const response = await fetch('data/events.json');
  const events = await response.json();

  container.innerHTML = '';
  events.forEach((event) => {
    container.appendChild(createEventCard(event));
  });
}

loadAnnouncements();
loadHours();
loadEvents();
