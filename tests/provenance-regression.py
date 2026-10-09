"""The real checker must reject tampered fixtures even under python -O."""
import json, shutil, subprocess, sys, tempfile
from pathlib import Path
root = Path(__file__).resolve().parent.parent
with tempfile.TemporaryDirectory(prefix="falsify-provenance-") as tmp:
    fixture = Path(tmp)
    (fixture / ".github").mkdir()
    shutil.copy(root / ".github/check_provenance.py", fixture / ".github")
    shutil.copytree(root / "evals", fixture / "evals")
    manifest = fixture / "evals/provenance.json"
    original = json.loads(manifest.read_text())
    for optimize in ([], ["-O"]):
        command = [sys.executable, *optimize, str(fixture / ".github/check_provenance.py")]
        valid = subprocess.run(command, capture_output=True, text=True)
        if valid.returncode:
            raise RuntimeError(valid.stderr)
        for field, value in [("sha256", "0" * 64), ("cases", 99), ("passed", 99), ("failed_case_ids", []), ("report_header_date", "1900-01-01")]:
            modified = json.loads(json.dumps(original))
            modified["reports"][0][field] = value
            manifest.write_text(json.dumps(modified))
            result = subprocess.run(command, capture_output=True, text=True)
            manifest.write_text(json.dumps(original))
            if result.returncode == 0 or "PROVENANCE FAILED" not in result.stderr:
                raise RuntimeError(f"tampering accepted or not diagnosed: {optimize} {field}: {result.stdout} {result.stderr}")
print("PASS provenance tampering checks: 5 fields under normal and optimized Python")
