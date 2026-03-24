import { transform } from '@svgr/core';
import fs from 'node:fs';
import path from 'node:path';

// Helper to convert kebab-case to PascalCase (e.g., "st-gallen" -> "StGallen")
const toPascalCase = (str) =>
  str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');

const coreDir = path.resolve('../core/svgs');
const outDir = path.resolve('./src');

// Ensure output directories exist
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// We'll keep an array of all generated component names to build our index.ts file
const exports = [];

async function processDirectory(subDir) {
  const dirPath = path.join(coreDir, subDir);
  if (!fs.existsSync(dirPath)) return;

  const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.svg'));

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const svgCode = fs.readFileSync(filePath, 'utf8');
    
      // Create a clean, uppercase component name (e.g., 'zh' -> 'ZH')
    const baseName = file.replace('.svg', '');
    const componentName = baseName.toUpperCase(); // <-- THIS IS THE ONLY CHANGE

    // Transform SVG to React component
    const reactCode = await transform(
      svgCode,{
        // 1. Tell SVGR to use the plugins we just installed!
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        icon: true, 
        typescript: true,
        exportType: 'default',
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  // 2. Force SVGO to map .cls-1 classes to inline fill="" attributes
                  inlineStyles: {
                    onlyMatchedOnce: false, 
                  },
                },
              },
            },
          ],
        },
      },
      { componentName }
    );
    // Write the component to the src folder
    fs.writeFileSync(path.join(outDir, `${componentName}.tsx`), reactCode);
    exports.push(`export { default as ${componentName} } from './${componentName}';`);
    
    console.log(`✅ Generated <${componentName} />`);
  }
}

async function build() {
  console.log('Generating React components...');
  await processDirectory('cantons');
  await processDirectory('country');

  // Create the main index.ts file that exports all icons
  fs.writeFileSync(path.join(outDir, 'index.ts'), exports.join('\n'));
  console.log('✨ All icons generated successfully!');
}

build();
