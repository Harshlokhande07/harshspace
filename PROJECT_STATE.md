# PROJECT STATE & ARCHITECTURAL AUDIT REPORT
**Project:** Harsh - The Digital World (3D Gaming-Room Portfolio)  
**Audit Date:** 2026-11-27  
**Platform:** Node.js v24.13.0 | Vite v5.2.12 | React v18.3.1 | Three.js v0.165.0 | TypeScript v5.4.5  

---

## 1. OVERVIEW AND BUILD HEALTH

### 1.1 `package.json` Manifest
- **Name:** `harsh-the-digital-world`
- **Private:** `true`
- **Version:** `0.0.0`
- **Module Type:** `module`

#### Scripts
- `dev`: `vite`
- `build`: `tsc && vite build`
- `preview`: `vite preview`

#### Dependencies (Exact Versions)
- `@react-three/drei`: `^9.106.0`
- `@react-three/fiber`: `^8.16.8`
- `@react-three/postprocessing`: `^2.16.2`
- `framer-motion`: `^11.2.10`
- `react`: `^18.3.1`
- `react-dom`: `^18.3.1`
- `three`: `^0.165.0`
- `zustand`: `^4.5.2`

#### DevDependencies (Exact Versions)
- `@types/react`: `^18.3.3`
- `@types/react-dom`: `^18.3.0`
- `@types/three`: `^0.165.0`
- `@vitejs/plugin-react`: `^4.3.0`
- `typescript`: `^5.4.5`
- `vite`: `^5.2.12`

---

### 1.2 Build Health & Production Bundle Analysis
- **TypeScript & Compiler Status:** 0 errors, 0 compilation warnings.
- **Build Command Execution:** `npm run build` (`tsc && vite build`) executes cleanly with exit code `0`.
- **Bundle Output & Chunk Sizes:**
  - `dist/index.html`: `2.33 kB` (gzip: `0.92 kB`)
  - `dist/assets/index-D56Hb8E7.css`: `0.25 kB` (gzip: `0.21 kB`)
  - `dist/assets/TargetShootingGame-BixIsk8t.js`: `5.02 kB` (gzip: `1.92 kB`)
  - `dist/assets/SnakeGame-NuOHMqms.js`: `8.15 kB` (gzip: `2.81 kB`)
  - `dist/assets/index-CZ_uN0i7.js`: `1,835.82 kB` (gzip: `563.83 kB`)
- **Bundle Warnings:**
  - `(!) Some chunks are larger than 500 kB after minification.` (`dist/assets/index-CZ_uN0i7.js` is 1.83 MB due to monolithic bundling of Three.js, React Three Fiber, React Three Postprocessing, and Drei).
- **Node Version:** `v24.13.0`
- **Dev Server Status:** Active and running concurrently on `http://localhost:5173/` (Vite daemon process).

---

## 2. FULL FILE TREE

### Root & Configuration Files
- `.env.example` (2 lines) - Template environment variables (`VITE_CONTACT_ENDPOINT`).
- `.gitignore` (26 lines) - Git ignore rules for node_modules, build dist, local caches, and environments.
- `index.html` (36 lines) - Single Page Application entry HTML template with viewport meta and root div.
- `MODELS.md` (49 lines) - Documentation and Sketchfab model source attribution.
- `package.json` (29 lines) - NPM package manifest and dependency definitions.
- `package-lock.json` (2701 lines) - Locked dependency resolution tree.
- `README.md` (152 lines) - Project overview, features, setup instructions, and controls guide.
- `tsconfig.json` (25 lines) - TypeScript compiler configuration for client application code.
- `tsconfig.node.json` (11 lines) - TypeScript configuration for Vite configuration tooling.
- `vite.config.ts` (11 lines) - Vite bundler configuration with React plugin.

### Public Directory (`public/`)
- `public/images/art/minecraft_logo.png` - 3D Minecraft logo texture asset.
- `public/images/art/painting1.png` - Wall artwork asset 1.
- `public/images/art/painting2.png` - Wall artwork asset 2.
- `public/images/art/painting3.png` - Wall artwork asset 3.
- `public/images/art/painting4.png` - Wall artwork asset 4.
- `public/images/certificates/README.md` (16 lines) - Instructions for placing custom certificate images.
- `public/images/memories/README.md` (16 lines) - Instructions for placing custom memory photos.
- `public/textures/easel_texture.png` - Texture asset reference for easel canvas.
- `public/textures/minecraft_girl_skin.png` - 64x64 pixel skin texture for the Minecraft companion.

### Source Directory (`src/`)
- `src/App.css` (16 lines) - Global CSS reset for full-screen canvas and font rendering.
- `src/App.tsx` (176 lines) - Root application component mounting Canvas, GamingRoom, HUD, and audio controls.
- `src/main.tsx` (17 lines) - React 18 DOM mount entrypoint with AppErrorBoundary.
- `src/vite-env.d.ts` (9 lines) - Vite client environment type declarations.

#### `src/assets/`
- `src/assets/.gitkeep` (1 line) - Git placeholder keeping directory intact.
- `src/assets/character/README.md` (14 lines) - Instructions for placing Mixamo `harsh.fbx` or GLB models.

#### `src/components/Camera/`
- `src/components/Camera/CameraRig.tsx` (18 lines) - Camera mode router choosing between 1st and 3rd person.
- `src/components/Camera/FirstPersonCamera.tsx` (97 lines) - Eye-level first-person camera controller with zero-allocation damping.
- `src/components/Camera/ThirdPersonCamera.tsx` (135 lines) - Orbiting third-person follower camera with room collision boundaries.

#### `src/components/Character/`
- `src/components/Character/Character.tsx` (281 lines) - Player movement kinematics, ground collision capsule, and step sounds.
- `src/components/Character/CharacterErrorBoundary.tsx` (31 lines) - React error boundary catching 3D asset failures and falling back to procedural boy.
- `src/components/Character/HarshModel.tsx` (219 lines) - Dynamic model loader detecting external FBX/GLB files, falling back to MinecraftBoy.
- `src/components/Character/MinecraftBoy.tsx` (523 lines) - Procedural animated Minecraft boy with limb swinging and 'HARSH' t-shirt pixel text.

#### `src/components/Furniture/`
- `src/components/Furniture/AirConditioner.tsx` (225 lines) - Wall-mounted split AC unit with animated swing louver and dynamic LED display.
- `src/components/Furniture/Bed.tsx` (167 lines) - Platform bed with wooden frame, mattress, duvet, pillows, and lie-down anchor.
- `src/components/Furniture/Bookshelf.tsx` (217 lines) - Floor-to-ceiling bookshelf with colored books and glowing artifact.
- `src/components/Furniture/CeilingFan.tsx` (108 lines) - 4-blade ceiling fan with smooth spin-up damping and motion blur disc.
- `src/components/Furniture/CertificateWall.tsx` (587 lines) - Wall-mounted achievement certificate frames with glass covers.
- `src/components/Furniture/CoffeeMug.tsx` (132 lines) - Desk ceramic mug with lowering coffee liquid and oscillating steam.
- `src/components/Furniture/ContactStation.tsx` (90 lines) - Pedestal terminal with holographic beacon.
- `src/components/Furniture/Desk.tsx` (208 lines) - Walnut workstation desk with cable grommets, drawers, and metallic legs.
- `src/components/Furniture/DrawerNote.tsx` (29 lines) - Hidden Easter egg note placed inside the desk drawer.
- `src/components/Furniture/Easel.tsx` (256 lines) - Blockbench Minecraft-style tripod easel with blank primed canvas.
- `src/components/Furniture/GamingChair.tsx` (441 lines) - Ergonomic gaming chair with caster wheels, lumbar pillow, and sit-down anchor.
- `src/components/Furniture/Gramophone.tsx` (345 lines) - Bedside table with authentic Minecraft gramophone and spinning vinyl disc.
- `src/components/Furniture/IndustrialCeilingLight.tsx` (170 lines) - Modern industrial ceiling lighting fixture with warm glow.
- `src/components/Furniture/Keyboard.tsx` (56 lines) - Mechanical keyboard with individually sculpted keycaps and RGB backplate.
- `src/components/Furniture/Lamp.tsx` (186 lines) - Cantilever architect anglepoise task lamp with reactive bulb and light cone.
- `src/components/Furniture/LoungeFurniturePack.tsx` (481 lines) - Modern lounge suite (sofa, standing brass lamp, honeycomb shelves, plants).
- `src/components/Furniture/MemoryWall.tsx` (79 lines) - Photo frame gallery mounting personal milestones on West wall.
- `src/components/Furniture/MinecraftAquarium.tsx` (322 lines) - Glass aquarium credenza with animated swimming fish and water glow.
- `src/components/Furniture/MinecraftBee.tsx` (282 lines) - Pixel-art Minecraft bee hovering and bobbing near ceiling.
- `src/components/Furniture/MinecraftCamera.tsx` (225 lines) - Vintage Minecraft tripod camera in East corner.
- `src/components/Furniture/MinecraftGirl.tsx` (580 lines) - 1:1 Blockbench companion character model (ash1156 replica).
- `src/components/Furniture/MinecraftLogo.tsx` (38 lines) - 3D Minecraft logo mounted on wall above bed.
- `src/components/Furniture/MinecraftSword.tsx` (222 lines) - Diamond sword mounted on the walnut acoustic slat wall.
- `src/components/Furniture/MinecraftTorch.tsx` (131 lines) - Wall-mounted Minecraft torch with animated pixel flame.
- `src/components/Furniture/Monitor.tsx` (298 lines) - Ultrawide curved gaming monitor displaying code desktop preview.
- `src/components/Furniture/Mouse.tsx` (33 lines) - Ergonomic wireless gaming mouse and oversized desk mat.
- `src/components/Furniture/Notebook.tsx` (53 lines) - Open spiral-bound leather journal on desk.
- `src/components/Furniture/OutdoorBackdrop.tsx` (532 lines) - Parallax outdoor skyline with procedural skyscrapers and rain.
- `src/components/Furniture/PCTower.tsx` (437 lines) - Tempered glass PC case with internal GPU, RAM, liquid cooler, and RGB fans.
- `src/components/Furniture/Plant.tsx` (46 lines) - Potted Monstera houseplant in ceramic floor planter.
- `src/components/Furniture/Rug.tsx` (30 lines) - Plush textured floor area rug underneath workstation and chair.
- `src/components/Furniture/SecretCube.tsx` (38 lines) - Glitched floating cube Easter egg on top bookshelf shelf.
- `src/components/Furniture/Switchboard.tsx` (133 lines) - Dual-rocker wall switchboard controlling desk lamp and ceiling fan.
- `src/components/Furniture/WallFrame.tsx` (147 lines) - Reusable photo/certificate frame component.
- `src/components/Furniture/WindowFrame.tsx` (116 lines) - Architectural recessed window frame with rain glass shader.

#### `src/components/Interactions/`
- `src/components/Interactions/InteractionDetector.tsx` (54 lines) - Computes distances to all interactables every frame.
- `src/components/Interactions/InteractionIndicator.tsx` (61 lines) - Floating glowing 3D rings marking interaction zones.

#### `src/components/Lighting/`
- `src/components/Lighting/DayNightController.tsx` (258 lines) - Manages 4 real-time lights and smoothly interpolates Day/Evening/Night presets.
- `src/components/Lighting/PostProcessingEffects.tsx` (51 lines) - EffectComposer setup (Bloom, N8AO, SMAA) driven by quality settings.
- `src/components/Lighting/RoomLighting.tsx` (15 lines) - Wrapper mounting DayNightController.

#### `src/components/Portfolio/`
- `src/components/Portfolio/AchievementsPanel.tsx` (295 lines) - Interactive modal displaying certifications and awards.
- `src/components/Portfolio/BookshelfPanel.tsx` (351 lines) - Interactive skills modal styled as categorized book spines.
- `src/components/Portfolio/ContactPanel.tsx` (643 lines) - Contact form with field validation, cooldown timer, and Formspree webhook support.
- `src/components/Portfolio/EasterEggModal.tsx` (176 lines) - Dialogue modal revealing secret notes and achievements.
- `src/components/Portfolio/ImageViewer.tsx` (461 lines) - Fullscreen lightbox viewer for memory photographs and certificates.
- `src/components/Portfolio/MemoriesPanel.tsx` (292 lines) - Gallery modal showcasing milestone photos and memories.
- `src/components/Portfolio/NotebookPanel.tsx` (418 lines) - Two-page flip notebook displaying developer bio and journey.
- `src/components/Portfolio/VisionPanel.tsx` (311 lines) - Future roadmap and spatial computing vision panel.

#### `src/components/Portfolio/Desktop/`
- `src/components/Portfolio/Desktop/AppWindow.tsx` (118 lines) - Draggable/resizable window chrome with minimize/maximize/close.
- `src/components/Portfolio/Desktop/DesktopIcon.tsx` (92 lines) - HarshOS desktop app shortcut icon.
- `src/components/Portfolio/Desktop/DesktopShell.tsx` (349 lines) - HarshOS desktop environment mounting taskbar, wallpaper, and open apps.
- `src/components/Portfolio/Desktop/ProjectCard.tsx` (135 lines) - Interactive project preview card with tech badges.
- `src/components/Portfolio/Desktop/ProjectDetail.tsx` (255 lines) - Deep-dive project case study view.
- `src/components/Portfolio/Desktop/ProjectsApp.tsx` (84 lines) - Portfolio projects directory browser.
- `src/components/Portfolio/Desktop/SettingsApp.tsx` (163 lines) - HarshOS in-desktop settings panel.
- `src/components/Portfolio/Desktop/Taskbar.tsx` (178 lines) - Windows-style taskbar with start menu and digital clock.
- `src/components/Portfolio/Desktop/TerminalApp.tsx` (163 lines) - Interactive UNIX-like terminal supporting `help`, `about`, `projects`, `skills`, `status`, `clear`.
- `src/components/Portfolio/Desktop/Games/GamesApp.tsx` (273 lines) - HarshOS arcade launcher for retro games.
- `src/components/Portfolio/Desktop/Games/SnakeGame.tsx` (456 lines) - Cyberpunk snake arcade game with score tracking.
- `src/components/Portfolio/Desktop/Games/TargetShootingGame.tsx` (306 lines) - Reflex clicking game with timer and high scores.

#### `src/components/Room/`
- `src/components/Room/EntranceDoor.tsx` (86 lines) - Detailed entrance door frame and paneled door slab.
- `src/components/Room/GamingRoomModel.tsx` (307 lines) - Core 7.2m x 5.2m architectural room shell, walls, floor, and ceiling trims.
- `src/components/Room/GrayboxRoom.tsx` (1 line) - Re-export alias for GamingRoomModel.
- `src/components/Room/ModelLoader.tsx` (161 lines) - Utility for mounting external GLTF assets with shadow configuration.
- `src/components/Room/WalnutAcousticWall.tsx` (79 lines) - Vertical acoustic walnut wood slat accent feature wall.

#### `src/components/UI/`
- `src/components/UI/AdaptivePerformance.tsx` (62 lines) - Real-time FPS monitor automatically downgrading quality if frames drop.
- `src/components/UI/AppErrorBoundary.tsx` (129 lines) - Top-level React error boundary with recovery screen.
- `src/components/UI/CameraSwitcher.tsx` (212 lines) - Liquid glass HUD for switching between 1st Person and 3rd Person.
- `src/components/UI/ExplorationCounter.tsx` (59 lines) - Liquid glass badge tracking explored portfolio stations (X/6).
- `src/components/UI/GraphicsSelector.tsx` (78 lines) - Quick graphics preset switcher.
- `src/components/UI/InteractionPanel.tsx` (216 lines) - Master modal router presenting active interactive panels.
- `src/components/UI/InteractionPrompt.tsx` (212 lines) - Proximity interaction pill with liquid frosted glass.
- `src/components/UI/IntroOverlay.tsx` (354 lines) - Cinematic intro overlay with loading progress, title, and 'Enter World' button.
- `src/components/UI/MiniMap.tsx` (303 lines) - Real-time 2D radar HUD showing room layout, player position, and interactables.
- `src/components/UI/PoseTuner.tsx` (236 lines) - Developer pose tuning tool for adjusting anchor positions and yaw.
- `src/components/UI/QuickNavigation.tsx` (90 lines) - Liquid glass top pills for one-click tele-navigating to portfolio sections.
- `src/components/UI/SettingsPanel.tsx` (497 lines) - Flyout liquid glass panel for Time of Day, Audio Volume, and Credits.
- `src/components/UI/TouchControls.tsx` (356 lines) - Virtual analog joystick and action buttons for mobile touch devices.
- `src/components/UI/WebGLFallback.tsx` (107 lines) - Friendly fallback screen when WebGL is unavailable.

#### `src/data/`
- `src/data/audio.ts` (9 lines) - Default volume settings.
- `src/data/certificates.ts` (50 lines) - Certificate categories and data entries.
- `src/data/contactConfig.ts` (9 lines) - Formspree contact endpoint configuration.
- `src/data/credits.ts` (10 lines) - 3D model author attributions.
- `src/data/easterEggs.ts` (33 lines) - Easter egg definitions and text.
- `src/data/experiences.ts` (46 lines) - Timeline milestones and career experiences.
- `src/data/games.ts` (48 lines) - Metadata for arcade games.
- `src/data/interactables.ts` (161 lines) - Master registry of all interactable spots, positions, radii, and kinds.
- `src/data/intro.ts` (23 lines) - Intro screen text and titles.
- `src/data/mobile.ts` (24 lines) - Mobile touch threshold and joystick radius configuration.
- `src/data/models.ts` (64 lines) - External model manifest definitions.
- `src/data/navigation.ts` (13 lines) - Quick navigation items registry.
- `src/data/performance.ts` (22 lines) - Hardware concurrency detection and initial quality selection.
- `src/data/poses.ts` (66 lines) - Exact coordinates, yaws, approach points, and eye offsets for character actions.
- `src/data/profile.ts` (47 lines) - Developer bio, headline, hobbies, and learning goals.
- `src/data/projects.ts` (144 lines) - Project case studies with architecture, features, and challenges.
- `src/data/skills.ts` (97 lines) - Categorized skills data for the Bookshelf.
- `src/data/socialLinks.ts` (47 lines) - Social media URLs and handles.
- `src/data/vision.ts` (28 lines) - Career goals and spatial computing vision data.

#### `src/hooks/`
- `src/hooks/useCameraInput.ts` (163 lines) - Mouse drag, scroll wheel, and touch gestures for camera orbit.
- `src/hooks/useCharacterActions.ts` (131 lines) - State machine driving transitions into chair sitting, bed lying, and coffee drinking.
- `src/hooks/useCharacterAnimations.ts` (142 lines) - Mixamo animation mixer cross-fading walk/run/idle/action clips.
- `src/hooks/useInteractionControls.ts` (137 lines) - Binds E, F, T, and Esc keys for actions and posture exits.
- `src/hooks/useKeyboard.ts` (114 lines) - WASD/arrow key polling with input-focus typing isolation.

#### `src/scenes/`
- `src/scenes/GamingRoom.tsx` (24 lines) - Main 3D scene combining GamingRoomModel, Character, Lights, Effects, and Cameras.

#### `src/store/`
- `src/store/useAudioStore.ts` (102 lines) - Volume and mute state with localStorage persistence.
- `src/store/useCameraStore.ts` (76 lines) - Camera mode, yaw, pitch, and zoom state.
- `src/store/useCharacterStore.ts` (50 lines) - Character action states (`free`, `seated`, `lying`, `drinking`).
- `src/store/useDesktopStore.ts` (22 lines) - HarshOS window management state.
- `src/store/useEasterEggStore.ts` (36 lines) - Discovery tracking for secret easter eggs.
- `src/store/useGamesStore.ts` (29 lines) - Arcade mini-game selection and high scores.
- `src/store/useGraphicsStore.ts` (92 lines) - Graphics quality presets (Low, Medium, High).
- `src/store/useInteractionStore.ts` (49 lines) - Active modal and proximity discovery state.
- `src/store/useIntroStore.ts` (55 lines) - Intro overlay sequence and camera transition progress.
- `src/store/useLivingRoomStore.ts` (80 lines) - Living room props (lamp, fan, AC, thermostat, coffee).
- `src/store/usePlayerStore.ts` (15 lines) - Player world coordinate state for radar and camera.
- `src/store/useRoomEffectsStore.ts` (23 lines) - Reactive emissive lighting boosts.
- `src/store/useTouchControlsStore.ts` (28 lines) - Virtual joystick input state.

#### `src/utils/`
- `src/utils/audioManager.ts` (188 lines) - Web Audio API synthesizer generating procedural UI and environment sounds.
- `src/utils/collision.ts` (126 lines) - Room perimeter boundaries and furniture AABB collision boxes.
- `src/utils/snakeLogic.ts` (120 lines) - Grid mechanics and fruit spawning for Snake game.
- `src/utils/textures.ts` (99 lines) - Procedural canvas wood and wall plaster textures.
- `src/utils/webglCheck.ts` (16 lines) - WebGL2 availability check.

---

## 3. STATE STORES (`src/store/`)

| Store File | Field Name | Type | Default Value | Mutator Actions | Readers & Writers |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`useAudioStore.ts`** | `muted` | `boolean` | `false` (or localStorage) | `toggleMute()`, `setMuted()` | Read by `App.tsx`, `SettingsPanel.tsx`, `audioManager.ts` |
| | `musicEnabled` | `boolean` | `true` (or localStorage) | `toggleMusic()`, `setMusicEnabled()` | Read by `SettingsPanel.tsx`, `audioManager.ts` |
| | `musicVolume` | `number` | `0.30` | `setMusicVolume()` | Read by `SettingsPanel.tsx`, `audioManager.ts` |
| | `effectsVolume` | `number` | `0.50` | `setEffectsVolume()` | Read by `SettingsPanel.tsx`, `audioManager.ts` |
| **`useCameraStore.ts`** | `mode` | `'first' \| 'third'` | `'third'` | `setMode()`, `toggleMode()` | Read by `CameraSwitcher.tsx`, `CameraRig.tsx`, `Character.tsx` |
| | `yaw` | `number` | `0` | `rotate()` | Read by `ThirdPersonCamera.tsx`, `FirstPersonCamera.tsx`, `Character.tsx` |
| | `pitch` | `number` | `0.28` | `rotate()` | Read by `ThirdPersonCamera.tsx`, `FirstPersonCamera.tsx` |
| | `zoomDistance` | `number` | `2.6` | `zoom()` | Read by `ThirdPersonCamera.tsx` |
| | `isDragging` | `boolean` | `false` | `setIsDragging()` | Read by `useCameraInput.ts` |
| **`useCharacterStore.ts`** | `animState` | `string` | `'idle'` | `setAnimState()` | Read by `HarshModel.tsx`, `useCharacterAnimations.ts`, `Character.tsx` |
| | `actionState` | `CharacterActionState` | `'free'` | `setActionState()` | Read by `Character.tsx`, `useCharacterActions.ts`, `InteractionPrompt.tsx` |
| | `activePoseId` | `'sit-chair' \| 'lie-bed' \| 'drink-coffee' \| null` | `null` | `setActivePoseId()` | Read by `useCharacterActions.ts`, `FirstPersonCamera.tsx` |
| | `fadeDuration` | `number` | `0.25` | `setAnimState()` | Read by `useCharacterAnimations.ts` |
| **`useDesktopStore.ts`** | `openApp` | `DesktopAppId \| null` | `'projects'` | `openAppWindow()`, `closeAppWindow()`, `resetDesktop()` | Read by `DesktopShell.tsx`, `Taskbar.tsx` |
| | `selectedProjectId` | `string \| null` | `null` | `selectProject()` | Read by `ProjectsApp.tsx`, `DesktopShell.tsx` |
| **`useEasterEggStore.ts`** | `discoveredEggs` | `string[]` | `[]` | `openEasterEgg()`, `markEggDiscovered()` | Read by `EasterEggModal.tsx`, `DesktopShell.tsx` |
| | `activeEggId` | `string \| null` | `null` | `openEasterEgg()`, `closeEasterEgg()` | Read by `EasterEggModal.tsx` |
| | `hasSeenCelebration` | `boolean` | `false` | `setHasSeenCelebration()` | Read by `EasterEggModal.tsx` |
| **`useGamesStore.ts`** | `activeGame` | `'menu' \| 'snake' \| 'target-shooting'` | `'menu'` | `setActiveGame()` | Read by `GamesApp.tsx`, `DesktopShell.tsx` |
| | `isPaused` | `boolean` | `false` | `setIsPaused()` | Read by `SnakeGame.tsx`, `TargetShootingGame.tsx` |
| | `snakeHighScore` | `number` | `0` | `updateSnakeHighScore()` | Read by `GamesApp.tsx`, `SnakeGame.tsx` |
| | `targetHighScore` | `number` | `0` | `updateTargetHighScore()` | Read by `GamesApp.tsx`, `TargetShootingGame.tsx` |
| **`useGraphicsStore.ts`** | `quality` | `'low' \| 'medium' \| 'high'` | detected by CPU | `setQuality()`, `stepDownQuality()`, `stepUpQuality()` | Read by `PostProcessingEffects.tsx`, `SettingsPanel.tsx`, `DayNightController.tsx` |
| | `isAuto` | `boolean` | `true` | `setAutoQuality()` | Read by `AdaptivePerformance.tsx` |
| | `userSetManual` | `boolean` | `false` | `setQuality()` | Read by `AdaptivePerformance.tsx` |
| | `bloom` | `boolean` | `true` (med/high) | presets | Read by `PostProcessingEffects.tsx` |
| | `ao` | `boolean` | `true` (high) | presets | Read by `PostProcessingEffects.tsx` |
| | `shadows` | `boolean` | `true` (med/high) | presets | Read by `App.tsx`, `DayNightController.tsx` |
| | `shadowMapSize` | `number` | `1024` | presets | Read by `DayNightController.tsx` |
| | `pixelRatio` | `number` | `1.25` | presets | Read by `App.tsx` |
| **`useInteractionStore.ts`** | `nearestId` | `string \| null` | `null` | `setNearest()` | Read by `InteractionPrompt.tsx`, `useInteractionControls.ts` |
| | `activeId` | `string \| null` | `null` | `openInteraction()`, `closeInteraction()` | Read by `InteractionPanel.tsx`, `App.tsx`, `DesktopShell.tsx` |
| | `discoveredIds` | `string[]` | `[]` | `openInteraction()`, `markDiscovered()` | Read by `ExplorationCounter.tsx`, `MiniMap.tsx` |
| **`useIntroStore.ts`** | `step` | `IntroStep` | `'loading'` | `setStep()`, `skipIntro()`, `enterWorld()` | Read by `IntroOverlay.tsx`, `ThirdPersonCamera.tsx`, `Character.tsx` |
| | `loadProgress` | `number` | `0` | `setLoadProgress()` | Read by `IntroOverlay.tsx` |
| | `isLoaded` | `boolean` | `false` | `setIsLoaded()` | Read by `IntroOverlay.tsx` |
| | `introCameraProgress` | `number` | `0` | `setIntroCameraProgress()` | Read by `ThirdPersonCamera.tsx` |
| **`useLivingRoomStore.ts`** | `lampOn` | `boolean` | `true` | `toggleLamp()`, `setLampOn()` | Read by `Lamp.tsx`, `Switchboard.tsx`, `DayNightController.tsx` |
| | `fanOn` | `boolean` | `true` | `toggleFan()` | Read by `CeilingFan.tsx`, `Switchboard.tsx` |
| | `fanSpeed` | `number` | `1` | `setFanSpeed()` | Read by `CeilingFan.tsx` |
| | `acOn` | `boolean` | `true` | `toggleAc()`, `setAcOn()` | Read by `AirConditioner.tsx`, `TouchControls.tsx` |
| | `acTemp` | `number` | `22` | `setAcTemp()` | Read by `AirConditioner.tsx`, `InteractionPrompt.tsx` |
| | `roomTemp` | `number` | `22.4` | `setRoomTemp()` | Read by `AirConditioner.tsx`, `InteractionPrompt.tsx` |
| | `coffeeLevel` | `number` | `1` | `drinkCoffee()`, `setCoffeeLevel()` | Read by `CoffeeMug.tsx` |
| | `isDrinking` | `boolean` | `false` | `drinkCoffee()` | Read by `CoffeeMug.tsx`, `Character.tsx` |
| | `isRefilling` | `boolean` | `false` | `drinkCoffee()` | Read by `CoffeeMug.tsx` |
| | `timeMode` | `TimeMode` | `'auto'` | `setTimeMode()` | Read by `SettingsPanel.tsx`, `DayNightController.tsx` |
| | `timeOfDay` | `number` | `0` | `setTimeOfDay()` | Read by `DayNightController.tsx` |
| **`usePlayerStore.ts`** | `position` | `[number, number, number]` | `[0, 0.7, 1.2]` | `setPosition()` | Read by `MiniMap.tsx`, `FirstPersonCamera.tsx`, `ThirdPersonCamera.tsx` |
| | `rotation` | `number` | `0` | `setRotation()` | Read by `MiniMap.tsx` |
| **`useRoomEffectsStore.ts`** | `deskLampBoost` | `number` | `0` | `setDeskLampBoost()` | Read by `Lamp.tsx` |
| | `windowGlowBoost` | `number` | `0` | `setWindowGlowBoost()` | Read by `WindowFrame.tsx` |
| | `certificateWallGlow` | `number` | `0` | `setCertificateWallGlow()` | Read by `CertificateWall.tsx` |
| | `memoryWallGlow` | `number` | `0` | `setMemoryWallGlow()` | Read by `MemoryWall.tsx` |
| **`useTouchControlsStore.ts`**| `isTouch` | `boolean` | `false` | `setIsTouch()` | Read by `TouchControls.tsx`, `InteractionPrompt.tsx` |
| | `moveX`, `moveZ` | `number` | `0`, `0` | `setMoveInput()`, `resetMoveInput()` | Read by `Character.tsx` |
| | `isRunning` | `boolean` | `false` | `setMoveInput()` | Read by `Character.tsx` |
| | `isTyping` | `boolean` | `false` | `setIsTyping()` | Read by `TouchControls.tsx` |

---

## 4. DATA FILES (`src/data/`)

### 4.1 Master Interactables Registry (`interactables.ts`)

| ID | Label | Prompt Text | Position [x, y, z] | Radius | Section ID | Kind | Portfolio Item? | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `desk-pc` | PC Setup | Explore Projects | `[-0.60, 0.02, -1.10]` | 1.4m | `projects` | `panel` | **Yes** | Opens HarshOS Desktop |
| `notebook` | Developer Notebook | Open Notebook | `[-1.60, 0.02, -1.10]` | 1.4m | `about` | `panel` | **Yes** | Opens NotebookPanel |
| `bookshelf` | Bookshelf | Discover My Skills | `[-1.85, 0.02, 1.80]` | 1.4m | `skills` | `panel` | **Yes** | Opens BookshelfPanel |
| `window` | Mountain Vista Window | Enjoy the Mountain View | `[-2.15, 0.02, -0.60]` | 1.4m | `vision` | `panel` | **Yes** | Opens VisionPanel |
| `memories` | Memory Wall | Relive My Journey | `[-2.15, 0.02, 0.85]` | 1.4m | `memories` | `panel` | **Yes** | Opens MemoriesPanel |
| `contact` | Contact Station | Connect With Me | `[1.10, 0.02, 1.30]` | 1.4m | `contact` | `panel` | **Yes** | Opens ContactPanel |
| `chair` | Gaming Chair | Sit Down | `[-1.10, 0.02, -0.30]` | 1.3m | `chair` | `action` | No | Triggers `sit-chair` pose |
| `bed` | Bed | Lie Down | `[0.45, 0.02, -1.35]` | 1.4m | `bed` | `action` | No | Triggers `lie-bed` pose |
| `switchboard` | Switchboard | Use Switchboard | `[0.90, 0.02, 1.95]` | 1.3m | `switchboard`| `action` | No | E: Lamp, F: Fan |
| `ac-switch` | Air Conditioner | Toggle Air Conditioner | `[-0.10, 0.02, 1.85]` | 1.4m | `ac-switch` | `action` | No | E: AC Power, T: Temp Cycle |
| `coffee` | Coffee Mug | Drink Coffee | `[-1.40, 0.02, -1.05]` | 1.3m | `coffee` | `action` | No | Triggers coffee drinking |
| `drawer-note` | Desk Drawer | Open Secret Drawer | `[-1.90, 0.02, -1.05]` | 1.3m | `drawer-note`| `action` | No | Opens EasterEggModal |
| `secret-cube` | Glitched Artifact | Inspect Glitched Cube | `[-1.85, 0.02, 1.80]` | 1.3m | `secret-cube`| `action` | No | Opens EasterEggModal |

Total Interactables: **13** (6 Portfolio Items counted in Exploration Counter, 7 Action Props).

---

### 4.2 Content Data Auditing

- **`projects.ts` (4 entries):**
  - Fields: `id`, `title`, `tagline`, `overview`, `problemStatement`, `solution`, `keyFeatures`, `technologies`, `architecture`, `challenges`, `outcomes`, `screenshots`, `githubUrl`, `liveUrl`, `status`.
  - **Real values:**
    - Entry 1: `title: "CrowdSense"`, `tagline: "AI-based crowd density monitoring and crowd safety system"`.
    - Entry 2: `title: "VYOMX"`, `tagline: "Space telemetry and interactive ground station dashboard"`.
    - Entry 3: `title: "Contactless Food Safety Scanner"`, `tagline: "AI-based food safety analysis concept"`.
    - Entry 4: `title: "Aurvion"`, `tagline: "Premium jewelry e-commerce brand"`.
  - **Placeholders:** Every entry's `problemStatement`, `solution`, `keyFeatures`, `technologies`, `architecture`, `challenges`, `outcomes`, and `status` contain `"[SAMPLE - replace me]"`. `screenshots: []`, `githubUrl: ""`, `liveUrl: ""` are empty.

- **`profile.ts` (1 entry):**
  - Fields: `name`, `headline`, `intro`, `educationBackground`, `developerJourney`, `interests`, `hobbies`, `strengths`, `currentLearningGoals`, `futureAmbitions`.
  - **Real values:** `name: "Harsh"`.
  - **Placeholders:** All remaining 9 fields contain `"[SAMPLE - replace me]"` (e.g. `headline: "[SAMPLE - replace me] Full-Stack & 3D Interactive Web Developer"`).

- **`skills.ts` (8 categories):**
  - Categories: Education, Programming Languages, Web Development, Artificial Intelligence, Machine Learning, Database & Cloud, Development Tools, Systems & Graphics.
  - **Placeholders:** All items across all 8 categories contain `"[SAMPLE - replace me]"` (e.g. `"[SAMPLE - replace me] TypeScript"`).

- **`vision.ts` (1 entry):**
  - Fields: `careerGoals`, `technologiesToExplore`, `futureAmbitions`, `ideasToBuild`, `developerVision`.
  - **Placeholders:** All 5 fields contain `"[SAMPLE - replace me]"`.

- **`certificates.ts` (3 entries):**
  - Entries: `Hackathon Winner Award`, `Advanced Cloud Architecture Certification`, `National Coding Competition Finalist`.
  - **Placeholders:** Every title, organization, date, and description contains `"[SAMPLE - replace me]"`. All `image: ""` strings are empty.

- **`experiences.ts` (3 entries):**
  - Entries: `All-Night Hackathon Collaboration`, `Campus Tech Symposium Presentation`, `Team Product Milestone Celebration`.
  - **Placeholders:** All fields contain `"[SAMPLE - replace me]"`. All `image: ""` strings are empty.

- **`socialLinks.ts` (4 links):**
  - Links: `email`, `linkedin`, `github`, `instagram`.
  - **Status:** All `url` and `handle` values are completely empty `""` (Unset).

- **`contactConfig.ts`:**
  - `CONTACT_ENDPOINT`: `(import.meta.env.VITE_CONTACT_ENDPOINT as string)?.trim() || ''`.
  - **Status:** Empty string `""` because `.env` is absent. `isContactConfigured` evaluates to `false`.

- **`poses.ts` (3 entries):**
  - Fully real and verified configuration:
    - `sit-chair`: `anchor: [-1.10, 0.45, -0.95]`, `yaw: Math.PI`, `approachPoint: [-1.10, 0.02, -0.30]`, `exitPoint: [-1.10, 0.70, -0.30]`, `eyeHeightOffset: 1.05`.
    - `lie-bed`: `anchor: [1.65, 0.65, -1.35]`, `yaw: 0`, `approachPoint: [0.45, 0.02, -1.35]`, `exitPoint: [0.45, 0.70, -1.35]`, `eyeHeightOffset: 0.65`.
    - `drink-coffee`: `anchor: [-1.40, 0.70, -1.05]`, `yaw: Math.PI`, `approachPoint: [-1.40, 0.02, -1.05]`, `exitPoint: [-1.40, 0.70, -1.05]`, `eyeHeightOffset: 1.50`.

---

## 5. ROOM LAYOUT (EXACT NUMBERS)

### 5.1 Room Dimensions and Wall Positions
- **Dimensions:** Width `7.20m` (X from `-2.80m` to `+4.40m`), Length `5.20m` (Z from `-2.60m` to `+2.60m`), Height `2.80m` (Y from `0.00m` to `2.80m`).
- **Floor:** Center `[0.80, 0.00, 0.00]`, Size `[7.20, 5.20]`.
- **Ceiling:** Center `[0.80, 2.80, 0.00]`, Size `[7.20, 5.20]`.
- **North Wall:** `Z = -2.60m` (Back Wall, greige `#D5CFC3`, Walnut acoustic slat feature panel from X `-2.80m` to `+0.20m`).
- **South Wall:** `Z = +2.60m` (Front Wall with Entrance Door at X `1.75m`, switchboard at X `0.90m`, AC at X `-0.10m`).
- **West Wall:** `X = -2.80m` (Window Wall, picture window opening from Z `-1.70m` to `+0.50m`).
- **East Wall:** `X = +4.40m` (Extended Lounge suite wall with modern couch, gallery frames, and standing lamp).

---

### 5.2 Component Placements

| Component | File Path | World Position [x, y, z] | Rotation [x, y, z] | Approximate Dimensions [w, h, d] |
| :--- | :--- | :--- | :--- | :--- |
| **Desk** | `Desk.tsx` | `[-1.10, 0.00, -1.90]` | `[0, 0, 0]` | `1.90m x 0.75m x 0.90m` |
| **Gaming Chair** | `GamingChair.tsx` | `[-1.10, 0.00, -0.95]` | `[0, Math.PI, 0]` | `0.65m x 1.25m x 0.65m` |
| **Platform Bed** | `Bed.tsx` | `[1.65, 0.00, -1.35]` | `[0, 0, 0]` | `1.60m x 0.70m x 2.10m` |
| **Bookshelf** | `Bookshelf.tsx` | `[-1.85, 0.00, 2.35]` | `[0, 0, 0]` | `1.30m x 2.20m x 0.35m` |
| **Contact Station** | `ContactStation.tsx`| `[1.85, 0.00, 1.30]` | `[0, -Math.PI / 2, 0]` | `0.70m x 1.10m x 0.45m` |
| **Split AC** | `AirConditioner.tsx`| `[-0.10, 2.28, 2.52]` | `[0, Math.PI, 0]` | `1.04m x 0.32m x 0.24m` |
| **Ceiling Fan** | `CeilingFan.tsx` | `[0.00, 2.55, 0.00]` | `[0, dynamic, 0]` | `2.20m dia x 0.50m drop` |
| **Desk Task Lamp** | `Lamp.tsx` | `[-1.75, 0.74, -2.12]` | `[0, 0.35, 0]` | `0.15m x 0.55m x 0.35m` |
| **Coffee Mug** | `CoffeeMug.tsx` | `[-0.60, 0.74, -1.72]` | `[0, 0, 0]` | `0.11m x 0.10m x 0.09m` |
| **Switchboard** | `Switchboard.tsx` | `[0.90, 1.25, 2.585]` | `[0, Math.PI, 0]` | `0.33m x 0.23m x 0.02m` |
| **Window Frame** | `WindowFrame.tsx` | `[-2.80, 1.40, -0.60]` | `[0, Math.PI / 2, 0]` | `2.20m w x 1.85m h` |
| **Artist Easel** | `Easel.tsx` | `[-2.15, 0.00, 0.65]` | `[0, Math.PI/4 + 0.18, 0]` | `0.82m x 1.65m x 0.75m` |
| **Bedside Gramophone**| `Gramophone.tsx`| `[2.80, 0.00, -2.15]` | `[0, -0.25, 0]` | `0.50m x 1.05m x 0.50m` |
| **Minecraft Girl** | `MinecraftGirl.tsx`| `[-0.65, 0.00, 2.15]` | `[0, -0.35, 0]` | `0.45m x 1.80m x 0.45m` |
| **Minecraft Camera**| `MinecraftCamera.tsx`| `[4.05, 0.00, -2.15]` | `[0, -Math.PI / 4, 0]` | `0.55m x 1.50m x 0.55m` |
| **Minecraft Aquarium**| `MinecraftAquarium.tsx`| `[2.65, 0.00, 2.38]` | `[0, Math.PI, 0]` | `0.92m x 1.20m x 0.48m` |
| **Lounge Couch** | `LoungeFurniturePack.tsx`| `[4.05, 0.00, 0.10]` | `[0, -Math.PI / 2, 0]` | `0.85m x 0.85m x 1.90m` |
| **Lounge Lamp** | `LoungeFurniturePack.tsx`| `[4.05, 0.00, -1.15]` | `[0, 0, 0]` | `0.45m x 1.65m x 0.45m` |
| **Entrance Door** | `EntranceDoor.tsx` | `[1.75, 1.075, 2.59]` | `[0, Math.PI, 0]` | `0.96m x 2.15m x 0.08m` |
| **Memory Wall** | `MemoryWall.tsx` | `[-2.78, 1.50, 0.85]` | `[0, Math.PI / 2, 0]` | `1.80m w x 1.20m h` |
| **Certificate Wall** | `CertificateWall.tsx`| `[0.80, 1.60, -2.58]`| `[0, 0, 0]` | `2.40m w x 1.10m h` |

---

### 5.3 Collision Boundaries & AABB Boxes (`collision.ts`)

- **Room Outer Navigation Bounds (capsule radius `0.35m` offset):**
  - `minX = -2.45m`
  - `maxX = +4.05m`
  - `minZ = -2.25m`
  - `maxZ = +2.25m`

#### Exact Collision AABB Boxes

| Obstacle Name | Belongs To Object | Min Bounds [x, y, z] | Max Bounds [x, y, z] |
| :--- | :--- | :--- | :--- |
| `Desk` | Main Workstation Desk | `[-2.05, 0.00, -2.35]` | `[-0.15, 1.00, -1.45]` |
| `Chair` | Gaming Chair | `[-1.425, 0.00, -1.275]` | `[-0.775, 1.00, -0.625]` |
| `Bed` | Bed Platform & Headboard | `[0.85, 0.00, -2.40]` | `[2.45, 1.00, -0.30]` |
| `Bookshelf` | South Wall Bookshelf | `[-2.50, 0.00, 2.17]` | `[-1.20, 2.20, 2.53]` |
| `MinecraftGirl` | Companion Character | `[-0.85, 0.00, 1.95]` | `[-0.45, 1.85, 2.35]` |
| `MinecraftCamera`| Tripod Vintage Camera | `[3.80, 0.00, -2.40]` | `[4.30, 1.60, -1.90]` |
| `Gramophone` | Bedside Nightstand & Gramophone | `[2.55, 0.00, -2.40]` | `[3.05, 1.10, -1.90]` |
| `MinecraftAquarium`| Credenza Cabinet & Aquarium | `[2.20, 0.00, 2.14]` | `[3.10, 1.25, 2.58]` |
| `ContactStation` | Holographic Contact Pedestal | `[1.50, 0.00, 1.05]` | `[2.20, 1.20, 1.55]` |
| `Plant` | Corner Floor Plant | `[-2.575, 0.00, -2.375]` | `[-2.125, 1.00, -1.925]` |
| `LoungeCouch` | Modern Lounge Sofa | `[3.45, 0.00, -0.85]` | `[4.35, 0.90, 1.05]` |
| `LoungePlants` | Designer Indoor Plants | `[3.70, 0.00, 1.15]` | `[4.35, 1.00, 2.25]` |
| `LoungeLamp` | Standing Floor Brass Lamp | `[3.80, 0.00, -1.40]` | `[4.35, 1.60, -0.90]` |

---

## 6. LIGHTING AND ATMOSPHERE

### 6.1 Real-Time Lights (Strictly 4 Lights)
Managed in `DayNightController.tsx`:
1. **HemisphereLight (Atmospheric Ambient Fill):**
   - Position: `[0, 2.7, 0]`
   - Sky Color: Dynamic (`#BAE6FD` Day, `#f97316` Evening, `#38bdf8` Night)
   - Ground Bounce Color: Dynamic (`#EDE6D8` Day, `#8C5338` Evening, `#2A272E` Night)
   - Intensity: `1.30` (Day), `0.90` (Evening), `0.52` (Night)
   - Shadows: No
2. **DirectionalLight (Sunbeam / Moonlight):**
   - Position: `[-4.5, 3.8, -0.6]`, Target: `[-0.5, 0.6, -0.8]`
   - Color: `#FFFDF5` (Day), `#fb923c` (Evening), `#c7d2fe` (Night)
   - Intensity: `2.80` (Day), `2.00` (Evening), `1.20` (Night)
   - Shadows: Yes (`castShadow`), Shadow map size: `512` (Low) / `1024` (Med/High), bias: `-0.0003`, near: `0.5`, far: `12`, orthographic bounds `[-2.8, 2.8]`.
3. **PointLight (Desk Task Lamp):**
   - Position: `[-1.75, 1.15, -1.95]`
   - Color: `#fef08a`
   - Base Intensity: `0.15` (Day), `1.10` (Evening), `1.45` (Night)
   - Distance: `3.2m`, Decay: `2.0`
   - Dynamic Reaction: Boosted by `+1.0` when developer notebook is open; toggled off by `lampOn: false`.
4. **PointLight (Battlestation Violet RGB Accent):**
   - Position: `[-0.70, 1.05, -2.35]`
   - Color: `#c084fc` (Day), `#a855f7` (Eve/Night)
   - Base Intensity: `0.15` (Day), `0.75` (Evening), `0.95` (Night)
   - Distance: `3.0m`, Decay: `2.0`
   - Dynamic Reaction: Softened by `0.55x` when character is lying in bed.

---

### 6.2 Keyframe Interpolation & Auto Mode
- **Auto Mode Logic (`getResolvedTimeMode`):**
  - Hour `>= 7 && < 17` (7:00 AM - 4:59 PM): `'day'`
  - Hour `>= 17 && < 19.5` (5:00 PM - 7:29 PM): `'evening'`
  - Hour `>= 19.5 || < 7` (7:30 PM - 6:59 AM): `'night'`
- **Interpolation:** In `useFrame`, colors are lerped using `color.lerp(target, dt * 2.5)` and intensities damp with `THREE.MathUtils.damp(cur, target, 3.0, dt)`.
- **Bed Mode Multiplier:** When `actionState === 'lying'`, room lighting dims by `0.72x` and RGB softens by `0.55x`.

---

### 6.3 Emissive Materials & Faux Glow Planes
- **PC Monitor Screen:** Canvas texture with emissive glow (`#38bdf8`, `emissiveIntensity: 0.8`).
- **Desk Task Lamp Bulb:** Emissive sphere with `emissiveIntensity: 1.8` (boosted to `3.0` during notebook review).
- **Desk Lamp Faux Light Cone:** Semi-transparent inverted cone geometry (`opacity: 0.09` to `0.18`).
- **Minecraft Torches:** Emissive flame blocks (`emissive: #ff8800`, `emissiveIntensity: 1.8`).
- **Minecraft Aquarium Water:** Translucent glowing water plane (`emissive: #0284c7`, `emissiveIntensity: 0.6`).
- **Ceiling Downlights:** Emissive circle bezels (`#FAF7F2`).

---

### 6.4 Post-Processing Pipeline (`PostProcessingEffects.tsx`)
- **Low Preset:** Entirely bypassed (`return null`).
- **Medium Preset:**
  - `multisampling: 0`
  - `Bloom`: `luminanceThreshold: 0.85`, `luminanceSmoothing: 0.3`, `intensity: 0.45`, `mipmapBlur: true`
  - `SMAA`: Subpixel Morphological Antialiasing enabled.
- **High Preset:**
  - `Bloom`: `luminanceThreshold: 0.85`, `luminanceSmoothing: 0.3`, `intensity: 0.40`, `mipmapBlur: true`
  - `N8AO`: `halfRes: true`, `aoRadius: 0.5`, `intensity: 0.6`, `distanceFalloff: 0.2`, `quality: "low"`
  - `SMAA`: Enabled.

---

### 6.5 Procedural Textures & Outdoor Backdrop
- **Wood Flooring:** Procedural 512x512 canvas texture generated with alternating oak plank borders and subtle wood grain noise (`getProceduralWoodTexture`).
- **Plaster Walls:** Procedural 256x256 canvas texture with subtle stipple noise (`getProceduralWallTexture`).
- **Outdoor Backdrop (`OutdoorBackdrop.tsx`):** Multi-layered architectural skyline with procedural skyscraper blocks, rain streaks, window light grids, and sky gradient.

---

## 7. CHARACTER SYSTEM

### 7.1 Asset Status & Model Loading
- **Current Files in `src/assets/character/`:**
  - `README.md` (`906 bytes`)
  - `.gitkeep` (`2 bytes`)
  - `harsh.fbx`: **MISSING** (File does not exist).
  - Animation clips (`idle.fbx`, `walk.fbx`, `run.fbx`, etc.): **MISSING**.
- **Model Loader Resolution (`HarshModel.tsx`):**
  - Dynamically scans `import.meta.glob('/src/assets/character/*.{fbx,glb,gltf}')`.
  - When external files are absent, it safely falls back to **`MinecraftBoy.tsx`** without throwing errors.
- **`CharacterErrorBoundary.tsx`:** Catches any runtime GLTF/FBX parse or animation errors and swaps to `MinecraftBoy`.

---

### 7.2 Kinematics, Speeds, and Dimensions
- **Walk Speed:** `3.2 m/s`
- **Run Speed:** `6.0 m/s` (triggered by holding Shift or dragging virtual joystick past threshold)
- **Acceleration:** `22.0 m/s²`
- **Friction:** `16.0 m/s²`
- **Collision Radius:** `0.35m` (Capsule diameter `0.70m`)
- **Character Height:** `1.70m`
- **Animation Crossfade:** `0.20s` to `0.25s` smooth dampening between locomotion states.

---

### 7.3 Action States Implementation (Step 10B Roadmap)

| Action | Implementation Status | How It Works & Poses Registry |
| :--- | :--- | :--- |
| **Sit at Chair & Type** | **Implemented** | Character walks to approach point `[-1.10, 0.02, -0.30]`, faces yaw `Math.PI`, sits on anchor `[-1.10, 0.45, -0.95]`. When PC desktop opens (`desk-pc`), limbs transition into active typing on the mechanical keyboard. |
| **Lie Down on Bed** | **Implemented** | Character walks to approach point `[0.45, 0.02, -1.35]`, rotates to yaw `0`, lies on bed anchor `[1.65, 0.65, -1.35]` at height `0.65m`. Room lighting automatically dims to relaxing ambiance. |
| **Drink Coffee** | **Implemented** | Character approaches coffee position `[-1.40, 0.02, -1.05]`, faces desk, plays drinking animation while desk mug lifts and coffee level decreases. |
| **Stand / Get Up** | **Implemented** | Pressing `Esc`, WASD movement, or mobile 'Stand Up' button smoothly plays standing transition and places character at free exit point outside furniture bounds. |

---

### 7.4 Developer Pose Tuner
- **Existence:** Fully implemented in `src/components/UI/PoseTuner.tsx`.
- **How to Open:** Automatically active in dev mode (`import.meta.env.DEV`). Rendered in bottom-right corner as `🔧 Pose Tuner ▼`. Clicking toggles sliders for Anchor X/Y/Z, Yaw, Approach, and Eye Offset, with a button to export snippets.

---

## 8. CAMERA AND CONTROLS

### 8.1 Camera Settings

#### Third-Person Camera (`ThirdPersonCamera.tsx`)
- **Default Position:** Spherical orbit clamped between distance `1.4m` and `3.6m` (default `2.6m`).
- **Pitch Limits:** Clamped to `[0.05, 1.35]` radians (prevents flipping upside down or clipping through floor).
- **Yaw Orbit:** Continuous 360° mouse drag rotation.
- **Room Boundary Clamping:** Camera coordinates are clamped to room interior margins (`X: [-2.65, 4.25]`, `Y: [0.40, 2.65]`, `Z: [-2.45, 2.45]`) to prevent looking through external walls.
- **Damping:** `THREE.MathUtils.damp` at rate `6.0` (smooth 0.5s transition).

#### First-Person Camera (`FirstPersonCamera.tsx`)
- **Eye Height:** Dynamically tracks player position + eye offset (`1.15m` default standing, `1.05m` seated, `0.65m` lying).
- **Pitch Limits:** Clamped to `[-1.25, 1.25]` radians (looking straight up to looking down at shoes).
- **Damping:** Position damped at rate `6.0`, look-at target damped at rate `8.0`.

---

### 8.2 Controls and Keybindings
- **`W` / `ArrowUp`:** Move forward.
- **`S` / `ArrowDown`:** Move backward.
- **`A` / `ArrowLeft`:** Strafe left.
- **`D` / `ArrowRight`:** Strafe right.
- **`Shift`:** Run (increases speed from 3.2 to 6.0 m/s).
- **`Mouse Left Drag`:** Orbit/look around.
- **`Mouse Scroll Wheel`:** Zoom in / zoom out (Third person).
- **`V`:** Toggle Camera mode (First Person ↔ Third Person).
- **`E`:** Primary interaction (Open modal / Sit at chair / Lie in bed / Drink coffee / Toggle AC).
- **`F`:** Secondary interaction on switchboard (Toggle Ceiling Fan).
- **`T`:** Cycle AC thermostat temperature (24°C → 22°C → 20°C → 18°C → 26°C).
- **`Esc`:** Hierarchical modal exit / Stand up from posture.

---

### 8.3 Input Isolation and Escape Hierarchy
- **Typing Isolation:** `useKeyboard.ts` listens to `focusin` / `focusout` on `HTMLInputElement`, `HTMLTextAreaElement`, and `contentEditable`. While typing, all WASD movement and camera shortcuts are bypassed.
- **Hierarchical Esc Order:**
  1. If playing mini-game inside Arcade → Exits game to Arcade Menu.
  2. If viewing Project Detail inside Projects app → Back to Projects list.
  3. If app window is open inside HarshOS → Closes active window.
  4. If HarshOS desktop is open with no window → Exits desktop back to seated 3D room.
  5. If standalone portfolio panel is open → Closes panel.
  6. If character is seated or lying down → Stands up to free navigation.

---

## 9. UI AND PANELS

### 9.1 HUD & Overlay Architecture

| Component | Screen Location | Styling / Visual Formula | Trigger / Open / Close Behavior |
| :--- | :--- | :--- | :--- |
| **Exploration Counter** | Top-Left (`top: 24, left: 24`) | Liquid Frosted Glass (`rgba(255,255,255,0.22)` to `0.08`), crisp black text `#0f172a` | Always visible during exploration; counts unique portfolio discoveries (0/6). |
| **Quick Navigation** | Top-Center (`top: 24, left: 50%`) | Liquid Frosted Glass pill bar | Always visible; clicking any badge teleports/opens corresponding section. |
| **Camera Switcher** | Top-Right (`top: 24, right: 24`) | Liquid Frosted Glass card | Toggles 1st/3rd person; clickable buttons or pressing `V`. |
| **Settings Gear** | Top-Right (`top: 180, right: 24`)| 42x42px circular Liquid Frosted Glass button | Toggles SettingsPanel flyout drawer. |
| **Audio Mute Button**| Top-Right (`top: 232, right: 24`)| 42x42px circular Liquid Frosted Glass button | Instant toggle for audio mute/unmute. |
| **Interaction Prompt**| Bottom-Center (`bottom: 80`) | Liquid Frosted Glass pill with keyboard badges | Automatically animates into view when within proximity radius of any interactable. |
| **Mini-Map** | Top-Left (`top: 72, left: 24`) | Liquid Frosted Glass card with 2D canvas radar | Shows real-time room blueprint, player direction arrow, and discovery dots. Collapsible with `▲/▼`. |
| **Controls Helper** | Bottom-Center (`bottom: 24`) | Liquid Frosted Glass bar (`WASD Move...`) | Static keyboard guide on desktop; hidden on touch devices. |
| **Touch Controls** | Bottom corners | Liquid Frosted Glass joystick and action pills | Auto-detected on mobile/touch devices; hides on desktop. |

---

### 9.2 HarshOS Desktop Environment (`DesktopShell.tsx`)
- **Display:** Appears on ultrawide curved desk monitor and opens into full-screen interactive desktop when activating `desk-pc`.
- **Taskbar:** Bottom bar with start button, running app pills, volume indicator, and digital clock.
- **Applications:**
  - **Projects App (`ProjectsApp.tsx`):** Filterable grid of featured projects (CrowdSense, VYOMX, Food Scanner, Aurvion) with architecture diagrams and detail view.
  - **About App:** Quick developer overview.
  - **Terminal App (`TerminalApp.tsx`):** Functional command prompt responding to `help`, `about`, `projects`, `skills`, `status`, and `clear`.
  - **Games App (`GamesApp.tsx`):** Cyberpunk arcade launcher featuring:
    - *Cyber Snake (`SnakeGame.tsx`):* Arrow key / WASD snake with speed levels and high scores.
    - *Target Reflex (`TargetShootingGame.tsx`):* 30-second reflex target shooting game.
  - **Settings App (`SettingsApp.tsx`):** In-OS wallpaper and sound toggles.

---

### 9.3 Contact Form Implementation (`ContactPanel.tsx`)
- **Form Fields:** `name`, `email`, `subject`, `message`, `honeypot`.
- **Validation Rules:**
  - Name: Required, 2 to 80 characters.
  - Email: Valid regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
  - Subject: Required, 2 to 100 characters.
  - Message: Required, 10 to 2000 characters.
- **Cooldown Timer:** 30-second countdown between submissions to prevent spamming.
- **Honeypot:** Hidden field `honeypot`. If filled by automated bot scripts, submission is discarded silently.
- **Endpoint Status:** Currently unconfigured (`VITE_CONTACT_ENDPOINT` unset); gracefully alerts user with offline status notice.

---

## 10. LIVING-ROOM FEATURES

### 10.1 Interactive Devices
- **Dual-Rocker Switchboard (`Switchboard.tsx`):**
  - Left Switch (`Key E`): Toggles desk lamp task light. Tilts rocker ±0.22 rad, updates amber LED.
  - Right Switch (`Key F`): Toggles ceiling fan. Tilts rocker ±0.22 rad, updates emerald LED, triggers wind loop sound.
- **Ceiling Fan (`CeilingFan.tsx`):**
  - Center Y = 2.55m. 4 walnut blades spin up to 8.5 rad/s with motion blur disc.
- **Air Conditioner (`AirConditioner.tsx`):**
  - Located on South Wall at `[-0.10, 2.28, 2.52]`.
  - Louver flap swings downward when ON.
  - Dynamic canvas display shows current set temperature (e.g. `22°C`).
  - Pressing `Key T` cycles set point (`24°C → 22°C → 20°C → 18°C → 26°C`). Room temperature realistically drifts toward set point.
- **Coffee Mug (`CoffeeMug.tsx`):**
  - Located at `[-0.60, 0.74, -1.72]`.
  - Liquid level decreases by 25% per drink (`drinkCoffee()`).
  - Dynamic steam particles drift upward and fade as cup empties.
  - Auto-refills back to 100% after reaching empty.
- **Room Reactions Matrix:**
  - *Notebook open:* Desk lamp intensity increases from default to `+1.0` lux boost.
  - *Bed Lie Down:* Room lighting dims by `0.72x`, RGB accent softens by `0.55x`.
  - *AC Power:* Louver opens, cold vapor ribbons appear, room temp gradually cools.

---

## 11. WHAT IS MISSING OR UNFINISHED

### 11.1 Roadmap Audit Checklist

| Phase / Feature | Status | Notes |
| :--- | :--- | :--- |
| **1. Setup & Graybox** | **DONE** | Complete 7.2m x 5.2m extended room shell with architectural trims. |
| **2. Camera System** | **DONE** | 1st/3rd person modes, orbit clamping, boundary checks, smooth damping. |
| **3. Proximity Interactions** | **DONE** | Dynamic distance calculation, prompt pills, keyboard and touch triggers. |
| **4. Visual & Shader Upgrade** | **DONE** | ACES Filmic Tone Mapping, procedural wood/plaster, shadow gaps, materials. |
| **5. PC Desktop & Projects** | **DONE** | HarshOS desktop, window manager, project browser, project detail modal. |
| **6. Notebook, Bookshelf, Window**| **DONE** | Two-page bio journal, 8-category skill bookshelf, scenic mountain window. |
| **7. Certificate & Memory Walls** | **DONE** | 3D wall frames, lightbox viewer, achievements modal, memories modal. |
| **8. Contact Station & Form** | **DONE** | Pedestal beacon, form validation, cooldown timer, bot honeypot. |
| **9. Living Room & Day/Night** | **DONE** | 3 time presets, auto clock mode, AC thermostat, desk lamp, fan switchboard. |
| **10A. Locomotion & Physics** | **DONE** | WASD + touch joystick kinematics, speed blending, collision capsule. |
| **10B. Character Posture Actions**| **DONE** | State machine for chair sitting, bed lying, coffee drinking, getting up. |
| **11. Retro Mini-Games** | **DONE** | Cyber Snake and Target Reflex arcade games running in HarshOS. |
| **12. Intro, Radar, Sounds, Eggs** | **DONE** | Cinematic intro, 2D radar minimap, Web Audio SFX/BGM, 2 Easter eggs. |
| **13. Real GLB & Baked Lighting** | **PARTIAL** | Procedural Blockbench/Blender models used for all props; external model loader ready but no baked lightmap textures. |
| **14. Mobile Touch & Optimization**| **DONE** | TouchControls joystick, throttled radar canvas, zero useFrame GC allocations. |
| **15. Hand Tracking & Deploy** | **NOT STARTED**| MediaPipe / WebXR hand tracking not built; deploy build verified. |

---

### 11.2 Codebase Placeholders & TODO Audit
- **Project Case Studies (`src/data/projects.ts`):** All 4 projects contain `"[SAMPLE - replace me]"` for problem statements, solutions, key features, technologies, architecture, and outcomes. URLs are empty strings.
- **Developer Profile (`src/data/profile.ts`):** Headline, bio, education, journey, interests, hobbies, and strengths contain `"[SAMPLE - replace me]"`.
- **Technical Skills (`src/data/skills.ts`):** Coursework, languages, frameworks, and tools across all 8 categories contain `"[SAMPLE - replace me]"`.
- **Certificates & Memories (`src/data/certificates.ts`, `src/data/experiences.ts`):** All 6 entries contain `"[SAMPLE - replace me]"` and empty image URLs.
- **Social Media Links (`src/data/socialLinks.ts`):** All 4 links have empty `url: ""` and `handle: ""` strings.
- **Contact Endpoint (`src/data/contactConfig.ts`):** `.env` does not exist; `VITE_CONTACT_ENDPOINT` is unconfigured.
- **UI Fallbacks:**
  - `src/components/Portfolio/ContactPanel.tsx` (line 305): `"Contact links coming soon"`.
  - `src/components/UI/InteractionPanel.tsx` (line 180): `"Content coming soon"` for unregistered prop IDs.

---

## 12. KNOWN PROBLEMS & TECHNICAL DEBT

1. **Large Client Bundle (`index.js` is 1.83 MB):**
   - Three.js, React Three Fiber, React Three Postprocessing, and Drei are bundled into a single chunk. Dynamic `import()` splitting should be added in `vite.config.ts` manualChunks.
2. **Missing External Character Model (`harsh.fbx` / `harsh.glb`):**
   - The Mixamo humanoid model described in initial specifications is absent from `src/assets/character/`. The system currently relies on the procedural `MinecraftBoy.tsx` fallback.
3. **Missing `.env` File:**
   - No `.env` file is present in the workspace. The contact form is in fallback mode.
4. **Collision Margin for Easel:**
   - The artist easel at `[-2.15, 0.00, 0.65]` sits near the window/memory wall corner without an explicit AABB box in `FURNITURE_COLLIDERS` in `collision.ts` (the player cannot easily walk into it due to adjacent bounds, but an explicit box is recommended).
5. **Redundant Graybox File:**
   - `src/components/Room/GrayboxRoom.tsx` is an empty 1-line re-export of `GamingRoomModel.tsx` that can be cleaned up.

---

## 13. PERFORMANCE AUDIT

### 13.1 Graphics & Draw Call Pipeline
- **Real-Time Lights:** Exactly **4** lights (1 Hemisphere, 1 Directional with shadow mapping, 2 Point lights: desk lamp and battlestation RGB).
- **Shadow Maps:** Only the single directional window light casts shadows, clamped to `512` (Low) or `1024` (Medium/High).
- **Zero-Allocation useFrame Hooks:**
  - `DayNightController.tsx` uses pre-allocated static scratch colors (`_cSky`, `_cGround`, `_cDir`, `_cDesk`, `_cViolet`, `_cFog`).
  - `Character.tsx` and camera rigs use static scratch vectors (`scratchEyePos`, `scratchLookTarget`, etc.), creating zero garbage collection stutter.
- **2D Mini-Map Throttling:** Radar canvas redraws are capped at ~22 FPS via `requestAnimationFrame` timestamp delta guards to preserve CPU cycles for WebGL rendering.
- **Tone Mapping:** ACES Filmic Tone Mapping configured on root Canvas with exposure `1.20`.

---

### 13.2 Mobile Touch Readiness
- **Supported Touch Features:**
  - Virtual 360° analog joystick with configurable deadzone (`MOBILE_CONFIG.joystickRadius: 48px`).
  - Dynamic action button cluster (`Stand Up`, `Interact / Use PC`, `Toggle Fan`, `Cycle Temp`, `1P/3P Camera`).
  - Automatic on-screen keyboard typing detection disabling 3D character movement.
  - High-DPI scaling clamped via `useGraphicsStore` pixel ratio.

---

## 14. ASSETS AND CONTENT STATUS

### 14.1 Asset Directories & File Sizes
- **`src/assets/character/`:**
  - `README.md` (`906 bytes`)
  - `.gitkeep` (`2 bytes`)
  - No `.fbx` or `.glb` files present.
- **`public/images/art/`:**
  - `minecraft_logo.png` (`73.4 kB`)
  - `painting1.png` (`18.2 kB`)
  - `painting2.png` (`16.5 kB`)
  - `painting3.png` (`16.8 kB`)
  - `painting4.png` (`11.4 kB`)
- **`public/textures/`:**
  - `easel_texture.png` (`420 bytes`)
  - `minecraft_girl_skin.png` (`1.2 kB`)
- **`public/images/certificates/`:**
  - Only `README.md` (`16 lines`); no image files placed yet.
- **`public/images/memories/`:**
  - Only `README.md` (`16 lines`); no image files placed yet.

---

### 14.2 Environment Variables & Secrets
- `.env` file status: **NOT SET** (File does not exist).
- `.env.example` status: Exists with template `VITE_CONTACT_ENDPOINT=`.
- `VITE_CONTACT_ENDPOINT`: **NOT SET** (Empty string).

---

### 14.3 Content Placeholder Summary

| Section | Real Content | Placeholder Content (`[SAMPLE - replace me]`) |
| :--- | :--- | :--- |
| **Profile** | Name: `"Harsh"` | Headline, bio, education, journey, interests, hobbies, strengths, goals. |
| **Projects** | 4 Project titles and 4 taglines | All problem statements, solutions, architectures, features, outcomes, URLs. |
| **Skills** | 8 Skill category titles and spine colors | All course names, language proficiencies, frameworks, database proficiencies. |
| **Vision** | None | Career goals, technologies to explore, studio ambitions, ideas to build. |
| **Certificates** | 3 Category tags | All 3 certificate titles, issuing organizations, dates, descriptions, images. |
| **Memories** | 3 Category tags | All 3 memory titles, dates, descriptions, photos. |
| **Social Links** | None | Email, LinkedIn, GitHub, Instagram (all 4 URLs are empty). |
| **Easter Eggs** | 2 secret coordinate definitions | 4 secret narrative note contents. |

---
*End of Architectural Audit Report for "Harsh - The Digital World".*
