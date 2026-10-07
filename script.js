const events = [
  {
    id: 1,

    title: "NBKRIST Tech Fest",

    category: "technical",

    date: "Oct 15, 2026",

    time: "10:00 AM",

    venue: "Seminar Hall",

    price: 99,

    description:
      "A technical festival featuring coding, robotics, AI and innovative student projects."
  },


  {
    id: 2,

    title: "Battle of Bands",

    category: "music",

    date: "Oct 18, 2026",

    time: "6:00 PM",

    venue: "College Auditorium",

    price: 199,

    description:
      "An exciting musical night featuring talented NBKRIST student bands."
  },


  {
    id: 3,

    title: "NBKRIST Cultural Fest",

    category: "cultural",

    date: "Oct 21, 2026",

    time: "5:00 PM",

    venue: "Main Ground",

    price: 149,

    description:
      "Music, dance, food and cultural performances from NBKRIST students."
  },


  {
    id: 4,

    title: "Inter-College Football",

    category: "sports",

    date: "Oct 24, 2026",

    time: "4:00 PM",

    venue: "College Stadium",

    price: 49,

    description:
      "Watch the exciting football competition between colleges."
  },


  {
    id: 5,

    title: "Photography Workshop",

    category: "workshop",

    date: "Oct 26, 2026",

    time: "2:00 PM",

    venue: "Media Lab",

    price: 0,

    description:
      "Learn photography techniques and creative editing from professionals."
  },


  {
    id: 6,

    title: "Freshers Night",

    category: "cultural",

    date: "Oct 30, 2026",

    time: "7:00 PM",

    venue: "Open Air Theatre",

    price: 79,

    description:
      "A memorable welcome event for new NBKRIST students."
  }

];

let selectedEvent = null;

let quantity = 1;

let ticketsSold = 0;

let revenue = 0;

function renderEvents() {

  const grid =
    document.getElementById("eventGrid");


  const search =
    document
      .getElementById("searchInput")
      .value
      .toLowerCase()
      .trim();


  const category =
    document
      .getElementById("categoryFilter")
      .value;


  const filteredEvents =
    events.filter(event => {

      const matchesSearch =

        event.title
          .toLowerCase()
          .includes(search)||

        event.description
          .toLowerCase()
          .includes(search);


      const matchesCategory =

        category === "all" ||

        event.category === category;


      return (
        matchesSearch &&
        matchesCategory
      );

    });


  if (filteredEvents.length === 0) {

    grid.innerHTML = `

      <div class="empty">

        <h3>
          No events found
        </h3>

        <p>
          Try another search or category.
        </p>

      </div>

    `;

    return;
  }


  grid.innerHTML =

    filteredEvents.map(event => `

      <article class="event-card">


        <div class="event-image">

          ${event.title}

        </div>


        <div class="event-body">


          <div class="event-meta">

            ${event.category.toUpperCase()}

          </div>


          <h3>

            ${event.title}

          </h3>


          <p class="event-description">

            ${event.description}

          </p>


          <div class="event-info">

            <span>
               ${event.date}
            </span>

            <span>
              ${event.time}
            </span>

            <span>
               ${event.venue}
            </span>

          </div>


          <div class="event-footer">


            <div
              class="price ${
                event.price === 0
                  ? "free"
                  : ""
              }">

              ${
                event.price === 0
                  ? "FREE"
                  : "₹" + event.price
              }

            </div>


            <button
              class="book-btn"
              onclick="openBooking(${event.id})">

              Get Ticket

            </button>

          </div>

        </div>

      </article>

    `).join("");

}

function openBooking(eventId) {

  selectedEvent =
    events.find(
      event => event.id === eventId
    );


  quantity = 1;


  document.getElementById(
    "quantity"
  ).textContent = quantity;


  document.getElementById(
    "selectedEventName"
  ).textContent =
    selectedEvent.title;


  updateTotal();


  document.getElementById(
    "bookingModal"
  ).classList.add("active");

}

function closeModal() {

  document.getElementById(
    "bookingModal"
  ).classList.remove("active");

}


function changeQuantity(amount) {

  quantity += amount;

  if (quantity < 1) {

    quantity = 1;

  }

  if (quantity > 10) {

    quantity = 10;

  }

  document.getElementById(
    "quantity"
  ).textContent = quantity;

  updateTotal();

}


function updateTotal() {

  if (!selectedEvent) {

    return;

  }

  const total =
    selectedEvent.price * quantity;


  document.getElementById(
    "totalPrice"
  ).textContent =

    total === 0
      ? "FREE"
      : "Rs" + total;

}

function confirmBooking(event) {

  event.preventDefault();


  const name =
    document.getElementById(
      "customerName"
    ).value;


  const email =
    document.getElementById(
      "customerEmail"
    ).value;


  const total =
    selectedEvent.price * quantity;

  ticketsSold += quantity;

  revenue += total;

  updateDashboard();


  const ticketNumber =

    "NBKRIST-" +

    Date.now()
      .toString()
      .slice(-8);

  document.getElementById(
    "ticketEvent"
  ).textContent =
    selectedEvent.title;


  document.getElementById(
    "ticketName"
  ).textContent = name;

  document.getElementById(
    "ticketDate"
  ).textContent = selectedEvent.date +  " · " + selectedEvent.time;

  document.getElementById(
    "ticketVenue"
  ).textContent =

    selectedEvent.venue;

  document.getElementById(
    "ticketQuantity"
  ).textContent =

    quantity +

    " ticket(s)";

  document.getElementById(
    "ticketId"
  ).textContent =
    ticketNumber;

  closeModal();

  document.getElementById(
    "ticketModal"
  ).classList.add("active");

  document.querySelector("form").reset();

}

function closeTicket() {

  document.getElementById(
    "ticketModal"
  ).classList.remove("active");

}

function updateDashboard() {

  document.getElementById(
    "ticketsSold"
  ).textContent =
    ticketsSold;

  document.getElementById(
    "ticketsStat"
  ).textContent =
    ticketsSold;


  document.getElementById(
    "revenue"
  ).textContent =
    "₹" + revenue;

}

function scrollToEvents() {

  document
    .getElementById("events")
    .scrollIntoView({
      behavior: "smooth"
    });

}

function scrollToDashboard() {

  document
    .getElementById("dashboard")
    .scrollIntoView({
      behavior: "smooth"
    });

}

document.getElementById(
  "totalEvents"
).textContent = events.length;

document.getElementById(
  "eventCount"
).textContent = events.length;

renderEvents();
