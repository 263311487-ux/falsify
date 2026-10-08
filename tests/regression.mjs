import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, readdirSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { checkClaim, modeRoute } from '../bin/falsify-core.mjs';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cli = join(root, 'bin/falsify-skill.mjs');
let passed = 0, failed = 0;
function test(name, fn) { try { fn(); passed++; console.log('PASS '+name); } catch(e) { failed++; console.error('FAIL '+name+': '+e.message); } }
function sandbox(fn) { const home = mkdtempSync(join(tmpdir(), 'falsify-test-')); try { fn(home); } finally { rmSync(home, { recursive:true, force:true }); } }
function run(args, home, input = '') { const r = spawnSync(process.execPath, [cli, ...args], { cwd:home, env:{...process.env, HOME:home, USERPROFILE:home, NO_COLOR:'1'}, input, encoding:'utf8', timeout:5000 }); assert.equal(r.error, undefined); return r; }
for (const [claim, want] of [['The service is down, customers cannot log in', 'Incident'], ['Rough estimate for a hobby project', 'Nudge'], ['What time is it?', 'Simple'], ['Which cache should we choose?', 'Depth']]) test('routes '+want, () => assert.ok(modeRoute(claim).mode.startsWith(want)));
test('preserves Chinese and emoji input', () => { const r=checkClaim('肯定是缓存问题，延迟 200 秒 🧪'); assert.equal(r.lang,'zh'); assert.equal(r.claim,'肯定是缓存问题，延迟 200 秒 🧪'); assert.ok(r.redFlags.includes('肯定')); });
test('core is deterministic and independent across calls', () => { const a=checkClaim('a claim'); a.redFlags.push('changed'); assert.deepEqual(checkClaim('a claim'),checkClaim('a claim')); assert.deepEqual(checkClaim('a claim').redFlags,[]); });
test('observable words cannot certify a hypothesis', () => { const r=checkClaim('CPU memory latency is fast'); assert.ok(r.observableMentions.length>=2); assert.ok(r.fiveStages.every(s=>!s.done)); assert.equal(r.missingCount,5); });
test('English fragments are not red flags or incidents', () => { assert.ok(!checkClaim('download the bestiary').redFlags.includes('best')); assert.ok(modeRoute('download the report').mode.startsWith('Depth')); });
for (const claim of ['rough medication dose', 'rough production sizing', '大概需要多少药物剂量']) test('high stakes do not nudge: '+claim, () => assert.ok(modeRoute(claim).mode.startsWith('Depth')));
test('JSON preserves claim without ANSI or writes', () => sandbox(home=>{ const r=run(['--json','肯定不对 🧪'],home); assert.equal(r.status,0); assert.equal(JSON.parse(r.stdout).claim,'肯定不对 🧪'); assert.equal(r.stderr,''); assert.ok(!r.stdout.includes(String.fromCharCode(27))); assert.deepEqual(readdirSync(home),[]); }));
test('JSON flag order and stdin are supported', () => sandbox(home=>{ for(const args of [['--json','--no-color'],['--no-color','--json']]) { const r=run(args,home,'多行 测试 🧪'); assert.equal(r.status,0); assert.equal(JSON.parse(r.stdout).claim,'多行 测试 🧪'); } }));
test('plain stdin supports no-color flag', () => sandbox(home=>{ const r=run(['--no-color'],home,'A claim to investigate'); assert.equal(r.status,0); assert.match(r.stdout,/A claim to investigate/); assert.ok(!r.stdout.includes(String.fromCharCode(27))); }));
test('empty stdin and missing JSON claim fail', () => sandbox(home=>{ for(const args of [[],['--json']]) { const r=run(args,home,'   '); assert.notEqual(r.status,0); assert.match(r.stderr,/empty|claim|usage/i); } }));
test('help exits without prompting or writes', () => sandbox(home=>{ const r=run(['--help'],home); assert.equal(r.status,0); assert.match(r.stdout,/--install/); assert.match(r.stdout,/--json/); assert.deepEqual(readdirSync(home),[]); }));
test('unknown flags and conflicting modes fail without installing', () => sandbox(home=>{ for(const args of [['--wat'],['--install','--json','claim'],['--demo','--install']]) { const r=run(args,home); assert.notEqual(r.status,0); assert.deepEqual(readdirSync(home),[]); } }));
test('double dash treats install-looking text as a claim', () => sandbox(home=>{ const r=run(['--json','--','--install'],home); assert.equal(r.status,0); assert.equal(JSON.parse(r.stdout).claim,'--install'); assert.deepEqual(readdirSync(home),[]); }));
test('lightweight modes do not demand a depth ledger', () => sandbox(home=>{ for(const claim of ['What time is it?', 'service outage']) { const r=run([claim],home); assert.equal(r.status,0); assert.doesNotMatch(r.stdout,/Five-stage gap|Upgrade template/); } }));
test('demo works without side effects', () => sandbox(home=>{ const r=run(['--demo'],home); assert.equal(r.status,0); assert.match(r.stdout,/cache|缓存/); assert.deepEqual(readdirSync(home),[]); }));
test('install includes every referenced resource', () => sandbox(home=>{ const r=run(['--install'],home); assert.equal(r.status,0); for(const dir of ['.codex','.claude']) for(const file of ['SKILL.md','references/mental-models.md','references/bias-catalog.md','templates/thinking-ledger.md']) assert.equal(readFileSync(join(home,dir,'skills/falsify',file),'utf8'),readFileSync(join(root,file),'utf8')); }));
test('existing skill is preserved and failure reported', () => sandbox(home=>{ const target=join(home,'.codex/skills/falsify'); mkdirSync(target,{recursive:true}); writeFileSync(join(target,'SKILL.md'),'user custom skill'); const r=run(['--install'],home); assert.notEqual(r.status,0); assert.equal(readFileSync(join(target,'SKILL.md'),'utf8'),'user custom skill'); }));
test('symlinked skill directory is not written through', () => sandbox(home=>{ const target=join(home,'elsewhere'); mkdirSync(target); writeFileSync(join(target,'SKILL.md'),'keep'); mkdirSync(join(home,'.codex/skills'),{recursive:true}); symlinkSync(target,join(home,'.codex/skills/falsify'),'dir'); const r=run(['--install'],home); assert.notEqual(r.status,0); assert.equal(readFileSync(join(target,'SKILL.md'),'utf8'),'keep'); assert.deepEqual(readdirSync(target),['SKILL.md']); }));
console.log(passed+' passed; '+failed+' failed');
process.exitCode=failed?1:0;
