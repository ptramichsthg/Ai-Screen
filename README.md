# HR AI Recruiter - AI-Powered Candidate Screening

Aplikasi web modern untuk melakukan screening kandidat secara otomatis menggunakan AI. Dibangun dengan React, TypeScript, dan Tailwind CSS.

## 🚀 Fitur

- ✅ **AI-Powered Screening** - Analisis kandidat otomatis menggunakan OpenRouter AI
- ✅ **Real-time Search** - Cari kandidat berdasarkan nama, email, atau role
- ✅ **Modern UI/UX** - Desain responsif dengan animasi smooth
- ✅ **Toast Notifications** - Notifikasi user-friendly untuk feedback
- ✅ **State Management** - Menggunakan Zustand untuk state yang efisien
- ✅ **TypeScript** - Type-safe development

## 📋 Prerequisites

- Node.js v16 atau lebih tinggi
- npm atau yarn
- OpenRouter API Key (gratis di [openrouter.ai](https://openrouter.ai))

## 🛠️ Setup

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd ai-screening
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   
   Buat file `.env` di root project:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` dan tambahkan API key Anda:
   ```
   VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Buka browser**
   ```
   http://localhost:5173
   ```

## 🎯 Cara Menggunakan

1. **Dashboard** - Lihat semua aplikasi kandidat terbaru
2. **Search** - Gunakan search bar untuk filter kandidat
3. **AI Analysis** - Klik tombol "Analyze with AI" untuk screening otomatis
4. **View Results** - Lihat match score, strengths, dan gaps kandidat

## 📁 Struktur Project

```
src/
├── components/
│   └── CandidateCard.tsx    # Komponen kartu kandidat
├── services/
│   └── ai.ts                # Service untuk AI screening
├── App.tsx                  # Main application
├── store.ts                 # Zustand state management
├── types.ts                 # TypeScript type definitions
└── main.tsx                 # Entry point
```

## 🔒 Security

- ✅ API key disimpan di environment variable (`.env`)
- ✅ `.env` sudah ditambahkan ke `.gitignore`
- ⚠️ Jangan commit API key ke repository!

## 🧪 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icons
- **OpenRouter AI** - AI screening service

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎨 Fitur UI

- Responsive design (mobile & desktop)
- Dark mode ready
- Smooth animations
- Modern gradient colors
- Interactive hover effects
- Loading states
- Toast notifications

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License

