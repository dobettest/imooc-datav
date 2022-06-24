module.exports = {
    envs: (config) => {
        config.less = true;
        config.scss = true;
        config.typescript = false;
        config.analyze = false;
        config.publicPath = "https://cdn.dobettest.cn";
        return config;
    },
    entry: (config) => {
        config.app = ["./src/main.js"];
        return config;
    },
    htmlPlugin: (config) => {
        config.title = 'IMOOC-DATAV'
        return config;
    },
    babel: (config) => {
        config.plugins.push([
            'component',
            {
                libraryName: 'element-ui',
                styleLibraryName: 'theme-chalk'
            }
        ])
        return config;
    },
    build: (config) => {
        config.optimization.splitChunks.cacheGroups['commonUI'] = {
            test: /([\\/])node_modules([\\/])element-ui([\\/])/,
            priority: -5,
            name: 'elementUI'
        }
        return config;
    }
}