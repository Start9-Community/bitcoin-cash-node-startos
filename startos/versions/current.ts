import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { bitcoinConfFile } from '../fileModels/bitcoin.conf'

export const current = VersionInfo.of({
  version: '29.0.0:13',
  releaseNotes: {
    en_US: `- Deleting the transaction index or test network data no longer stops partway through on a large data directory.
- Node Info shows each value in its own labelled field.
- View RPC Credentials shows the username, password and port as separate fields, each with a copy button. The password stays hidden until you reveal it.
- Delete Test Network Data starts with no network selected.
- The Network and Allowed Networks settings, and several RPC, peer and mempool settings, explain what each choice does.
- Ancestor Limit and Descendant Limit are removed from Mempool & Block Policy, and any value set for them is cleared. A node that would not start with either set starts again.
- Prune Target saves a value from 2 to 549 as 550 MiB, the smallest target BCHN accepts, and a stored value in that range becomes 550. A node that would not start with such a value starts again, still pruned.`,
    es_ES: `- Eliminar el índice de transacciones o los datos de las redes de prueba ya no se detiene a medias en un directorio de datos grande.
- Información del nodo muestra cada valor en su propio campo con nombre.
- Ver credenciales RPC muestra el usuario, la contraseña y el puerto en campos separados, cada uno con un botón para copiar. La contraseña permanece oculta hasta que la revelas.
- Eliminar datos de redes de prueba empieza sin ninguna red seleccionada.
- Los ajustes Red y Redes permitidas, y varios ajustes de RPC, pares y mempool, explican qué hace cada opción.
- Ancestor Limit y Descendant Limit desaparecen de Mempool & Block Policy, y se borra cualquier valor que tuvieran. Un nodo que no arrancaba con alguno de ellos configurado vuelve a arrancar.
- Prune Target guarda un valor de 2 a 549 como 550 MiB, el objetivo más pequeño que acepta BCHN, y un valor guardado en ese rango pasa a 550. Un nodo que no arrancaba con un valor así vuelve a arrancar, y sigue podado.`,
    de_DE: `- Das Löschen des Transaktionsindex oder von Testnetzdaten bricht bei einem großen Datenverzeichnis nicht mehr mittendrin ab.
- Knoteninfo zeigt jeden Wert in einem eigenen beschrifteten Feld.
- RPC-Zugangsdaten anzeigen zeigt Benutzername, Passwort und Port in getrennten Feldern, jeweils mit einer Kopierschaltfläche. Das Passwort bleibt verborgen, bis du es einblendest.
- Testnetzdaten löschen beginnt ohne ausgewähltes Netz.
- Die Einstellungen Netzwerk und Erlaubte Netzwerke sowie mehrere RPC-, Peer- und Mempool-Einstellungen erklären, was jede Auswahl bewirkt.
- Ancestor Limit und Descendant Limit entfallen aus Mempool & Block Policy, und ein dafür gesetzter Wert wird gelöscht. Ein Knoten, der mit einem der beiden nicht startete, startet wieder.
- Prune Target speichert einen Wert von 2 bis 549 als 550 MiB, das kleinste Ziel, das BCHN akzeptiert, und ein gespeicherter Wert in diesem Bereich wird zu 550. Ein Knoten, der mit einem solchen Wert nicht startete, startet wieder, weiterhin gekürzt.`,
    pl_PL: `- Usuwanie indeksu transakcji lub danych sieci testowych nie zatrzymuje się już w połowie przy dużym katalogu danych.
- Informacje o węźle pokazują każdą wartość w osobnym, opisanym polu.
- Wyświetl dane uwierzytelniające RPC pokazuje nazwę użytkownika, hasło i port w osobnych polach, każde z przyciskiem kopiowania. Hasło pozostaje ukryte, dopóki go nie odkryjesz.
- Usuwanie danych sieci testowych zaczyna się bez zaznaczonej sieci.
- Ustawienia Sieć i Dozwolone sieci oraz kilka ustawień RPC, peerów i mempoola wyjaśniają, co oznacza każdy wybór.
- Ancestor Limit i Descendant Limit znikają z Mempool & Block Policy, a ustawione dla nich wartości są usuwane. Węzeł, który nie uruchamiał się z którymkolwiek z nich, znów się uruchamia.
- Prune Target zapisuje wartość od 2 do 549 jako 550 MiB, najmniejszy cel akceptowany przez BCHN, a zapisana wartość z tego zakresu zmienia się na 550. Węzeł, który nie uruchamiał się z taką wartością, znów się uruchamia i nadal jest przycinany.`,
    fr_FR: `- La suppression de l'index des transactions ou des données des réseaux de test ne s'arrête plus en cours de route sur un répertoire de données volumineux.
- Les informations du nœud affichent chaque valeur dans son propre champ nommé.
- Afficher les identifiants RPC présente le nom d'utilisateur, le mot de passe et le port dans des champs séparés, chacun avec un bouton de copie. Le mot de passe reste masqué jusqu'à ce que vous l'affichiez.
- La suppression des données des réseaux de test commence sans aucun réseau sélectionné.
- Les paramètres Réseau et Réseaux autorisés, ainsi que plusieurs paramètres RPC, pairs et mempool, expliquent l'effet de chaque choix.
- Ancestor Limit et Descendant Limit disparaissent de Mempool & Block Policy, et toute valeur définie pour eux est effacée. Un nœud qui ne démarrait pas avec l'un d'eux défini redémarre.
- Prune Target enregistre une valeur de 2 à 549 comme 550 Mio, la plus petite cible qu'accepte BCHN, et une valeur enregistrée dans cette plage devient 550. Un nœud qui ne démarrait pas avec une telle valeur redémarre, toujours élagué.`,
  },
  migrations: {
    // BCHN rejects both keys; the write also raises a prune target BCHN refuses.
    up: async ({ effects }) => {
      await bitcoinConfFile.update(
        effects,
        (conf) =>
          conf && {
            ...conf,
            raw: {
              ...conf.raw,
              limitancestorcount: undefined,
              limitdescendantcount: undefined,
            },
          },
      )
    },
    down: IMPOSSIBLE,
  },
})
