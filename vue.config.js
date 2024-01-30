const { defineConfig } = require('@vue/cli-service')
const {join} = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
  //   proxy: 'http://localhost:3000'
    port: 8081
  },
  chainWebpack(config){
    // const svgRule = config.module.rule('svg')
    // svgRule.uses.clear()
    // svgRule.test(/\.svg$/)
    //     .use('svg-sprite-loader')
    //     .loader('svg-sprite-loader')
    //     .options({
    //       symbolId: 'icon-[name]'
    //     })
    config.module
        .rule('svg')
        .exclude.add(resolve('src/assets/icons'))
        .end()
    config.module
        .rule('icons')
        .test(/\.svg/)
        .include.add(resolve('src/assets/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()
  }
})

const resolve = (dir)=>{
  return join(__dirname,'./',dir)
}
