<template>
  <div class="create-blog">
    <h2>Create a New Blog</h2>
    <form @submit.prevent="submitBlog">
      <textarea v-model="content" placeholder="Write your blog..." rows="6" />
      <button type="submit" :disabled="loading">Post</button>
      <p v-if="error" style="color: red;">{{ error.message }}</p>
      <p v-if="success" style="color: green;">Blog posted successfully!</p>
      
    </form>
    <router-link to="/blogs">Go back to blogs</router-link>
  </div>
</template>

<script setup lang="ts">
import { useCreateBlog } from '@/composables/useCreateBlog';

const { content, success, loading, error, submitBlog } = useCreateBlog();
</script>

<style scoped>
.create-blog {
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
textarea {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
}
button {
  padding: 0.5rem 1rem;
}
</style>
