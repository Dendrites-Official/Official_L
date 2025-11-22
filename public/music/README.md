# Background Music Setup

## 📁 Place your music file here

Put your background music file in this folder and name it: `background-music.mp3`

## 🎵 Recommended Free Transformers-Style Music Sources

### Option 1: Pixabay (Free, No Attribution Required)
1. Go to: https://pixabay.com/music/
2. Search for keywords:
   - "cyberpunk"
   - "transformers"
   - "robotic"
   - "futuristic"
   - "industrial techno"
   - "sci-fi ambient"

### Option 2: Recommended Specific Tracks (Free to Use)

**From Pixabay:**
- "Cyberpunk 2099" by CO.AG Music
- "Future Bass" by QubeSounds
- "Cyber City" by Grand_Project
- "Robot Rock" by penguinmusic

**From YouTube Audio Library:**
- "Cipher" by Kevin MacLeod
- "Darkest Child" by Kevin MacLeod
- "Mechanolith" by Kevin MacLeod

### Option 3: Premium Options
If you want premium tracks:
- Artlist.io
- Epidemic Sound
- AudioJungle

## 📥 How to Download from Pixabay

1. Visit: https://pixabay.com/music/search/cyberpunk%20transformers/
2. Find a track you like
3. Click "Download" (free, no account required for most tracks)
4. Rename the file to `background-music.mp3`
5. Place it in this `/public/music/` folder
6. Restart your dev server

## 🔊 File Format Support

Supported formats:
- `.mp3` (recommended, best browser support)
- `.ogg`
- `.wav` (large file size)
- `.m4a`

## ⚙️ Changing the Music File

To use a different filename, edit `/src/components/MusicPlayer.tsx`:

```typescript
const audio = new Audio('/music/YOUR-FILENAME-HERE.mp3');
```

## 🎼 Current Placeholder

The component is currently trying to load: `/music/background-music.mp3`

Until you add a file, the music player will show but won't play anything (no errors will occur).
