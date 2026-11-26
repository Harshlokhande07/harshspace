# Memory & Photo Assets

Place memory photographs and event snapshots in this folder.

### Recommendations:
- **Recommended dimensions:** about 1600px wide (or standard 3:2 / 4:3 photo aspect ratio).
- **Format:** JPG or WebP.
- **File size:** Under 300 KB.
- **Naming convention:** kebab-case, e.g. `hackathon-team-night.jpg`, `college-symposium.webp`.

### Linking in Data:
Reference the image in `src/data/experiences.ts`:
```ts
image: '/images/memories/hackathon-team-night.jpg'
```
If `image` is left empty (`""`), a clean procedural sample placeholder will automatically be rendered in both 3D and 2D viewers.
