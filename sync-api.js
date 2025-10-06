import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';

console.log('🔄 Syncing API files...');

const source = 'apis/generalapi.yaml';
const target = 'public/apis/generalapi.yaml';

try {
  // Ensure target directory exists
  const targetDir = dirname(target);
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }

  // Copy the file
  copyFileSync(source, target);
  
  console.log('✅ API file synced successfully!');
  console.log(`   Source: ${source}`);
  console.log(`   Target: ${target}`);
} catch (error) {
  console.error('❌ Error syncing API file:', error.message);
  process.exit(1);
}
