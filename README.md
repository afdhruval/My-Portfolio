# Modern Developer Portfolio Website

A fully responsive, modern portfolio website built with React, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- **Dark Theme** - Professional dark color scheme with purple accents
- **Smooth Animations** - Page transitions powered by Framer Motion
- **Section Navigation** - Fixed sidebar with easy navigation between sections
- **Modern UI** - Clean, minimal design with hover effects and transitions
- **Contact Form** - Functional contact form with validation
- **GitHub Stats** - Contribution heatmap and profile statistics

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **React Router DOM** - Client-side routing
- **Lucide React** - Beautiful icon library

## 📦 Installation

### Prerequisites

- Node.js 16+ and npm/yarn

### Setup

1. Extract the project files
2. Navigate to the project directory:
   ```bash
   cd portfolio-website
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

## 🏗️ Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
portfolio-website/
├── src/
│   ├── components/
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Navbar.jsx
│   │   ├── PageTransition.jsx
│   │   ├── SectionNav.jsx
│   │   └── Sidebar.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Education.jsx
│   │   ├── Experience.jsx
│   │   ├── Introduction.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   └── Stats.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```

## 🎨 Customization

### Colors

Edit the colors in `tailwind.config.js`:

```javascript
colors: {
  dark: '#0f0f0f',
  'dark-secondary': '#1a1a1a',
  'dark-border': '#2a2a2a',
  'gray-soft': '#a1a1a1',
  'gray-light': '#d1d1d1',
  'purple-primary': '#8b5cf6',
}
```

### Content

Update the content in the respective page files in `src/pages/`:
- Personal information in `Introduction.jsx`
- About text in `About.jsx`
- Projects in `Projects.jsx`
- Skills in `Skills.jsx`
- Experience in `Experience.jsx`
- Education in `Education.jsx`

## 📱 Pages

1. **Introduction** - Landing page with name, tagline, and CTA buttons
2. **About Me** - Personal bio and background
3. **Projects** - Portfolio projects in a grid layout
4. **Skills & Tools** - Technical skills with badges
5. **Experience** - Work experience timeline
6. **Education** - Educational background
7. **Contact** - Contact form
8. **Stats** - Portfolio stats and GitHub contribution graph

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Dhruval Dalwadi**

Feel free to customize this portfolio for your own use!
