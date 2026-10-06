import { T } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { storeJson } from '../fileModels/store.json'
import { bitcoinConfFile } from '../fileModels/bitcoin.conf'
import { networkPorts, Network } from '../utils'

const { InputSpec, Value } = sdk

export const viewCredentials = sdk.Action.withInput(
  'view-credentials',
  async ({ effects }) => ({
    name: 'View RPC Credentials',
    description:
      'Select a credential by name to view its username, password, and RPC port.',
    warning: null,
    allowedStatuses: 'any',
    group: 'Credentials',
    visibility: 'enabled',
  }),

  async ({ effects }) => {
    const conf = await bitcoinConfFile.read().once()
    const existingAuth: string[] = (
      (conf?.raw?.rpcauth as unknown as (string | undefined)[] | undefined) ??
      []
    ).filter((v): v is string => typeof v === 'string')

    const values: Record<string, string> = { Default: 'Default' }
    for (const entry of existingAuth) {
      const username = entry.split(':')[0]
      if (username) values[username] = username
    }

    return InputSpec.of({
      name: Value.select({
        name: 'Credential',
        description:
          'Default is the login this package itself uses. Every other name was created with Generate RPC Credentials, and its password cannot be shown again.',
        values,
        default: 'Default',
      }),
    })
  },

  async ({ effects }) => ({ name: 'Default' }),

  async ({ effects, input }) => {
    const store = await storeJson.read().once()
    const network: Network = store?.network ?? 'mainnet'
    const port = networkPorts[network].rpc

    if (input.name === 'Default') {
      return {
        version: '1' as const,
        title: 'RPC Credential: Default',
        message: null,
        result: {
          type: 'group' as const,
          value: [
            member('Username', store?.rpcUser ?? 'bitcoincashd', false),
            member('Password', store?.rpcPassword ?? '', true),
            member('Port', String(port), false),
          ],
        },
      }
    }

    // rpcauth user — the salted HMAC is all that is stored, so the password is not
    // recoverable and is shown once. Never add a path that keeps the plaintext.
    return {
      version: '1' as const,
      title: `RPC Credential: ${input.name}`,
      message:
        'The password was shown once, when this credential was generated, and cannot be recovered.',
      result: {
        type: 'group' as const,
        value: [
          member('Username', input.name, false),
          member('Port', String(port), false),
        ],
      },
    }
  },
)

function member(
  name: string,
  value: string,
  masked: boolean,
): T.ActionResultMember {
  return {
    type: 'single',
    name,
    description: null,
    value,
    copyable: true,
    masked,
    qr: false,
  }
}
