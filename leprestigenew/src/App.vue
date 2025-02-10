<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg bg-white shadow-lg">
      <div class="container">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <router-link class="navbar-brand" to="/" exact>
          Le Prestige
        </router-link>

        <!-- Reservation button for small screens -->
        <div class="d-lg-none">
          <button
            type="button"
            class="custom-btn btn btn-danger"
            @click="openModal"
          >
            Reservation
          </button>
        </div>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/" exact active-class="active">
                Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/menu" active-class="active">
                Menu
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact" active-class="active">
                Contact
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Reservation button for large screens -->
        <div class="d-none d-lg-block">
          <button
            type="button"
            class="custom-btn btn btn-danger"
            @click="openModal"
          >
            Reservation
          </button>
        </div>
      </div>
    </nav>

    <!-- Main router view -->
    <router-view />

    <!-- Global Reservation Modal -->
    <div
      v-if="isBookingModalVisible"
      class="modal fade show"
      tabindex="-1"
      aria-labelledby="BookingModal"
      aria-hidden="true"
      style="display: block; background: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="mb-0">Reserve a table</h3>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>

          <div class="modal-body d-flex flex-column justify-content-center">
            <div class="booking">
              <form class="booking-form row" role="form" @submit.prevent="submitReservation">
                <div class="col-lg-6 col-12">
                  <label for="name" class="form-label">Full Name</label>
                  <input
                    type="text"
                    v-model="reservationData.name"
                    id="name"
                    class="form-control"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div class="col-lg-6 col-12">
                  <label for="email" class="form-label">Email Address</label>
                  <input
                    type="email"
                    v-model="reservationData.email"
                    id="email"
                    pattern="[^ @]*@[^ @]*"
                    class="form-control"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div class="col-lg-6 col-12">
                  <label for="phone" class="form-label">Phone Number</label>
                  <input
                    type="tel"
                    v-model="reservationData.phone"
                    id="phone"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    class="form-control"
                    placeholder="123-456-7890"
                  />
                </div>
                <div class="col-lg-6 col-12">
                  <label for="people" class="form-label">Number of persons</label>
                  <input
                    type="text"
                    v-model="reservationData.people"
                    id="people"
                    class="form-control"
                    placeholder="12 persons"
                  />
                </div>
                <div class="col-lg-6 col-12">
                  <label for="date" class="form-label">Date</label>
                  <input
                    type="date"
                    v-model="reservationData.date"
                    id="date"
                    class="form-control"
                  />
                </div>
                <div class="col-lg-6 col-12">
                  <label for="time" class="form-label">Time</label>
                  <select v-model="reservationData.time" class="form-select form-control" id="time">
                    <option value="5:00 PM" selected>5:00 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                    <option value="7:00 PM">7:00 PM</option>
                    <option value="8:00 PM">8:00 PM</option>
                    <option value="9:00 PM">9:00 PM</option>
                  </select>
                </div>
                <div class="col-12">
                  <label for="message" class="form-label">Special Request</label>
                  <textarea
                    v-model="reservationData.message"
                    class="form-control"
                    rows="4"
                    id="message"
                  ></textarea>
                </div>
                <div class="col-lg-4 col-12 ms-auto">
                  <button type="submit" class="form-control btn btn-primary">
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/api/axios';

export default {
  data() {
    return {
      isBookingModalVisible: false,
      reservationData: {
        name: '',
        email: '',
        phone: '',
        people: '',
        date: '',
        time: '5:00 PM',
        message: ''
      }
    };
  },
  methods: {
    openModal() {
      this.isBookingModalVisible = true;
    },
    closeModal() {
      this.isBookingModalVisible = false;
    },
    async submitReservation() {
      try {
        const response = await axios.post('http://localhost:5000/reservations', this.reservationData);
        console.log('Reservation submitted:', response.data);
        this.closeModal();
        this.resetForm();
      } catch (error) {
        console.error('Error submitting reservation:', error);
      }
    },
    resetForm() {
      this.reservationData = {
        name: '',
        email: '',
        phone: '',
        people: '',
        date: '',
        time: '5:00 PM',
        message: ''
      };
    }
  }
};
</script>

<style scoped>
@import './assets/css/tooplate-crispy-kitchen.css';

.modal.fade.show {
  display: flex !important;
  align-items: center;
  justify-content: center;
}
</style>
