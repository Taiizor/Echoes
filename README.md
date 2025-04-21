# Echoes - Quotes From Around The World

Echoes is an open-source project that provides inspiring quotes from various authors around the world. It includes a beautiful user interface with dark/light mode support and a powerful API to integrate quotes into your applications.

## Features

- Collection of inspirational quotes from diverse sources and languages
- Simple and powerful API for integration into your applications
- Multi-language support (currently English and Turkish)
- Dark and light mode support
- Responsive design

## Tech Stack

- [Nuxt 3](https://nuxt.com/) - The Vue Framework
- [Vue 3](https://vuejs.org/) - The Progressive JavaScript Framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Nuxt UI](https://ui.nuxt.com/) - UI Library based on TailwindCSS
- [i18n](https://i18n.nuxtjs.org/) - Internationalization module for Nuxt

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on http://localhost:3000

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

## API Endpoints

Echoes offers a simple and powerful API to get quotes:

- `GET /api/quotes` - Get all quotes
- `GET /api/quotes/:id` - Get a specific quote by ID
- `GET /api/quotes/random` - Get a random quote
- `GET /api/quotes/random?author=Einstein` - Get a random quote by author
- `GET /api/quotes/random?lang=tr` - Get a random quote by language
- `GET /api/quotes/random?author=Yunus&lang=tr` - Get a random quote by author and language

## Contributing

Contributions are welcome! Feel free to submit a pull request with new quotes, language support, or features.

## License

[GPL-3.0 License](LICENSE)

Made with ❤️ by [Taiizor](https://github.com/Taiizor)
