const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
    // 针对 antd 实现按需打包（根据import打包）
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1DA57A'},
    }),
);