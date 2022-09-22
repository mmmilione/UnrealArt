import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const useBoilerplate = (loading) => {
    const error = ref(null);
    const isActive = ref(false);
    const isLoading = ref(loading);
    const isSuccess = ref(false);
    const router = useRouter();
    const route = useRoute();
    return { isActive, router, route, isLoading, error, isSuccess };
}

export default useBoilerplate;


