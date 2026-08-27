import importlib.util
import json
import tempfile
import unittest
from pathlib import Path


SYSTEM_ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location(
    "buyer_skills_hq", SYSTEM_ROOT / "tools" / "skills_hq.py"
)
skills_hq = importlib.util.module_from_spec(SPEC)
assert SPEC.loader
SPEC.loader.exec_module(skills_hq)


class SkillsHQTests(unittest.TestCase):
    def test_inventory_contains_metadata_but_not_skill_body(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            root = Path(raw) / "skills"
            skill = root / "weekly-review" / "SKILL.md"
            skill.parent.mkdir(parents=True)
            skill.write_text(
                "---\nname: weekly-review\ndescription: Review one week\n"
                "version: 1.2.0\n---\nPRIVATE BODY SENTENCE\n",
                encoding="utf-8",
            )
            payload = skills_hq.inventory(root)
            serialized = json.dumps(payload)
            self.assertEqual(payload["skillCount"], 1)
            self.assertEqual(payload["skills"][0]["path"], "weekly-review/SKILL.md")
            self.assertFalse(payload["contentEmbedded"])
            self.assertFalse(payload["chatLogsRead"])
            self.assertNotIn("PRIVATE BODY SENTENCE", serialized)
            self.assertNotIn(str(root.resolve()), serialized)

    def test_hidden_and_symlinked_skills_are_not_followed(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            root = Path(raw) / "skills"
            visible = root / "visible" / "SKILL.md"
            hidden = root / ".hidden" / "SKILL.md"
            visible.parent.mkdir(parents=True)
            hidden.parent.mkdir(parents=True)
            visible.write_text("# Visible\n", encoding="utf-8")
            hidden.write_text("# Hidden\n", encoding="utf-8")
            link = root / "linked"
            try:
                link.symlink_to(visible.parent, target_is_directory=True)
            except OSError:
                pass
            payload = skills_hq.inventory(root)
            self.assertEqual(
                [item["path"] for item in payload["skills"]],
                ["visible/SKILL.md"],
            )

    def test_proposal_is_non_applying_and_does_not_change_skill(self) -> None:
        with tempfile.TemporaryDirectory() as raw:
            skill = Path(raw) / "SKILL.md"
            original = "# Skill\nKeep this content.\n"
            skill.write_text(original, encoding="utf-8")
            payload = skills_hq.proposal(
                skill,
                "The edge case failed.",
                "The edge-case fixture passes.",
            )
            self.assertEqual(payload["status"], "proposal_only")
            self.assertFalse(payload["applied"])
            self.assertEqual(skill.read_text(encoding="utf-8"), original)


if __name__ == "__main__":
    unittest.main()
