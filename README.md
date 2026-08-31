# Government Document Explainer 📋

A free, open-source tool that provides real-time AI explanations of government documents as you scroll. Uses screen capture, OCR, and local LLM processing.

## Features

✅ **100% Free** - No API costs, open-source dependencies only
✅ **Real-time Analysis** - Explains text as you scroll
✅ **Privacy-First** - Processing happens locally or via free APIs
✅ **Works on Any Government Site** - Texas statutes, Congress.gov, state laws, etc.
✅ **No Backend Required** - Runs entirely in your browser
✅ **Offline Option** - Can run completely locally with Ollama

## How It Works

1. User navigates to a government document (e.g., https://statutes.capitol.texas.gov)
2. Clicks "Start Analyzing" in the tool
3. Grants permission to capture screen
4. As they scroll, the tool:
   - Captures screen frames (~every 500ms)
   - Extracts text via Tesseract OCR (runs in browser)
   - Sends to free AI model (Mistral 7B)
   - Displays plain-language explanation in overlay

## Quick Start

### Option 1: Browser (No Installation)

1. Clone this repo:
```bash
git clone https://github.com/Sxn5620/gov-doc-explainer.git
cd gov-doc-explainer
```

2. Start a local server:
```bash
# Using Python 3
python -m http.server 8000

# OR using Node
npx http-server

# OR open index.html in VS Code with Live Server extension
```

3. Open http://localhost:8000 in your browser

4. Click "🔍 Start Analyzing"

5. Select which screen/window to capture

6. Navigate to a government document and scroll - explanations appear automatically!

### Option 2: Offline with Ollama (Best Performance)

1. Install Ollama from https://ollama.ai

2. Pull a free AI model:
```bash
ollama pull mistral
```

3. Start Ollama (runs in background at http://localhost:11434)

4. Follow steps 1-6 from Option 1 above

5. The tool will use your local Ollama instead of the free API

## Tech Stack

- **OCR**: Tesseract.js (runs in browser, 100% free)
- **Screen Capture**: Native browser Screen Capture API
- **AI Models**: 
  - Mistral 7B (via Ollama or HuggingFace free API)
  - LLaMA, Neural Chat (alternatives)
- **Hosting**: Local (your computer)

## Free AI Options

### Option A: HuggingFace Inference API (Easiest)
- ✅ No installation needed
- ✅ Free tier available
- ✅ No API key required
- ⚠️ May be slow during high traffic
- Automatic fallback

### Option B: Ollama (Recommended)
- ✅ Runs entirely on your computer
- ✅ Fast processing
- ✅ Can use offline
- ⚠️ Requires ~4GB download for model
- Download: https://ollama.ai

### Option C: LLaMA.cpp (Lightweight)
- ✅ Minimal resource usage
- ✅ Runs offline
- ⚠️ More technical setup
- Download: https://github.com/ggerganov/llama.cpp

## Installation Options

### Local Development
```bash
git clone https://github.com/Sxn5620/gov-doc-explainer.git
cd gov-doc-explainer
python -m http.server 8000
# Visit http://localhost:8000
```

### Deploy to Vercel (Free)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify (Free)
- Connect GitHub repo to Netlify
- Auto-deploys on push

### Chrome Extension
```bash
# Coming soon - extension version in /extension folder
```

## File Structure

```
gov-doc-explainer/
├── index.html                 # Main UI
├── js/
│   └── govDocExplainer.js    # Core logic
├── docs/
│   ├── SETUP.md              # Detailed setup guide
│   ├── API_OPTIONS.md        # AI model options
│   └── TROUBLESHOOTING.md    # Common issues
├── README.md
└── package.json              # Optional dependencies
```

## Usage Examples

### Scrolling Texas Statutes
1. Go to https://statutes.capitol.texas.gov
2. Start the analyzer
3. Scroll through a law - get explanations for each section

### Reading Congress Bills
1. Go to https://congress.gov
2. Open a bill text
3. Explanations appear as you read

### Any Government Document
Works on any site with text-based documents

## Configuration

Edit `js/govDocExplainer.js` to customize:

```javascript
// Adjust frame analysis frequency (lower = faster, more API calls)
if (frameCount % 15 === 0) { }  // Change 15 to desired interval

// Adjust similarity threshold (higher = less sensitive)
return similarity < 0.7;  // Change 0.7 for sensitivity

// Adjust max explanation length
max_length: 300  // Change token count
```

## Troubleshooting

**Q: Nothing happens when I click Start**
- A: Check browser console (F12) for errors
- A: Make sure you allow screen capture permission
- A: See docs/TROUBLESHOOTING.md

**Q: Explanations are slow**
- A: Install Ollama for faster processing
- A: Reduce frame analysis frequency in settings

**Q: "Cannot connect to localhost:11434"**
- A: Make sure Ollama is installed and running
- A: Install from https://ollama.ai
- A: Run `ollama pull mistral` first

## Privacy & Security

- ✅ No data is stored on any server (unless you choose HuggingFace API)
- ✅ Screen capture requires your explicit permission
- ✅ Runs entirely in your browser when using Ollama
- ✅ Source code is open for inspection
- ✅ No tracking or analytics

## Contributing

Found a bug? Have a feature request? Open an issue or PR!

## License

MIT License - Use freely

## Support & Community

- 📖 See `/docs` folder for detailed guides
- 🐛 Report bugs via GitHub Issues
- 💬 Discussions welcome
- ⭐ Star if you find this useful!

## Roadmap

- [ ] Chrome Extension version
- [ ] Firefox Extension version
- [ ] Statute cross-referencing
- [ ] Highlight detection
- [ ] Multi-language support
- [ ] Desktop app (Electron)
- [ ] Mobile version

## FAQ

**Q: Is this legal?**
A: Yes - screen capture is permitted for accessibility. You control what's shared.

**Q: Can I use this commercially?**
A: MIT license allows commercial use - just include license in your product.

**Q: What about my privacy?**
A: Everything runs locally. No personal data is collected or sent anywhere (unless you choose the HuggingFace API).

**Q: Can I run this on a server?**
A: Yes, but screen capture only works on desktop browsers. Consider using it as a local tool or building a custom backend.

---

Made with ❤️ for accessible legal understanding
