import { T } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { storeJson } from '../fileModels/store.json'
import {
  networkPorts,
  Network,
  GetBlockchainInfo,
  GetNetworkInfo,
  mainMounts,
} from '../utils'

export const runtimeInfo = sdk.Action.withoutInput(
  'runtime-info',
  async ({ effects: _effects }) => ({
    name: 'Node Info',
    description:
      'Display current node runtime information: version, network, connections, sync status.',
    warning: null,
    allowedStatuses: 'only-running' as const,
    group: null,
    visibility: 'enabled' as const,
  }),
  async ({ effects }) => {
    const store = await storeJson.read().once()
    const network: Network = store?.network ?? 'mainnet'
    const rpcUser = store?.rpcUser ?? 'bitcoincashd'
    const rpcPassword = store?.rpcPassword ?? ''
    const { rpc: rpcPort } = networkPorts[network]

    return sdk.SubContainer.withTemp(
      effects,
      { imageId: 'bitcoin-cash-node' },
      mainMounts,
      'runtime-info',
      async (sub) => {
        const cliBase = [
          'bitcoin-cli',
          `-rpcconnect=127.0.0.1`,
          `-rpcport=${rpcPort}`,
          `-rpcuser=${rpcUser}`,
          `-rpcpassword=${rpcPassword}`,
        ]

        const [netRes, chainRes] = await Promise.all([
          sub.exec([...cliBase, 'getnetworkinfo']).catch(() => null),
          sub.exec([...cliBase, 'getblockchaininfo']).catch(() => null),
        ])

        const net: GetNetworkInfo | null =
          netRes?.exitCode === 0 ? JSON.parse(netRes.stdout.toString()) : null
        const chain: GetBlockchainInfo | null =
          chainRes?.exitCode === 0
            ? JSON.parse(chainRes.stdout.toString())
            : null

        const value: T.ActionResultMember[] = []
        if (net) {
          value.push(
            single(
              'Version',
              net.subversion,
              'The BCHN release this node runs',
            ),
            single(
              'Network Active',
              net.networkactive ? 'Yes' : 'No',
              'Whether peer-to-peer networking is turned on',
            ),
            single(
              'Connections',
              `${net.connections} (${net.connections_in} in / ${net.connections_out} out)`,
              'The number of peers connected (inbound and outbound)',
            ),
          )
        }
        if (chain) {
          value.push(
            single(
              'Chain',
              `${chain.pruned ? 'pruned' : 'archival'} ${network}`,
              'The network this node follows, and whether it keeps every block',
            ),
            single(
              'Blocks',
              `${chain.blocks} / ${chain.headers}`,
              'Blocks verified out of block headers received',
            ),
            single(
              'Sync',
              chain.initialblockdownload
                ? `${(chain.verificationprogress * 100).toFixed(2)}%`
                : 'Complete',
              'How much of the blockchain this node has verified',
            ),
          )
        }

        return {
          version: '1' as const,
          title: 'Node Runtime Info',
          message: value.length
            ? null
            : 'The node did not answer RPC requests. It may still be starting.',
          result: value.length ? { type: 'group' as const, value } : null,
        }
      },
    )
  },
)

function single(
  name: string,
  value: string,
  description: string,
): T.ActionResultMember {
  return {
    type: 'single',
    name,
    description,
    value,
    copyable: false,
    masked: false,
    qr: false,
  }
}
