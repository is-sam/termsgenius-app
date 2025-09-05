# TermsGenius App

TermsGenius lets you import website terms and conditions, organise them into projects and ask an AI precise questions without reading the whole document.

## Technology stack

- **Angular 18** with **PrimeNG** for the user interface.
- TypeScript and RxJS.
- Communicates with a REST API configured in the `src/environments/` files.
- Development environment uses Node.js 20 and the Angular CLI.

## Local development

1. Install Node.js 20 and npm.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:4200](http://localhost:4200) in your browser.

## Docker

A Docker configuration is provided for a containerised setup:

```bash
docker compose up
```

The application will be available at `http://localhost:4200`.

## Configuration

The API endpoint and other environment settings can be adjusted in the files under `src/environments/`.
