import os

folders = [
    "public",
    "src/components",
    "src/hooks",
    "src/pages",
    "src/services",
    "src/styles"
]

files = [
    ".env.local",
    "src/pages/index.tsx",
    "src/pages/search.tsx",
    "src/components/MagazineBlock.tsx",
    "src/components/SkeletonUI.tsx",
    "src/styles/globals.css",
    "next.config.js",
    "package.json"
]

for f in folders: os.makedirs(f, exist_ok=True)
for f in files:
    if not os.path.exists(f):
        with open(f, "w", encoding="utf-8") as file: file.write("")
print("✅ Frontend Repository Structure Ready!")