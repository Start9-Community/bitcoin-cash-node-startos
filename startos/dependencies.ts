import { sdk } from './sdk'
import { bitcoinConfFile } from './fileModels/bitcoin.conf'

const tor = sdk.Dependency.optional('tor', {
  description:
    'Enables Tor onion routing for anonymous peer-to-peer connections. When Tor is installed and running, Bitcoin Cash Node automatically routes all connections through the Tor network for enhanced privacy.',
  metadata: {
    title: 'Tor',
    icon: 'https://raw.githubusercontent.com/Start9Labs/tor-startos/65faea17febc739d910e8c26ff4e61f6333487a8/icon.svg',
  },
  kind: 'running',
  versionRange: '>=0.4.9.11:4',
  healthChecks: [],
  enabled: async ({ effects }) => {
    const { externalip, onlynet } =
      (await bitcoinConfFile
        .read((c) => ({ externalip: c.raw?.externalip, onlynet: c.onlynet }))
        .const(effects)) ?? {}
    return !!(
      externalip?.some((ip) => ip?.includes('.onion')) ||
      onlynet?.includes('onion')
    )
  },
})

export const dependencies = sdk.Dependencies.of().addDependency(tor)
