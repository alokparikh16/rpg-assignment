import { ref, watch, onMounted } from 'vue';
import { useQuery, useSubscription } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';

const BLOGS_QUERY = gql`
  query {
    blogs {
      id
      content
      author {
        username
      }
    }
  }
`;

const BLOG_CREATED_SUBSCRIPTION = gql`
  subscription {
    blogCreated {
      id
      content
      author {
        id
        username
      }
    }
  }
`;

export function useLatestBlogs() {
  const blogs = ref<any[]>([]);

  const { result, loading, error, refetch } = useQuery(BLOGS_QUERY, null, {
    fetchPolicy: 'network-only', 
  });

  watch(result, (newVal) => {
    if (newVal?.blogs) blogs.value = newVal.blogs;
  });

  const { result: subResult } = useSubscription(BLOG_CREATED_SUBSCRIPTION);
  watch(subResult, (newData) => {
    if (newData?.blogCreated) {
      blogs.value = [newData.blogCreated, ...blogs.value];
    }
  });

  onMounted(() => {
    refetch(); 
  });

  return { blogs, loading, error };
}
