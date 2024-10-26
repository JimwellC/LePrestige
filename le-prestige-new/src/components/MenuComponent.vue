<template>
    <div>
        <main>

<header class="site-header site-menu-header">
    <div class="container">
        <div class="row">

            <div class="col-lg-10 col-12 mx-auto">
                <h1 class="text-white">Our Menus</h1>

                
            </div>

        </div>
    </div>

    <div class="overlay"></div>
</header>

<section v-for="category in categories" :key="category" class="menu section-padding">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h2 class="mb-lg-5 mb-4">{{ category }} Menu</h2>
            </div>
            <div
              v-for="(item, index) in filteredMenuItems(category)"
              :key="index"
              class="col-lg-4 col-md-6 col-12"
            >
              <div class="menu-thumb">
                <!-- Add http://localhost:5000 before item.image to access files from server -->
                <img :src="`http://localhost:5000${item.image}`" class="img-fluid menu-image" :alt="item.name" />
                <div class="menu-info d-flex flex-wrap align-items-center">
                  <h4 class="mb-0">{{ item.name }}</h4>
                  <span class="price-tag bg-white shadow-lg ms-4"><small>₱</small>{{ item.price }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

</main>

<footer class="site-footer section-padding">

<div class="container">
    
    <div class="row">

        <div class="col-12">
            <h4 class="text-white mb-4 me-5">Le Prestige</h4>
        </div>

        <div class="col-lg-4 col-md-7 col-xs-12 tooplate-mt30">
            <h6 class="text-white mb-lg-4 mb-3">Location</h6>

            <p>Sm Clark Manuel A. Roxas Hwy, Clark Freeport, Angeles, Pampanga</p>

            <a href="https://maps.app.goo.gl/E8jNTDRKURnsv3NX9" class="custom-btn btn btn-dark mt-2">Directions</a>
        </div>

        <div class="col-lg-4 col-md-5 col-xs-12 tooplate-mt30">
            <h6 class="text-white mb-lg-4 mb-3">Opening Hours</h6>

            <p class="mb-2">Monday - Friday</p>

            <p>10:00 AM - 08:00 PM</p>

            <p>Tel: <a href="tel: 010-02-0340" class="tel-link">(+63)912 345 6789</a></p>
        </div>

        <div class="col-lg-4 col-md-6 col-xs-12 tooplate-mt30">
            <h6 class="text-white mb-lg-4 mb-3">Social</h6>

            <ul class="social-icon">
                <li><a href="https://www.facebook.com/profile.php?id=61567780644942" class="social-icon-link bi-facebook" target="_blank"></a></li>

                <li><a href="#" class="social-icon-link bi-instagram" target="_blank"></a></li>

                <li><a href="https://x.com/LPrestiege47993" class="social-icon-link bi-twitter" target="_blank"></a></li>
             

                
            </ul>
        
            <p class="copyright-text tooplate-mt60">Copyright © 2024 Le Prestige></p>
        </div>

    </div><!-- row ending -->
    
 </div><!-- container ending -->
 
</footer>

<!-- Modal -->
<div class="modal fade" id="BookingModal" tabindex="-1" aria-labelledby="BookingModal" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
        <div class="modal-header">
            <h3 class="mb-0">Reserve a table</h3>

            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body d-flex flex-column justify-content-center">
            <div class="booking">
                
                <form class="booking-form row" role="form" action="#" method="post">
                    <div class="col-lg-6 col-12">
                        <label for="name" class="form-label">Full Name</label>

                        <input type="text" name="name" id="name" class="form-control" placeholder="Your Name" required>
                    </div>

                    <div class="col-lg-6 col-12">
                        <label for="email" class="form-label">Email Address</label>

                        <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" class="form-control" placeholder="your@email.com" required>
                    </div>

                    <div class="col-lg-6 col-12">
                        <label for="phone" class="form-label">Phone Number</label>

                        <input type="telephone" name="phone" id="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" class="form-control" placeholder="123-456-7890">
                    </div>

                    <div class="col-lg-6 col-12">
                        <label for="people" class="form-label">Number of persons</label>

                        <input type="text" name="people" id="people" class="form-control" placeholder="12 persons">
                    </div>

                    <div class="col-lg-6 col-12">
                        <label for="date" class="form-label">Date</label>

                        <input type="date" name="date" id="date" value="" class="form-control">
                    </div>

                    <div class="col-lg-6 col-12">
                        <label for="time" class="form-label">Time</label>

                        <select class="form-select form-control" name="time" id="time">
                          <option value="5" selected>5:00 PM</option>
                          <option value="6">6:00 PM</option>
                          <option value="7">7:00 PM</option>
                          <option value="8">8:00 PM</option>
                          <option value="9">9:00 PM</option>
                        </select>
                    </div>

                    <div class="col-12">
                        <label for="message" class="form-label">Special Request</label>

                        <textarea class="form-control" rows="4" id="message" name="message" placeholder=""></textarea>
                    </div>

                    <div class="col-lg-4 col-12 ms-auto">
                        <button type="submit" class="form-control">Submit Request</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="modal-footer"></div>
        
    </div>
    
</div>
</div>

    </div>
  </template>
  
  <script>
import axios from '@/api/axios';

export default {
  name: 'MenuComponent',
  data() {
    return {
      menuItems: [],
      categories: ['Breakfast', 'Lunch', 'Dinner'],
    };
  },
  methods: {
    async fetchMenuItems() {
      try {
        const response = await axios.get('/menu');
        this.menuItems = response.data;
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    },
    filteredMenuItems(category) {
      return this.menuItems.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }
  },
  created() {
    this.fetchMenuItems();
  }
};
</script>

<style scoped>
.menu-thumb img {
  width: 100%;
  height: 350px; /* Adjust height to create uniformity */
  object-fit: cover; /* Crop the image if it doesn't fit the exact dimensions */
  border-radius: 8px; /* Rounded corners to match the website style */
}

.menu-info h4 {
  font-size: 1.2em;
  color: #333;
}

.price-tag {
  font-size: 1em;
  font-weight: bold;
}
</style>