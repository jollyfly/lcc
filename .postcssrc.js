module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,
      viewportHeight: 0,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: false
    },
    "autoprefixer": {}
  }
}
