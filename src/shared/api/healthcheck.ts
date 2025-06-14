import {api} from "@/shared/lib/ky/ky.ts";

export async function usePing() {
    try {
        return await api.get('ping').text();
    } catch (err: any) {
        throw err;
    }
}

export async function useHealth() {
    try {
        return await api.get('health').json();
    } catch (err: any) {
        throw err;
    }
}
