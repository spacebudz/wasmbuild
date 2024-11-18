import { path } from "../lib/deps.ts";

const rootFolder = path.dirname(
  path.dirname(path.fromFileUrl(import.meta.url)),
);

Deno.test("should create a new wasmbuild project, build it, and run it", async () => {
  const tempDir = await Deno.makeTempDir();
  try {
    console.log(tempDir);
    await Deno.writeTextFile(
      path.join(tempDir, "deno.json"),
      `{ "tasks": { "wasmbuild": "${
        Deno.execPath().replace(/\\/g, "\\\\")
      } run -A ${
        path.join(rootFolder, "main.ts").replace(/\\/g, "\\\\")
      }" }}\n`,
    );
    await runCommand("deno", "task", "wasmbuild", "new");
    await runCommand("deno", "task", "wasmbuild");
    await Deno.writeTextFile(
      path.join(tempDir, "test.ts"),
      `
import { instantiate } from "./lib/rs_lib.generated.js";

Deno.test("should add values", async () => {
  const { add } = await instantiate();
  const result = add(1, 2);
  if (result !== 3) {
    throw new Error("Did not match");
  }
});
`,
    );
    await runCommand("deno", "test", "-A");
    await runCommand("cargo", "test");
  } finally {
    await Deno.remove(tempDir, { recursive: true });
  }

  async function runCommand(...args: string[]) {
    const command = new Deno.Command(args[0], {
      args: args.slice(1), // Pass additional arguments
      cwd: tempDir, // Set the current working directory
    });

    const process = command.spawn();
    const status = await process.status; // Wait for the process to finish

    if (!status.success) {
      throw new Error("FAILED");
    }
  }
});
