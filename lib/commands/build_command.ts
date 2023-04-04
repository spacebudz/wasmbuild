// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

import { BuildCommand } from "../args.ts";
import { colors, emptyDir, esbuild, path } from "../deps.ts";
import { runPreBuild } from "../pre_build.ts";

export async function runBuildCommand(args: BuildCommand) {
  const output = await runPreBuild(args);

  await writeSnippets();

  console.log(`  write ${colors.yellow(output.bindingJsPath)}`);
  await Deno.writeTextFile(output.bindingJsPath, output.bindingJsText);
  if (!args.isSync) {
    await Deno.mkdir(path.join(args.outDir, "nodejs"), { recursive: true });
    console.log(`  write ${colors.yellow(output.nodejs.bindingJsPath)}`);
    await Deno.writeTextFile(
      output.nodejs.bindingJsPath,
      output.nodejs.bindingJsText,
    );
  }
  if (args.isMinify) {
    console.log(`  minify ${colors.yellow(output.bindingJsPath)}`);
    await minify();
  }

  console.log(
    `${colors.bold(colors.green("Finished"))} WebAssembly output`,
  );

  async function writeSnippets() {
    const localModules = Object.entries(output.bindgen.localModules);
    const snippets = Object.entries(output.bindgen.snippets);

    if (localModules.length === 0 && !snippets.some((s) => s[1].length > 0)) {
      return; // don't create the snippets directory
    }

    const snippetsDest = path.join(args.outDir, "snippets");
    // start with a fresh directory in order to clear out any previously
    // created snippets which might have a different name
    await emptyDir(snippetsDest);

    for (const [name, text] of localModules) {
      const filePath = path.join(snippetsDest, name);
      const dirPath = path.dirname(filePath);
      await Deno.mkdir(dirPath, { recursive: true });
      await Deno.writeTextFile(filePath, text);
    }

    for (const [identifier, list] of snippets) {
      if (list.length === 0) {
        continue;
      }
      const dirPath = path.join(snippetsDest, identifier);
      await Deno.mkdir(dirPath, { recursive: true });
      for (const [i, text] of list.entries()) {
        const name = `inline${i}.js`;
        const filePath = path.join(dirPath, name);
        await Deno.writeTextFile(filePath, text);
      }
    }
  }

  async function minify() {
    await esbuild.build({
      entryPoints: [output.bindingJsPath],
      outfile: output.bindingJsPath,
      minify: true,
      allowOverwrite: true,
    });
    esbuild.stop();
  }
}
