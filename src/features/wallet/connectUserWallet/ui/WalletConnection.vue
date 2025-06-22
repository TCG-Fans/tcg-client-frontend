<template>
  <div>
    <Button size="small"
            @click="signIn"
    >
      {{ accountTitle }}
    </Button>

    <Dialog v-model:visible="isShowMetaMaskConnectionDialog"
            modal :header="en.wallet.connectToWalletModalTitle"
            :style="{ width: '25rem' }">
      <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">
        <Button :loading="isLoading">{{ en.wallet.linkForMetamaskDownloading }}</Button>
      </a>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import {Button, Dialog } from "primevue";
import {useWallet} from "@/shared/lib/ethers/useWallet.ts";
import en from '@/shared/lib/languages/en.ts'
import {useAuthApi} from "@/features/auth/api/useAuthApi.ts";
import {useAppModel} from "@/shared/app/model/useAppModel.ts";

const { isLoading } = useAppModel()
const { accountTitle, isShowMetaMaskConnectionDialog } = useWallet();

const { signIn } = useAuthApi();
</script>

<style scoped>

</style>
