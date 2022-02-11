const withLess = require("next-with-less");
const path = require('path');

module.exports = withLess({
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(svg|png|jpg)/,
            use: [
                options.defaultLoaders.babel,
                { loader: 'url-loader' }
            ],
        });

        const originalEntry = config.entry
        config.entry = async () => {
            const entries = await originalEntry()

            if (
                entries['main.js'] &&
                !entries['main.js'].includes('./polyfills.js')
            ) {
                entries['main.js'].unshift(path.resolve(__dirname, './polyfills.js'))
            }

            return entries
        }

        return config
    },
    images: {
        domains: ['mxbcc.oss-cn-beijing.aliyuncs.com'],
    },
    pageExtensions: ['tsx', 'page.tsx'],
});
