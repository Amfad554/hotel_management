class Booking {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }
}

class RoomBooking extends Booking {
  constructor(name, checkin, checkout, roomNumber, guests) {
    super("Room", name);
    this.checkin = checkin;
    this.checkout = checkout;
    this.roomNumber = roomNumber;
    this.guests = guests;
  }
}

class EventBooking extends Booking {
  constructor(name, eventName, eventDate, attendees, venue) {
    super("Event", name);
    this.eventName = eventName;
    this.eventDate = eventDate;
    this.attendees = attendees;
    this.venue = venue;
  }
}

class BothBooking extends Booking {
  constructor(name, checkin, checkout, roomNumber, guests, eventName, eventDate, attendees, venue) {
    super("Both", name);
    this.checkin = checkin;
    this.checkout = checkout;
    this.roomNumber = roomNumber;
    this.guests = guests;
    this.eventName = eventName;
    this.eventDate = eventDate;
    this.attendees = attendees;
    this.venue = venue;
  }
}

// =========================
// Dashboard Logic
// =========================
const bookingType = document.getElementById("booking-type");
const roomFields = document.getElementById("room-fields");
const eventFields = document.getElementById("event-fields");
const bothFields = document.getElementById("both-fields");
const form = document.getElementById("booking-form");
const successMessage = document.getElementById("successMessage");

const bookingList = document.getElementById("booking-list");
const confirmedList = document.getElementById("confirmed-booking-list");

const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

let activeBookings = [];
let checkedBookings = [];

// =========================
// Show/Hide form fields
// =========================
function updateFields() {
  const type = bookingType.value;
  roomFields.style.display = (type === "Room") ? "block" : "none";
  eventFields.style.display = (type === "Event") ? "block" : "none";
  bothFields.style.display = (type === "Both") ? "block" : "none";
}
bookingType.addEventListener("change", updateFields);
updateFields();

// =========================
// Render Functions
// =========================
function renderActive() {
  bookingList.innerHTML = "";
  if(activeBookings.length === 0){
    bookingList.innerHTML = "<p>No active bookings.</p>";
    return;
  }

  activeBookings.forEach((b, index) => {
    const div = document.createElement("div");
    div.classList.add("booking-item");

    let content = `<strong>${b.type}:</strong> ${b.name}`;
    if(b instanceof RoomBooking){
      content += ` | Check-in: ${b.checkin}, Check-out: ${b.checkout}, Room: ${b.roomNumber}, Guests: ${b.guests}`;
    } else if(b instanceof EventBooking){
      content += ` | Event: ${b.eventName}, Date: ${b.eventDate}, Attendees: ${b.attendees}, Venue: ${b.venue}`;
    } else if(b instanceof BothBooking){
      content += ` | Room: ${b.roomNumber}, Guests: ${b.guests}, Event: ${b.eventName}, Date: ${b.eventDate}, Attendees: ${b.attendees}, Venue: ${b.venue}`;
    }

    div.innerHTML = content;

    const btn = document.createElement("button");
    btn.textContent = "Checkout";
    btn.addEventListener("click", () => {
      const checked = activeBookings.splice(index,1)[0];
      checkedBookings.push(checked);
      renderActive();
      renderChecked();
    });
    div.appendChild(btn);
    bookingList.appendChild(div);
  });
}

function renderChecked() {
  confirmedList.innerHTML = "";
  if(checkedBookings.length === 0){
    confirmedList.innerHTML = "<p>No checked-out bookings.</p>";
    return;
  }

  checkedBookings.forEach(b => {
    const div = document.createElement("div");
    div.classList.add("booking-item");

    let content = `<strong>${b.type}:</strong> ${b.name}`;
    if(b instanceof RoomBooking){
      content += ` | Check-in: ${b.checkin}, Check-out: ${b.checkout}, Room: ${b.roomNumber}, Guests: ${b.guests}`;
    } else if(b instanceof EventBooking){
      content += ` | Event: ${b.eventName}, Date: ${b.eventDate}, Attendees: ${b.attendees}, Venue: ${b.venue}`;
    } else if(b instanceof BothBooking){
      content += ` | Room: ${b.roomNumber}, Guests: ${b.guests}, Event: ${b.eventName}, Date: ${b.eventDate}, Attendees: ${b.attendees}, Venue: ${b.venue}`;
    }

    div.innerHTML = content;
    confirmedList.appendChild(div);
  });
}

// =========================
// Handle Form Submission
// =========================
form.addEventListener("submit", e => {
  e.preventDefault();
  const type = bookingType.value;
  const name = document.getElementById("name").value;

  let booking;
  if(type === "Room"){
    booking = new RoomBooking(
      name,
      document.getElementById("checkin").value,
      document.getElementById("checkout").value,
      document.getElementById("roomNumber").value,
      document.getElementById("guests").value
    );
  } else if(type === "Event"){
    booking = new EventBooking(
      name,
      document.getElementById("eventName").value,
      document.getElementById("eventDate").value,
      document.getElementById("attendees").value,
      document.getElementById("venue").value
    );
  } else {
    booking = new BothBooking(
      name,
      document.getElementById("bothCheckin").value,
      document.getElementById("bothCheckout").value,
      document.getElementById("bothRoomNumber").value,
      document.getElementById("bothGuests").value,
      document.getElementById("bothEventName").value,
      document.getElementById("bothEventDate").value,
      document.getElementById("bothAttendees").value,
      document.getElementById("bothVenue").value
    );
  }

  activeBookings.push(booking);
  renderActive();
  successMessage.style.display = "block";
  setTimeout(()=> successMessage.style.display = "none", 2000);

  form.reset();
  updateFields();
});

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const tab = btn.dataset.tab;
    tabContents.forEach(tc => tc.classList.remove("active"));
    document.getElementById(tab).classList.add("active");
  });
});

renderActive();
renderChecked();
