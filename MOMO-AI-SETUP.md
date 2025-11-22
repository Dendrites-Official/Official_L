# 🤖 MOMO AI Chatbot Setup Guide

## ✅ What's Been Done

MOMO has been upgraded to use **Google Gemini AI** for natural, human-like conversations!

### Features:
- 🧠 Natural conversation (not template-based)
- 💬 Remembers conversation context
- 📚 Trained on all DNDX documentation
- 🔄 Automatic fallback if AI fails
- ⚡ Free tier available (15 requests/min)

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Free API Key

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy your key

### Step 2: Add to Your Project

1. Create a `.env` file in the root directory:
```bash
VITE_GEMINI_API_KEY=your_actual_key_here
```

2. Restart your dev server:
```bash
npm run dev
```

### Step 3: Test MOMO

Open the chat and try:
- "What is DNDX?"
- "Tell me about the tokenomics"
- "How does escrow work?"

MOMO will respond naturally like a human! 🎉

---

## 🔧 How It Works

### With API Key (AI Mode):
- MOMO uses Google Gemini Pro model
- Natural, contextual responses
- Remembers conversation history
- Responds like a friendly human assistant

### Without API Key (Fallback Mode):
- Uses built-in knowledge base
- Still helpful but more template-based
- Works offline
- No API limits

---

## 📊 Current Configuration

**Total Token Supply Fixed:** 7.6 billion DNDX ✅

**AI System Context Includes:**
- Complete DNDX overview
- Tokenomics (7.6B supply)
- Key features (escrow, Quick Pay, AIP)
- Roadmap timeline
- Contact information
- All blog content
- Whitepaper/Litepaper content

**Response Style:**
- Friendly and conversational
- Uses emojis occasionally 
- Concise (2-4 sentences typically)
- Professional but approachable
- Honest about limitations

---

## 🆓 Alternative Free AI Options

If you prefer different AI:

### Option 1: Groq (Ultra-fast, Free)
```env
VITE_GROQ_API_KEY=your_groq_key
```
Get key: https://console.groq.com

### Option 2: Hugging Face (Open Source)
```env
VITE_HUGGINGFACE_API_KEY=your_hf_token
```
Get token: https://huggingface.co/settings/tokens

### Option 3: Cohere (Generous Free Tier)
```env
VITE_COHERE_API_KEY=your_cohere_key
```
Get key: https://dashboard.cohere.com

---

## 💡 Usage Tips

**Good Questions:**
- "What makes DNDX different?"
- "Explain the escrow system"
- "What are the transaction fees?"
- "When is the mainnet launch?"

**Complex Questions:**
- MOMO will direct to support@dendrites.ai
- Ensures accuracy for technical details

---

## 🔒 Security Notes

- ✅ API key stored in `.env` (not committed to git)
- ✅ Only used on client-side for chatbot
- ✅ Free tier has rate limits (15 req/min)
- ✅ Fallback works without API key

---

## 📝 Files Modified

1. `src/lib/aiChatbot.ts` - AI integration
2. `src/components/ChatBotWidget.tsx` - Updated to use AI
3. `src/data/chatbotKnowledge.ts` - Fixed tokenomics (7.6B)
4. `.env.example` - API key template

---

## 🎯 Next Steps

1. Get Gemini API key (free)
2. Add to `.env` file
3. Restart dev server
4. Test MOMO's natural responses!

**No API key?** MOMO still works with the fallback knowledge base!

---

## 📞 Need Help?

The chatbot itself will guide users to:
- support@dendrites.ai (technical support)
- partnerships@dendrites.ai (partnerships)
- Twitter: @dndx_official (updates)

Enjoy your AI-powered MOMO! 🚀
