# Echoes - Quotes From Around The World 🌍

![Echoes](.images/Logo.png)

[![License](https://img.shields.io/badge/License-GPL_3.0-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Built_with-Next.js_14-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styled_with-Tailwind_CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

Echoes is a modern web application that offers inspiring quotes from around the world. It aims to inspire users by providing access to wisdom and insights in different languages, all within a beautiful, responsive interface.

[Live Demo](https://echoes.soferity.com/) | [API Documentation](https://echoes.soferity.com/docs)

## ✨ Features

- **🌐 Multilingual Interface** - Full internationalization support
- **🧩 Developer API** - RESTful endpoints for programmatic access
- **⚡ Performance** - Fast loading and optimized for best user experience
- **📱 Responsive Design** - Optimized for all devices from mobile to desktop
- **🔄 Quote Discovery** - Random quotes with author and source information
- **📚 Language Diversity** - Quotes in multiple languages from around the world
- **🔍 Advanced Filtering** - Search by author, language or combine multiple filters
- **🎨 Theme Options** - Light/dark mode with automatic system preference detection

## 🛠️ Technologies

The application is built with modern web technologies:

- **🔷 [TypeScript](https://www.typescriptlang.org/)** - Static type checking
- **🌐 [Next-i18next](https://github.com/i18next/next-i18next)** - Internationalization
- **📊 [Framer Motion](https://www.framer.com/motion/)** - Animation library
- **🎨 [Next-Themes](https://github.com/pacocoursey/next-themes)** - Theme management
- **💨 [Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **⚛️ [Next.js](https://nextjs.org/)** - React framework with SSR/SSG support

## 🚀 Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Taiizor/Echoes.git

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

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d
```

## ⚙️ Configuration

- **Adding Quotes**: Edit the `data/quotes.json` file to add new quotes
- **Translations**: Modify files in the `public/locales` folder to update or add translations
- **Theme**: Customize the `tailwind.config.js` file to change color schemes

## 📖 API Documentation

Echoes provides a comprehensive API for developers to access the quotes programmatically:

### Endpoints

```
GET /api/quotes          # Get all quotes (paginated)
GET /api/quotes/:id      # Get quote by ID
GET /api/quotes/random   # Get random quote
```

### Query Parameters

#### Random Quote Filters

```
# By author
GET /api/quotes/random?author=Einstein

# By multiple authors (comma-separated)
GET /api/quotes/random?author=Einstein,Gandhi

# By language
GET /api/quotes/random?lang=tr

# By multiple languages (comma-separated)
GET /api/quotes/random?lang=en,tr

# Combined filters
GET /api/quotes/random?author=Yunus&lang=tr
GET /api/quotes/random?author=Einstein,Gandhi&lang=en,tr
```

#### Pagination for All Quotes

```
GET /api/quotes?page=1&perPage=10
```

## 🤝 Contributing

Contributions are welcome and appreciated! Here's how you can contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Add your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

Types of contributions:
- Adding new quotes to the database
- Improving or adding translations
- Fixing bugs or improving performance
- Adding new features or enhancing existing ones

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Taiizor](https://github.com/Taiizor)