import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const root=resolve(dirname(fileURLToPath(import.meta.url)), '..');
const temp=mkdtempSync(join(tmpdir(),'falsify-package-'));
const home=join(temp,'home'), project=join(temp,'project');
mkdirSync(home); mkdirSync(project);
const env={...process.env, HOME:home, USERPROFILE:home, npm_config_cache:join(temp,'cache'), NO_COLOR:'1'};
function run(cmd,args,cwd=project) { const r=spawnSync(cmd,args,{cwd,env,encoding:'utf8',timeout:60000}); assert.equal(r.error,undefined); assert.equal(r.status,0,r.stderr); return r.stdout; }
try {
  const [pack]=JSON.parse(run('npm',['pack','--ignore-scripts','--json','--pack-destination',temp],root));
  writeFileSync(join(project,'package.json'),JSON.stringify({name:'isolated-test',version:'1.0.0',private:true}));
  run('npm',['install','--offline','--ignore-scripts','--no-audit','--no-fund',join(temp,pack.filename)]);
  const installed=join(project,'node_modules/falsify-skill');
  const executable=join(project,'node_modules/.bin/falsify-skill');
  assert.equal(JSON.parse(run(executable,['--json','packed Unicode 🧪'])).claim,'packed Unicode 🧪');
  assert.deepEqual(readdirSync(home),[]);
  run(executable,['--install']);
  for(const agent of ['.codex','.claude']) for(const file of ['SKILL.md','references/mental-models.md','references/bias-catalog.md','templates/thinking-ledger.md']) assert.equal(readFileSync(join(home,agent,'skills/falsify',file),'utf8'),readFileSync(join(root,file),'utf8'));
  run(process.execPath,[join(installed,'tests/regression.mjs')]);
  console.log('PASS tarball installation, public binary, isolated skill/resource install, packaged regressions');
  console.log(JSON.stringify({filename:pack.filename,shasum:pack.shasum,integrity:pack.integrity,files:pack.files.length}));
} finally { rmSync(temp,{recursive:true,force:true}); }
