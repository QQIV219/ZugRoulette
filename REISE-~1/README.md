# Reise-Roulette – Android-App (PWA)

Diese Version ist als **installierbare PWA** aufgebaut. Auf Android bekommst du damit ein
App-Icon auf dem Homescreen, Vollbild ohne Browserleiste und eine Oberfläche, die auch
ohne Verbindung startet (die Fahrplandaten selbst brauchen weiterhin Internet).

## Dateien

```
index.html                     ← die App
manifest.webmanifest           ← App-Beschreibung (Name, Icon, Farben)
sw.js                          ← Service Worker (Offline-Fähigkeit)
icons/
  icon-192.png                 ← Homescreen-Icon
  icon-512.png                 ← grosses Icon / Splash
  icon-maskable-512.png        ← Icon für runde/adaptive Android-Formen
  apple-touch-icon.png         ← iOS-Icon
  favicon.png                  ← Browser-Tab-Icon
```

Wichtig: Alle Dateien müssen **zusammen im selben Ordner** bleiben, die Pfade sind relativ.

---

## Variante 1 – Direkt als App installieren (am einfachsten)

Eine PWA muss über **HTTPS** ausgeliefert werden. Ein Doppelklick auf `index.html`
(also `file://`) genügt nicht – dann fehlt der Installations-Knopf. Lade die Dateien
darum kostenlos an einen der folgenden Orte hoch:

- **Netlify Drop** – https://app.netlify.com/drop → den Ordner einfach reinziehen, fertig.
- **GitHub Pages** – Ordner in ein Repo, in den Einstellungen „Pages" aktivieren.
- **Cloudflare Pages**, **Vercel**, oder jeder Webspace mit HTTPS.

Dann auf dem Android-Handy:

1. Die veröffentlichte Adresse in **Chrome** öffnen.
2. Es erscheint der Knopf **„⬇️ App installieren"** in der App – oder im Chrome-Menü
   (⋮) **„App installieren" / „Zum Startbildschirm hinzufügen"**.
3. Bestätigen → das Icon liegt auf dem Homescreen und startet im Vollbild.

Das reicht für den privaten Gebrauch und für Freunde völlig aus.

---

## Variante 2 – Echter APK / Play-Store-App

Wenn du eine echte `.apk`/`.aab`-Datei brauchst (z. B. zum Weitergeben oder für den
Play Store), wird die gehostete PWA in einen schlanken Android-Container verpackt.
Das geht ohne Programmieren:

### A) PWABuilder (empfohlen, am schnellsten)
1. PWA wie in Variante 1 online stellen.
2. Auf https://www.pwabuilder.com die Adresse eingeben.
3. „Package for Stores" → **Android** → **Download**.
   Du erhältst ein fertiges Android-Studio-Projekt inkl. signiertem APK/AAB
   (Technik dahinter: *Trusted Web Activity*).

### B) Capacitor (mehr Kontrolle, lokal)
Voraussetzung: Node.js + Android Studio auf deinem Rechner.
```bash
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "Reise-Roulette" "ch.roulette.app" --web-dir=.
npx cap add android
npx cap sync
npx cap open android     # baut & signiert das APK in Android Studio
```
(Die Dateien dieser PWA sind dein `web-dir`.)

---

## Hinweise

- Die App holt Live-Fahrplandaten von `transport.opendata.ch`. Ohne Internet startet
  zwar die Oberfläche, aber es können keine Züge gesucht werden.
- **GPS-Standort:** Über den 📍-Knopf beim Startbahnhof lässt sich die nächste Haltestelle
  automatisch übernehmen. Das funktioniert nur über **HTTPS** (also gehostet oder als
  installierte App) und erst, nachdem du die Standortfreigabe im Browser/Handy erlaubst.
  Über `file://` ist die Standortabfrage aus Sicherheitsgründen deaktiviert.
- Für den Play Store brauchst du ein Google-Play-Entwicklerkonto (einmalige Gebühr).
- Icon und Farben lassen sich in `manifest.webmanifest` und im `icons/`-Ordner anpassen.
