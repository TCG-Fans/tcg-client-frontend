/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TCG_API: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
