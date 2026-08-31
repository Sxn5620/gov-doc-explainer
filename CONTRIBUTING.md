# Contributing Guide

Thanks for your interest in contributing! This guide will help you get started.

## Ways to Contribute

### 🐛 Report Bugs

1. Check existing [issues](https://github.com/Sxn5620/gov-doc-explainer/issues)
2. If not reported, create a new issue with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser and OS info

### ✨ Suggest Features

1. Check existing [issues](https://github.com/Sxn5620/gov-doc-explainer/issues) first
2. Open a new issue with tag `[FEATURE REQUEST]`
3. Describe the feature and why it's useful
4. Provide examples if possible

### 📖 Improve Documentation

1. Found a typo or unclear explanation?
2. Fork the repo
3. Edit the documentation file
4. Submit a pull request

### 💻 Write Code

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages: `git commit -m "Add feature: description"`
6. Push to your fork: `git push origin feature/your-feature`
7. Open a Pull Request

## Development Setup

### Prerequisites

- Git
- Node.js or Python 3
- A code editor (VS Code recommended)
- Browser with Screen Capture API support (Chrome, Firefox, Edge)

### Local Development

```bash
# 1. Fork and clone
git clone https://github.com/YOUR-USERNAME/gov-doc-explainer.git
cd gov-doc-explainer

# 2. Create feature branch
git checkout -b feature/your-feature

# 3. Start local server
python -m http.server 8000

# 4. Open http://localhost:8000 in browser

# 5. Make changes and test

# 6. Commit and push
git add .
git commit -m "Add feature: description"
git push origin feature/your-feature
```

## Code Style

Please follow these guidelines:

### JavaScript

```javascript
// Use meaningful variable names
const isAnalyzing = false;  // ✅ Good
const f = false;            // ❌ Unclear

// Add comments for complex logic
// Calculate text similarity using Levenshtein distance
const similarity = this.calculateSimilarity(text1, text2);

// Use consistent formatting
function myFunction() {     // ✅ Function style
const myVar = value;        // ✅ const by default

// Avoid console.log in production code
console.log('Debug info');  // ⚠️ Only in development
```

### HTML/CSS

```html
<!-- Use semantic HTML -->
<div class="feature-card">      <!-- ✅ Descriptive class -->
  <strong>Feature Name</strong>
  <p>Description</p>
</div>

<!-- Use meaningful class names -->
class="gov-doc-explainer"       <!-- ✅ Clear purpose -->
class="hdr"                      <!-- ❌ Unclear -->
```

## Testing

Before submitting a PR, test:

1. **Screen Capture**
   - Starts correctly
   - Permission dialog appears
   - Video stream initializes

2. **OCR**
   - Text detection works
   - Handles different text sizes
   - Gracefully fails on non-text

3. **AI Explanations**
   - Connects to Ollama or HuggingFace
   - Generates reasonable explanations
   - Handles errors gracefully

4. **UI/UX**
   - Overlay displays correctly
   - Close button works
   - Mobile responsive (if applicable)

5. **Performance**
   - No memory leaks
   - Smooth scrolling
   - CPU usage reasonable

## Documentation

When adding features, update:

- `README.md` - For major features
- `docs/SETUP.md` - For setup changes
- `docs/API_OPTIONS.md` - For API changes
- `docs/TROUBLESHOOTING.md` - For new troubleshooting steps
- Code comments - For implementation details

## Pull Request Process

1. **Create descriptive title**
   - "Add: Feature name"
   - "Fix: Bug description"
   - "Docs: Update section"

2. **Write clear description**
   - What does it change?
   - Why is it needed?
   - How to test it?

3. **Link related issues**
   - "Fixes #123"
   - "Relates to #456"

4. **Keep it focused**
   - One feature per PR
   - Small, reviewable changes

5. **Add tests if applicable**
   - Include test cases
   - Describe manual testing done

## Areas for Contribution

### High Priority
- 🟴 Chrome Extension version
- 🟴 Firefox Extension version
- 🟴 Performance optimization
- 🟴 Mobile support

### Medium Priority
- 🟡 Multi-language support
- 🟡 Statute cross-referencing
- 🟡 Highlight detection
- 🟡 Better error messages

### Nice to Have
- 🟢 Dark/light theme toggle
- 🟢 Custom API key support
- 🟢 Export explanations as PDF
- 🟢 Browser history of explanations

## Community Guidelines

- Be respectful and inclusive
- Provide constructive feedback
- Help other contributors
- Celebrate successes
- Learn from failures

## Questions?

- Check existing issues and discussions
- Open a new issue with `[QUESTION]` tag
- Join our community discussions

---

Thank you for helping make legal documents more accessible! 🙏
