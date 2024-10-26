<template>
  <div id="app">
    
    <nav class="navbar navbar-expand-lg bg-white shadow-lg">
            <div class="container">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                
                <router-link class="navbar-brand" to="/" exact>
                    Le Prestige
                </router-link>
                

                <div class="d-lg-none">
                    <button type="button" class="custom-btn btn btn-danger" data-bs-toggle="modal" data-bs-target="#BookingModal">Reservation</button>
                </div>

                <div class="collapse navbar-collapse" id="navbarNav">
  <ul class="navbar-nav mx-auto">
    <li class="nav-item">
      <router-link class="nav-link "  to="/" exact active-class="active">Home</router-link>
    </li>

    <li class="nav-item">
      <router-link class="nav-link " to="/Menu" active-class="active">Menu</router-link>
    </li>

    <li class="nav-item">
      <router-link class="nav-link " to="/Contact" active-class="active">Contact</router-link>
    </li>
  </ul>
</div>

                <div class="d-none d-lg-block">
                    <button type="button" class="custom-btn btn btn-danger" data-bs-toggle="modal" data-bs-target="#BookingModal">Reservation</button>
                </div>

            </div>
        </nav>
    <router-view/>
  </div>
</template>

<style scoped>
@import './assets/css/tooplate-crispy-kitchen.css';
</style>


