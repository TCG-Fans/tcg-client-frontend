<template>
  <div>
    <Button size="small"
            @click="connectWallet"
    >
      {{ accountTitle }}
    </Button>

    <Dialog v-model:visible="isShowMetaMaskConnectionDialog" modal :header="en.wallet.connectToWalletModalTitle" :style="{ width: '25rem' }">
      <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">
        <Button>{{ en.wallet.linkForMetamaskDownloading }}</Button>
      </a>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import {Button, Dialog } from "primevue";
import {useWallet} from "@/shared/lib/ethers/useWallet.ts";
import en from '@/shared/lib/languages/en.ts'

const { accountTitle, connectWallet, isShowMetaMaskConnectionDialog } = useWallet();
</script>

<style scoped>

</style>
