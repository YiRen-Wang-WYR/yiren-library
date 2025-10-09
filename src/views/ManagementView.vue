<template>
  <div class="management-page">
    <h1 class="text-center mb-4">Library Management Dashboard</h1>

    <div class="row">
      <!-- Statistics Cards -->
      <div class="col-md-3 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Total Users</h5>
            <p class="card-text display-4">{{ totalUsers }}</p>
          </div>
        </div>
      </div>

      <div class="col-md-3 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Events Joined</h5>
            <p class="card-text display-4">{{ eventsJoined }}</p>
          </div>
        </div>
      </div>

      <div class="col-md-3 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Reviews Given</h5>
            <p class="card-text display-4">{{ reviewsGiven }}</p>
          </div>
        </div>
      </div>

      <div class="col-md-3 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Average Rating</h5>
            <p class="card-text display-4">{{ averageRating }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Upcoming Events -->
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h2 class="mb-0">Upcoming Events</h2>
          </div>
          <div class="card-body">
            <DataTable :value="upcomingEvents" :paginator="true" :rows="5" 
                      responsiveLayout="scroll" class="p-datatable-sm">
              <Column field="name" header="Event Name"></Column>
              <Column field="date" header="Date"></Column>
              <Column field="location" header="Location"></Column>
              <Column field="participants" header="Participants"></Column>
              <Column header="Actions">
                <template #body="slotProps">
                  <button class="btn btn-sm btn-primary me-2" @click="editEvent(slotProps.data)">Edit</button>
                  <button class="btn btn-sm btn-danger" @click="deleteEvent(slotProps.data)">Delete</button>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>

    <!-- User Reviews -->
    <div class="row mt-4">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h2 class="mb-0">Recent Reviews</h2>
          </div>
          <div class="card-body">
            <DataTable :value="reviews" :paginator="true" :rows="5" 
                      responsiveLayout="scroll" class="p-datatable-sm">
              <Column field="user" header="User"></Column>
              <Column field="rating" header="Rating"></Column>
              <Column field="comment" header="Comment"></Column>
              <Column field="date" header="Date"></Column>
              <Column header="Actions">
                <template #body="slotProps">
                  <button class="btn btn-sm btn-danger" @click="deleteReview(slotProps.data)">Delete</button>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

// Mock data - replace with real data from your backend
const totalUsers = ref(150);
const eventsJoined = ref(45);
const reviewsGiven = ref(89);
const averageRating = ref(4.5);

const upcomingEvents = ref([
  {
    name: 'Summer Reading Challenge',
    date: '2024-07-01',
    location: 'Main Library',
    participants: 25
  },
  {
    name: 'Author Meet & Greet',
    date: '2024-06-15',
    location: 'Conference Room A',
    participants: 40
  }
]);

const reviews = ref([
  {
    user: 'John Doe',
    rating: 5,
    comment: 'Great library services!',
    date: '2024-05-01'
  },
  {
    user: 'Jane Smith',
    rating: 4,
    comment: 'Very helpful staff',
    date: '2024-04-28'
  }
]);

// Check if user is admin
onMounted(() => {
  if (!authStore.isAdmin) {
    router.push('/');
  }
});

// Event handlers
const editEvent = (event) => {
  // Implement edit functionality
  console.log('Edit event:', event);
};

const deleteEvent = (event) => {
  // Implement delete functionality
  console.log('Delete event:', event);
};

const deleteReview = (review) => {
  // Implement delete functionality
  console.log('Delete review:', review);
};
</script>

<style scoped>
.management-page {
  padding: 1rem;
}

.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.display-4 {
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 1.2;
}
</style> 