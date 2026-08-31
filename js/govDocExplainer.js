// Government Document Explainer - Core Logic
// Free AI + OCR for real-time legal document explanations

class FreeGovernmentDocExplainer {
  constructor() {
    this.mediaStream = null;
    this.isAnalyzing = false;
    this.lastAnalyzedText = '';
    this.debounceTimer = null;
    this.worker = null;
    this.frameCount = 0;
  }

  async initOCRWorker() {
    console.log('Initializing Tesseract OCR worker...');
    try {
      const { createWorker } = Tesseract;
      this.worker = await createWorker('eng');
      console.log('OCR worker initialized successfully');
    } catch (error) {
      console.error('Error initializing OCR worker:', error);
      throw new Error('Failed to initialize OCR. Try refreshing the page.');
    }
  }

  async initScreenCapture() {
    console.log('Requesting screen capture permission...');
    try {
      this.mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: 'always',
          displaySurface: 'window'
        },
        audio: false
      });

      const video = document.createElement('video');
      video.id = 'screen-capture-video';
      video.srcObject = this.mediaStream;
      video.style.display = 'none';
      video.autoplay = true;
      document.body.appendChild(video);

      console.log('Screen capture started');
      this.startFrameAnalysis(video);
    } catch (err) {
      console.error('Screen capture error:', err);
      if (err.name === 'NotAllowedError') {
        throw new Error('Screen capture permission denied. Please grant permission to use this feature.');
      } else if (err.name === 'NotSupportedError') {
        throw new Error('Screen Capture API not supported in your browser. Please use Chrome, Edge, or Firefox.');
      }
      throw new Error('Screen capture failed: ' + err.message);
    }
  }

  startFrameAnalysis(video) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    this.frameCount = 0;

    const analyzeFrame = () => {
      this.frameCount++;

      // Analyze every 15th frame (reduces processing load)
      if (this.frameCount % 15 === 0) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        this.analyzeScreenContent(canvas);
      }

      if (this.mediaStream) {
        requestAnimationFrame(analyzeFrame);
      }
    };

    video.onplay = () => requestAnimationFrame(analyzeFrame);
  }

  async analyzeScreenContent(canvas) {
    if (this.isAnalyzing) return;

    try {
      this.isAnalyzing = true;

      // Use Tesseract for OCR (free, runs locally)
      console.log('Running OCR on captured frame...');
      const { data: { text } } = await this.worker.recognize(canvas);

      if (!text || text.trim().length < 10) {
        console.log('No text detected in frame');
        this.isAnalyzing = false;
        return;
      }

      // Only analyze if content changed significantly
      if (this.hasSignificantChange(text)) {
        console.log('Significant text change detected, fetching explanation...');
        this.lastAnalyzedText = text;
        await this.getLocalAIExplanation(text);
      } else {
        console.log('Text unchanged, skipping analysis');
      }
    } catch (error) {
      console.error('Error analyzing screen:', error);
    } finally {
      this.isAnalyzing = false;
    }
  }

  hasSignificantChange(newText) {
    const similarity = this.calculateSimilarity(this.lastAnalyzedText, newText);
    return similarity < 0.7; // 30% threshold for change
  }

  calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) return 1;

    const editDistance = this.getEditDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  getEditDistance(s1, s2) {
    const costs = [];
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) costs[j] = j;
        else if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

  async getLocalAIExplanation(extractedText) {
    try {
      // Try Ollama first (local, fast, free)
      // Falls back to HuggingFace Inference API
      const explanation = await this.callLocalLLM(extractedText);
      this.displayExplanation(explanation);
    } catch (error) {
      console.error('Error getting explanation:', error);
      // Fallback to pattern-based explanation
      const basicExplanation = this.generateBasicExplanation(extractedText);
      this.displayExplanation(basicExplanation);
    }
  }

  async callLocalLLM(text) {
    // Option 1: Try Ollama (local, requires user to install)
    try {
      console.log('Attempting to connect to local Ollama...');
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'mistral',
          prompt: this.createGovernmentDocPrompt(text),
          stream: false,
          temperature: 0.7
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Got response from Ollama');
        return data.response;
      }
    } catch (err) {
      console.log('Ollama not available, trying HuggingFace API...');
    }

    // Option 2: Fallback to HuggingFace Inference API (free tier)
    return await this.callHuggingFace(text);
  }

  async callHuggingFace(text) {
    try {
      console.log('Calling HuggingFace Inference API...');
      const response = await fetch(
        'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
        {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({
            inputs: this.createGovernmentDocPrompt(text),
            parameters: {
              max_length: 300,
              temperature: 0.7
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result[0]?.generated_text) {
        console.log('Got response from HuggingFace');
        return result[0].generated_text;
      } else if (result.error) {
        console.warn('HuggingFace API error:', result.error);
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('HuggingFace API error:', error);
      throw error;
    }
  }

  createGovernmentDocPrompt(extractedText) {
    const cleanText = extractedText.substring(0, 500).trim();
    return `You are a legal expert explaining government documents in simple language.

Text from statute or legal document:
"${cleanText}"

Explain this section clearly in 2-3 sentences:
1. What this section does
2. Who it affects  
3. What's required or prohibited

Use simple language that non-lawyers can understand. Be concise and practical. Avoid complex legal jargon.`;
  }

  generateBasicExplanation(text) {
    // Fallback: Client-side pattern matching (no API calls)
    let explanation = '📋 Legal section detected. ';
    const lowerText = text.toLowerCase();

    if (lowerText.includes('shall')) {
      explanation += 'This requires an action. ';
    }
    if (lowerText.includes('penalty') || lowerText.includes('fine') || lowerText.includes('punishment')) {
      explanation += 'There are legal consequences. ';
    }
    if (lowerText.includes('shall not') || lowerText.includes('may not') || lowerText.includes('prohibited')) {
      explanation += 'This prohibits something. ';
    }
    if (lowerText.includes('defined') || lowerText.includes('means')) {
      explanation += 'This defines important terms. ';
    }
    if (lowerText.includes('effective')) {
      explanation += 'It mentions effective dates. ';
    }
    if (lowerText.includes('exemption') || lowerText.includes('exception')) {
      explanation += 'There are exceptions or exemptions. ';
    }

    return explanation.trim();
  }

  displayExplanation(explanation) {
    let overlay = document.getElementById('gov-doc-explainer-overlay');

    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'gov-doc-explainer-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 350px;
        max-height: 450px;
        background: linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.95));
        color: #e0e0e0;
        padding: 20px;
        border-radius: 12px;
        font-size: 13px;
        z-index: 10000;
        overflow-y: auto;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(0, 153, 255, 0.3);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        line-height: 1.7;
        backdrop-filter: blur(10px);
      `;
      document.body.appendChild(overlay);
    }

    const cleanExplanation = explanation
      .replace(/^[^:]*:/g, '') // Remove model prefix if present
      .trim();

    overlay.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid rgba(0, 153, 255, 0.2); padding-bottom: 12px;">
        <span style="font-weight: 600; font-size: 14px; color: #00d4ff;">📋 Legal Explanation</span>
        <button onclick="document.getElementById('gov-doc-explainer-overlay').style.display='none'" 
          style="background: none; border: none; color: #888; cursor: pointer; font-size: 18px; padding: 0; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">✕</button>
      </div>
      <div style="color: #b0b0d0; font-size: 13px; line-height: 1.7; word-wrap: break-word; white-space: pre-wrap;">
        ${cleanExplanation.replace(/\n/g, '<br>')}
      </div>
      <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(0, 153, 255, 0.1); font-size: 11px; color: #707090;">
        Generated automatically from visible text
      </div>
    `;

    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease-in';

    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);
  }

  async stop() {
    console.log('Stopping analyzer...');
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    const video = document.getElementById('screen-capture-video');
    if (video) video.remove();
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
    }
    console.log('Analyzer stopped');
  }
}

// Make it globally available
window.FreeGovernmentDocExplainer = FreeGovernmentDocExplainer;