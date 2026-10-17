import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '29.0.0:14',
  releaseNotes: {
    en_US:
      'Restarting Bitcoin Cash Node while it is still starting stops every process of the previous run.',
    es_ES:
      'Reiniciar Bitcoin Cash Node mientras aún se está iniciando detiene todos los procesos de la ejecución anterior.',
    de_DE:
      'Ein Neustart von Bitcoin Cash Node, während es noch startet, beendet alle Prozesse des vorherigen Laufs.',
    pl_PL:
      'Ponowne uruchomienie Bitcoin Cash Node w trakcie uruchamiania zatrzymuje wszystkie procesy poprzedniego uruchomienia.',
    fr_FR:
      "Redémarrer Bitcoin Cash Node pendant son démarrage arrête tous les processus de l'exécution précédente.",
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
