import { useToast } from 'primevue/usetoast';

export function useNotify() {
    const toast = useToast();

    function notifyError(summary: string, detail?: string) {
        toast.add({severity: 'error', summary, detail, life: 5000});
    }

    return {
        notifyError
    };
}
