import {useNotify} from "@/shared/api/useNotify.ts";
import {api} from "@/shared/lib/ky/ky.ts";

export const useCardsApi = () => {
    const { notifyError } = useNotify();

    async function getAllCards() {
        try {
            return await api.get('cards').json();
        } catch (err: any) {
            notifyError('Failed to fetch cards', err?.message);
            throw err;
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

    async function getCardsByWallet(walletAddress: string) {
        try {
            return await api.get(`cards/wallet/${walletAddress}`).json();
        } catch (err: any) {
            notifyError('Failed to fetch cards by wallet', err?.message);
            throw err;
        }
    }


    return {
        getAllCards,
        getCardById,
        getMyCards,
        getCardsByWallet
    }
}
