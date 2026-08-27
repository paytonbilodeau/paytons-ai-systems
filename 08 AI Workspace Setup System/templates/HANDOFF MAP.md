# Cross-Interface Handoff Map

| Interface | Reads canonical files | May write | Mirrored files | Manual handoff | Last sync test |
|---|---|---|---|---|---|
| [editor, desktop, web, phone, or voice] | [yes or no] | [scope] | [relative paths or none] | [method] | [date and receipt] |

One source stays canonical. A mirror is checked by hash or exact diff and never silently becomes the source of truth.
