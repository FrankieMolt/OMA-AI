#!/usr/bin/env node
/**
 * Single Site Audit Runner
 * Usage: node audit-site.js <site-name>
 * Example: node audit-site.js oma-ai
 */

const { runAudit, SITES } = require('./audit-all');

const siteKey = process.argv[2];

if (!siteKey) {
  console.error('Usage: node audit-site.js <site-name>');
  console.error('\nAvailable sites:');
  Object.keys(SITES).forEach(key => {
    console.error(`  - ${key}: ${SITES[key].name} (${SITES[key].url})`);
  });
  process.exit(1);
}

if (!SITES[siteKey]) {
  console.error(`Unknown site: ${siteKey}`);
  console.error('\nAvailable sites:');
  Object.keys(SITES).forEach(key => {
    console.error(`  - ${key}: ${SITES[key].name}`);
  });
  process.exit(1);
}

console.log(`🔍 Auditing ${SITES[siteKey].name}...\n`);

runAudit(siteKey)
  .then(results => {
    console.log('\n✅ Audit complete!');
    console.log(`Site: ${results.site}`);
    console.log(`Performance: ${results.tests.performance?.score || 'N/A'}/100`);
    console.log(`Accessibility: ${results.tests.accessibility?.violations || 0} violations`);
    console.log(`SEO: ${results.tests.seo?.score || 'N/A'}/100`);
    console.log(`Screenshots: ${results.tests.visual?.screenshots || 0} captured`);
  })
  .catch(error => {
    console.error('❌ Audit failed:', error.message);
    process.exit(1);
  });
