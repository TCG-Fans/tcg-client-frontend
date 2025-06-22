import {useWebSocket} from "@/shared/lib/websocket/useWebSocket.ts";
import {ref} from "vue";
import {
    confirmMatchParticipation, fetchMatchStatus,
    joinMatchMakingQueue,
    leaveMatchMakingQueue
} from "@/features/match-making/api/matchMakingApi.ts";
import {useNotify} from "@/shared/api/useNotify.ts";

const MATCH_MAKING_EVENTS = [
    'queueJoined', 'queueLeft', 'matchFound',
    'matchConfirmed', 'matchStarted', 'matchCancelled', 'opponentReconnected'
]

const isOpenMatchmakingModal = ref(false)
const status = ref(null)
const logs = ref<string[]>([])

export function useMatchmaking() {
    const { notifyError } = useNotify();

    const { connect, on, isConnected } = useWebSocket()

    const init = () => {
        const token = localStorage.getItem('token')

        connect(token)

        MATCH_MAKING_EVENTS.forEach(event => {
            on(event, data => {
                logs.value.push(`[${event}] ${JSON.stringify(data)}`)
            })
        })
    }

    const loadStatus = async () => {
        try {
            status.value = await fetchMatchStatus()
        } catch (err: any) {
            notifyError('Failed to get nonce', err?.message);

            throw err;
        }
    }

    const joinQueue = async () => {
        try {
            return await joinMatchMakingQueue()
        } catch (err: any) {
            notifyError('Failed to join queue', err?.message);

            throw err;
        }
    }

    const leaveQueue = async () => {
        try {
            return await leaveMatchMakingQueue()
        } catch (err: any) {
            notifyError('Failed to leave match making queue', err?.message);

            throw err;
        }
    }

    const confirmMatch = async () => {
        try {
            return  await confirmMatchParticipation()
        } catch (err: any) {
            notifyError('Failed to confirm match participation', err?.message);

            throw err;
        }
    }

    const openModal = () => {
        isOpenMatchmakingModal.value = true

        init()
    }

    const closeModal = () => {
        isOpenMatchmakingModal.value = false
    }

    return {
        init,
        status,
        logs,
        joinQueue,
        leaveQueue,
        confirmMatch,
        loadStatus,
        isConnected,
        isOpenMatchmakingModal,
        openModal,
        closeModal
    }
}
