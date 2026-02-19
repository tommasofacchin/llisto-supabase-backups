import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function exportTableToCsv(table, dir, timestamp) {
  const fileName = `${table}_${timestamp}.csv`;
  const outputPath = path.join(dir, fileName);

  const { data, error } = await supabase
    .from(table)
    .select('*')
    .csv();

  if (error) {
    console.error(`Supabase error on ${table}:`, error.message);
    process.exit(1);
  }

  await fs.writeFile(outputPath, data, 'utf8');
  console.log(`Saved ${table} to ${outputPath}`);
}

async function main() {
  const timestamp = new Date()
  .toISOString()           
  .replace(/:/g, '-')     
  .replace(/\..+/, '');    

  const baseDir = process.argv[2] ?? '.';

  const outputDir = path.join(baseDir, timestamp);
  await fs.mkdir(outputDir, { recursive: true });

  const tables = ['clients', 'categories', 'products', 'logs', 'landings'];

  for (const table of tables) {
    await exportTableToCsv(table, outputDir, timestamp);
  }

  console.log('All tables exported.');
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
