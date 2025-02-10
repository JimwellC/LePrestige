<template>
    <div class="reservation-list">
      <h2>Reservations</h2>
      <p v-if="reservations.length === 0">No reservations found.</p>
      <table v-else class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>People</th>
            <th>Date</th>
            <th>Time</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reservation in reservations" :key="reservation._id">
            <td>{{ reservation.name }}</td>
            <td>{{ reservation.email }}</td>
            <td>{{ reservation.phone }}</td>
            <td>{{ reservation.people }}</td>
            <td>{{ new Date(reservation.date).toLocaleDateString() }}</td>
            <td>{{ reservation.time }}</td>
            <td>{{ reservation.message }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from '@/api/axios';
  
  export default {
    data() {
      return {
        reservations: []
      };
    },
    async created() {
  try {
    const response = await axios.get('http://localhost:5000/reservations');
    console.log('Fetched reservations:', response.data); // Add this line
    this.reservations = response.data;
  } catch (error) {
    console.error('Error fetching reservations:', error);
  }
}
  };
  </script>
  
  <style scoped>
  .table {
    width: 100%;
    margin-top: 20px;
  }
  </style>
  