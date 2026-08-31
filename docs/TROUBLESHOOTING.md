# Troubleshooting Guide

## Common Issues & Solutions

### Starting the Tool

#### Issue: "Nothing happens when I click Start Analyzing"

**Step 1: Check Browser Console**
1. Press `F12` to open Developer Tools
2. Click the "Console" tab
3. Look for red error messages

**Step 2: Common Causes**

**Cause: Screen capture permission denied**
- Solution: Click "Allow" when browser asks for permission
- If you accidentally blocked it:
  - Chrome: Click lock icon in address bar → "Site settings" → "Camera" → Allow
  - Firefox: Preferences → Privacy → "Permissions" → "Screen Recording" → Allow

**Cause: Browser doesn't support Screen Capture API**
- Solution: Use a supported browser:
  - ✅ Chrome 72+
  - ✅ Firefox 66+
  - ✅ Edge 79+
  - ❌ Safari (not supported)

**Cause: JavaScript error in console**
- Solution: Check error message and try:
  1. Refresh the page (Ctrl+R)
  2. Clear browser cache (Ctrl+Shift+Del)
  3. Try in a different browser

**Cause: Tesseract.js not loaded**
- Solution: Make sure you're online (Tesseract.js is loaded from CDN)
- Or download locally and update HTML

---

### OCR Issues

#### Issue: "No text detected" or blank explanations

**Cause: Poor screen resolution or small text**
- Solution:
  1. Make text larger (zoom in with Ctrl+Plus)
  2. Maximize the document window
  3. Use better lighting

**Cause: Non-English text**
- Solution: Currently only supports English. Other languages coming soon.

**Cause: Text is an image**
- Solution: If the document is a scanned PDF or image, OCR will struggle. Try:
  1. Use HTML version if available
  2. Copy-paste text into a text document

---

### AI Explanation Issues

#### Issue: Explanations are very slow (5+ seconds)

**Cause: Using HuggingFace free API**
- Solution: Install Ollama for 10x faster local processing
  ```bash
  # Download from ollama.ai
  ollama pull mistral
  ```

**Cause: High server load on HuggingFace**
- Solution: Wait a few minutes, then try again
- Or use Ollama to avoid cloud APIs entirely

**Cause: Slow internet connection**
- Solution:
  1. Check internet speed
  2. Move closer to router
  3. Close other apps using internet
  4. Install Ollama for offline operation

**Cause: Computer running out of memory**
- Solution:
  1. Close unnecessary applications
  2. Restart your computer
  3. Use smaller Ollama model: `ollama pull neural-chat`

#### Issue: "Cannot connect to localhost:11434"

**Cause: Ollama not installed**
- Solution: This is fine! Tool works without Ollama using free HuggingFace API
- If you want Ollama: Download from [ollama.ai](https://ollama.ai)

**Cause: Ollama installed but not running**
- Solution:
  - macOS: Ollama runs automatically. Check Activity Monitor for "Ollama"
  - Windows: Ollama runs automatically. Check Task Manager for "Ollama"
  - Linux: Run `ollama serve` in terminal

**Cause: Wrong model name**
- Solution: Verify model is installed:
  ```bash
  ollama pull mistral
  # or
  ollama pull neural-chat
  ```

#### Issue: "Connection timeout" or "API rate limited"

**Cause: HuggingFace API overloaded**
- Solution:
  1. Wait 5-10 minutes
  2. Try again
  3. Or install Ollama for unlimited local access

**Cause: API key issues (if using custom API)**
- Solution: Check API key is correct in code

---

### Server/Connection Issues

#### Issue: "localhost:8000 refused to connect"

**Cause: Local server not running**
- Solution: Open terminal and run one of:
  ```bash
  # Python 3
  python -m http.server 8000
  
  # Or Python 2
  python -m SimpleHTTPServer 8000
  
  # Or Node.js
  npx http-server
  ```

**Cause: Port 8000 already in use**
- Solution: Use different port:
  ```bash
  python -m http.server 9000
  # Then visit http://localhost:9000
  ```

**Cause: Firewall blocking localhost**
- Solution: This is rare, but:
  1. Check firewall settings
  2. Try opening port 8000
  3. Or try a different port

---

### Display/UI Issues

#### Issue: Explanation box appears in wrong location

**Cause: Unusual screen setup (multiple monitors, rotated display)**
- Solution: Edit position in `js/govDocExplainer.js`:
  ```javascript
  // Change these values (in pixels)
  top: 20px;      // Distance from top
  right: 20px;    // Distance from right
  // Or change to left/bottom positioning
  ```

#### Issue: Explanation text is too small/large

**Cause: Browser zoom level**
- Solution:
  1. Press Ctrl+0 to reset zoom
  2. Or edit font size in code:
     ```javascript
     font-size: 13px;  // Change this number
     ```

#### Issue: Overlay disappears too quickly

**Cause: Auto-hide timer too short**
- Solution: Edit timeout in `js/govDocExplainer.js`:
  ```javascript
  // Add a manual close button (already in code)
  // Or increase display time before fading
  ```

---

### Performance Issues

#### Issue: Tool is using too much CPU

**Cause: Frame analysis too frequent**
- Solution: Edit `js/govDocExplainer.js` line ~48:
  ```javascript
  if (this.frameCount % 15 === 0) {}  // Change 15 to 30 or 45
  // Higher number = less frequent analysis
  ```

**Cause: Ollama model using too many resources**
- Solution:
  1. Use smaller model: `ollama pull neural-chat`
  2. Close other applications
  3. Restart Ollama: stop and restart it

#### Issue: Tool is using too much RAM

**Cause: Video stream not being released**
- Solution: Make sure to click "Stop" button when done

**Cause: Ollama model size too large**
- Solution: Switch to smaller model:
  ```bash
  ollama pull neural-chat  # Smaller than mistral
  ```

---

### Browser-Specific Issues

#### Chrome/Chromium

**Issue: Screen capture not working**
- Solution:
  1. Update Chrome to latest version
  2. Enable experimental features:
     - Type `chrome://flags` in address bar
     - Search for "Screen Capture API"
     - Enable it

**Issue: Tesseract.js very slow**
- Solution: This is normal first time (downloads ~35MB model)
- Subsequent uses will be cached

#### Firefox

**Issue: Screen capture limited to current tab**
- Solution: This is Firefox limitation. Try Chrome if you need full screen capture.

**Issue: HuggingFace API not responding**
- Solution: Firefox sometimes has CORS issues
- Try Chrome or Edge instead

#### Edge

Generally most compatible! Recommended for best experience.

---

### Data & Privacy Issues

#### Issue: "Where does my data go?"

**If using Ollama (local):**
- ✅ All data stays on your computer
- ✅ Nothing is sent to internet
- ✅ Complete privacy

**If using HuggingFace API:**
- ⚠️ Your text is sent to HuggingFace servers
- ⚠️ They follow privacy policy (non-commercial use)
- ℹ️ No personal data is collected
- 💡 Consider installing Ollama for complete privacy

#### Issue: "Is my screen recording saved?"

- ❌ Screen recording is never saved
- ❌ Only the visible text is extracted via OCR
- ❌ Video stream is not stored
- ✅ Temporary data only while tool is running

---

### Installation Issues

#### Issue: Can't clone the repository

**Cause: Git not installed**
- Solution: Install Git from [git-scm.com](https://git-scm.com)
- Or download as ZIP from GitHub

**Cause: Permission denied**
- Solution: Use `sudo` (not recommended) or check folder permissions

#### Issue: Can't install Ollama

**macOS:**
- Solution: Download .dmg and drag to Applications folder
- Or use Homebrew: `brew install ollama`

**Windows:**
- Solution: Download .exe and run installer
- Or use Chocolatey: `choco install ollama`

**Linux:**
- Solution: Follow instructions at [ollama.ai](https://ollama.ai/download)
- Usually: `curl https://ollama.ai/install.sh | sh`

---

### Getting Help

If you can't find a solution:

1. **Check the GitHub Issues:** [github.com/Sxn5620/gov-doc-explainer/issues](https://github.com/Sxn5620/gov-doc-explainer/issues)

2. **Create a new issue with:**
   - Screenshot of error
   - Browser type and version
   - Operating system
   - Steps to reproduce
   - Console errors (F12)

3. **Include system info:**
   ```bash
   # Get system info
   uname -a          # Linux/Mac
   systeminfo        # Windows
   ```

---

## Performance Optimization

### For Slow Systems

1. **Reduce frame analysis frequency**
   ```javascript
   if (this.frameCount % 30 === 0) {}  // Less frequent
   ```

2. **Use smaller AI model**
   ```bash
   ollama pull neural-chat
   ```

3. **Limit explanation length**
   ```javascript
   max_length: 150  // Shorter responses
   ```

4. **Disable auto-refresh**
   - Manually click to get new explanations

### For High-Performance Systems

1. **Increase frame analysis frequency**
   ```javascript
   if (this.frameCount % 5 === 0) {}  # More frequent
   ```

2. **Use larger AI model**
   ```bash
   ollama pull dolphin-mixtral
   ```

3. **Increase explanation length**
   ```javascript
   max_length: 500  # Longer, more detailed responses
   ```

---

**Still stuck?** Open an issue on GitHub or check the [main README](../README.md)!
