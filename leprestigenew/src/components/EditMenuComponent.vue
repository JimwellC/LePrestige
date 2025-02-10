<template>
  <div class="container my-5">
    <h2 class="text-center mb-4">Edit Menu</h2>
    
    <!-- Success Alert Message -->
    <div v-if="alertMessage" class="alert alert-success alert-dismissible fade show" role="alert">
      {{ alertMessage }}
      <button type="button" class="btn-close" @click="closeAlert"></button>
    </div>
    
    <!-- Form to add a new menu item -->
    <form @submit.prevent="addItem" class="bg-light p-4 rounded shadow-sm">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input v-model="newItem.name" type="text" class="form-control" id="name" placeholder="Enter name" required />
      </div>
      
      <div class="mb-3">
        <label for="price" class="form-label">Price (₱)</label>
        <input v-model="newItem.price" type="number" class="form-control" id="price" placeholder="Enter price" required />
      </div>

      <div class="mb-3">
        <label for="category" class="form-label">Category</label>
        <select v-model="newItem.category" id="category" class="form-select" required>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="image" class="form-label">Upload Image</label>
        <input type="file" @change="handleFileUpload" class="form-control" id="image" required />
      </div>

      <button type="submit" class="btn btn-primary w-100">Add Item</button>
    </form>

    <!-- List of existing menu items for editing -->
    <ul class="list-group mt-5">
      <li v-for="item in menuItems" :key="item._id" class="list-group-item d-flex flex-column align-items-start">
        <div class="d-flex w-100 align-items-center">
          <!-- Display item image and allow changing -->
          <img :src="`http://localhost:5000${item.image}`" class="img-thumbnail me-3" width="60" height="60" />
          <div>
            <input v-model="item.name" class="form-control mb-1" @blur="updateItem(item)" placeholder="Name" />
            <input v-model="item.price" type="number" class="form-control mb-1" @blur="updateItem(item)" placeholder="Price (₱)" />
            <select v-model="item.category" class="form-select mb-1" @blur="updateItem(item)">
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
            </select>
            <input type="file" @change="handleFileUpload($event, item)" class="form-control mb-1" />
          </div>
        </div>
        <div class="mt-2 d-flex justify-content-end">
          <button @click="updateItem(item)" class="btn btn-success me-2">Update</button>
          <button @click="deleteItem(item._id)" class="btn btn-danger">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '@/api/axios';

export default {
  name: 'EditMenuComponent',
  data() {
    return {
      menuItems: [],
      newItem: {
        name: '',
        price: null,
        category: 'Breakfast',
        imageFile: null,
      },
      alertMessage: '', // Alert message data
    };
  },
  methods: {
    async fetchMenuItems() {
      try {
        const response = await axios.get('/menu');
        this.menuItems = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    handleFileUpload(event, item = null) {
      if (item) {
        item.imageFile = event.target.files[0];
      } else {
        this.newItem.imageFile = event.target.files[0];
      }
    },
    async addItem() {
      try {
        const formData = new FormData();
        formData.append('name', this.newItem.name);
        formData.append('price', this.newItem.price);
        formData.append('category', this.newItem.category);
        if (this.newItem.imageFile) formData.append('image', this.newItem.imageFile);

        const response = await axios.post('/menu', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        this.menuItems.push(response.data);
        this.newItem = { name: '', price: null, category: 'Breakfast', imageFile: null };
        
        // Set alert message on successful addition
        this.alertMessage = 'Menu item added successfully!';
      } catch (error) {
        console.error(error);
      }
    },
    async updateItem(item) {
      try {
        const formData = new FormData();
        formData.append('name', item.name);
        formData.append('price', item.price);
        formData.append('category', item.category);
        if (item.imageFile) formData.append('image', item.imageFile);

        await axios.put(`/menu/${item._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        
        // Set alert message on successful update
        this.alertMessage = 'Menu item updated successfully!';
      } catch (error) {
        console.error(error);
      }
    },
    async deleteItem(id) {
      try {
        await axios.delete(`/menu/${id}`);
        this.menuItems = this.menuItems.filter(item => item._id !== id);
        
        // Set alert message on successful deletion
        this.alertMessage = 'Menu item deleted successfully!';
      } catch (error) {
        console.error(error);
      }
    },
    closeAlert() {
      this.alertMessage = '';
    },
  },
  created() {
    this.fetchMenuItems();
  },
};
</script>

<style scoped>
.container {
  max-width: 700px;
}

.form-label {
  font-weight: bold;
}

.img-thumbnail {
  object-fit: cover;
}

.list-group-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
</style>
