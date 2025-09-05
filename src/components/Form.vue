<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">User Information Form</h1>

         <!-- When submitting, prevent the default refresh and instead call the submitForm -->
        <form @submit.prevent="submitForm">
          <!-- first row -->
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username" 
              @blur="() => validateName(true)"
              @input="() => validateName(false)"
              v-model="formData.username"/>
            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
          </div>
            <div class="col-md-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                id="gender"
                class="form-select"
                v-model="formData.gender"
                @change="() => validateGender(true)"
                @blur="() => validateGender(true)"
              >
                <option value="" disabled>Select…</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
            </div>
          </div>

          <!-- second row - password fields -->
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)" 
                v-model="formData.password"/>
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
            <div class="col-md-6">
              <label for="confirm-password" class="form-label">Confirm password</label>
              <input 
                type="password"
                class="form-control"
                id="confirm-password"
                v-model="formData.confirmPassword"
                @blur="() => validateConfirmPassword(true)"
                @input="() => validateConfirmPassword(false)"
              />
              <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
            </div>
          </div>

          <!-- Third row: Are you an Australian resident? -->
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
          </div>

          <!-- Third row: Reasons for inclusion -->
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              id="reason"
              class="form-control"
              rows="3"
              v-model="formData.reason"
              :maxlength="REASON_MAX"
              @input="() => validateReason(false)"
              @blur="() => validateReason(true)"
            ></textarea>
            <div class="d-flex justify-content-between">
              <div>
                <small v-if="errors.reason" class="text-danger">{{ errors.reason }}</small>
                <small v-if="successMessages.reason" class="text-success">{{ successMessages.reason }}</small>
              </div>
              <small class="text-muted ms-auto">{{ formData.reason.length }}/{{ REASON_MAX }}</small>
            </div>
          </div>

          <!-- button -->
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
      <div class="col-12 col-lg-10 offset-lg-1">
      
         <div class="card-header">
            User Information
         </div>
         <DataTable
            :value="submittedCards"
            stripedRows
            :rows="5"
            paginator
            responsiveLayout="scroll"
            tableStyle="min-width: 60rem; width: 100%"
            class="mt-3"
          >
            <Column field="username" header="Username" />
            <Column field="password" header="Password" />
            <Column field="isAustralian" header="Australian Resident">
  <template #body="{ data }">
    {{ data.isAustralian ? 'Yes' : 'No' }}
  </template>
</Column>
            <Column field="gender" header="Gender" />
            <Column field="reason" header="Reason" />
        </DataTable>
      </div>
   </div>
  </template>
  

<script setup>
import { ref } from 'vue';
const REASON_MAX = 100;  // Limit to one hundred characters.

  
  const formData = ref({
      username: '',
      password: '',
      isAustralian: false,
      reason: '',
      gender: '',
      confirmPassword: ''
  });
  
  const submittedCards = ref([]);
  

  const errors = ref({
    username: null,
    password: null,
    resident: null,
    gender: null,
    reason: null,
    confirmPassword: null
  })

  const successMessages = ref({
    reason: null
  })

  const validateName = (blur) => {
    if (formData.value.username.length < 3){
        if (blur) errors.value.username = "Name must be at least 3 characters";
    } else {
        errors.value.username = null;
    }
  };

  const validatePassword = (blur) => {
    const  password = formData.value.password;
    const minlength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minlength) {
      if (blur) errors.value.password = `Password must be at least ${minlength} characters`;
    } else if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
      if (blur) errors.value.password = "Password must contain uppercase, lowercase, number, and special character";
    } else {
      errors.value.password = null;
    }
  };

  const validateGender = (blur = false) => {
  const g = formData.value.gender;
  if (!g) {
    if (blur) errors.value.gender = 'Please select a gender';
  } else {
    errors.value.gender = null;
  }
};

const validateReason = (blur = false) => {
  const r = String(formData.value.reason ?? '');
  if (r.length > REASON_MAX) {
    if (blur) errors.value.reason = `Reason must be within ${REASON_MAX} characters`;
    successMessages.value.reason = null;
  } else {
    errors.value.reason = null;
    // Check if the reason contains the word 'friend'
    if (r.toLowerCase().includes('friend')) {
      successMessages.value.reason = "Great to have a friend!";
    } else {
      successMessages.value.reason = null;
    }
  }
};

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const submitForm = () => {
  validateName(true);
  validatePassword(true);
  validateGender(true);   
  validateReason(true);   
  validateConfirmPassword(true);

  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.gender &&
    !errors.value.reason &&
    !errors.value.confirmPassword
  ) {
    submittedCards.value.push({ ...formData.value });
    clearForm();
  }
};

const clearForm = () => {
  formData.value = {
    username:'',
    password:'',
    confirmPassword:'',
    isAustralian:false,
    reason:'',
    gender:'',
  }
  // Clear success messages when form is cleared
  successMessages.value.reason = null;
}


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

