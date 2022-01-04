module.exports = {
    publicPath: '/',
    css: {
      loaderOptions: {
        sass: {
          additionalData: '@import "@/assets/styles/base.scss";'
        }
      }
    },
    chainWebpack: config => {
      config
          .plugin('html')
          .tap(args => {
              args[0].title = "EVENT XYX - Your go-to ticketing platform";
              return args;
          })
    }
  }