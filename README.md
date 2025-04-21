# Echoes - Quotes From Around The World

Echoes is a modern web application that offers inspiring quotes from around the world. It aims to inspire users by providing access to quotes in different languages.

## Features

- 🧩 API for developers
- 🌐 Multilingual interface
- 🔄 Random quote display
- 📱 Mobile-friendly design
- 🎨 Light/dark theme support
- 📚 Quotes from various languages
- 🔍 Filtering by author and language

## Technologies

The application uses the following modern web technologies:

- 💨 Tailwind CSS - Styling
- 🔷 TypeScript - Type safety
- ⚛️ Next.js - React Framework
- 🎨 Next-Themes - Theme support
- 💻 RESTful API - Serves quote data
- 🌐 Next-i18next - Multilingual support

## Getting Started

### Requirements

- Node.js 14.x or higher
- npm or yarn

### Installation

```bash
# Navigate to the project directory
cd Echoes

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

You can access the application at `http://localhost:3000`.

### Configuration

- You can add new quotes by editing the `data/quotes.json` file.
- You can edit translations from the `public/locales` folder.

## API Usage

You can use the API to programmatically access all quotes:

```
GET /api/quotes          # Get all quotes
GET /api/quotes/:id      # Get quote by ID
GET /api/quotes/random   # Get random quote

# Get random quote by author
GET /api/quotes/random?author=Einstein

# Get random quote by multiple authors (comma-separated)
GET /api/quotes/random?author=Einstein,Gandhi

# Get random quote by language
GET /api/quotes/random?lang=tr

# Get random quote by multiple languages (comma-separated)
GET /api/quotes/random?lang=en,tr

# Get random quote by author and language
GET /api/quotes/random?author=Yunus&lang=tr

# Get random quote by multiple authors and languages
GET /api/quotes/random?author=Einstein,Gandhi&lang=en,tr
```

## Contributing

Contributions are welcome! Feel free to submit a pull request with new quotes, language support or features.

## License

[GPL-3.0 License](LICENSE)

Made with ❤️ by [Taiizor](https://github.com/Taiizor)