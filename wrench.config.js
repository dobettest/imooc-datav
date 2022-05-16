module.exports = {
    type: "vue2",
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
    }
}