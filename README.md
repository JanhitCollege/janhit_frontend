# Janhit Education Group Frontend Monorepo

This repository is a production-ready monorepo using npm workspaces containing the independent frontend applications of Janhit Education Group.

## Repository Structure

```
janhitfrontend/
├── .github/
│   └── workflows/                # CI/CD Workflows
│       ├── advertisement.yml
│       ├── jwsgn.yml
│       └── main.yml
├── janhitcampus/                 # Campus Specific Apps
│   ├── janhit_advertisement/     # Lead Generation & Advertisement
│   ├── janhit_world_school_gn/   # Janhit World School Greater Noida
│   └── janhitcollege_law/        # Janhit College of Law
└── janhitmaingroup/              # Group Main Apps
    └── janhit_group_main/        # Janhit Group Main Portal
```

Each app is standardized and follows the same architecture.

## Setup and Commands

Run these commands from the root directory:

### Installation
Install dependencies for all workspaces:
```bash
npm install
```

### Development
Start the development server for a specific project:
- **Janhit Advertisement**: `npm run dev:advertisement`
- **Janhit World School GN**: `npm run dev:jwsgn`
- **Janhit College of Law**: `npm run dev:law`
- **Janhit Group Main**: `npm run dev:main`

### Production Build
Build a specific project:
- **Janhit Advertisement**: `npm run build:advertisement`
- **Janhit World School GN**: `npm run build:jwsgn`
- **Janhit College of Law**: `npm run build:law`
- **Janhit Group Main**: `npm run build:main`

Or build all projects:
```bash
npm run build:all
```

### Linting and Formatting
Lint all projects:
```bash
npm run lint:all
```

Format code in all projects:
```bash
npm run format:all
```
