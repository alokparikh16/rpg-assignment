import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { CREATE_BLOG } from '@/graphql/mutations';

export function useCreateBlog() {
  const content = ref('');
  const success = ref(false);

  const { mutate, loading, error } = useMutation(CREATE_BLOG);

  const submitBlog = async () => {
    success.value = false;
    try {
      const { data } = await mutate({ content: content.value });
      if (data?.createBlog) {
        success.value = true;
        content.value = '';
      }
    } catch (e) {
      console.error('Error creating blog:', e);
    }
  };

  return {
    content,
    success,
    loading,
    error,
    submitBlog,
  };
}
