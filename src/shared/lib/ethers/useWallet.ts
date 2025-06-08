import {computed, ref} from 'vue';
import { ethers } from 'ethers';

import Onboarding from '@metamask/onboarding';

const onboarding = new Onboarding();

function startOnboarding() {
    onboarding.startOnboarding(); // открывает установку MetaMask
}

export function useWallet() {
    const account = ref(null);

    const isShowMetaMaskConnectionDialog = ref(false)

    const connectWallet = async () => {
        if (Onboarding.isMetaMaskInstalled()) {

            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send('eth_requestAccounts', []);
            account.value = accounts[0];

            return account.value;
        } else {
            startOnboarding(); // запускаем процесс установки
        }
    };

    const accountTitle = computed(() => account.value ? shorten(account.value) : 'Connect to Metamask')

    return {
        accountTitle,
        connectWallet,
        isShowMetaMaskConnectionDialog,
    };
}
