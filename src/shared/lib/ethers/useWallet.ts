import {computed, ref} from 'vue';
import { ethers } from 'ethers';

import Onboarding from '@metamask/onboarding';
import { shorten } from "@/shared/utils/string.ts";
import {useNotify} from "@/shared/api/useNotify.ts";

const onboarding = new Onboarding();

function startOnboarding() {
    onboarding.startOnboarding();
}

const walletAddress = ref(null);

export function useWallet() {
    const { notifyError } = useNotify();

    const isShowMetaMaskConnectionDialog = ref(false)

    const setAccountInfo = async (ethereum: unknown) => {
        try {
            const provider = new ethers.BrowserProvider(ethereum);

            const accounts = await provider.send('eth_requestAccounts', []);

            walletAddress.value = accounts[0];

            return provider
        } catch (e) {
            notifyError('Set account info failed', e?.message);

            throw e;
        }
    }

    const connectWallet = async () => {
        try {
            if (Onboarding.isMetaMaskInstalled()) {
                await setAccountInfo(window.ethereum)
            } else {
                startOnboarding();
            }
        }
        catch (error) {
            notifyError('Login by Metamask failed failed', error?.message);

            throw error;
        }
    };

    const accountTitle = computed(() => walletAddress.value ? shorten(walletAddress.value) : 'Connect to Metamask')

    return {
        setAccountInfo,
        walletAddress,
        accountTitle,
        connectWallet,
        isShowMetaMaskConnectionDialog,
    };
}
