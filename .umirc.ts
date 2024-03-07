import { defineConfig } from "umi";
export default defineConfig({
  plugins: [
    '@umijs/plugins/dist/antd',
    '@umijs/plugins/dist/styled-components',
    '@umijs/plugins/dist/locale'
  ],
  routes: [
    { path: "/", component: "index" },
    { path: "/presale", component: 'pre-sale' },
    { path: "/mynft", component: 'myNft' },
    { path: "/PointsTrading", component: "PointsTrading" },
    { path: "/transactionhistory", component: "PointsTrading/Trading/Transactionhistory" },
    { path: '/memberbenefits', component: "Memberbenefits" },
    { path: '/buysale', component: 'buysale' },
    { path: '/reward', component: 'extremeswap/teams' },
    { path: '/Invitation', component: 'invitation' },
    { path: '/extremeswap', component: 'extremeswap' },
    { path: '/launchpad', component: 'launchpad' },
    { path: '/launchpad/details', component: 'launchpad/details'},
    { path: '/extremeswap/teams', component: 'extremeswap/teams' },
    { path: '/extremeswap/teams/detail', component: 'extremeswap/teams/detail' },
    { path: '/Invite', component: 'extremeswap/teams/invite' },
    { path: "/extremeswap/orders", component: 'extremeswap/orders' },
  ],
  npmClient: 'pnpm',
  title: "N2FT",
  jsMinifierOptions: {
    target: ['chrome80', 'es2020']
  },
  styledComponents: {},
  antd: {},
  clientLoader: {},
  locale: {
    default: 'en-US',
    baseSeparator: '-',
    useLocalStorage: true,
    baseNavigator: false,
  },
  chainWebpack(config: any) {
    config.module
      .rule('ttf')
      .test(/.(woff|eot|woff2|ttf)$/)
      .use('file-loader')
      .loader('file-loader');
  },
  hash:true,
  metas:[
    {
      "http-equiv":'Cache-Control',
      content:'no-cache, no-store, must-revalidate'
    },
    {
      "http-equiv":"Pragma",
      content:'no-cache'
    },
    {
      "http-equiv":"Expires",
      content:"0"
    }
  ],
  headScripts: [
    { src: "https://www.googletagmanager.com/gtag/js?id=G-0V0CNB1MYK"},
    `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments)}
        gtag('js', new Date());
        gtag('config', 'G-0V0CNB1MYK');`
  ],
});
