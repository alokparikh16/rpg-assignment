<template>
  <div class="latest-blogs">
    <h2>Latest Blogs</h2>
    <button @click="$router.push('/create')">Create Blog</button>

    <div v-if="loading">Loading...</div>
    <div v-if="error" style="color: red;">Error: {{ error.message }}</div>

    <ul v-if="blogs.length">
      <li v-for="blog in blogs" :key="blog.id">
        <strong>{{ blog.author.username }}</strong>: {{ blog.content }}
      </li>
    </ul>
    <p v-else>No blogs found.</p>
  </div>
</template>

<script setup lang="ts">
import { useLatestBlogs } from '@/composables/useLatestBlogs';

const { blogs, loading, error } = useLatestBlogs();
</script>

<style scoped>
.latest-blogs {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}
</style>
