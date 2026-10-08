import { sdk } from '../../sdk'
import { storeJson } from '../../fileModels/store.json'

const { InputSpec, Value } = sdk

const networkSpec = InputSpec.of({
  network: Value.select({
    name: 'Network',
    description:
      'Each network keeps its own blockchain data on disk.\n- Mainnet: the live Bitcoin Cash network\n- Testnet3: the legacy public test network\n- Testnet4: the lighter public test network\n- Scalenet: the public test network for high transaction throughput\n- Chipnet: the public test network where upcoming protocol upgrades (CHIPs) activate early\n- Regtest: a private chain on this server only, for local testing',
    warning:
      'The node restarts on the new network and syncs it, from scratch if it has no data for that network yet. Data for every other network stays on disk.',
    values: {
      mainnet: 'Mainnet',
      testnet3: 'Testnet3 (legacy test network)',
      testnet4: 'Testnet4 (light-weight test network)',
      scalenet: 'Scalenet (high-throughput test network)',
      chipnet: 'Chipnet (upgrade / CHIP staging)',
      regtest: 'Regtest (local testing only)',
    },
    default: 'mainnet',
  }),
})

export const networkConfig = sdk.Action.withInput(
  'network-config',
  async ({ effects }) => ({
    name: 'Network',
    description:
      'Select the Bitcoin Cash network. RPC and P2P ports adjust automatically for the selected network.',
    warning:
      'Changing the network requires a node restart. RPC and P2P ports will change to match the selected network.',
    allowedStatuses: 'any',
    group: 'Configuration',
    visibility: 'enabled',
  }),
  networkSpec,
  async ({ effects }) => {
    const store = await storeJson.read().once()
    return { network: store?.network ?? 'mainnet' }
  },
  async ({ effects, input }) => {
    const store = await storeJson.read().once()
    const current = store?.network ?? 'mainnet'
    const next = input.network

    if (current === next) {
      return {
        version: '1' as const,
        title: 'Network Unchanged',
        message: `BCHN is already configured for ${next}.`,
        result: null,
      }
    }

    await storeJson.merge(effects, { network: next, fullySynced: false })
    await effects.restart()

    return {
      version: '1' as const,
      title: 'Network Updated',
      message: `Switched BCHN from ${current} to ${next}. Restarting automatically.`,
      result: null,
    }
  },
)
