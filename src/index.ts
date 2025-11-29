import fs from "node:fs";
import nodePath from "node:path";

const from_file = nodePath.resolve(process.cwd(), "./package.json");
const target_file = nodePath.resolve(process.cwd(), "./src/a.json");

const w_s = fs.createReadStream(from_file, "utf-8");
const r_s = fs.createWriteStream(target_file);

w_s.pipe(r_s);
