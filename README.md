# Rebble Appstore

The Rebble Appstore is a community-built replacement for the original Pebble app store, which went offline when Pebble was shut down. It allows Pebble smartwatch users to continue browsing, discovering, and sideloading apps and watchfaces onto their devices via the [Rebble](https://rebble.io) ecosystem.

This repository contains the frontend web application. It talks to the [rebble-appstore-api](https://github.com/pebble-dev/rebble-appstore-api) backend and integrates with [rebble-auth-py](https://github.com/pebble-dev/rebble-auth-py) for authentication.

## Tech stack

- [React Router v7](https://reactrouter.com/) — full-stack React framework with server-side rendering
- [TypeScript](https://www.typescriptlang.org/) — throughout
- [Tailwind CSS](https://tailwindcss.com/) — for styling
- [Vite](https://vitejs.dev/) — bundler and dev server
- [Docker](https://www.docker.com/) — for containerised deployment

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)

### Local development

```bash
# Clone the repository
git clone https://github.com/pebble-dev/rebble-appstore.git
cd rebble-appstore

# Install dependencies
npm install

# Start the development server with hot module replacement
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production build

```bash
npm run build
```

The output will be in the `build/` directory:

```
build/
├── client/    # Static assets
└── server/    # Server-side code
```

### Docker

```bash
# Build the image
docker build -t rebble-appstore .

# Run the container
docker run -p 3000:3000 rebble-appstore
```

The containerised app will be available at `http://localhost:3000`.

## Related repositories

| Repository | Description |
|---|---|
| [rebble-appstore-api](https://github.com/pebble-dev/rebble-appstore-api) | Backend API that serves app and watchface data |
| [rebble-auth-py](https://github.com/pebble-dev/rebble-auth-py) | Authentication service (auth.rebble.io) |
| [rebble-dev-portal](https://github.com/pebble-dev/rebble-dev-portal) | Developer portal for submitting apps to the store |
| [mobile-app](https://github.com/pebble-dev/mobile-app) | Cobble: the Rebble companion app for iOS and Android |

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to get involved. All contributions are welcome — from fixing typos to tackling open issues.

## Community

- Discord: [rebble.io/discord](https://discordapp.com/invite/aRUAYFN)
- Mastodon: [@rebble@mastodon.social](https://mastodon.social/@rebble)
- Bluesky: [@rebble.io](https://bsky.app/profile/rebble.io)
- Website: [rebble.io](https://rebble.io)

---

Built with ❤️ using [React Router](https://reactrouter.com/).