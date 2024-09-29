//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  preset: 'vercel',
  routeRules: {
    '/**': {
      cors: true,
    },
  },

  runtimeConfig: {
    jwtToken: "secretsecret", // `dev_token` is the default value
  }
})
