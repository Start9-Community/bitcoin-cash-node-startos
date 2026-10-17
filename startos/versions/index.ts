import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_29_0_0_13 } from './v29.0.0.13'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_29_0_0_13],
})
