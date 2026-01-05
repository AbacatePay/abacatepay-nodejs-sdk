import { write } from "bun";

const pkg = await import("../package.json");

const content = `/* This file is auto generated during build, DO NOT CHANGE OR MODIFY */

export const ABACATE_PAY_VERSION = ${JSON.stringify(pkg.default.version)};
`;

await write("src/version.ts", content);
