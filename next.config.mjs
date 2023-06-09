/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
import NextBundlerAnalyzer from '@next/bundle-analyzer';
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  eslint: {
    ignoreDuringBuilds: true,
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: [
      "1000logos.net",
      "scontent-ord5-2.cdninstagram.com",
      "upload.wikimedia.org",
      "thumbs.dreamstime.com",
      "iaxaqvbtgrqwuxijlvfy.supabase.co",
    ],
  },
};

const withBundleAnalyzer = NextBundlerAnalyzer();

export default config;
