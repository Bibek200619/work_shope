# 🏥 MediAssist - AI Health Symptom Checker & Risk Predictor

A modern, responsive, and visually stunning frontend for an AI-powered health symptom checker. Built with React, Next.js, TypeScript, and Tailwind CSS with a premium glassmorphic design.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black)
![React](https://img.shields.io/badge/React-19.2.4-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)

## ✨ Features

### 🎨 Visual Design
- **Glassmorphism UI**: Beautiful frosted glass effect with blur and transparency
- **Dark Theme**: Easy on the eyes with gradient backgrounds
- **Responsive Design**: Mobile-first approach, works perfectly on all devices
- **Smooth Animations**: 300ms transitions and fade-in effects throughout
- **Color System**: Risk-based color coding (Green/Yellow/Red/Deep Red)

### 🚀 Core Functionality
- **Smart Symptom Input**: 
  - Text-based symptom entry
  - Multi-symptom support with chips UI
  - Comma-separated or paste multiple symptoms
  - Quick-add buttons for common symptoms

- **AI Analysis**:
  - Predicts top 5 possible diseases
  - Calculates confidence percentages
  - Risk level assessment (LOW/MEDIUM/HIGH/EMERGENCY)
  - AI-generated reasoning and recommendations

- **Emergency Alert**:
  - Full-screen emergency modal for critical cases
  - Clear action items for emergency situations
  - One-click emergency call button

- **Results Dashboard**:
  - Display predicted diseases with percentages
  - Risk level badge with color coding
  - AI reasoning explanation
  - Recommended actions
  - Medical disclaimer

- **History Tracking** (Optional):
  - View past health screenings
  - Track symptoms over time
  - Risk level history

### 🔒 Safety & Trust
- **Medical Disclaimer**: Prominently displayed on all pages
- **Clear AI Attribution**: Explains AI is for informational purposes only
- **Emergency Guidance**: Directs users to seek professional help
- **No Medical Jargon**: Simple, understandable language throughout

## 🛠️ Tech Stack

- **Framework**: Next.js 16.2.4 (App Router)
- **Language**: TypeScript 5
- **UI Framework**: React 19.2.4
- **Styling**: Tailwind CSS 4
- **State Management**: React Context API
- **Font System**: Geist font family

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home/input screen
│   ├── results/page.tsx      # Results dashboard
│   ├── history/page.tsx      # Analysis history
│   ├── layout.tsx            # Root layout with provider
│   ├── globals.css           # Design system & animations
│   └── favicon.ico
├── components/
│   ├── Navbar.tsx            # Header navigation
│   ├── SymptomInput.tsx      # Symptom input with chips
│   ├── ResultCard.tsx        # Disease prediction card
│   ├── RiskBadge.tsx         # Risk level indicator
│   ├── Loader.tsx            # Loading animation
│   ├── EmergencyModal.tsx    # Emergency alert modal
│   ├── Disclaimer.tsx        # Medical disclaimer
│   └── index.ts              # Component exports
├── contexts/
│   └── SymptomContext.tsx    # Global state management
├── lib/
│   └── mockApi.ts            # Mock API for demo
└── utils/
    └── (utility functions)
```

## 🎨 Design System

### Color Palette
```css
Background:     #0a0a0a (Primary), #1a1a1a (Secondary), #2a2a2a (Tertiary)
Text:           #ffffff (Primary), #b0b0b0 (Secondary), #808080 (Tertiary)
Accent:         #3b82f6 (Blue), #8b5cf6 (Purple), #06b6d4 (Cyan)
Risk Low:       #10b981 (Green)
Risk Medium:    #f59e0b (Yellow)
Risk High:      #ef4444 (Red)
Risk Emergency: #7f1d1d (Deep Red)
```

### Glassmorphism Classes
```css
.glass          /* Default glass effect */
.glass-sm       /* Smaller glass effect */
.glass-lg       /* Larger glass effect with more shadow */
```

### Animations
- **fade-in-up**: Fade in with upward movement
- **slide-in-left**: Slide in from left with fade
- **pulse-glow**: Pulsing glow effect for emergency alerts
- **shimmer**: Shimmer loading animation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd symptom-checker

# Install dependencies (already done)
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Available Scripts

```bash
# Development
npm run dev              # Start dev server with Turbopack

# Production
npm run build            # Build for production
npm start               # Start production server

# Linting
npm run lint            # Run ESLint checks
```

## 📖 Usage

### Home Page (`/`)
1. Enter symptoms in the input field
2. Use comma-separated entries or paste multiple symptoms
3. Click "Quick Add" for common symptoms
4. Click "👉 Check Symptoms" button to analyze

### Results Page (`/results`)
- View top 5 predicted diseases with confidence scores
- See risk level assessment
- Read AI reasoning and recommendations
- Get actionable next steps based on risk level

### History Page (`/history`)
- View past analyses (currently with mock data)
- Track health screening history

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v4 inline theme with custom CSS variables. Modify `globals.css` to customize:
- Colors and gradients
- Glassmorphism effects
- Animation timings
- Border radius

### Mock API
The `mockApi.ts` file contains a disease database and analysis logic. To integrate a real API:

```typescript
// Replace mockApi.analyzeSymptoms() calls with actual API endpoints
const response = await fetch('/api/analyze', {
  method: 'POST',
  body: JSON.stringify({ symptoms }),
});
```

## 🎯 Key Components

### SymptomInput
Handles symptom collection with:
- Text input field
- Chip display for selected symptoms
- Quick-add buttons
- Paste support for bulk entries

### ResultCard
Displays each disease prediction with:
- Disease name and percentage
- Confidence level indicator
- Description
- Visual progress bar

### RiskBadge
Color-coded risk indicator:
- 🟢 LOW (Green)
- 🟡 MEDIUM (Yellow)
- 🔴 HIGH (Red)
- 🚨 EMERGENCY (Deep Red with pulse)

### EmergencyModal
Full-screen alert for emergency cases:
- Clear warning message
- Action items (Call 911, Visit ER, etc.)
- Emergency button with phone link

## 🌐 Responsive Breakpoints

- **Mobile**: 0px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

All components use Tailwind's responsive prefixes (sm:, md:, lg:, xl:)

## 🔐 Safety Features

1. **Medical Disclaimer**: Displayed on every page
2. **Emergency Detection**: Automatically triggers for EMERGENCY risk level
3. **Clear Limitations**: Explains AI is not a medical diagnosis tool
4. **Professional Guidance**: Encourages consulting healthcare providers
5. **Emergency Call Support**: Direct 911 button in emergency modal

## ⚙️ State Management

Using React Context API (`SymptomContext`) for:
- Symptom storage
- Results caching
- Risk level tracking
- Loading states
- Global app state

Access state with: `const { symptoms, results, riskLevel } = useSymptom()`

## 🎨 Customization

### Change Colors
Edit CSS variables in `globals.css`:
```css
:root {
  --accent-blue: #3b82f6;      /* Your color */
  --risk-high: #ef4444;        /* Your color */
}
```

### Modify Animations
Update `@keyframes` and animation classes in `globals.css`

### Adjust Glassmorphism
Modify blur and opacity values:
```css
.glass {
  backdrop-filter: blur(24px);
  background: rgba(255, 255, 255, 0.08);
}
```

## 🐛 Troubleshooting

### Dev server won't start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### TypeScript errors
```bash
# Run type checker
npm run lint
```

### Styling issues
- Clear browser cache (Cmd+Shift+Delete)
- Restart dev server
- Check Tailwind CSS configuration

## 📝 Browser Support

- Chrome/Edge: Latest
- Firefox: Latest
- Safari: Latest (15+)
- Mobile browsers: All modern versions

## 🚀 Performance

- **Optimized build**: Next.js with Turbopack
- **Fast refresh**: Development hot reloading
- **Lazy loading**: Components loaded on demand
- **Image optimization**: Automatic via Next.js

## 📄 License

This project is created for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and enhance this project!

## ⚠️ Important Disclaimer

**This is an AI-powered screening tool and is NOT a substitute for professional medical diagnosis, treatment, or advice.** Always consult with qualified healthcare professionals for proper diagnosis and treatment.

For medical emergencies, call 911 (US) or your local emergency number immediately.

---

**Built with ❤️ using Next.js, React, and Tailwind CSS**

For more information, visit [Next.js Documentation](https://nextjs.org)
