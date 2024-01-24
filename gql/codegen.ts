import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/graphql/**/**.ts",
  generates: {
    "generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        scalars: {
          ID: {
            input: "string",
            output: "string | number",
          },
        },
        contextType: "../src/index.js#Context",
      },
    },
  },
};

export default config;
