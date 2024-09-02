import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

//
// const fs = require('fs');
// const path = require('path');
// const dir = "src/environments";
// const file = "environment.development.ts";
// const prodFile = "environment.ts"; // For production deployment
// const content = process.env['FIREBASE_DETAILS'];
//
// fs.access(dir, fs.constants.F_OK, (err: any) => {
//   if (err) {
//     // Directory doesn't exist
//     console.log("src doesn't exist, creating now", process.cwd());
//     // Create /src
//     try {
//       fs.mkdirSync(dir, { recursive: true });
//     }
//     catch (error) {
//       console.log(`Error while creating ${dir}. Error is ${error}`);
//       process.exit(1);
//     }
//   }
//   // Now write to file
//   try {
//     fs.writeFileSync(dir + "/" + file, content);
//     fs.writeFileSync(dir + "/" + prodFile, content);
//     console.log("Created successfully in", process.cwd());
//     if (fs.existsSync(dir + "/" + file)) {
//       console.log("File is created", path.resolve(dir + "/" + file));
//       const str = fs.readFileSync(dir + "/" + file).toString();
//       console.log(str);
//     }
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// });


// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
