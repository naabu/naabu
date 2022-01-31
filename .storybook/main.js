const path = require('path');

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-svelte-csf',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss')
        }
      }
    }
  ],
  staticDirs: ['../static', '../public', '../src/lib/Internals/Button/'],
  framework: '@storybook/svelte',
  svelteOptions: {
    preprocess: import('../svelte.config.js').preprocess,
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: [/\.stories\.js$/, /index\.js$/],
      use: [require.resolve('@storybook/source-loader')],
      include: [path.resolve(__dirname, '../src')],
      enforce: 'pre'
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      $lib: path.resolve(__dirname, '../src/lib'),
      $app: path.resolve(__dirname, '../.storybook/app/')
    };
    return config;
  },
  core: {
    builder: 'webpack4'
  }
}
