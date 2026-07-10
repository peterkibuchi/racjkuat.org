import { type NextConfig } from "next";
import { withContentlayer } from "next-contentlayer2";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
import "./src/env.js";

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cxjgggfg3h.ufs.sh",
        pathname: "/f/*",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/a/cxjgggfg3h/*",
      },
    ],
  },

  /** We already do typechecking as a separate task in CI */
  typescript: { ignoreBuildErrors: true },
};

export default withContentlayer(config);
