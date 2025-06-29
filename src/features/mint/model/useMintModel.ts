import { ref } from 'vue'
import cardpoolAbi from '@/shared/abi/CardpoolMint.json'
import coinAbi from '@/shared/abi/Coin.json'
import { createWalletClient, custom, parseUnits } from 'viem'
import {useWallet} from "@/shared/lib/ethers/useWallet.ts";
import {useWebSocket} from "@/shared/lib/websocket/useWebSocket.ts";
import {useNotify} from "@/shared/api/useNotify.ts";
import en from "@/shared/lib/languages/en.ts";
import { avalancheFuji } from 'viem/chains'

const MINT_EVENT = 'cardAdded'

const COIN_ADDRESS = '0xcD8415372BCB0ACfD685367251e215A3C5D8A845'

const CARDPOOL_ADDRESS = '0xdcBf6f32F80172A9Ae9bD0E12D04904f6daCE46E'

const isShowMintButton = ref(false)

const isShowMintModal = ref(false)

const mintedCards = ref<any[]>([])

const isCardProcessing = ref(true)

export function useMintModel() {
    const { notify, notifyError } = useNotify()

    const { walletAddress } = useWallet()

    const { connect, on, isConnected } = useWebSocket()

    const isMinting = ref(false)

    const token = ref<string | null>(localStorage.getItem('token'))

    // Get viem-client
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

    // Create card event listening
    function subscribeOnMinted(packAmount: number) {
        console.log(`Subscription started`);
        on(MINT_EVENT, (data) => {
            console.log(`Received mint data: ${JSON.stringify(data)}`);
           mintedCards.value.push(data)

           if (packAmount === mintedCards.value.length) {
               console.log(`Enough cards`);
               notify(en.mintNotification.success, 'success')
           } else {
               console.log(`Not enough cards`);
           }
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

    async function mintPack(packId: number, address: string, native: boolean) {
        const client = getViemClient()

        await client.writeContract({
            address: CARDPOOL_ADDRESS,
            abi: cardpoolAbi,
            functionName: 'mintPack',
            args: [packId, address, native],
            account: walletAddress.value
        })
    }

    // Minting card
    async function startMint(packId: number, packAmount: number, approveAmount: string) {
        isMinting.value = true

        try {
            if (!isConnected.value) {
                connect(token.value)
            }

            subscribeOnMinted(packAmount)

            await approveTokens(approveAmount)

            if (!walletAddress.value) {
                return
            }

            await mintPack(packId, walletAddress.value, false)

            isCardProcessing.value = true

            isShowMintModal.value = true
        } catch (err: any) {
            // isShowMintButton.value = true

            notifyError(en.mintNotification.error, err?.message)

            throw err
        } finally {
            isMinting.value = false
        }
    }

    return {
        isCardProcessing,
        isShowMintModal,
        mintedCards,
        isMinting,
        startMint,
        mintPack,
        isShowMintButton
    }
}
