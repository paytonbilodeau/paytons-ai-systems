import importlib.util
import tempfile
import unittest
from pathlib import Path


SYSTEM_ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location(
    "safe_counter", SYSTEM_ROOT / "tools" / "safe_counter.py"
)
safe_counter = importlib.util.module_from_spec(SPEC)
assert SPEC.loader
SPEC.loader.exec_module(safe_counter)


class SafeCounterTests(unittest.TestCase):
    def test_counts_valid_records_and_explains_skips(self) -> None:
        result, receipt = safe_counter.analyze(
            [
                {"id": "a", "status": "open"},
                {"id": "b", "status": "closed"},
                {"id": "c", "status": "unknown"},
                "bad",
            ]
        )
        self.assertEqual(result, {"recordCount": 2, "openCount": 1})
        self.assertEqual(receipt["examined"], 4)
        self.assertEqual(receipt["processed"], 2)
        self.assertEqual(receipt["skipped"], 2)
        self.assertEqual(receipt["quietStatus"], "work found")
        self.assertNotIn("a", receipt["processedIdHashes"])

    def test_quiet_run_is_explicit(self) -> None:
        _, receipt = safe_counter.analyze([{"id": "a", "status": "closed"}])
        self.assertEqual(receipt["quietStatus"], "no work found")

    def test_existing_output_is_refused(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            path = Path(raw) / "result.json"
            path.write_text("old", encoding="utf-8")
            with self.assertRaises(safe_counter.PilotError):
                safe_counter.write_new(path, {"new": True}, overwrite=False)
            self.assertEqual(path.read_text(encoding="utf-8"), "old")


if __name__ == "__main__":
    unittest.main()
