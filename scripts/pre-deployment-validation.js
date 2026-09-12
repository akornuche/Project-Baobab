#!/usr/bin/env node

/**
 * Pre-Deployment Validation Script
 * Validates that all systems are ready before production deployment
 * Run this script the day before deployment to catch any issues
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

const checks = {
  passed: 0,
  failed: 0,
  warnings: 0,
};

function log(message, type = 'info') {
  const prefix = {
    success: `${colors.green}✅${colors.reset}`,
    error: `${colors.red}❌${colors.reset}`,
    warning: `${colors.yellow}⚠️${colors.reset}`,
    info: `${colors.blue}ℹ️${colors.reset}`,
  };
  console.log(`${prefix[type]} ${message}`);
}

function section(title) {
  console.log(`\n${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.blue}${title}${colors.reset}`);
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
}

function checkExists(filePath, description) {
  if (fs.existsSync(filePath)) {
    log(`${description} exists`, 'success');
    checks.passed++;
    return true;
  } else {
    log(`${description} NOT FOUND: ${filePath}`, 'error');
    checks.failed++;
    return false;
  }
}

function checkCommand(command, description) {
  try {
    execSync(command, { stdio: 'pipe' });
    log(`${description} is working`, 'success');
    checks.passed++;
    return true;
  } catch (error) {
    log(`${description} FAILED: ${error.message.split('\n')[0]}`, 'error');
    checks.failed++;
    return false;
  }
}

function checkEnvVar(varName, description) {
  if (process.env[varName]) {
    log(`${description} is set`, 'success');
    checks.passed++;
    return true;
  } else {
    log(`${description} NOT SET: ${varName}`, 'warning');
    checks.warnings++;
    return false;
  }
}

console.log(`
${colors.blue}╔════════════════════════════════════════════════════════╗${colors.reset}
${colors.blue}║     PROJECT BAOBAB - PRE-DEPLOYMENT VALIDATION         ║${colors.reset}
${colors.blue}║           ${new Date().toLocaleDateString()}  ${new Date().toLocaleTimeString()}             ║${colors.reset}
${colors.blue}╚════════════════════════════════════════════════════════╝${colors.reset}
`);

// ============================================================================
section('1. CODE & GIT');
// ============================================================================

checkExists('package.json', 'package.json');
checkExists('next.config.js', 'next.config.js');
checkExists('.gitignore', '.gitignore');

// Check git status
try {
  const status = execSync('git status --porcelain', { encoding: 'utf-8' });
  if (status.trim() === '') {
    log('All files committed to git', 'success');
    checks.passed++;
  } else {
    log(`Uncommitted changes detected:\n${status}`, 'warning');
    checks.warnings++;
  }
} catch (error) {
  log('Git status check failed', 'error');
  checks.failed++;
}

// ============================================================================
section('2. DATABASE & PRISMA');
// ============================================================================

checkExists('prisma/schema.prisma', 'Prisma schema');
checkExists('prisma/seed.js', 'Prisma seed file');

// Check migrations exist
const migrationsPath = 'prisma/migrations';
if (fs.existsSync(migrationsPath)) {
  const migrations = fs.readdirSync(migrationsPath);
  log(`Found ${migrations.length} database migrations`, 'success');
  checks.passed++;
} else {
  log('Migrations directory not found', 'error');
  checks.failed++;
}

// ============================================================================
section('3. BUILD & TESTS');
// ============================================================================

log('Running build check (this may take a minute)...', 'info');
checkCommand('npm run build', 'Next.js build');

log('Running linter check...', 'info');
checkCommand('npm run lint', 'Linter');

// ============================================================================
section('4. ENVIRONMENT FILES');
// ============================================================================

checkExists('.env.example', '.env.example template');
checkExists('.env.local', '.env.local (dev)');

// Check if .env.production exists (should not be committed)
if (fs.existsSync('.env.production')) {
  log('.env.production should not be committed (use .env.example instead)', 'warning');
  checks.warnings++;
}

// ============================================================================
section('5. DEPLOYMENT GUIDES');
// ============================================================================

const guides = [
  { file: 'PRODUCTION_DEPLOYMENT_SUMMARY.md', name: 'Deployment Summary' },
  { file: 'DEPLOYMENT_COORDINATION.md', name: 'Deployment Coordination' },
  { file: 'PRODUCTION_POSTGRES_MIGRATION.md', name: 'PostgreSQL Migration' },
  { file: 'PRODUCTION_MEILISEARCH_SETUP.md', name: 'Meilisearch Setup' },
  { file: 'CUSTOM_DOMAIN_SETUP.md', name: 'Custom Domain' },
  { file: 'DEPLOYMENT_CHECKLIST.md', name: 'Quick Checklist' },
];

guides.forEach((guide) => {
  checkExists(guide.file, guide.name);
});

// ============================================================================
section('6. DOCUMENTATION');
// ============================================================================

const docs = [
  { file: 'DATABASE_SETUP.md', name: 'Database Setup' },
  { file: 'MEILISEARCH_SETUP.md', name: 'Meilisearch Setup' },
  { file: 'ADS_INFRASTRUCTURE.md', name: 'Ads Infrastructure' },
  { file: 'PREMIUM_DIRECTORY_WORKFLOW.md', name: 'Premium Directory' },
  { file: 'TESTING_SETUP.md', name: 'E2E Testing' },
];

docs.forEach((doc) => {
  checkExists(doc.file, doc.name);
});

// ============================================================================
section('7. API ENDPOINTS');
// ============================================================================

const apiPaths = [
  'app/api/guides',
  'app/api/search',
  'app/api/directory',
  'app/api/ads',
  'app/api/health',
  'app/api/analytics',
];

apiPaths.forEach((apiPath) => {
  checkExists(apiPath, `API: ${apiPath}`);
});

// ============================================================================
section('8. COMPONENTS');
// ============================================================================

const components = [
  'components/Search',
  'components/Calculator',
  'components/Directory',
  'components/Ad',
  'components/Analytics',
];

components.forEach((comp) => {
  checkExists(comp, `Component: ${comp}`);
});

// ============================================================================
section('9. PRODUCTION CONFIGURATION');
// ============================================================================

checkEnvVar('DATABASE_URL', 'DATABASE_URL');
checkEnvVar('MEILISEARCH_HOST', 'MEILISEARCH_HOST');
checkEnvVar('NEXT_PUBLIC_APP_DOMAIN', 'NEXT_PUBLIC_APP_DOMAIN');

// ============================================================================
section('10. DOCKER & COMPOSE');
// ============================================================================

checkExists('docker-compose.yml', 'docker-compose.yml');

// ============================================================================
section('FINAL REPORT');
// ============================================================================

console.log(`
${colors.green}Passed:${colors.reset}   ${checks.passed}
${colors.yellow}Warnings:${colors.reset} ${checks.warnings}
${colors.red}Failed:${colors.reset}  ${checks.failed}
`);

if (checks.failed === 0) {
  console.log(`${colors.green}✅ PRE-DEPLOYMENT VALIDATION PASSED${colors.reset}`);
  console.log(`\n${colors.blue}Next Steps:${colors.reset}`);
  console.log(`1. Create Supabase PostgreSQL project`);
  console.log(`2. Create Meilisearch Cloud project`);
  console.log(`3. Follow DEPLOYMENT_COORDINATION.md`);
  console.log(`4. Monitor for 24 hours post-deployment\n`);
  process.exit(0);
} else {
  console.log(`${colors.red}❌ PRE-DEPLOYMENT VALIDATION FAILED${colors.reset}`);
  console.log(`\n${colors.yellow}Fix the ${checks.failed} issue(s) above before deploying.${colors.reset}\n`);
  process.exit(1);
}
