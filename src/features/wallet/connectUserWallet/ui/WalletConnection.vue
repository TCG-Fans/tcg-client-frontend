<template>
  <div>
    <div class="flex gap-2">
      <Button size="small"
              :loading="isLoading"
              @click="handleWalletSignIn"
      >
        {{ accountTitle }}
      </Button>

      <Button size="small"
              :loading="isLoading || isMinting"
              @click="startMint(1, 1, '8')"
      >
        Mint cards
      </Button>
    </div>


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
import {useMintModel} from "@/features/mint/model/useMintModel.ts";

const { isLoading } = useAppModel()
const { accountTitle, isShowMetaMaskConnectionDialog, copyAddress } = useWallet();

const { signIn } = useAuthApi();

const { startMint, isShowMintButton, isMinting } = useMintModel()

const handleWalletSignIn = () => {
  if (accountTitle.value) {
    copyAddress()

    return
  }

  signIn()
}
</script>

<style scoped>

</style>
