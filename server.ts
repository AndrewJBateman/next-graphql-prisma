// tslint:disable: no-string-literal
import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

// SSR DOM
const domino = require('domino');
const fs = require('fs');
const path = require('path');
// index from browser build
const template = fs
  .readFileSync(path.join('.', 'dist', 'app', 'browser', 'index.html'))
  .toString();
// for mock global window by domino
const win = domino.createWindow(template);
// (win as any).Object = Object;
// (win as any).Math = Math;
global['window'] = win;
global['self'] = win.self;
global['win'] = win;
global['branch'] = null;
global['IDBIndex'] = win.IDBIndex;
global['document'] = win.document;
global['navigator'] = win.navigator;

// FIX FOR WIN.MATCHMEDIA.
// win.matchMedia = (query) => ({
//   matches: query.indexOf('(min-width: 1025px)') !== -1,
// });

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import compression from 'compression';
import cookieParser from 'cookie-parser';

export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/app/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';
  // redirects!
  const redirectowww = false;
  const redirectohttps = false;
  const wwwredirecto = true;
  server.use((req, res, next) => {
    // for domain/index.html
    if (req.url === '/index.html') {
      res.redirect(301, 'https://' + req.hostname);
    }

    // check if it is a secure (https) request
    // if not redirect to the equivalent https url
    if (
      redirectohttps &&
      req.headers['x-forwarded-proto'] !== 'https' &&
      req.hostname !== 'localhost'
    ) {
      // special for robots.txt
      if (req.url === '/robots.txt') {
        next();
        return;
      }
      res.redirect(301, 'https://' + req.hostname + req.url);
    }

    // www or not
    if (redirectowww && !req.hostname.startsWith('www.')) {
      res.redirect(301, 'https://www.' + req.hostname + req.url);
    }

    // www or not
    if (wwwredirecto && req.hostname.startsWith('www.')) {
      const host = req.hostname.slice(4, req.hostname.length);
      res.redirect(301, 'https://' + host + req.url);
    }

    next();
  });

  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  // gzip
  server.use(compression());
  // cookies
  server.use(cookieParser());
  server.listen(port, () => {
    console.log(
      `Your Node Express server is listening on http://localhost:${port}`
    );
  });
}

declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
