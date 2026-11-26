# 3D Furniture GLB Specifications & Blender Export Guide

This project supports loading optional production GLB models into `src/assets/models/` with seamless procedural fallbacks.

## Supported Model File Names
- `desk.glb`: Developer desk setup
- `chair.glb`: Ergonomic gaming chair
- `bed.glb`: Modern platform bed with headboard and duvet
- `pc.glb`: Gaming PC tower with glass side panel
- `bookshelf.glb`: Modular architectural bookshelf unit

---

## Unit & Coordinate Conventions
- **Units**: Meters (1.0 in Blender = 1.0m in Three.js).
- **Forward Axis**: `+Z` or `-Z` standard.
- **Pivot Point / Origin**: Centered horizontally (`X = 0, Z = 0`) with the base placed flat on the floor (`Y = 0`).
- **Target Dimensions**:
  - `desk.glb`: Width: 2.4m, Height: 0.77m, Depth: 1.3m
  - `chair.glb`: Width: 0.75m, Height: 1.25m, Depth: 0.75m
  - `bed.glb`: Width: 2.4m, Height: 1.2m (including headboard), Depth: 3.4m
  - `pc.glb`: Width: 0.26m, Height: 0.52m, Depth: 0.5m
  - `bookshelf.glb`: Width: 2.2m, Height: 2.8m, Depth: 0.55m

---

## Baked Lighting & Material Guidelines
- **Light Culling**: Any Point, Spot, Directional, or Sun lights saved inside GLB files are automatically stripped on load to adhere to the strict 4-light ceiling.
- **Baked Textures**:
  - Ambient Occlusion (AO) maps and lightmaps are preserved automatically.
  - Set `hasBakedLighting: true` in `src/data/models.ts` if your model includes pre-baked shadow maps; this suppresses dynamic castShadow to avoid double-darkening.
- **Emissive Maps**: Glowing parts (monitor screens, LED strips, power buttons) will retain their emissive channels.

---

## Blender Export Settings (glTF 2.0 / .glb)
1. **Format**: `glTF Binary (.glb)`
2. **Transform**:
   - `+Y Up`: Enabled
   - Apply Modifiers: Enabled
3. **Geometry**:
   - UVs: Enabled
   - Normals: Enabled
   - Tangents: Optional (for normal mapped assets)
   - Compression: Meshopt or standard uncompressed (draco decoders requiring external CDNs are avoided)
4. **Lighting & Cameras**:
   - Cameras: Disabled
   - Punctual Lights: Disabled
5. **Animation**: Disabled (furniture models are static).
