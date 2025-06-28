import { ref } from 'vue'
import cardpoolAbi from '@/shared/abi/CardpoolMint.json'
import coinAbi from '@/shared/abi/Coin.json'
import { createWalletClient, custom, parseUnits } from 'viem'
import {useAuthApi} from "@/features/auth/api/useAuthApi.ts";
import {useWallet} from "@/shared/lib/ethers/useWallet.ts";
import {useWebSocket} from "@/shared/lib/websocket/useWebSocket.ts";
import {useNotify} from "@/shared/api/useNotify.ts";
import en from "@/shared/lib/languages/en.ts";
import { avalancheFuji } from 'viem/chains'

const MINT_EVENT = 'cardAdded'

const COIN_ADDRESS = '0xcD8415372BCB0ACfD685367251e215A3C5D8A845'

const CARDPOOL_ADDRESS = '0xdcBf6f32F80172A9Ae9bD0E12D04904f6daCE46E'

const isShowMintButton = ref(false)

export function useMintModel() {
    const { notify, notifyError } = useNotify()

    const { signIn } = useAuthApi()

    const { walletAddress } = useWallet()

    const { connect, on } = useWebSocket()

    const isMinting = ref(false)

    const mintedCards = ref<any[]>([])

    const token = ref<string | null>(localStorage.getItem('token'))

    // Получение viem-клиента
    function getViemClient() {
        const provider = window.ethereum

        if (!provider) {
            throw new Error('MetaMask not found')
        }

        return createWalletClient({
            transport: custom(provider),
            chain: avalancheFuji
        })
    }

    // 1. Авторизация
    async function ensureAuth() {
        if (!token.value) {
            const result = await signIn()

            if (!result?.token) {
                return
            }

            token.value = result.token

            localStorage.setItem('token', token.value)
        }

        return token.value
    }

    // 3. Открываем WS и слушаем mint-события
    function subscribeOnMinted() {
        on(MINT_EVENT, (data) => {
            mintedCards.value = data.cards

            notify(en.mintNotification.success, 'success')
        })
    }

    async function approveTokens(amount: string) {
        const client = getViemClient()

        if (!walletAddress.value) {
            return
        }

        await client.writeContract({
            address: COIN_ADDRESS,
            abi: coinAbi,
            functionName: 'approve',
            args: [CARDPOOL_ADDRESS, parseUnits(amount, 18)],
            account: walletAddress.value
        })
    }

    async function mintPack(packId: number, amount: number) {
        const client = getViemClient()

        await client.writeContract({
            address: CARDPOOL_ADDRESS,
            abi: cardpoolAbi,
            functionName: 'mintPack',
            args: [packId, amount],
            account: walletAddress.value
        })
    }

    // 6. Главный flow минта
    async function startMint(packId: number, packAmount: number, approveAmount: string) {
        isMinting.value = true

        try {
            connect(token.value)

            subscribeOnMinted()

            await approveTokens(approveAmount)

            await mintPack(packId, packAmount)

            isShowMintButton.value = false
        } catch (err: any) {
            isShowMintButton.value = true

            notifyError(en.mintNotification.error, err?.message)

            throw err
        } finally {
            isMinting.value = false
        }
    }

    return {
        isMinting,
        mintedCards,
        startMint,
        ensureAuth,
        approveTokens,
        mintPack,
        isShowMintButton
    }
}
