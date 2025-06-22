import { useToast } from 'primevue/usetoast';

export function useNotify() {
    const toast = useToast();

    function notify(summary: string, severity: string, detail?: string) {
        toast.add({severity, summary, detail, life: 5000});
    }

    function notifyError(summary: string, detail?: string) {
        toast.add({severity: "error", summary, detail, life: 5000});
    }

    return {
        notify,
        notifyError
    };
}
