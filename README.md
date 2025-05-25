# AI Communication Assistant (AI 沟通助手)

A React-based web application designed to help users improve their communication in intimate relationships using principles from Crucial Conversations and Nonviolent Communication.

## Features

- 🎯 **Goal Setting**: Help users set clear communication goals for themselves, their partners, and their relationships
- 💡 **Framework Guidance**: Five-step communication framework to organize thoughts and express effectively
- 🤝 **Nonviolent Communication**: Transform evaluative language into objective descriptions
- 📊 **Progress Tracking**: Visual progress indicator for the communication process
- 📱 **Responsive Design**: Fully responsive interface that works on all devices

## Tech Stack

- **Frontend Framework**: React 18.3 with TypeScript
- **Styling**: Tailwind CSS for utility-first styling
- **Routing**: React Router v6 for navigation
- **Icons**: Lucide React for beautiful, consistent icons
- **Build Tool**: Vite for fast development and optimized builds
- **HTTP Client**: Axios for API requests
- **AI Integration**: DeepSeek API for intelligent communication analysis

## Project Structure

```
src/
├── components/         # React components
│   ├── conversation/  # Conversation-related components
│   └── layout/       # Layout components (Header, Footer)
├── context/          # React Context for state management
├── pages/           # Page components
├── services/        # API and external service integrations
├── types/           # TypeScript type definitions
└── main.tsx        # Application entry point
```

### Key Components

- `ConversationContext`: Global state management for the conversation flow
- `ProgressIndicator`: Visual representation of conversation progress
- `NonviolentCommunication`: Implements the NVC communication pattern
- `Summary`: Provides analysis and recommendations

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## Development

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_DEEPSEEK_API_KEY=your_api_key_here
```

### API Integration

The application uses the DeepSeek API for:
- Analyzing conflict situations
- Generating communication recommendations
- Improving nonviolent communication expressions

### State Management

The application uses React Context for state management, with the following key features:
- Conversation progress tracking
- Goal management
- Safety check status
- Nonviolent communication messages

## Design Philosophy

The application follows these key principles:

1. **Progressive Disclosure**: Information is presented in digestible steps
2. **User-Centric Design**: Clear feedback and guidance at each stage
3. **Safety First**: Built-in safety checks before proceeding with sensitive conversations
4. **Accessibility**: Responsive design and keyboard navigation support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - see LICENSE file for details