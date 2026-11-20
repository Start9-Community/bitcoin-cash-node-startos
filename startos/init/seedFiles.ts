import { utils } from '@start9labs/start-sdk'
import { totalmem } from 'os'
import { sdk } from '../sdk'
import { storeJson } from '../fileModels/store.json'
import { bitcoinConfFile } from '../fileModels/bitcoin.conf'

export const seedFiles = sdk.setupOnInit(async (effects, kind) => {
  if (kind !== 'install') return

  const rpcPassword = utils.getDefaultString({
    charset: 'a-z,A-Z,0-9',
    len: 32,
  })
  // Dynamic dbcache: 25% of system RAM, capped at 5120 MB
  const dbcache = Math.min(
    Math.floor((totalmem() * 0.25) / (1024 * 1024)),
    5120,
  )

  await storeJson.merge(effects, {
    rpcUser: 'bitcoincashd',
    rpcPassword,
    txindex: true,
    zmqEnabled: true,
    network: 'mainnet',
    initialized: true,
    reindexBlockchain: false,
    reindexChainstate: false,
    fullySynced: false,
  })

  await bitcoinConfFile.merge(effects, {
    raw: {
      rpcuser: 'bitcoincashd',
      rpcpassword: rpcPassword,
    },
    zmqEnabled: true,
    txindex: true,
    persistmempool: true,
    maxconnections: 125,
    rpcthreads: 4,
    rpcworkqueue: 64,
    dbcache,
  })
})
