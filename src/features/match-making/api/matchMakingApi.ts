import {api} from "@/shared/lib/ky/ky.ts";

export async function joinMatchMakingQueue() {
    return await api.post(`matchmaking/join`).json();
}

export async function leaveMatchMakingQueue() {
    return await api.delete(`matchmaking/leave`).json();
}

export async function confirmMatchParticipation() {
    return await api.post(`matchmaking/start`).json();
}

export async function fetchMatchStatus() {
    return await api.post(`matchmaking/status`).json();
}
