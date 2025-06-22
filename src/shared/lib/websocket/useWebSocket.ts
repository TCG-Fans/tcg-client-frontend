import { ref, onUnmounted } from 'vue'
import { io, Socket } from 'socket.io-client'

type Callback = (data: any) => void

const socket = ref<Socket | null>(null)
const isConnected = ref(false)
const listeners = new Map<string, Callback[]>()

export function useWebSocket() {
    const connect = (token: string | null) => {
        if (socket.value?.connected || !token) {
            console.warn('socket.value?.connected || !token')

            return
        }

        socket.value = io('https://chainsmokers.duckdns.org', {
            path: '/socket.io'
        });

        console.warn('socket.value', socket.value.on)

        socket.value.on('connect', () => {
            isConnected.value = true

            if (token) {
                socket.value?.emit('authenticate', { token })
            }
        })

        socket.value.on('disconnect', () => {
            console.warn('socket.value?.connected || !token')

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
