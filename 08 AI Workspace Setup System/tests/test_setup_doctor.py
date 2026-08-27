import importlib.util
import json
import tempfile
import unittest
from pathlib import Path


SYSTEM_ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location(
    "workspace_setup_doctor", SYSTEM_ROOT / "tools" / "setup_doctor.py"
)
setup_doctor = importlib.util.module_from_spec(SPEC)
assert SPEC.loader
SPEC.loader.exec_module(setup_doctor)


class WorkspaceSetupDoctorTests(unittest.TestCase):
    def test_report_is_read_only_and_does_not_expose_absolute_root(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            root = Path(raw) / "approved-workspace"
            root.mkdir()
            payload = setup_doctor.check(root)
            serialized = json.dumps(payload)
            self.assertTrue(payload["readOnly"])
            self.assertEqual(payload["filesRead"], 0)
            self.assertEqual(payload["filesWritten"], 0)
            self.assertFalse(payload["changedSettings"])
            self.assertEqual(payload["rootLabel"], "approved-workspace")
            self.assertNotIn(str(root.resolve()), serialized)


if __name__ == "__main__":
    unittest.main()
