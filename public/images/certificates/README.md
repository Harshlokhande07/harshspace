# Certificate Image Assets

Place certificate image files in this folder.

### Recommendations:
- **Recommended dimensions:** about 1600px wide (or 4:3 / 16:9 / A4 landscape aspect ratio).
- **Format:** JPG or WebP.
- **File size:** Under 300 KB (optimized for fast web loading).
- **Naming convention:** kebab-case, e.g. `hackathon-winner-2024.jpg`, `cloud-architect.webp`.

### Linking in Data:
Reference the image in `src/data/certificates.ts`:
```ts
image: '/images/certificates/hackathon-winner-2024.jpg'
```
If `image` is left empty (`""`), a clean procedural sample placeholder will automatically be rendered in both 3D and 2D viewers.
