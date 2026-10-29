# ☕ Zerno 2 — Interactive Coffee Shop Experience

An interactive coffee shop website built with Astro, React, TypeScript, and Tailwind CSS. Zerno 2 extends the traditional café website concept with cart management, quick-order interactions, and a more dynamic user experience.

The project combines Astro's component-based page architecture with React-powered interactive elements to create a modern digital storefront for a specialty coffee shop.

---

## 📌 Overview

Zerno 2 is a web project focused on making the café browsing and ordering experience more engaging.

Unlike a purely informational landing page, this project includes dedicated components for cart interactions, quick ordering, and order status presentation. Its architecture separates visual sections, interactive components, shared state, and static assets into clearly defined areas.

The result is a foundation for a more interactive coffee shop storefront that can be extended with additional ordering functionality.

## ✨ Key Features

- **Interactive Shopping Cart** — A dedicated cart component and centralized cart store for managing shopping cart state.
- **Quick Order Interface** — A component designed to support a streamlined ordering experience.
- **Menu Components** — Structured menu sections for presenting food and beverage offerings.
- **Atmosphere Gallery** — A dedicated section showcasing the café's atmosphere through photography.
- **Order Status UI** — A reusable badge component for displaying order-related statuses.
- **Component-Based Architecture** — Separate components for navigation, menu, location, atmosphere, and other interface sections.
- **Astro and React Integration** — Astro components for page composition and React components for interactive functionality.
- **TypeScript Support** — Typed development for improved maintainability.
- **Tailwind CSS** — Utility-first styling for consistent interface development.
- **Static Asset Organization** — Dedicated directories for café photography and menu images.

## 🧰 Tech Stack

| Technology | Role |
| --- | --- |
| [Astro](https://astro.build/) | Page rendering and application structure |
| [React](https://react.dev/) | Interactive UI components |
| [TypeScript](https://www.typescriptlang.org/) | Type safety and maintainable code |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Vercel](https://vercel.com/) | Deployment platform, if configured for this repository |
| npm | Dependency management |

## 🗂️ Project Structure

```text
zerno-2/
├── public/
│   ├── atmosphere/
│   │   ├── barista-bar.jpg
│   │   ├── colombia.jpg
│   │   ├── cozy-corner.jpg
│   │   ├── ethiopia.jpg
│   │   ├── terrace.jpg
│   │   └── workspace.jpg
│   ├── menu/
│   │   └── ...
│   ├── coffee.jpeg
│   ├── favicon.svg
│   └── robots.txt
│
├── src/
│   ├── components/
│   │   ├── Atmosphere.astro
│   │   ├── CartButton.tsx
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── Location.astro
│   │   ├── Menu.astro
│   │   ├── MenuSection.tsx
│   │   ├── Nav.astro
│   │   ├── QuickOrder.tsx
│   │   └── StatusBadge.tsx
│   │
│   ├── layouts/
│   │   └── Layout.astro
│   │
│   ├── pages/
│   │   └── index.astro
│   │
│   ├── stores/
│   │   └── cart.ts
│   │
│   ├── styles/
│   │   └── global.css
│   │
│   └── env.d.ts
│
├── .gitignore
├── astro.config.mjs
├── package-lock.json
├── package.json
├── tailwind.config.mjs
└── tsconfig.json
```

### Directory Responsibilities

| Path | Description |
| --- | --- |
| `public/` | Static assets served directly by the website. |
| `public/atmosphere/` | Photographs representing the café's atmosphere, spaces, and coffee origins. |
| `public/menu/` | Directory for menu-related visual assets. |
| `src/components/` | Reusable Astro and React components. |
| `src/layouts/` | Shared page layouts and document structure. |
| `src/pages/` | Route definitions and page entry points. |
| `src/stores/` | Shared application state, including cart state. |
| `src/styles/` | Global styles and shared CSS rules. |

### Component Overview

| File | Responsibility |
| --- | --- |
| `Atmosphere.astro` | Presents the café's atmosphere and visual identity. |
| `CartButton.tsx` | Provides a cart-related interactive button. |
| `Footer.astro` | Renders the website footer. |
| `Hero.astro` | Introduces the café through the main landing-page section. |
| `Location.astro` | Displays location-related information. |
| `Menu.astro` | Organizes the café's menu section. |
| `MenuSection.tsx` | Renders a reusable menu section using React. |
| `Nav.astro` | Provides navigation between website sections. |
| `QuickOrder.tsx` | Provides the interface for quick-order interactions. |
| `StatusBadge.tsx` | Displays status information through a reusable badge. |
| `Layout.astro` | Defines the shared page layout and document structure. |
| `index.astro` | Main homepage that brings the website components together. |

### Application State

The `src/stores/cart.ts` file is dedicated to cart-related state management.

Keeping this logic separate from presentation components helps organize the code and provides a central place for cart operations.

The React components responsible for cart interactions can use this state layer to keep the interface consistent as items are added, updated, or removed, depending on the implemented store API.

### Static Assets

The project organizes its visual resources by purpose:

- **Atmosphere photography** — Images for the café environment and coffee-related storytelling.
- **Menu assets** — A dedicated location for menu images and supporting visual resources.
- **Coffee imagery** — General coffee photography used throughout the website.
- **Favicon** — The browser tab icon.
- **Robots file** — Instructions for search engine crawlers.

## 🏛️ Architecture

Zerno 2 uses a component-based architecture that separates the website's presentation from its interactive functionality.

### Astro Components

Astro components handle the main website sections, shared layout, and page composition. They provide a clear structure for building the café's landing page.

### React Components

React components handle interface elements that may require client-side interaction, such as the cart button, quick-order interface, menu sections, and status badges.

### Shared State

The dedicated cart store separates cart-related logic from individual UI components. This makes the state-management approach easier to maintain as the ordering interface grows.

### Styling

Global CSS and Tailwind CSS support shared design rules and component styling.

This separation creates a foundation for adding new interactive features without putting all application logic into a single page or component.

## ⚙️ Getting Started

### Prerequisites

Install the following tools before running the project:

- [Node.js](https://nodejs.org/)
- npm
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/andriydrob/zerno-2.git
cd zerno-2
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Open the local development URL displayed in your terminal.

### 4. Build for Production

```bash
npm run build
```

### 5. Preview the Production Build

```bash
npm run preview
```

> These commands assume the corresponding scripts are defined in `package.json`. Check the scripts section if any command is unavailable.

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm install` | Installs project dependencies. |
| `npm run dev` | Starts the development server. |
| `npm run build` | Builds the application for production. |
| `npm run preview` | Previews the production build locally. |

## 🚀 Deployment

The project can be deployed to a platform that supports Astro applications, such as [Vercel](https://vercel.com/).

General deployment workflow:

1. Import the repository into your hosting platform.
2. Configure the project root directory.
3. Install dependencies using the selected package manager.
4. Run the production build.
5. Configure the generated output and deployment settings according to the Astro setup.

For Vercel, review the repository's actual configuration and root directory before deploying.

## 🔧 Potential Improvements

The existing component structure provides room for future development, including:

- Persistent cart contents across page reloads.
- Product quantity controls and cart summaries.
- Form validation for quick-order workflows.
- Order confirmation and more detailed order statuses.
- Backend integration for submitting and tracking orders.
- Online payment integration.
- Automated component and application tests.
- Improved keyboard navigation and accessibility.
- Search engine metadata and social sharing previews.
- Performance optimization for menu and atmosphere images.

These are potential extensions, not claims that all such functionality is currently implemented.

## 🤝 Contributing

Suggestions and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Commit your work with a descriptive message.
5. Push your branch and open a pull request.

## 📄 License

No license information is documented here. Unless a license is added to the repository, do not assume that the source code is available for unrestricted reuse or redistribution.

---

<p align="center">
  <strong>Zerno 2</strong>
  <br />
  An interactive digital experience for coffee lovers. ☕
</p>
