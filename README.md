# Attendance Calculator

A modern, user-friendly web application to calculate and plan your attendance percentage. Built with Next.js, React, and TypeScript, this tool helps students stay on track with their academic attendance requirements.

## Features

- ✨ **Real-time Calculation**: Instantly calculate your current attendance percentage
- 🎯 **Custom Minimum Attendance**: Set your own minimum attendance requirement (default: 75%)
- 📊 **Dynamic Color Coding**: Visual feedback with color-coded percentages based on your performance
- 📅 **Attendance Planner**: Plan your future attendance to see how it affects your overall percentage
- 🎨 **Modern UI**: Beautiful, responsive design with dark mode support
- 🚀 **Fast Performance**: Built with Next.js 16 for optimal speed
- 📱 **Mobile Friendly**: Works seamlessly on all devices

## Demo

Visit the live application: [https://attendance.sahilkumardev.com](https://attendance.sahilkumardev.com)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sahilkumardev/attendance-calculator.git
cd attendance-calculator
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Calculate Current Attendance

1. Enter the **total classes conducted** till today
2. Enter the **classes you attended** so far
3. Set your **minimum attendance requirement** (default: 75%)
4. Click **"Calculate My Attendance"**
5. View your current attendance percentage with color-coded feedback

### Plan Future Attendance

1. After calculating your current attendance, click **"Plan Your Attendance"** (if below minimum)
2. Enter the number of **upcoming classes**
3. Enter how many you **plan to attend**
4. See how your future attendance will change

## Color Coding

The app uses dynamic color coding based on your minimum attendance requirement:

- 🔴 **Red**: Below minimum (at risk)
- 🟠 **Orange**: Minimum to +5% (needs improvement)
- 🟡 **Yellow**: +5% to +10% (acceptable)
- 🟢 **Lime**: +10% to +15% (good)
- 💚 **Green**: +15% to +20% (very good)
- 🌟 **Emerald**: +20% and above (excellent)

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Custom components with [Radix UI](https://www.radix-ui.com/)
- **State Management**: React Hooks
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Project Structure

```
attendance-calculator/
├── app/
│   ├── api/          # API routes
│   ├── planner/      # Attendance planner page
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Home page
├── components/
│   ├── ui/           # Reusable UI components
│   ├── attendance-calculator.tsx
│   ├── attendance-planner.tsx
│   └── ...
├── lib/
│   ├── get-attendance-color.ts
│   ├── get-attendance-percentage.ts
│   ├── get-attendance-status.ts
│   └── utils.ts
└── styles/
    └── globals.css
```

## Build for Production

```bash
pnpm build
# or
npm run build
```

Then start the production server:

```bash
pnpm start
# or
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Sahilkumardev**
- Website: [sahilkumardev.com](https://sahilkumardev.com)
- Twitter: [@sahilkumardev](https://twitter.com/sahilkumardev)

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

Made with ❤️ by [Sahilkumardev](https://sahilkumardev.com)
