import { sdk } from '../sdk'
import { dependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { versionGraph } from '../versions'
import { actions } from '../actions'
import { restoreInit } from '../backups'
import { publishRpc } from './publishRpc'
import { seedFiles } from './seedFiles'

export const init = sdk.setupInit(
  seedFiles,
  restoreInit,
  versionGraph,
  publishRpc,
  setInterfaces,
  actions,
  dependencies,
)

export const uninit = sdk.setupUninit(versionGraph)
