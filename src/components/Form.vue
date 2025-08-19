<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">User Information Form</h1>

        <!-- 提交时阻止默认刷新，转为调用 submitForm -->
        <form @submit.prevent="submitForm">
          <!-- first row -->
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username" required v-model="formData.username" />
            </div>

            <div class="col-md-6">
              <label for="password" class="form-label">Password</label>
              <input type="password" calss="from-control" id="password" minlength="4" maxlength="10" v-model="formData.password" />
            </div>
          </div>

          <!-- 第二行：是否澳洲居民 & 性别 -->
          <div class="row mb-3">
            <div class="col-md-6">
              <div class="form-check">
                <input
                  id="isAustralian"
                  type="checkbox"
                  class="form-check-input"
                  v-model="formData.isAustralian"
                />
                <label class="form-check-label" for="isAustralian">
                  Australian Resident?
                </label>
              </div>
            </div>

            <div class="col-md-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                id="gender"
                class="form-select"
                v-model="formData.gender"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <!-- 第三行：加入原因 -->
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              id="reason"
              class="form-control"
              rows="3"
              v-model="formData.reason"
            ></textarea>
          </div>

          <!-- 按钮 -->
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
    <div class="row mt-5" v-if="submittedCards.length">
   <div class="d-flex flex-wrap justify-content-start">
      <div v-for="(card, index) in submittedCards" :key="index" class="card m-2" style="width: 18rem;">
         <div class="card-header">
            User Information
         </div>
         <ul class="list-group list-group-flush">
            <li class="list-group-item">Username: {{ card.username }}</li>
            <li class="list-group-item">Password: {{ card.password }}</li>
            <li class="list-group-item">Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}</li>
            <li class="list-group-item">Gender: {{ card.gender }}</li>
            <li class="list-group-item">Reason: {{ card.reason }}</li>
         </ul>
      </div>
   </div>
</div>
  </template>
  

<script setup>
import { ref } from 'vue';
  
  const formData = ref({
      username: '',
      password: '',
      isAustralian: false,
      reason: '',
      gender: ''
  });
  
  const submittedCards = ref([]);
  
  const submitForm = () => {
      submittedCards.value.push({
          ...formData.value
      });
  };
</script>

<style scoped>
   .card {
   border: 1px solid #ccc;
   border-radius: 10px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   }
   .card-header {
   background-color: #275FDA;
   color: white;
   padding: 10px;
   border-radius: 10px 10px 0 0;
   }
   .list-group-item {
   padding: 10px;
   }
</style>

