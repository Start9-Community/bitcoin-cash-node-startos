import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '29.0.0:12',
  releaseNotes: {
    en_US: `Deleting the transaction index or test network data no longer stops partway through on a large data directory.`,
    es_ES: `Eliminar el índice de transacciones o los datos de las redes de prueba ya no se detiene a medias en un directorio de datos grande.`,
    de_DE: `Das Löschen des Transaktionsindex oder von Testnetzdaten bricht bei einem großen Datenverzeichnis nicht mehr mittendrin ab.`,
    pl_PL: `Usuwanie indeksu transakcji lub danych sieci testowych nie zatrzymuje się już w połowie przy dużym katalogu danych.`,
    fr_FR: `La suppression de l'index des transactions ou des données des réseaux de test ne s'arrête plus en cours de route sur un répertoire de données volumineux.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
