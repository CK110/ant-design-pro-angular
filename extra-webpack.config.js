const ThemeColorReplacer = require('webpack-theme-color-replacer');
const generate = require('@ant-design/colors/lib/generate').default;

module.exports = {
  // module: {
  //   rules: [
  //     {
  //       test   : /\.less$/,
  //       loader: 'less-loader',
  //       options: {
  //         modifyVars: { // 修改主题变量
  //           'primary-color': '#1DA57A',
  //         },
  //         javascriptEnabled: true
  //       }
  //     }
  //   ]
  // }
  plugins: [
    new ThemeColorReplacer({
      fileName: 'css/theme-colors-[contenthash:8].css',
      matchColors:  getAntdSerials('#1890ff'), // 主色系列
      // 改变样式选择器，解决样式覆盖问题
      changeSelector (selector) {
        return selector
      }
    })
  ]
};

function getAntdSerials (color) {
  // 淡化（即less的tint）
  console.log(color);
  const lightens = new Array(9).fill().map((t, i) => {
    return ThemeColorReplacer.varyColor.lighten(color, i / 10)
  });
  const colorPalettes = generate(color);
  return lightens.concat(colorPalettes)
}
