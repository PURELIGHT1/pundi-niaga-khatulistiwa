interface ImportMetaEnv {
  readonly VITE_DOMAIN: string
  readonly VITE_BASE_URL: string
  readonly VITE_ENVIRONMENT: 'development' | 'production'
  readonly VITE_DOMAIN_CLIENT: string
  readonly VITE_DOMAIN_SERVER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
