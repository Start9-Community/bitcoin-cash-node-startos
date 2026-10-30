import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '29.0.0:15',
  releaseNotes: {
    en_US:
      'The instructions cover keeping your home IP private when you publish BCHN through StartTunnel.',
    es_ES:
      'Las instrucciones explican cómo mantener privada tu IP doméstica cuando publicas BCHN a través de StartTunnel.',
    de_DE:
      'Die Anleitung erklärt, wie Ihre Heim-IP-Adresse privat bleibt, wenn Sie BCHN über StartTunnel veröffentlichen.',
    pl_PL:
      'Instrukcje wyjaśniają, jak zachować prywatność domowego adresu IP, gdy publikujesz BCHN przez StartTunnel.',
    fr_FR:
      'Les instructions expliquent comment garder votre IP personnelle privée lorsque vous publiez BCHN via StartTunnel.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
