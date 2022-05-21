const path = require("path");
const { program } = require("commander");
const { generate } = require("@graphql-codegen/cli");
const packageJson = require("../package.json");

program
  .name("github-graphql-schema")
  .description("utilities to generate types based on GitHub's graphql schema");

program
  .command("operations")
  .description("generate types based on your operations")
  .requiredOption("-i, --input <path>", "path to your operations files")
  .option(
    "-e, --extension <extension>",
    "type file's extension",
    ".generated.ts"
  )
  .action((options) => {
    return generate({
      schema: path.join(__dirname, "..", "schema.graphql"),
      documents: options.input,
      generates: {
        // the output path doesn't matter here since we are using near-operation-file
        ["./"]: {
          preset: "near-operation-file",
          presetConfig: {
            extension: options.extension,
            baseTypesPath: "~github-graphql-schema",
          },
          plugins: ["typescript-operations"],
          config: packageJson.codegen.generates["schema.d.ts"].config,
        },
      },
    });
  })
  .showHelpAfterError();

program
  .addHelpText(
    "afterAll",
    [
      "",
      "Example:",
      "  $ github-graphql-schema operations -i './src/**/*.ts'",
    ].join("\n")
  )
  .parse();
