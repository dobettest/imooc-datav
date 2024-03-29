module.exports = {
    envs: (config) => {
        return { ...config,vue:true, less: true, scss: true, typescript: true, analyze: true, aegis: true };
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
    aegisOptions: () => {
        return {
            entry: "./src/main.js",
            id: 'ZEn7bsvP6v1GRLXrEo', // 上报 id
            // uin: 'xxx', // 用户唯一 ID（可选）
            reportApiSpeed: true, // 接口测速
            reportAssetSpeed: true, // 静态资源测速
            spa: true // spa 应用页面跳转的时候开启 pv 计算
        };
    },
    build: (config) => {
        // config.output.publicPath = "https://cdn.dobettest.cn";
        config.optimization.splitChunks.cacheGroups['commonUI'] = {
            test: /([\\/])node_modules([\\/])element-ui([\\/])/,
            priority: -5,
            name: 'elementUI'
        }
        return config;
    }
}