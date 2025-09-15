const roomSection = document.getElementById("room-section");
const eventSection = document.getElementById("event-section");
const bothSection = document.getElementById("both-section");
const successMessage = document.getElementById("successMessage");

// Switch between forms
document.getElementById("roomLink").addEventListener("click", (e) => {
  e.preventDefault();
  roomSection.style.display = "block";
  eventSection.style.display = "none";
  bothSection.style.display = "none";
  successMessage.style.display = "none";
});

document.getElementById("eventLink").addEventListener("click", (e) => {
  e.preventDefault();
  roomSection.style.display = "none";
  eventSection.style.display = "block";
  bothSection.style.display = "none";
  successMessage.style.display = "none";
});

document.getElementById("bothLink").addEventListener("click", (e) => {
  e.preventDefault();
  roomSection.style.display = "none";
  eventSection.style.display = "none";
  bothSection.style.display = "block";
  successMessage.style.display = "none";
});

// Arrays
let bookings = [];
let confirmedBookings = [];

// Base class
class Lodger {
  constructor(fullname, email, phone, checkin, checkoutDate, guests, roomtype, payment) {
    this.fullname = fullname;
    this.email = email;
    this.phone = phone;
    this.checkin = checkin;
    this.checkoutDate = checkoutDate;
    this.guests = guests;
    this.roomtype = roomtype;
    this.payment = payment;
  }

  saveBooking() {
    bookings.push(this);
    console.clear();
    console.log("Booking saved:", this);
    console.log("All bookings:", bookings);
    console.table(bookings);
    alert("✅ Booking successful! Please proceed to checkout.");
  }
}

// Subclass for events
class EventBooking extends Lodger {
  constructor(fullname, email, phone, checkin, checkoutDate, guests, roomtype, payment, eventName, eventDate, attendees, eventHall) {
    super(fullname, email, phone, checkin, checkoutDate, guests, roomtype, payment);
    this.eventName = eventName;
    this.eventDate = eventDate;
    this.attendees = attendees;
    this.eventHall = eventHall;
  }

  saveBooking() {
    bookings.push(this);
    console.clear();
    console.log("Event booking saved:", this);
    console.log("All bookings:", bookings);
    console.table(bookings);
    alert("✅ Event booking successful! Please proceed to checkout.");
  }
}

// ROOM FORM
document.getElementById("room-form").addEventListener("submit", function (e) {
  e.preventDefault();

  let lodger = new Lodger(
    this.fullname.value,
    this.email.value,
    this.phone.value,
    this.checkin.value,
    this.checkout.value,
    this.guests.value,
    this.roomtype.value,
    this.payment.value
  );

  lodger.saveBooking();
  document.getElementById("room-checkout").style.display = "inline-block";
  this.reset(); // clear form inputs
});

// EVENT FORM (fixed!)
document.getElementById("rooms-form").addEventListener("submit", function (e) {
  e.preventDefault();

  let eventBooking = new EventBooking(
    this.fullname.value,
    this.email.value,
    this.phone.value,
    "N/A", // no checkin
    "N/A", // no checkout
    "N/A", // no guests
    "N/A", // no roomtype
    this.payment ? this.payment.value : "N/A",
    this.eventName.value,
    this.eventDate.value,
    this.attendees.value,
    this.eventHall.value
  );

  eventBooking.saveBooking();
  document.getElementById("event-checkout").style.display = "inline-block";
  this.reset(); // clear form inputs
});

// BOTH FORM
document.getElementById("both-form").addEventListener("submit", function (e) {
  e.preventDefault();

  let bothBooking = new EventBooking(
    this.fullname.value,
    this.email.value,
    this.phone.value,
    this.checkin.value,
    this.checkout.value,
    this.guests.value,
    this.roomtype.value,
    this.payment.value,
    this.eventName.value,
    this.eventDate.value,
    this.attendees.value,
    this.eventHall.value
  );

  bothBooking.saveBooking();
  document.getElementById("both-checkout").style.display = "inline-block";
  this.reset(); // clear form inputs
});

// ✅ Checkout button pushes booking into confirmedBookings
function setupCheckout(checkoutBtnId) {
  const checkoutBtn = document.getElementById(checkoutBtnId);
  checkoutBtn.addEventListener("click", () => {
    if (bookings.length > 0) {
      let lastBooking = bookings[bookings.length - 1];
      confirmedBookings.push(lastBooking);
      console.clear();
      console.log("Confirmed booking:", lastBooking);
      console.log("All confirmed:", confirmedBookings);
      console.table(confirmedBookings);
      alert("✅ Booking moved to confirmed list!");

      window.location.href = "checkout.html";
      // Clear UI after checkout
      successMessage.style.display = "none";
      checkoutBtn.style.display = "none";
    }
  });
}

setupCheckout("room-checkout");
setupCheckout("event-checkout");
setupCheckout("both-checkout");
