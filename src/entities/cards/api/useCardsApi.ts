import {useNotify} from "@/shared/api/useNotify.ts";
import {api} from "@/shared/lib/ky/ky.ts";
import {useWallet} from "@/shared/lib/ethers/useWallet.ts";
import {ref} from "vue";

export const useCardsApi = () => {
    const isCollectionLoading = ref(true);

    const { notifyError } = useNotify();

    const { walletAddress } = useWallet();

    async function getAllCards() {
        try {
            isCollectionLoading.value = true

            const { data, count } =  await api.get('cards').json();

            return { data, count };
        } catch (err: any) {
            notifyError('Failed to fetch cards', err?.message);

            throw err;
        } finally {
            isCollectionLoading.value = false
        }
    }

    async function getCardById(cardId: number) {
        try {
            return await api.get(`cards/${cardId}`).json();
        } catch (err: any) {
            notifyError('Card not found', err?.message);
            throw err;
        }
    }

    async function getMyCards() {
        try {
            return await api.get('cards/my').json();
        } catch (err: any) {
            notifyError('Failed to fetch your cards', err?.message);

            throw err;
        }
    }

    async function getCardsByWallet() {
        try {
            isCollectionLoading.value = true

            if (!walletAddress.value) {
               new Error('Wallet address not found')
            }

            const { data, count } =  await api.get(`cards/wallet/${walletAddress.value}`).json();

            return { data, count };
        } catch (err: any) {
            notifyError('Failed to fetch cards by wallet', err?.message);

            throw err;
        } finally {
            isCollectionLoading.value = false
        }
    }

    return {
        isCollectionLoading,
        getAllCards,
        getCardById,
        getMyCards,
        getCardsByWallet
    }
}
