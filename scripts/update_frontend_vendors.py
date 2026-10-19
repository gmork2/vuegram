#!/usr/bin/env python3
"""Update vendored Vue and Vuex browser bundles to the latest stable versions."""

from __future__ import annotations

import hashlib
import json
import urllib.request
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parent.parent
MANIFEST_PATH = REPO_ROOT / "vuegram/static/js/vendor-manifest.json"

VENDORS = (
    {
        "package": "vue",
        "dist_path": "dist/vue.global.js",
        "target": "vuegram/static/js/vue.global.js",
    },
    {
        "package": "vuex",
        "dist_path": "dist/vuex.global.js",
        "target": "vuegram/static/js/vuex.global.js",
    },
)


def fetch_text(url: str) -> str:
    with urllib.request.urlopen(url, timeout=30) as response:  # nosec: B310
        return response.read().decode("utf-8")


def fetch_bytes(url: str) -> bytes:
    with urllib.request.urlopen(url, timeout=30) as response:  # nosec: B310
        return response.read()


def latest_version(package: str) -> str:
    data = json.loads(fetch_text(f"https://registry.npmjs.org/{package}/latest"))
    return data["version"]


def sha256(content: bytes) -> str:
    return hashlib.sha256(content).hexdigest()


def main() -> None:
    manifest: dict[str, dict[str, str]] = {}
    changed = False

    for vendor in VENDORS:
        package = vendor["package"]
        version = latest_version(package)
        target_path = REPO_ROOT / vendor["target"]
        source_url = f"https://unpkg.com/{package}@{version}/{vendor['dist_path']}"
        content = fetch_bytes(source_url)

        target_path.parent.mkdir(parents=True, exist_ok=True)
        current = target_path.read_bytes() if target_path.exists() else b""
        if current != content:
            target_path.write_bytes(content)
            changed = True

        manifest[target_path.name] = {
            "package": package,
            "version": version,
            "sha256": sha256(content),
            "source_url": source_url,
        }
        print(f"{target_path.name}: {version}")

    existing_manifest = (
        MANIFEST_PATH.read_text(encoding="utf-8") if MANIFEST_PATH.exists() else ""
    )
    next_manifest = json.dumps(manifest, indent=2, sort_keys=True) + "\n"
    if existing_manifest != next_manifest:
        MANIFEST_PATH.write_text(next_manifest, encoding="utf-8")
        changed = True

    if changed:
        print("Updated frontend vendor bundles.")
    else:
        print("Frontend vendor bundles already up to date.")


if __name__ == "__main__":
    main()
