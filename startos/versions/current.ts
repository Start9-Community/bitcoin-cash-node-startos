import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '29.0.0:17',
  releaseNotes: {
    en_US:
      'Services that use this node, such as Fulcrum BCH, BCH Explorer and the BCH mining pools, can now connect to it without access to its blockchain data or configuration, once they are updated too.',
    es_ES:
      'Los servicios que usan este nodo, como Fulcrum BCH, BCH Explorer y los pools de minería de BCH, ahora pueden conectarse a él sin acceso a sus datos de blockchain ni a su configuración, una vez que también se actualicen.',
    de_DE:
      'Dienste, die diesen Knoten nutzen, etwa Fulcrum BCH, BCH Explorer und die BCH-Mining-Pools, können sich jetzt ohne Zugriff auf seine Blockchain-Daten oder seine Konfiguration mit ihm verbinden, sobald sie ebenfalls aktualisiert sind.',
    pl_PL:
      'Usługi korzystające z tego węzła, takie jak Fulcrum BCH, BCH Explorer i pule wydobywcze BCH, mogą teraz łączyć się z nim bez dostępu do jego danych blockchaina i konfiguracji, gdy również zostaną zaktualizowane.',
    fr_FR:
      'Les services qui utilisent ce nœud, comme Fulcrum BCH, BCH Explorer et les pools de minage BCH, peuvent désormais s’y connecter sans accès à ses données de blockchain ni à sa configuration, une fois mis à jour eux aussi.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
