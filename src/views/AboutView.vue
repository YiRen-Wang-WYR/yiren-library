<template>
  <div class="about">
    <h1>About Yiren Library</h1>
    <div class="content">
      <section class="mb-4">
        <h2>Our Mission</h2>
        <p>At Yiren Library, we believe in making knowledge accessible to everyone. Our digital library platform brings together readers and resources in an engaging online environment.</p>
      </section>
      
      <section class="mb-4">
        <h2>What We Offer</h2>
        <ul>
          <li>Extensive digital collection</li>
          <li>24/7 online access</li>
          <li>User-friendly interface</li>
          <li>Community engagement</li>
        </ul>
      </section>

      <section class="mb-4">
        <h2>Join Us</h2>
        <p>Ready to start your journey with us?</p>
        <router-link to="/register" class="btn btn-primary">Register Now</router-link>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.content {
  text-align: left;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

li::before {
  content: "•";
  color: #42b983;
  position: absolute;
  left: 0;
}
</style> 