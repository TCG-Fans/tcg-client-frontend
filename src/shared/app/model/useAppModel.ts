import {ref} from "vue";

const isLoading = ref(false)

export const useAppModel = () => {
    const setIsLoading = (value: boolean) => {
        isLoading.value = value
    }

    return {
        isLoading,
        setIsLoading
    }
}
