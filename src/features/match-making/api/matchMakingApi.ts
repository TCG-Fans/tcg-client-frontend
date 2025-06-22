import {api} from "@/shared/lib/ky/ky.ts";

export async function joinMatchMakingQueue() {
    return await api.post(`join`).json();
}

export async function leaveMatchMakingQueue() {
    return await api.delete(`leave`).json();
}

export async function confirmMatchParticipation() {
    return await api.post(`start`).json();
}

export async function fetchMatchStatus() {
    return await api.post(`status`).json();
}
