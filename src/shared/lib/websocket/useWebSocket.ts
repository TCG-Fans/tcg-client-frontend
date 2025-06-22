import { ref, onUnmounted } from 'vue'

type Callback = (data: any) => void

const ws = ref<WebSocket | null>(null)
const isConnected = ref(false)
const listeners = new Map<string, Callback[]>()

export function useWebSocket() {
    const connect = (token: string) => {
        if (ws.value && ws.value.readyState === WebSocket.OPEN) return

        ws.value = new WebSocket(import.meta.env.VITE_TCG_WS_URL)

        ws.value.onopen = () => {
            isConnected.value = true
            send('authenticate', { token })
        }

        ws.value.onmessage = (event) => {
            const { event: evt, data } = JSON.parse(event.data)
            listeners.get(evt)?.forEach(cb => cb(data))
        }

        ws.value.onclose = () => {
            isConnected.value = false
            ws.value = null
        }
    }

    const send = (event: string, data: any) => {
        if (ws.value?.readyState === WebSocket.OPEN) {
            ws.value.send(JSON.stringify({ event, data }))
        }
    }

    const on = (event: string, callback: Callback) => {
        const list = listeners.get(event) || []
        listeners.set(event, [...list, callback])
    }

    onUnmounted(() => {
        ws.value?.close()
    })

    return {
        connect,
        send,
        on,
        isConnected
    }
}
