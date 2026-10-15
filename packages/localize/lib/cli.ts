/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import * as fs from "fs/promises";
import * as path from "path";
import { readConfigFileAndWriteSchema } from "@lit/localize-tools/lib/config.js";
import { KnownError, unreachable } from "@lit/localize-tools/lib/error.js";
import { LitLocalizer } from "@lit/localize-tools/lib/index.js";
import { RuntimeLitLocalizer as BaseLitLocalizer } from "@lit/localize-tools/lib/modes/runtime.js";
import minimist from "minimist";
import "source-map-support/register.js";
import { fileURLToPath } from "url";

import type { Config } from "@lit/localize-tools/lib/types/config.js";
import { Locale } from "@lit/localize-tools/lib/types/locale";
import type { RuntimeOutputConfig } from "@lit/localize-tools/lib/types/modes.js";

const usage = `
Usage: fw-localize [--config=lit-localize.json] COMMAND

Commands:
  extract     Extract messages from source files

Options:
  --help      Display this help message.
  --config    Path to JSON configuration file.
              Default: ./lit-localize.json
              See https://github.com/lit/lit/tree/main/packages/localize#readme for details.
`;

const commands = ["extract"] as const;
type Command = (typeof commands)[number];
const isCommand = (str: string): str is Command => commands.includes(str as Command);

interface CliOptions {
  config: Config;
  command: Command;
}

export async function runAndExit() {
  const exitCode = await runAndLog(process.argv);
  process.exit(exitCode);
}

export async function runAndLog(argv: string[]): Promise<number> {
  let config;
  try {
    const cliOpts = cliOptsFromArgs(argv);
    config = cliOpts.config;
    await runAndThrow(cliOpts);
  } catch (err) {
    if (err instanceof KnownError) {
      console.error(err.message);
    } else {
      console.error("Unexpected error\n");
      console.error((err as Error).message);
      console.error();
      console.error((err as Error).stack);
    }
    console.log();
    console.log(`Version: ${await version()}`);
    console.log(`Args: ${argv.slice(2).join(" ")}`);
    if (config) {
      console.log(`Config:`, JSON.stringify(config, null, 2));
    }
    console.log();
    return 1;
  }
  return 0;
}

async function version() {
  const packageJsonPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "package.json");
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8")) as { version: number };
  return packageJson.version;
}

async function runAndThrow({ config, command }: CliOptions) {
  const localizer = makeLocalizer(config);

  if (command === "extract") {
    // TODO(aomarks) Don"t even require the user to have configured their output
    // mode if they"re just doing extraction.
    const { messages } = localizer.extractSourceMessages();
    if (!messages.length) return;

    console.log(`Extracted ${messages.length} messages`);
    console.log(`Writing interchange files`);

    await localizer.writeInterchangeFiles();
  } else {
    // Should already have been validated.
    throw new KnownError(`Internal error: unknown command ${unreachable(command)}`);
  }
}

class CustomRuntimeLitLocalizer extends BaseLitLocalizer {
  async writeInterchangeFiles() {
    const { messages } = this.extractSourceMessages();

    const strings = messages
      .map((message) => {
        // Attempt to get the first string content
        const stringContent = message.contents.find((content) => typeof content === "string");
        return stringContent as string | undefined;
      })
      .filter((str): str is string => str !== undefined);

    const locales = this.config.targetLocales;

    locales.unshift("source" as Locale);

    for (const locale of locales) {
      const outputDir = path.join(process.cwd(), "locales");
      await fs.mkdir(outputDir, { recursive: true });
      const outputFile = path.join(outputDir, `${locale}.json`);

      let translations: Record<string, string> = {};

      try {
        const existingContent = await fs.readFile(outputFile, "utf8");
        try {
          translations = JSON.parse(existingContent);
        } catch (_parseError) {
          throw new Error(`Existing locale file ${outputFile} contains invalid JSON`);
        }
      } catch (readError) {
        if ((readError as NodeJS.ErrnoException).code !== "ENOENT") {
          throw readError;
        }
      }

      strings.forEach((str) => {
        if (!(str in translations)) {
          translations[str] = "";
        }
      });

      if (locale === "source") strings.push(...Object.keys(translations).filter((stringKey) => !strings.includes(stringKey)));

      await fs.writeFile(outputFile, JSON.stringify(translations, null, 2), "utf8");
    }
  }
}

function makeLocalizer(config: Config): LitLocalizer {
  switch (config.output.mode) {
    case "runtime":
      return new CustomRuntimeLitLocalizer(config as Config & { output: RuntimeOutputConfig });
    default:
      throw new KnownError(`Internal error: unknown mode ${(unreachable(config.output as never) as Config["output"]).mode}`);
  }
}

function cliOptsFromArgs(argv: string[]): CliOptions {
  const args = minimist(argv.slice(2));
  if (args._.length === 0) {
    throw new KnownError(`Missing command argument. ` + `Valid commands: ${[...commands].join(", ")}`);
  }
  const command = args._[0];
  if (!isCommand(command)) {
    throw new KnownError(`Invalid command ${command}}. ` + `Valid commands: ${[...commands].join(", ")}`);
  }
  if (args._.length > 1) {
    throw new KnownError(`Unknown argument(s): ${args._.slice(1).join(" ")}${usage}`);
  }
  if ("help" in args) {
    throw new KnownError(usage);
  }
  const configPath = args["config"] || "./localize.json";
  const config = readConfigFileAndWriteSchema(configPath);
  return { config, command };
}
