# Character Model Assets (Rigged Minecraft Boy / Custom Avatar)

This directory supports both **GLB/glTF** and **FBX** 3D character models:

### 1. Default Built-in Model
If no external 3D model file is present, the application automatically renders and animates the custom **Rigged Minecraft Boy** (with layered 3D hair fringe, cyan/navy streetwear hoodie, denim jeans, sneakers, and full limb kinematic walking, running, seated keyboard-typing, and lying bed animations).

### 2. Loading External Sketchfab Model (Rigged Mine Craft Boy):
To load the exact 3D file from Sketchfab:
1. Download the model as **glTF / GLB** or **FBX** from Sketchfab.
2. Place the file in this folder:
   - For GLTF/GLB: `src/assets/character/harsh.glb` (or `minecraft.glb`)
   - For FBX: `src/assets/character/harsh.fbx`
3. Vite hot-module reload will automatically detect and mount it in the 3D bedroom without rebuilding.
