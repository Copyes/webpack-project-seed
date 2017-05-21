module.exports = {
  plugins: [
    require("autoprefixer")({
        browsers: ['android >= 4.0','ios_saf >= 7.0'],
        remove: false
    })
  ]
}
