# Multi UI Website

A showcase website for the Multi UI component library. This website allows users to browse, preview, and get installation instructions for UI components stored in a GitHub repository.

## Features

- 🏠 **Landing Page**: A modern homepage introducing the Multi UI component library.
- 📚 **Documentation**: Comprehensive guides on how to install and use the components.
- 🧩 **Component Browser**: Browse all available UI components by category.
- 🔍 **Component Details**: View detailed information, code snippets, and examples for each component.
- 🌓 **Dark Mode Support**: Seamless light and dark theme switching.
- 🛠️ **CLI Integration**: Easy installation instructions using the multi-ui-cli tool.

## Technical Implementation

The website dynamically fetches component data from a GitHub repository, making it easy to showcase a large number of components without storing them directly in the project. Key implementation features include:

- Next.js App Router for efficient page routing and rendering
- GitHub API integration to fetch component files and examples
- Syntax highlighting for code snippets
- Responsive design with Tailwind CSS
- Dark mode support with next-themes
- Integration with multi-ui-cli for easy component installation

## Project Structure

```
multi-ui-website/
├── app/                     # Next.js app directory
│   ├── _components/         # Shared UI components
│   ├── _lib/                # Utility functions (GitHub API, etc.)
│   ├── components/          # Components listing page
│   │   ├── [category]/      # Dynamic category page
│   │   │   └── [component]/ # Dynamic component detail page
│   ├── docs/                # Documentation pages
│   ├── globals.css          # Global styles
│   ├── layout.js            # Root layout with navigation
│   └── page.js              # Homepage
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/multi-ui-website.git
cd multi-ui-website
```

2. Install dependencies:
```bash
npm install
```

3. Configure GitHub repository:
Edit the GitHub repository settings in `app/_lib/github.js` to point to your own UI component repository:

```js
const REPO_OWNER = 'your-github-username'; // Replace with your GitHub username
const REPO_NAME = 'multi-ui'; // Replace with your repository name
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Using Multi UI Components

### CLI Installation (Recommended)

The easiest way to use Multi UI components is through our CLI:

1. Install the CLI tool:
```bash
npm install @omsalunke0852/multi-ui-cli
```

2. Run the setup command to initialize Multi UI in your project:
```bash
npx multi-ui setup
```

3. Add specific components to your project:
```bash
npx multi-ui add ComponentName_1
```

### Manual Installation

You can also install components individually as npm packages:

```bash
npm install @multi-ui/category-component
```

For more information, check the documentation on the website.

## Deployment

The website can be deployed on Vercel, Netlify, or any other platform that supports Next.js applications.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
#   m u l t i - u i - w e b s i t e  
 