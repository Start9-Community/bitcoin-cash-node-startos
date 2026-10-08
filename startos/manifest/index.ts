import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'bitcoincashd',
  title: 'Bitcoin Cash Node (BCHN)',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9-Community/bitcoin-cash-node-startos',
  upstreamRepo: 'https://gitlab.com/bitcoin-cash-node/bitcoin-cash-node',
  marketingUrl: 'https://bitcoincashnode.org/',
  donationUrl: 'bitcoincash:prnc2exht3zxlrqqcat690tc85cvfuypngh7szx6mk',
  description: { short, long },
  volumes: ['main'],
  images: {
    'bitcoin-cash-node': {
      source: { dockerTag: 'mainnet/bitcoin-cash-node:v29.0.0' },
      arch: ['x86_64', 'aarch64'],
    },
  },
})
