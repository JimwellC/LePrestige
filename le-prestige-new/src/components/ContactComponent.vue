<template>
    <div>
      <main>

            <header class="site-header site-contact-header">
                <div class="container">
                    <div class="row">

                        <div class="col-lg-10 col-12 mx-auto">
                            <h1 class="text-white">Contact Page</h1>

                           
                        </div>

                    </div>
                </div>
                
                <div class="overlay"></div>
            </header>

            <section class="contact section-padding">
                <div class="container">
                    <div class="row">

                        <h2 class="text-center mb-4">Contact Us</h2>

                            <!-- Success Alert -->
                            <div v-if="alertMessage" class="alert alert-success alert-dismissible fade show" role="alert">
                            {{ alertMessage }}
                            <button type="button" class="btn-close" @click="closeAlert"></button>
                            </div>

                            <!-- Contact Form -->
                            <form @submit.prevent="submitContact" class="bg-light p-4 rounded shadow-sm">
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input v-model="contact.name" type="text" class="form-control" id="name" placeholder="Enter your name" required />
                            </div>

                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input v-model="contact.email" type="email" class="form-control" id="email" placeholder="Enter your email" required />
                            </div>

                            <div class="mb-3">
                                <label for="phone" class="form-label">Phone Number</label>
                                <input v-model="contact.phone" type="tel" class="form-control" id="phone" placeholder="123-456-7890" required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                            </div>

                            <div class="mb-3">
                                <label for="message" class="form-label">Message</label>
                                <textarea v-model="contact.message" class="form-control" id="message" rows="4" placeholder="Your message" required></textarea>
                            </div>

                            <button type="submit" class="btn btn-primary w-100">Submit</button>
                            </form>
                        <div class="col-lg-4 col-12 mx-auto mt-lg-5 mt-4">

                            <h5>Weekdays</h5>

                            <div class="d-flex mb-lg-3">
                                <p>Monday to Friday</p>

                                <p class="ms-5">10:00 AM - 08:00 PM</p>
                            </div>

                            <h5>Weekends</h5>

                            <div class="d-flex">
                                <p>Saturday and Sunday</p>

                                <p class="ms-5">11:00 AM - 11:00 PM</p>
                            </div>
                        </div>

                        <div class="col-12">
                            <h4 class="mt-5 mb-4">Sm Clark Manuel A. Roxas Hwy, Clark Freeport, Angeles, Pampanga</h4>

                            <div class="google-map pt-3">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3519.9091831121636!2d120.5793248!3d15.1670844!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f27ed3afbe8d%3A0x6ae26c077df1397!2sSM%20City%20Clark!5e1!3m2!1sen!2sph!4v1729687699928!5m2!1sen!2sph" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>



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

                        <a href="https://maps.app.goo.gl/E8jNTDRKUR nsv3NX9" class="custom-btn btn btn-dark mt-2">Directions</a>
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
                    
                        <p class="copyright-text tooplate-mt60">Copyright © 2024 Le Prestige </p>
                    </div>

                </div><!-- row ending -->
                
             </div><!-- container ending -->
             
        </footer>

    </div>
  </template>
  
  <script>
import api from '@/api/axios';

export default {
  name: 'ContactComponent',
  data() {
    return {
      contact: {
        name: '',
        email: '',
        phone: '',
        message: ''
      },
      alertMessage: ''
    };
  },
  methods: {
    async submitContact() {
      try {
        await api.post('/contacts', this.contact);
        this.alertMessage = 'Thank you for contacting us!';
        this.contact = { name: '', email: '', phone: '', message: '' }; // Reset form fields
      } catch (error) {
        console.error('Error submitting contact information:', error);
      }
    },
    closeAlert() {
      this.alertMessage = '';
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}

.form-label {
  font-weight: bold;
}
</style>
  