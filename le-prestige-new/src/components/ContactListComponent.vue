<template>
    <div class="container my-5">
      <h2 class="text-center mb-4">Contact Submissions</h2>
      
      <!-- List of Contact Submissions -->
      <div v-if="contacts.length" class="list-group">
        <div v-for="contact in contacts" :key="contact._id" class="list-group-item">
          <h5>{{ contact.name }}</h5>
          <p><strong>Email:</strong> {{ contact.email }}</p>
          <p><strong>Message:</strong> {{ contact.message }}</p>
          <p><small>{{ new Date(contact.date).toLocaleString() }}</small></p>
        </div>
      </div>
      <p v-else>No contact submissions found.</p>
    </div>
  </template>
  
  <script>
  import api from '@/api/axios';
  
  export default {
    name: 'ContactListComponent',
    data() {
      return {
        contacts: []
      };
    },
    methods: {
      async fetchContacts() {
        try {
          const response = await api.get('/contacts');
          this.contacts = response.data;
        } catch (error) {
          console.error('Error fetching contact submissions:', error);
        }
      }
    },
    created() {
      this.fetchContacts();
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  </style>
  