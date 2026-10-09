"""Verify checked-in report bytes and counts; checks remain active under -O."""
import hashlib
import json
import re
import sys
from pathlib import Path

def verify(root):
    manifest = json.loads((root / "evals/provenance.json").read_text())
    for report in manifest["reports"]:
        path = root / report["path"]
        body = path.read_text()
        rows = [line for line in body.split("## Notes")[0].splitlines()
                if re.match(r"^\| \d+ \|", line)]
        checks = {
            "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
            "cases": len(rows),
            "passed": sum("✅" in line for line in rows),
            "failed_case_ids": [int(line.split("|")[1]) for line in rows if "❌" in line],
        }
        for field, actual in checks.items():
            if actual != report[field]:
                raise ValueError(f"{report['path']}: {field} mismatch")
        header = re.search(r"\*\*Date:\*\* (\d{4}-\d{2}-\d{2})", body)
        if not header or header.group(1) != report["report_header_date"]:
            raise ValueError(f"{report['path']}: report_header_date mismatch")

if __name__ == "__main__":
    try:
        verify(Path(__file__).resolve().parent.parent)
    except (ValueError, KeyError, TypeError, OSError) as error:
        print(f"PROVENANCE FAILED: {error}", file=sys.stderr)
        sys.exit(1)
    print("PROVENANCE OK: report hashes, mode table counts, failures and dates")
