import {useNotify} from "@/shared/api/useNotify.ts";
import {api} from "@/shared/lib/ky/ky.ts";

export const useDeckBuilderApi = () => {
    const { notifyError } = useNotify();

    async function getUserDeck() {
        try {
            return await api.get('deck').json();
        } catch (err: any) {
            notifyError('Failed to fetch user deck', err?.message);

            throw err;
        }
    }

    const addCardToUserDeck = (id: number) => {
        try {
            return await api.put(`deck/${id}`).json();
        } catch (err: any) {
            notifyError('Failed to add card to user deck', err?.message);

            throw err;
        }
    }

    const deleteCardFromUserDeck = (id: number) => {
        try {
            return await api.delete(`deck/${id}`).json();
        } catch (err: any) {
            notifyError('Failed to delete card to user deck', err?.message);

            throw err;
        }
    }

    const clearUserDeck = () => {
        try {
            return await api.delete(`deck`).json();
        } catch (err: any) {
            notifyError('Failed to clear user deck', err?.message);

            throw err;
        }
    }

    return {
        getUserDeck,
        addCardToUserDeck,
        deleteCardFromUserDeck,
        clearUserDeck
    }
}
