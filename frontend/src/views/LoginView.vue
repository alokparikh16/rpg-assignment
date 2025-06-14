<template>
  <div class="login">
    <h2>Login</h2>

    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username</label>
        <input v-model="username" id="username" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input v-model="password" id="password" type="password" required />
      </div>
      <button type="submit" :disabled="loading">Login</button>
      <p v-if="error" style="color:red">{{ error.message }}</p>
    </form>
    
    <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
  </div>
  
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';
import { LOGIN_MUTATION } from '@/graphql/mutations';

const router = useRouter();
const username = ref('');
const password = ref('');
const error = ref<Error | null>(null);

const { mutate: login, loading } = useMutation(LOGIN_MUTATION);

const handleLogin = async () => {
  error.value = null;
  try {
    const { data } = await login({
      username: username.value,
      password: password.value,
    });
    if (data?.login?.accessToken) {
      localStorage.setItem('token', data.login.accessToken);
      router.push('/blogs');
    }
  } catch (err: any) {
    error.value = err;
  }
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 40px auto;
}
input {
  width: 100%;
  margin: 0.5em 0;
}
</style>
