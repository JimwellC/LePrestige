<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg bg-white shadow-lg">
      <div class="container">
        <!-- Logo -->
        <router-link to="/" class="navbar-brand">
          Le Prestige
        </router-link>

        <!-- Navbar toggler for mobile view -->
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

        <!-- Links -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link" exact>Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/menu" class="nav-link">Menu</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/contact" class="nav-link">Contact</router-link>
            </li>
          </ul>
        </div>

        <!-- Reservation button -->
        <div class="d-none d-lg-block">
          <button
            type="button"
            class="custom-btn btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#BookingModal"
          >
            Reservation
          </button>
        </div>
      </div>
    </nav>

    <!-- Main content area for routed components -->
    <router-view />
  </div>
</template>


<style>
@import './assets/css/tooplate-crispy-kitchen.css';
</style>
