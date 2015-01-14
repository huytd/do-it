# Overview

**do-it** is a simple and awesome ToDo application created with AngularJS and Bootstrap.
Use `ngStorage` for saving data localy in browser.

**Demo:** http://codedaily.vn/todo

![](http://i.imgur.com/UEjlpMr.png)

# Development Environment

**This is optional! You can run `index.html` directly in browser. I use `gulp` only for auto refresh browser when coding**

Requirements:
- Node.js
- Gulp
- Browser-sync

First, you need to install `gulp`, you also need to install `gulp` in your local folder
```
$ npm install gulp -g
$ npm install gulp --save-dev
```

Then, install `browser-sync` package for live reloading.

```
$ npm install browser-sync --save-dev
```

To run live-reload server, run this command:
```
$ gulp serve
```

The browser will run on the default address: `http://localhost:3000`. Everytime you modify any `js`, `css` or `html` file, it will automatically refresh the page.

# Deploy to your host
You can deploy easily by upload all files and folders to your host.

`node_modules` folder are for development only, you can remove it when deploying.
