import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '29.0.0:16',
  releaseNotes: {
    en_US:
      'New installs generate their RPC password with a cryptographically secure random generator. Existing installs keep their current password.',
    es_ES:
      'Las instalaciones nuevas generan su contraseña RPC con un generador aleatorio criptográficamente seguro. Las instalaciones existentes conservan su contraseña actual.',
    de_DE:
      'Neue Installationen erzeugen ihr RPC-Passwort mit einem kryptografisch sicheren Zufallsgenerator. Bestehende Installationen behalten ihr aktuelles Passwort.',
    pl_PL:
      'Nowe instalacje generują hasło RPC kryptograficznie bezpiecznym generatorem losowym. Istniejące instalacje zachowują dotychczasowe hasło.',
    fr_FR:
      'Les nouvelles installations génèrent leur mot de passe RPC avec un générateur aléatoire cryptographiquement sûr. Les installations existantes conservent leur mot de passe actuel.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
