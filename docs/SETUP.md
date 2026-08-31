# Setup Guide

## Complete Installation Instructions

### Prerequisites

- A modern web browser (Chrome, Firefox, or Edge)
- Python 3 or Node.js (for running a local server)
- Internet connection (for initial setup and free AI API)

### Method 1: Quick Start (No Installation)

#### Step 1: Clone the Repository

```bash
git clone https://github.com/Sxn5620/gov-doc-explainer.git
cd gov-doc-explainer
```

#### Step 2: Start a Local Server

**Using Python 3 (most common):**
```bash
python -m http.server 8000
```

**Using Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
npx http-server
```

**Using VS Code Live Server:**
1. Install the "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

#### Step 3: Open in Browser

Visit: **http://localhost:8000**

#### Step 4: Use the Tool

1. Click "🔍 Start Analyzing"
2. Grant permission to capture your screen
3. Open a government document (e.g., [Texas Statutes](https://statutes.capitol.texas.gov))
4. Scroll through the document
5. Explanations appear automatically in the top-right corner!

---

### Method 2: With Ollama (Best Performance - Offline)

Ollama allows the tool to run completely offline with better performance.

#### Step 1: Install Ollama

1. Download from [ollama.ai](https://ollama.ai)
2. Install for your operating system:
   - **macOS**: Download .dmg file
   - **Windows**: Download .exe file
   - **Linux**: Run install script

#### Step 2: Pull a Free AI Model

Open terminal/command prompt and run:

```bash
ollama pull mistral
```

This downloads a 4GB model. Other options:
```bash
ollama pull neural-chat      # Lighter, faster
ollama pull dolphin-mixtral  # More capable
ollama pull llama2           # Meta's model
```

#### Step 3: Verify Ollama is Running

Ollama runs in the background automatically after installation. To manually start:

**macOS:**
```bash
# Already running, or start from Applications
```

**Windows:**
```bash
# Already running, or start from Start Menu
```

**Linux:**
```bash
ollama serve
```

Ollama will be available at: **http://localhost:11434**

#### Step 4: Run the Tool

Follow Method 1 steps 1-4 above. The tool will automatically detect Ollama and use it instead of the free API!

---

### Method 3: Deploy Online (Vercel)

Make the tool accessible from anywhere.

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Deploy

```bash
cd gov-doc-explainer
vercel
```

Follow the prompts to connect your GitHub account. Your tool will be live within seconds!

#### Step 3: Share the URL

Vercel will give you a URL like: `https://gov-doc-explainer.vercel.app`

Share this with others!

**Note:** When deployed online, users cannot use Ollama (screen capture only works locally), so they'll use the free HuggingFace API.

---

### Method 4: Chrome Extension (Coming Soon)

Make it a one-click tool in your browser.

In development - check back soon!

---

## Troubleshooting

### "Port 8000 is already in use"

Use a different port:
```bash
python -m http.server 9000
# Then visit http://localhost:9000
```

### "Nothing happens when I click Start"

1. Open browser console (Press **F12**)
2. Look for error messages
3. Common fixes:
   - Make sure you grant screen capture permission
   - Try a different browser
   - Check that your browser supports Screen Capture API

### "Explanations are very slow"

- Install Ollama for 10x faster processing
- The free HuggingFace API may be rate-limited during high traffic
- Reduce frame analysis frequency in `js/govDocExplainer.js` line 48 (change `15` to `30`)

### "Cannot connect to localhost:11434"

This is normal if you haven't installed Ollama. The tool automatically falls back to the free HuggingFace API.

To use Ollama:
1. Install from [ollama.ai](https://ollama.ai)
2. Run `ollama pull mistral`
3. Restart the tool

### "localhost refused to connect"

Your local server isn't running. Make sure you ran one of these:
```bash
python -m http.server 8000
# OR
npx http-server
```

### "Browser doesn't support Screen Capture API"

Supported browsers:
- ✅ Chrome 72+
- ✅ Edge 79+
- ✅ Firefox 66+
- ❌ Safari (not supported)

Use Chrome or Firefox.

---

## Performance Tips

### For Fastest Experience

1. **Install Ollama** - Local processing is much faster
2. **Use Mistral model** - Best balance of speed and quality
3. **Close unnecessary browser tabs** - Reduces system load
4. **Use hardwired internet** - More stable than WiFi

### For Low-Resource Machines

1. Use `ollama pull neural-chat` instead of `mistral` (smaller model)
2. Reduce frame analysis frequency in code
3. Close other applications
4. Use the free HuggingFace API (less local processing)

---

## Next Steps

- ✅ Installation complete?
- 📖 Read [API_OPTIONS.md](API_OPTIONS.md) to learn about different AI models
- 🐛 Found a bug? Open an issue on [GitHub](https://github.com/Sxn5620/gov-doc-explainer/issues)
- ⭐ Enjoy! Consider starring the repo
