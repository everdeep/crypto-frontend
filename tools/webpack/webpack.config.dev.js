module.exports = {
    mode: 'development',
    entry: ['./src/main.tsx'],
    module: {
        rules: require('./webpack.rules'),
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },
    plugins: require('./webpack.plugins'),
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
        alias: require('./webpack.aliases'),
    },
    stats: 'errors-warnings',
    devtool: 'cheap-module-source-map',
    devServer: {
        open: true,
        historyApiFallback: true,
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                secure: false,
                changeOrigin: true
            }
        },
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    performance: {
        hints: false,
    },
};
