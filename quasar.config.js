/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js


const { configure } = require('quasar/wrappers');

const path = require("path");

// const CopyWebpackPlugin = require('copy-webpack-plugin')


// this is at the top of the file
const SitemapPlugin = require('sitemap-webpack-plugin').default
const paths = [
  { path: '/' , priority: 0.9, lastmod: '2023-01-28'},
  { path: '/product/sale', priority: 0.85, lastmod: '2023-01-28' },
  { path: '/product/category/hairDye', priority: 0.84, lastmod: '2023-01-28' },
  { path: '/product/category/hairCosmetic', priority: 0.82, lastmod: '2023-01-28' },
  { path: '/product/category/skin', priority: 0.81, lastmod: '2023-01-28' },
  { path: '/product/category/hairDevice', priority: 0.79, lastmod: '2023-01-28' },
  { path: '/product/category/manCosmetic', priority: 0.78, lastmod: '2023-01-28' },
  { path: '/product/category/beautyEquipment', priority: 0.76, lastmod: '2023-01-28' },
  { path: '/product/category/essentialOil', priority: 0.75, lastmod: '2023-01-28' },
  { path: '/product/category/korean', priority: 0.74, lastmod: '2023-01-28' },
  { path: '/product/category/england' , priority: 0.72, lastmod: '2023-01-28'},
  { path: '/product/category/australia' , priority: 0.71, lastmod: '2023-01-28'},
  { path: '/product/category/france' , priority: 0.7, lastmod: '2023-01-28'},
  { path: '/product/category/italy' , priority: 0.69, lastmod: '2023-01-28'},
  { path: '/product/category/japan', priority: 0.68, lastmod: '2023-01-28' },
  { path: '/product/category/america' , priority: 0.67, lastmod: '2023-01-28'},
  { path: '/loginPage' , priority: 0.66, lastmod: '2023-01-28'},
  // add all pages here
]
// down on the "build" section

module.exports = configure(function (ctx) {
  return {


    // https://v2.quasar.dev/quasar-cli-webpack/supporting-ts
    supportTS: false,

    // https://v2.quasar.dev/quasar-cli-webpack/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-webpack/boot-files
    boot: [

      'axios',
    ],

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-css
    css: [
      'app.scss'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-build
    build: {
      vueRouterMode: 'history', // available values: 'hash', 'history'

      chainWebpack (chain) {
        chain.plugin('html').tap(args => {
          args[0].meta = {
            canonical: 'https://zatakub.com/'
          }
          return args
        })
      },
      extendWebpack(cfg, { isServer, isClient }) {
        // cfg.module.rules.push({
        //   enforce: "pre",
        //   test: /\.(js|vue)$/,
        //   exclude: /(node_modules|quasar)/
        // });

        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing alias
          // Add your own alias like this
          utils: path.resolve(__dirname, "./src/utils"),
        };

        cfg.plugins.push(
          new SitemapPlugin({
            base: 'https://zatakub.com',
            paths,
            options: {
              filename: 'sitemap.xml',
              lastmod: true,
              changefreq: 'weekly',
            }
          })
        );



        // cfg.plugins.push(
        //   new CopyWebpackPlugin([{ context: `${__dirname}/src/assets`, from: `*.*` }])
        //   )
      },





      // vueRouterMode: 'hash', // available values: 'hash', 'history'

      // transpile: false,
      // publicPath: '/',

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      // rtl: true, // https://quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://v2.quasar.dev/quasar-cli-webpack/handling-webpack
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain

      chainWebpack(/* chain */) { },






    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-devServer
    devServer: {
      server: {
        type: 'http'
      },
      port: 9898,
      open: true // opens browser window automatically
    },



    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-framework
    framework: {
      config: { notify: { /* look at QuasarConfOptions from the API card */ } },

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: ['Dialog', 'Notify','Meta']
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://v2.quasar.dev/quasar-cli-webpack/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      maxAge: 1000 * 60 * 60 * 24 * 30,
      // Tell browser when a file from the server should expire from cache (in ms)


      chainWebpackWebserver(/* chain */) { },


      middlewares: [
        ctx.prod ? 'compression' : '',
        'render' // keep this as last one
      ]
    },

    // https://v2.quasar.dev/quasar-cli-webpack/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW

      // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
      // if using workbox in InjectManifest mode

      chainWebpackCustomSW(/* chain */) { },


      manifest: {
        name: `invollerbluete App`,
        short_name: `invollerbluete App`,
        description: `a website for flower shop`,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'invollerbluete.de'
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain

      chainWebpackMain(/* chain */) { },



      chainWebpackPreload(/* chain */) { },

    }
  }
});
