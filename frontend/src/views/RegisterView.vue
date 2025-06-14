<template>
  <div class="auth-form">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="username">Username</label>
        <input v-model="username" id="username" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input v-model="password" id="password" type="password" required />
      </div>
      <button type="submit" :disabled="loading">Register</button>
      <p v-if="error" style="color: red;">{{ error.message }}</p>
    </form>
    <p>Already have an account? <router-link to="/login">Login here</router-link></p>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';
import { REGISTER_MUTATION } from '../graphql/mutations';

const username = ref('');
const password = ref('');
const router = useRouter();

const { mutate: register, loading, error } = useMutation(REGISTER_MUTATION);

const handleRegister = async () => {
  try {
    const { data } = await register({
      username: username.value,
      password: password.value,
    });

    if (data?.register?.accessToken) {
      localStorage.setItem('token', data.register.accessToken);
      router.push('/blogs'); 
    }
  } catch (err) {
    console.error('Register failed', err);
  }
};
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
input {
  width: 100%;
  margin: 0.5em 0;
}
</style>
