//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  preset: 'vercel',
  routeRules: {
    '/**': {
      cors: true,
    },
  }, 
  imports: {
    autoImport: true,
  },

  runtimeConfig: {
    jwtToken: "secretsecret", // `dev_token` is the default value
  }
})
