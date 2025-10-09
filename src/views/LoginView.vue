<template>
  <div class="min-vh-100 d-flex align-items-center bg-light">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-5">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4">
            <h2 class="text-center mb-2">Welcome Back</h2>
            <p class="text-center text-muted mb-4">Sign in with your preferred method</p>

            <div class="login-step">
              <h5 class="mb-3">Sign in with email</h5>
              <form @submit.prevent="handleNext">
                <!-- Email field -->
                <div class="form-group mb-4">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    v-model="formData.username"
                    placeholder="Email"
                  />
                  <div class="text-danger small mt-1" v-if="errors.username">
                    {{ errors.username }}
                  </div>
                </div>

                <!-- Password field (shown after email is entered) -->
                <div class="form-group mb-4" v-if="showPassword">
                  <input
                    type="password"
                    class="form-control form-control-lg"
                    v-model="formData.password"
                    placeholder="Password"
                  />
                  <div class="text-danger small mt-1" v-if="errors.password">
                    {{ errors.password }}
                  </div>
                </div>

                <!-- Error message -->
                <div v-if="loginError" class="alert alert-danger py-2 mb-3">
                  {{ loginError }}
                </div>

                <!-- Action buttons -->
                <div class="d-flex justify-content-between align-items-center mt-4">
                  <button 
                    type="button" 
                    class="btn btn-link text-decoration-none"
                    @click="handleCancel"
                  >
                    CANCEL
                  </button>
                  <button 
                    type="submit" 
                    class="btn btn-primary px-4"
                    :disabled="isLoading"
                  >
                    {{ isLoading ? 'Please wait...' : 'NEXT' }}
                  </button>
                </div>
              </form>

              <!-- Demo accounts info -->
              <div class="demo-accounts mt-4">
                <div class="account-box admin-account mb-2">
                  <div class="account-title">Administrator Account</div>
                  <div class="account-details">
                    <code>Email: admin@library.com</code><br>
                    <code>Password: admin123</code>
                  </div>
                </div>
                <div class="account-box user-account">
                  <div class="account-title">Regular User Account</div>
                  <div class="account-details">
                    <code>Email: user@library.com</code><br>
                    <code>Password: user123</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const formData = reactive({
  username: '',
  password: ''
});

const errors = reactive({
  username: '',
  password: ''
});

const loginError = ref('');
const isLoading = ref(false);
const showPassword = ref(false);

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateForm = () => {
  let isValid = true;
  errors.username = '';
  errors.password = '';

  if (!formData.username) {
    errors.username = 'Please enter your email';
    isValid = false;
  } else if (!validateEmail(formData.username)) {
    errors.username = 'Please enter a valid email address';
    isValid = false;
  }

  if (showPassword.value && !formData.password) {
    errors.password = 'Please enter your password';
    isValid = false;
  }

  return isValid;
};

const handleNext = async () => {
  if (!validateForm()) return;

  if (!showPassword.value) {
    showPassword.value = true;
    return;
  }

  isLoading.value = true;
  loginError.value = '';

  try {
    await authStore.login({
      username: formData.username,
      password: formData.password
    });

    if (authStore.isAdmin) {
      router.push('/management');
    } else {
      router.push('/');
    }
  } catch (err) {
    loginError.value = 'Invalid email or password';
  } finally {
    isLoading.value = false;
  }
};

const handleCancel = () => {
  if (showPassword.value) {
    showPassword.value = false;
    formData.password = '';
    errors.password = '';
  } else {
    router.push('/');
  }
};
</script>

<style scoped>
.login-page {
  padding: 2rem 1rem;

}
.card {
  width: 100%; 
  background: white;
} 

.form-control {
  border: 1px solid #ced4da;
  padding: 0.75rem 1rem;
}

.form-control:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 0 0.2rem rgba(74, 144, 226, 0.25);
}

.btn-primary {
  background-color: #4a90e2;
  border-color: #4a90e2;
}

.btn-primary:hover {
  background-color: #357abd;
  border-color: #357abd;
}

.btn-link {
  color: #6c757d;
}

.demo-accounts {
  border-top: 1px solid #dee2e6;
  padding-top: 1.5rem;
  margin-top: 2rem;
}

.account-box {
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.account-title {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.account-details {
  font-size: 0.9rem;
}

code {
  background-color: #e9ecef;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  color: #2c3e50;
}

.admin-account {
  border-left: 4px solid #42b983;
}

.user-account {
  border-left: 4px solid #4a90e2;
}
</style> 