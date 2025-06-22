import {useWallet} from "@/shared/lib/ethers/useWallet.ts";
import {api} from "@/shared/lib/ky/ky.ts";
import {useNotify} from "@/shared/api/useNotify.ts";
import {useAppModel} from "@/shared/app/model/useAppModel.ts";

export const useAuthApi = () => {
    const { setIsLoading } = useAppModel()

    const { notifyError } = useNotify();

    const { connectWallet, setAccountInfo, walletAddress: address } = useWallet()

    async function getNonce(walletAddress: string) {
        try {
            return await api.get(`auth/nonce/${walletAddress}`).json();
        } catch (err: any) {
            notifyError('Failed to get nonce', err?.message);
            throw err;
        }
    }

    async function verifySignature(walletAddress: string, signature: string) {
        try {
            return await api.post('auth/verify', {
                json: {walletAddress, signature},
            }).json();
        } catch (err: any) {
            notifyError('Signature verification failed', err?.message);
            throw err;
        }
    }

    async function signIn() {
        try {
            setIsLoading(true)

            const provider = await connectWallet();

            if (!provider) {
                notifyError('Provider is null', '');

                return
            }

            const installedProvider = window.ethereum;

            const accounts = await installedProvider.request({ method: 'eth_requestAccounts' });

            const walletAddress = accounts[0];

            const { message } = await getNonce(walletAddress);

            const signature = await installedProvider.request({
                method: 'personal_sign',
                params: [message, walletAddress],
            });

            const { token, user } = await verifySignature(walletAddress, signature);

            localStorage.setItem('token', token);

            return { token, user };
        } catch (err: any) {
            notifyError('Login by Metamask failed failed', err?.message);

            throw err;
        } finally {
            setIsLoading(false)
        }
    }

    async function restoreSession () {
        try {
            const provider = window.ethereum;

            if (!provider) {
                return
            }

            setIsLoading(true)

            await setAccountInfo(provider)

            const token = localStorage.getItem('token')

            if (!address.value) {
                notifyError('wallet address is null', '');

                return
            }

            if (!token) {
                const { message } = await getNonce(address.value);

                const signature = await provider.request({
                    method: 'personal_sign',
                    params: [message, address.value],
                });

                const { token, user } = await verifySignature(address.value, signature);

                localStorage.setItem('token', token);

                return { token, user };
            }
        } finally {
            setIsLoading(false)
        }
    }

    return {
        signIn,
        restoreSession
    }
}
