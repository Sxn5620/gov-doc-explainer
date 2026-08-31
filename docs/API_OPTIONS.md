# API Options & Configuration

This guide explains the different AI models and APIs available, and how to configure them.

## Quick Comparison

| Option | Setup Time | Speed | Cost | Privacy | Offline |
|--------|-----------|-------|------|---------|----------|
| **HuggingFace API** | Instant | Slow | Free | Shared server | No |
| **Ollama (Mistral)** | 15 min | ⚡ Fast | Free | Local only | Yes |
| **Ollama (Neural Chat)** | 15 min | ⚡⚡ Faster | Free | Local only | Yes |
| **LLaMA.cpp** | 30 min | ⚡⚡⚡ Fastest | Free | Local only | Yes |

---

## Option 1: HuggingFace Inference API (Default)

### What is it?
Free cloud-based AI model hosting. No setup required.

### Pros
- ✅ No installation needed
- ✅ No local resources required
- ✅ Works on any device
- ✅ Free tier available

### Cons
- ❌ Slower responses (1-5 seconds)
- ❌ Rate limited during high traffic
- ❌ Requires internet connection
- ❌ Data goes to external servers
- ❌ May be unavailable during maintenance

### Setup

**Nothing to do!** The tool automatically uses HuggingFace API as a fallback.

### Optional: Create Free Account

1. Go to [huggingface.co](https://huggingface.co)
2. Sign up for free
3. (Account not required, but increases rate limits)

---

## Option 2: Ollama (Recommended)

### What is it?
Local AI model that runs on your computer. Fast, private, and free.

### Pros
- ✅ 10x faster than cloud APIs
- ✅ Works completely offline
- ✅ Privacy - data never leaves your machine
- ✅ No rate limits
- ✅ One-time setup

### Cons
- ❌ Requires ~4GB disk space
- ❌ Uses ~4GB RAM while running
- ❌ 15-30 minute initial setup
- ❌ Only works on same computer

### Setup

#### Step 1: Install Ollama

1. Download from [ollama.ai](https://ollama.ai)
2. Install for your OS:
   - **macOS**: Download and run .dmg
   - **Windows**: Download and run .exe
   - **Linux**: Follow install instructions
3. Restart your computer

#### Step 2: Pull a Model

Open terminal and choose one:

**Best Quality (Slower):**
```bash
ollama pull mistral
```
Model size: 4GB
Response time: 5-10 seconds
Quality: Excellent for legal documents

**Best Speed (Faster):**
```bash
ollama pull neural-chat
```
Model size: 4GB
Response time: 2-5 seconds
Quality: Good for summaries

**Balanced:**
```bash
ollama pull dolphin-mixtral
```
Model size: 26GB (advanced)
Response time: 5-15 seconds
Quality: Better reasoning

#### Step 3: Verify

Ollama runs automatically. Check it's working:

```bash
curl http://localhost:11434/api/tags
```

Should show:
```json
{"models":[{"name":"mistral:latest"}]}
```

#### Step 4: Use with Tool

The tool automatically detects Ollama. Just start the tool normally - it will use local processing!

### Configuration

Edit `js/govDocExplainer.js` to change settings:

```javascript
// Change model name (line ~95)
body: JSON.stringify({
  model: 'mistral',  // Change to: neural-chat, dolphin-mixtral
  prompt: this.createGovernmentDocPrompt(text),
  stream: false,
  temperature: 0.7  // Lower = more factual, Higher = more creative
})
```

---

## Option 3: LLaMA.cpp (Advanced)

### What is it?
Even lighter-weight local AI that uses less memory.

### Pros
- ✅ Minimal resource usage
- ✅ Can run on older computers
- ✅ Extremely fast
- ✅ Completely offline

### Cons
- ❌ More technical setup
- ❌ Requires command-line knowledge
- ❌ Needs separate integration code

### Setup

#### Step 1: Download and Compile

```bash
# Clone repository
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp

# Compile
make
```

#### Step 2: Download Model

```bash
# Download a GGUF format model (quantized, smaller)
wget https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.1-GGUF/resolve/main/Mistral-7B-Instruct-v0.1.Q4_K_M.gguf
```

#### Step 3: Run Server

```bash
./server -m Mistral-7B-Instruct-v0.1.Q4_K_M.gguf -ngl 33
```

Server runs at `http://localhost:8080`

#### Step 4: Modify Tool Code

Edit `js/govDocExplainer.js` and change the API endpoint:

```javascript
// Replace http://localhost:11434 with:
const response = await fetch('http://localhost:8080/completion', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: this.createGovernmentDocPrompt(text),
    n_predict: 300,
    temperature: 0.7
  })
});
```

---

## Switching Between Options

The tool automatically tries in this order:

1. **Ollama** (if installed and running)
2. **HuggingFace API** (free fallback)
3. **Pattern matching** (basic, no API)

No configuration needed - it just works!

---

## Performance Tuning

### Faster Responses

1. Install Ollama with smaller model:
   ```bash
   ollama pull neural-chat
   ```

2. Reduce quality for speed in code:
   ```javascript
   temperature: 0.5,  // Lower = faster, more factual
   max_length: 200    // Shorter responses = faster
   ```

### Better Quality

1. Use larger model:
   ```bash
   ollama pull dolphin-mixtral
   ```

2. Increase quality settings:
   ```javascript
   temperature: 0.9,  // Higher = more creative
   max_length: 400    # Longer responses = more detail
   ```

---

## Troubleshooting

### "Cannot connect to localhost:11434"

Ollama is not running. Solutions:
1. Install Ollama from [ollama.ai](https://ollama.ai)
2. Run `ollama pull mistral`
3. Restart your computer
4. Restart the tool

### "Model not found"

You haven't downloaded a model yet:
```bash
ollama pull mistral
```

### "Out of memory" errors

Your computer doesn't have enough RAM. Solutions:
1. Use smaller model: `ollama pull neural-chat`
2. Close other applications
3. Increase system RAM
4. Use HuggingFace API instead (uses cloud compute)

### "Responses are very slow"

1. Check CPU usage - high load means model is working hard
2. Use faster model: `ollama pull neural-chat`
3. Reduce frame analysis frequency in code (change `15` to `30`)
4. Close other applications

### "HuggingFace API timing out"

High traffic or rate limited. Solutions:
1. Wait a few minutes and try again
2. Install Ollama for local processing (no rate limits)
3. Create HuggingFace account for higher limits

---

## Comparison with Paid Services

| Service | Monthly Cost | Speed | Privacy | Offline |
|---------|-------------|-------|---------|----------|
| **This tool** | $0 | ⚡ Fast | 🔒 Private | ✅ Yes |
| OpenAI API | $5-100 | Fast | ❌ No | ❌ No |
| Claude API | $3-20 | Fast | ❌ No | ❌ No |
| Google Cloud AI | $1-50 | Fast | ❌ No | ❌ No |

**Savings:** $50-150/month using this tool vs. paid services!

---

## Recommendations

### For Best Experience
1. Install Ollama with Mistral model
2. Run locally on your computer
3. Enjoy offline, fast, private processing

### For Minimal Setup
1. Use HuggingFace API (automatic, no setup)
2. Enjoy cloud processing with internet
3. Upgrade to Ollama later if needed

### For Maximum Privacy
1. Install Ollama
2. Don't connect to internet (after model download)
3. Everything stays on your machine

---

Still have questions? Open an issue on [GitHub](https://github.com/Sxn5620/gov-doc-explainer/issues)
