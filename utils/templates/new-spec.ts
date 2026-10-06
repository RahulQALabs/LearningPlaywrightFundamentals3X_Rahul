import fs from "fs";
import path from "path";

const args = process.argv.slice(2);

if (args.length < 2) {
    console.log('Usage: npm run start-pw -- <folder> <specName> "<Test Title>"');
    console.log('Example: npm run start-pw -- 06_Multiple_Element_Filter 04_MultipleElement "Verify multiple elements"');
    process.exit(1);
}

const [folder, specName, ...titleParts] = args;
const title = titleParts.join(" ").trim() || specName;

const templatePath = path.resolve(__dirname, "template.spec.ts");
const template = fs.readFileSync(templatePath, "utf-8");

const fileName = specName.endsWith(".spec.ts") ? specName : `${specName}.spec.ts`;
const outDir = path.resolve(__dirname, "../../tests", folder);
const outPath = path.join(outDir, fileName);

if (fs.existsSync(outPath)) {
    console.error(`File already exists: ${path.relative(process.cwd(), outPath)}`);
    process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, template.replace("{{TITLE}}", title));

console.log(`Created ${path.relative(process.cwd(), outPath)}`);
