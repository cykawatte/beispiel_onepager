# Musterbetrieb One-Pager

Eine moderne, mobile-first Webseite für kleine Unternehmen und Handwerksbetriebe.

## Projektstruktur

```
muster_onepager/
├── index.html              # Hauptseite
├── assets/
│   ├── css/
│   │   └── styles.css      # Alle Styles (BEM-Konvention)
│   ├── js/
│   │   └── main.js         # JavaScript (Menü, Formular, etc.)
│   └── img/                # Platzhalter für Bilder
├── README.md               # Diese Datei
└── SPEC.md                 # Spezifikation
```

## Lokal ausführen

1. **Einfache Methode:** Die `index.html` direkt im Browser öffnen.

2. **Mit lokalem Server (empfohlen):**
   ```bash
   # Mit Python 3
   python -m http.server 8000

   # Mit Node.js (npx)
   npx serve

   # Mit PHP
   php -S localhost:8000
   ```
   Dann im Browser öffnen: `http://localhost:8000`

## Inhalte anpassen

### Texte und Kontaktdaten

Alle Texte befinden sich in der `index.html`. Suchen und ersetzen Sie:

| Platzhalter | Beschreibung |
|-------------|--------------|
| `Musterbetrieb` | Ihr Firmenname |
| `+49 (0) 1234 567890` | Ihre Telefonnummer |
| `info@musterbetrieb.de` | Ihre E-Mail-Adresse |
| `Musterstraße 123` | Ihre Adresse |
| `12345 Musterstadt` | PLZ und Ort |
| `4915123456789` | WhatsApp-Nummer (internationales Format ohne +) |

### Bilder hinzufügen

1. Bilder in den Ordner `assets/img/` kopieren
2. In `index.html` die Platzhalter `<div class="gallery__placeholder">` durch `<img>` Tags ersetzen:
   ```html
   <img src="assets/img/projekt-1.jpg" alt="Beschreibung des Projekts" loading="lazy">
   ```

### Google Maps einbetten

1. Google Maps öffnen → Standort suchen → "Teilen" → "Karte einbetten"
2. Den generierten `<iframe>`-Code kopieren
3. In `index.html` den vorhandenen Maps-Iframe ersetzen

### Farben anpassen

In `assets/css/styles.css` die CSS Custom Properties ändern:

```css
:root {
  --color-primary: #1a365d;        /* Hauptfarbe */
  --color-primary-dark: #0f2340;   /* Dunklere Variante */
  --color-primary-light: #2c5282;  /* Hellere Variante */
  --color-secondary: #25d366;      /* WhatsApp-Grün */
  --color-accent: #ed8936;         /* Akzentfarbe */
}
```

## Checkliste für den Live-Gang

### Technisch

- [ ] **Domain registrieren** und DNS konfigurieren
- [ ] **SSL-Zertifikat** einrichten (HTTPS)
- [ ] **Hosting** einrichten (z.B. Netlify, Vercel, IONOS, Strato)
- [ ] Alle **Platzhalter ersetzen** (Texte, Kontaktdaten, Bilder)
- [ ] **Google Maps** mit echtem Standort einbetten
- [ ] **WhatsApp-Link** mit echter Nummer aktualisieren
- [ ] **Kontaktformular** mit Backend verbinden (z.B. Formspree, Netlify Forms)
- [ ] **Meta-Tags** prüfen (Title, Description)
- [ ] **Favicon** hinzufügen
- [ ] Auf verschiedenen Geräten **testen** (Desktop, Tablet, Smartphone)

### Rechtlich (DSGVO)

- [ ] **Impressum** erstellen (`impressum.html`)
  - Pflichtangaben nach § 5 TMG
  - Name, Adresse, Kontakt
  - Registernummer (falls vorhanden)
  - USt-IdNr. (falls vorhanden)

- [ ] **Datenschutzerklärung** erstellen (`datenschutz.html`)
  - Verantwortlicher
  - Erhobene Daten und Zweck
  - Kontaktformular-Hinweis
  - Cookie-Hinweis (falls zutreffend)
  - Google Maps-Hinweis
  - Betroffenenrechte

- [ ] **Cookie-Banner** implementieren (falls Cookies verwendet werden)

### Optional

- [ ] Google Analytics / Matomo einrichten
- [ ] Google Search Console anmelden
- [ ] robots.txt und sitemap.xml erstellen
- [ ] Open Graph Tags für Social Media
- [ ] Structured Data (JSON-LD) für lokales Business

## Browser-Unterstützung

- Chrome (letzte 2 Versionen)
- Firefox (letzte 2 Versionen)
- Safari (letzte 2 Versionen)
- Edge (letzte 2 Versionen)
- Mobile Browser (iOS Safari, Chrome Android)

## Technologien

- **HTML5** - Semantisches Markup
- **CSS3** - Custom Properties, Flexbox, Grid
- **Vanilla JavaScript** - Keine Abhängigkeiten
- **BEM** - CSS-Namenskonvention
- **Mobile-First** - Responsive Design

## Performance

- Keine externen JavaScript-Bibliotheken
- CSS Custom Properties für einfache Wartung
- Deferred JavaScript-Loading
- Lazy Loading für Bilder (natives `loading="lazy"`)
- Optimiert für Core Web Vitals

## Lizenz

Dieses Projekt ist für den eigenen Gebrauch bestimmt.
