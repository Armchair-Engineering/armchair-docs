import withMarkdoc from '@markdoc/next.js';
import withSearch from './src/markdoc/search.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  pageExtensions: ['js', 'jsx', 'md', 'ts', 'tsx'],
  assetPrefix: '/',
  // assetPrefix: 'https://docs.armchairheavyindustries.com',
};

export default withSearch(
  withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig),
);
