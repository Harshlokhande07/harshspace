# Mixamo Character Assets

Place your Mixamo FBX files in this directory:
- `harsh.fbx`: Character model with skin (e.g., exported from Mixamo as FBX with Skin, T-Pose or Idle).
- `idle.fbx`: Idle animation (FBX without skin, in place).
- `walk.fbx`: Walking animation (FBX without skin, in place).
- `run.fbx`: Running animation (FBX without skin, in place).

### Safe Loading Architecture:
- If files are not yet added, the system automatically uses the sleek capsule avatar with directional visor and underglow.
- When you drop your FBX files here, Vite detects them and mounts the animated 3D mesh automatically without code changes.
