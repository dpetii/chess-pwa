# 🎯 Sakk PWA - Telepítési útmutató

## 📱 Hogyan telepítsd Android telefonra?

### 1. lehetőség: GitHub Pages (ajánlott)

1. **Készíts GitHub repót:**
   - Menj a github.com-ra
   - New repository
   - Nevezd el: `chess-pwa`
   - Public legyen

2. **Töltsd fel a fájlokat:**
   - Az összes fájlt (index.html, chess.js, stb.) töltsd fel a repóba
   - GitHub repository → Settings → Pages
   - Source: Deploy from a branch
   - Branch: main → Save

3. **Néhány perc múlva elérhető lesz:**
   - URL: `https://FELHASZNÁLÓNEVED.github.io/chess-pwa`

4. **Telefonon telepítés:**
   - Nyisd meg Chrome böngészőben az URL-t
   - Koppints a ⋮ (három pont) menüre
   - "Add to Home screen" / "Hozzáadás a kezdőképernyőhöz"
   - Kész! Megjelenik app ikonként.

---

### 2. lehetőség: Netlify (még egyszerűbb)

1. Menj a netlify.com-ra
2. Drag & drop a teljes chess-pwa mappa
3. Kapsz egy URL-t (pl: random-name-123.netlify.app)
4. Telefonon ugyanúgy: Chrome → Add to Home screen

---

### 2. lehetőség: Helyi tesztelés USB-vel

1. **PC-n indíts local server-t:**
   ```bash
   cd chess-pwa
   python3 -m http.server 8000
   ```

2. **Keresd meg a PC IP címét:**
   - Windows: `ipconfig`
   - Linux/Mac: `ifconfig`
   
3. **Telefonon (ugyanazon WiFi-n):**
   - Chrome → `http://PC_IP_CÍM:8000`
   - Add to Home screen

---

## 📂 Fájlstruktúra

```
chess-pwa/
├── index.html       # Fő HTML
├── chess.js         # Játék logika
├── manifest.json    # PWA konfig
├── sw.js           # Service Worker (offline)
├── icon-192.png    # App ikon (kis)
├── icon-512.png    # App ikon (nagy)
└── README.md       # Ez a fájl
```

---

## ✨ Működés

- ♟️ Kattints egy bábura → kijelölés
- 🟢 Zöld mezők = érvényes lépések
- 🔄 Új játék gomb: újraindítás
- 📴 Offline is működik (Service Worker)
- 🎨 Reszponzív: mobilon és asztali gépen is

---

## 🔧 Testreszabás

**Szín változtatás:**
`index.html` → `<style>` szekcióban a színkódok

**Ikon csere:**
Cseréld le az icon-192.png és icon-512.png fájlokat

**Név változtatás:**
`manifest.json` → "name" és "short_name" mezők

---

## ❓ Gyakori hibák

**Nem jelenik meg "Add to Home screen":**
- HTTPS kell (vagy localhost)
- manifest.json elérhetőnek kell lennie
- Chrome böngészőt használj Androidon

**Ikonok nem látszanak:**
- Ellenőrizd hogy az icon-*.png fájlok léteznek
- GitHub Pages-nél várj 2-3 percet

**Service Worker nem regisztrálódik:**
- Konzolt nézd meg (Chrome DevTools)
- HTTPS vagy localhost kell
