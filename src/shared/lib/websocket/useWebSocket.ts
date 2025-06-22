import { ref, onUnmounted } from 'vue'
import { io, Socket } from 'socket.io-client'

type Callback = (data: any) => void

const socket = ref<Socket | null>(null)
const isConnected = ref(false)
const listeners = new Map<string, Callback[]>()

export function useWebSocket() {
    const connect = (token: string) => {
        if (socket.value?.connected) return

        // Можно прокинуть token в query или через отдельное событие, зависит от бекенда
        socket.value = io(import.meta.env.VITE_TCG_WS_URL, {
            autoConnect: false,
            transports: ['websocket'],
            auth: { token }
        })

        socket.value.on('connect', () => {
            isConnected.value = true
            // Можно дополнительно emit'нуть authenticate, если бекенд этого ждёт
            // socket.value?.emit('authenticate', { token })
        })

        socket.value.on('disconnect', () => {
            isConnected.value = false
        })

        // Общий обработчик всех событий
        socket.value.onAny((event, data) => {
            listeners.get(event)?.forEach(cb => cb(data))
        })

        socket.value.connect()
    }

    const send = (event: string, data: any) => {
        socket.value?.emit(event, data)
    }

    const on = (event: string, callback: Callback) => {
        const list = listeners.get(event) || []
        listeners.set(event, [...list, callback])

        // Подписка через socket.io для прямых подписок (опционально)
        // socket.value?.on(event, callback)
    }

    onUnmounted(() => {
        socket.value?.disconnect()
    })

    return {
        connect,
        send,
        on,
        isConnected
    }
}
