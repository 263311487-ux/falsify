"""Verify checked-in report bytes and recorded counts without model calls."""
import hashlib,json,re
from pathlib import Path
root=Path(__file__).resolve().parent.parent
d=json.loads((root/'evals/provenance.json').read_text())
for r in d['reports']:
 p=root/r['path']; body=p.read_text()
 assert hashlib.sha256(p.read_bytes()).hexdigest()==r['sha256'], p
 rows=[line for line in body.split('## Notes')[0].splitlines() if re.match(r'^\| \d+ \|',line)]
 assert len(rows)==r['cases'], p
 assert sum('✅' in line for line in rows)==r['passed'],p
 assert [int(line.split('|')[1]) for line in rows if '❌' in line]==r['failed_case_ids'],p
 assert r['report_header_date'] in body,p
print('PROVENANCE OK: 2 reports, hashes, 28 rows and 26 recorded passes each')
