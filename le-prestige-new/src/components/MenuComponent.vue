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