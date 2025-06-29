import {useAuthApi} from "@/features/auth/api/useAuthApi.ts";
import {useCardsApi} from "@/entities/cards/api/useCardsApi.ts";
import {useMintModel} from "@/features/mint/model/useMintModel.ts";

export const useLaunchApp = () => {
    const { restoreSession } = useAuthApi()

    const { getCardsByWallet } = useCardsApi()

    const { mintPack } = useMintModel()

    const launchApp = async () => {
        await restoreSession()

        const token = localStorage.getItem('token');

        if (token) {
            const { count } = await getCardsByWallet()


            if (count) {
                return
            }

            await mintPack(0, 8)
        }
    }

    return {
        launchApp
    }
}
