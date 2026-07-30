---

type: idea
date: 2026-04-04
status: reference
tags:
  - idea
  - brainstorm
---
# DALL-E Image Prompts for PrintPick Printers

Generated 2026-04-03. Target: 1024x1024 PNG. Display size: 96-112px responsive via Next.js Image.

## Visual Style Reference

The existing images use **editorial lifestyle product photography** -- NOT white-background studio shots. Key characteristics:

- Warm, atmospheric lighting (desk lamps, workshop spotlights)
- Contextual scenes (clean desks, maker workshops, home office environments)
- 3D printed objects displayed on or around the printer
- 3/4 angle view of the printer
- Rich, moody tones with cinematic depth-of-field
- FDM printers show filament spools nearby
- Resin printers show cured miniatures/figures around them
- Enclosed printers have visible internal LED lighting (blue or purple glow)
- Small touchscreen visible on applicable models

## Base Prompt Template

All prompts share this suffix:

> Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail

---

## PRIORITY 1: 8 New 2026 Printers

### 1. bambu-lab-p2s

```
A Bambu Lab P2S enclosed CoreXY 3D printer on a clean wooden desk in a modern home office. The printer is a black cube-shaped enclosed design with transparent side panels and a prominent 5-inch color touchscreen on the front. Blue LED strip lighting inside the chamber illuminates a detailed multi-color vase being printed. A quick-swap nozzle is visible on the print head. An AMS 2 Pro multi-color unit sits on top of the enclosure with four spools of different colored filament loaded. Warm desk lamp lighting from the left side. A few small multi-color 3D printed figurines are placed on the desk beside the printer. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

### 2. creality-sparkx-i7

```
A Creality SparkX i7 open-frame bedslinger 3D printer on a bright white desk in a modern, clean room. The printer has a sleek, compact design with a black aluminum frame, RGB status lighting along the base that glows soft blue, and a color touchscreen. A CFS Lite multi-color filament switching unit sits beside the printer with four colorful PLA spools loaded. On the build plate, a multi-color geometric toy is being printed. The printer is lightweight and approachable-looking, about 9kg. Several cheerful multi-color 3D printed objects (a small robot, a keychain, a phone stand) are scattered on the desk. Clean, well-lit environment suggesting beginner-friendliness. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

### 3. creality-hi-combo

```
A Creality Hi Combo enclosed CoreXY 3D printer on a sturdy workshop table. The printer has a die-cast aluminum unibody frame with a dark metallic finish, transparent panels on the sides revealing the CoreXY gantry inside, and a small color screen on the front. A CFS (Creality Filament System) multi-color module sits on top, with four spools of bright PLA filament loaded. Inside the chamber, a tall multi-color model is being printed on the 260x260x300mm build plate. The workspace has organized tools, a few filament spools stacked nearby, and several colorful 3D printed objects on the table. Soft overhead workshop lighting. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

### 4. elegoo-centauri-carbon

```
An Elegoo Centauri Carbon enclosed CoreXY 3D printer on a wooden workbench in a maker space. The printer is a black cube-shaped enclosed design with steel, aluminum, and glass panels. It has a slightly industrial, rugged look with visible steel frame elements. A color touchscreen is on the front face. Soft blue LED internal lighting illuminates a precision-printed mechanical gear assembly on the build plate. A single spool of dark gray PLA sits beside the printer. The environment is a tidy workshop with pegboard tools on the wall behind. The printer looks solid and heavy (17.5kg). A few 3D printed engineering parts and test cubes sit on the bench. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

### 5. elegoo-centauri-carbon-2-combo

```
An Elegoo Centauri Carbon 2 Combo enclosed CoreXY 3D printer with its Canvas multi-color system on a dark wooden desk. The printer is similar to the Centauri Carbon -- a black enclosed cube with glass and steel panels -- but has a 5-inch touchscreen and a 4-spool Canvas multi-color unit mounted on top. The Canvas unit has four brightly colored filament spools (red, blue, yellow, white) with RFID tags visible. Inside the enclosure, blue LED lighting illuminates a multi-color articulated dragon figurine being printed. The desk has a few completed multi-color prints nearby -- a colorful Fallout figure, a geometric vase. Warm ambient lighting from a desk lamp on the right. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

### 6. prusa-core-one

```
A Prusa Core One enclosed CoreXY 3D printer on a sturdy industrial workbench in a professional workshop. The printer has Prusa's signature orange-and-black color scheme -- matte black enclosed frame with orange accent elements on the Nextruder direct drive extruder and structural components. Transparent polycarbonate side panels reveal the CoreXY motion system inside. A color touchscreen is mounted on the front. The 360-degree cooling duct is visible around the nozzle. Warm amber internal lighting. A precision-printed mechanical part sits on the textured PEI build plate. The workbench has calipers, a spool of Prusament filament in orange, and several beautifully finished engineering prints. The environment feels professional and reliable. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

### 7. bambu-lab-h2d

```
A Bambu Lab H2D large-format dual-nozzle 3D printer in a professional maker studio. The printer is a large, imposing black enclosed cube design -- noticeably bigger than other desktop printers at 31kg. It has dual hardened steel nozzles visible on the toolhead, transparent side panels revealing the massive 325x320x325mm build chamber, and blue-white LED internal lighting. A 65C heated chamber is printing a large engineering prototype in two materials -- white primary with dark gray dissolvable supports. A large color touchscreen is on the front. The studio has professional tools, multiple filament spools on a rack nearby (including engineering materials like PA-CF and PC), and a few large finished prints on the desk. The scene conveys premium, prosumer capability. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

### 8. qidi-q1-pro

```
A Qidi Q1 Pro enclosed CoreXY 3D printer on a clean workstation desk. The printer has a fully enclosed dark-colored frame with transparent panels, revealing a heated chamber with warm orange-tinted internal lighting (60C chamber heating visible as a subtle glow). A tri-metal hotend is visible on the print head. A color touchscreen is on the front face. On the build plate, an ABS engineering bracket is being printed with clean layer lines. The workspace has a spool of ABS filament, a spool of nylon, and a few engineering-grade 3D printed parts (brackets, housings, gears) arranged on the desk. The environment is a clean, professional home office / small business workshop. Dual Z-axis motors are subtly visible. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

---

## PRIORITY 2: 26 Existing Printers Missing Images

### FDM Printers

#### 9. bambu-lab-a1

```
A Bambu Lab A1 open-frame FDM 3D printer on a clean light wood desk. The printer has a sleek, modern open-frame design with black aluminum structure, a direct drive extruder, and a compact footprint. No AMS unit attached -- this is the standalone version. A small color display is on the base. On the 256mm build plate, a detailed single-color white architectural model is being printed. A single spool of white PLA filament is mounted on the side spool holder. The desk is tidy with a laptop nearby, a few small white 3D printed objects (a phone stand, a small vase). Clean, modern room with soft natural light from a window. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 10. bambu-lab-p1p

```
A Bambu Lab P1P open-frame CoreXY 3D printer on a wooden desk in a home maker space. The printer has the same CoreXY structure as the P1S but is fully open-frame with no enclosure panels -- black aluminum frame with visible belts and linear rails. The direct drive extruder and the camera module are visible at the top. A spool of gray PETG filament is loaded on the external spool holder. On the build plate, a functional mechanical part is being printed. Tools and a few finished 3D printed objects are scattered on the desk. The environment is a warm home workshop with soft overhead lighting. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 11. creality-k1

```
A Creality K1 enclosed CoreXY 3D printer on a workbench. The printer is a compact black enclosed cube with transparent front and side panels, blue LED internal lighting, and a small color touchscreen at the base. The CoreXY motion system is visible through the panels. On the build plate, a detailed architectural model is printing at high speed. A spool of PLA filament sits beside the printer. The workbench has a few completed prints and basic tools. Clean workshop environment with overhead lighting. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 12. creality-ender-3-v3-ke

```
A Creality Ender 3 V3 KE open-frame bedslinger 3D printer on a desk in a student's room. The printer has a compact, no-frills black frame design with a direct drive extruder, PEI magnetic build plate, and a small color screen on the front. A spool of bright blue PLA is mounted on the side. On the build plate, a small figurine is being printed. The desk has textbooks, a laptop, and a few small 3D printed items (a pencil holder, a keychain). Warm desk lamp lighting. The vibe is affordable, approachable, and practical. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 13. creality-ender-5-s1

```
A Creality Ender 5 S1 cube-frame open FDM 3D printer on a sturdy desk. The printer has a distinctive cube/box-shaped frame (not a typical bedslinger shape) with the build plate moving on the Z-axis inside the rigid cube frame. A Sprite direct drive extruder is visible on the X-axis gantry. The CR Touch probe is visible near the nozzle. A spool of orange PLA sits on the top-mounted spool holder. On the build plate, a tall vase is being printed, taking advantage of the 280mm Z height. The desk has a few tall 3D printed objects. Warm workshop lighting. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 14. creality-cr-m4

```
A Creality CR-M4 massive open-frame FDM 3D printer on a heavy-duty industrial workbench. The printer is very large -- 450x450x470mm build volume -- with a tall, wide black aluminum frame, dual Z motors visible, and a direct drive extruder. A large PEI build plate dominates the base. On the enormous build plate, a large cosplay helmet is being printed in gray PLA. Multiple large filament spools sit nearby. The workshop has industrial lighting, concrete walls, and heavy tools. The printer dwarfs everything else on the bench. The scene conveys serious large-format capability. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 15. flashforge-adventurer-5m

```
A Flashforge Adventurer 5M enclosed FDM 3D printer on a white desk in a bright, clean home office. The printer is a compact enclosed black cube with rounded edges, a viewing window on the front, and a blue LED accent strip. It looks family-friendly and approachable. A small screen is on the front. Inside, a colorful toy is being printed. The desk is tidy with a plant, some stationery, and a few small 3D printed educational toys. Bright, natural daylight from a nearby window. The scene conveys safety and ease of use for families and classrooms. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 16. kingroon-klp1

```
A Kingroon KLP1 compact enclosed CoreXY 3D printer on a small desk. The printer is a compact black enclosed cube with linear rails visible through the side panels, a small color display on the front, and Klipper firmware running. The build volume is 200mm cubed -- noticeably smaller than other enclosed printers. A spool of PETG is loaded. On the build plate, a precision test print is being printed. The desk has electronics components, a soldering iron nearby, and a few small 3D printed enclosures for electronics projects. The vibe is tinkerer/maker with a compact workspace. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 17. artillery-genius-pro

```
An Artillery Genius Pro open-frame FDM 3D printer on a bedroom nightstand-height desk. The printer has a clean, compact black frame with dual Z-axis lead screws visible on both sides, a direct drive extruder, and a PEI build plate. A small monochrome screen is on the front. The scene emphasizes quietness -- the room is a bedroom with soft lighting, a bookshelf nearby, suggesting the silent stepper drivers make it suitable for shared living spaces. A spool of white PLA is mounted on top. A few small, cleanly printed objects sit on the desk. Soft, quiet evening lighting. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 18. qidi-x-smart-3

```
A QIDI X-Smart 3 compact enclosed CoreXY 3D printer on a small home desk. The printer is a very compact enclosed black cube design -- noticeably smaller than other enclosed printers at 175mm build volume. It has transparent side panels, a small color touchscreen, and subtle LED internal lighting. The chamber heating (35C) gives a faint warm glow inside. A spool of PLA is loaded on the external holder. On the build plate, a small detailed figurine is being printed. The small desk has a monitor, keyboard, and a few tiny 3D printed desk accessories. The scene emphasizes how little desk space the printer uses. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 19. sovol-sv06-plus

```
A Sovol SV06 Plus open-frame FDM 3D printer on a workbench. The printer has a wide 300x300mm bed that is noticeably larger than standard printers, with visible linear rails on the X-axis, an all-metal direct drive extruder, and a PEI spring steel build plate. Dual Z-axis lead screws provide stability. A spool of dark green PLA is mounted on top. On the large build plate, a wide terrain piece or board game insert is being printed. The workbench has a few larger 3D printed objects and basic tools. Workshop lighting with warm tones. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 20. sovol-sv07-plus

```
A Sovol SV07 Plus open-frame FDM 3D printer on a maker workbench. The printer has a large 300x300x350mm bed, a black aluminum frame, direct drive extruder, and Klipper firmware displayed on a small screen. It looks similar to a large Ender-style printer but more refined. A spool of dark red PETG filament is mounted on top. On the large build plate, a functional large housing or enclosure is being printed. The workbench has various tools, electronics, and several medium-sized 3D printed functional parts. The vibe is tinkerer/DIY enthusiast. Warm overhead workshop lighting. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 21. elegoo-neptune-4

```
An Elegoo Neptune 4 open-frame FDM 3D printer on a clean desk. The printer has a standard bedslinger design with a black frame, direct drive extruder, PEI build plate, and a small color screen showing Klipper interface. It is compact and lightweight at 9.5kg. A spool of light blue PLA is loaded. On the build plate, a detailed benchy boat is freshly printed. The desk has a few small printed objects and a laptop. Clean, well-lit room with natural light. The scene conveys budget-friendly reliability. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 22. elegoo-neptune-4-max

```
An Elegoo Neptune 4 Max large-format open-frame FDM 3D printer on a heavy workbench. The printer is very large with a 420x420x480mm build volume -- tall, wide black aluminum frame with direct drive extruder and Klipper firmware. A PEI build plate covers the massive base. A spool of silver PLA sits on top. On the huge build plate, a large cosplay chest piece is being printed. The workbench has large-format 3D printed props and parts scattered around. Industrial/garage workshop environment with utility lighting. The printer is clearly the centerpiece of the workspace. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

### Resin Printers

#### 23. anycubic-kobra-3

```
An Anycubic Kobra 3 open-frame CoreXY FDM 3D printer on a clean modern desk. The printer has a sleek open-frame CoreXY design with a black frame, direct drive extruder, camera module, and WiFi connectivity. It is lightweight and modern-looking at 9kg. A spool of yellow PLA is loaded. On the 250mm build plate, a detailed figurine is being printed at 600mm/s speed. The desk has a monitor, a few colorful 3D printed objects, and a tidy workspace. Bright, modern room with warm accent lighting. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 24. anycubic-kobra-2-max

```
An Anycubic Kobra 2 Max large-format open-frame FDM 3D printer on a large workbench. The printer has a massive 420x420x500mm build volume with a wide, tall black aluminum frame, direct drive extruder, and a PEI build plate. WiFi antenna is visible. A spool of gray PLA sits on the top-mounted holder. On the enormous build plate, large cosplay armor pieces are being printed. The workbench has large-format printed props, spray paint cans, and finishing tools. Garage workshop environment with overhead fluorescent lighting and warm accent lights. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 25. anycubic-photon-mono-2

```
An Anycubic Photon Mono 2 compact resin 3D printer on a wooden desk. The printer is a small, compact unit with a black base and a semi-transparent orange/amber UV-blocking cover. It has a simple monochrome screen on the front and a USB port. The cover is lifted slightly to reveal a small build plate with several tiny detailed miniature figurines curing. Several completed gray resin miniatures (D&D characters, small creatures) are arranged on the desk around the printer. A bottle of Anycubic resin sits nearby. Warm desk lamp lighting with a cozy hobby room atmosphere. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 26. anycubic-photon-mono-m5s

```
An Anycubic Photon Mono M5s resin 3D printer on a dark wooden desk in a dedicated resin workspace. The printer is a medium-large resin printer with a black base, a semi-transparent orange/amber UV cover, and a color touchscreen on the front. The cover is partially transparent, showing the 14K LCD screen and a build plate with detailed busts and terrain pieces being printed. Multiple completed gray and dark gray resin prints are displayed around the printer -- detailed busts, terrain tiles, and large miniatures. A bottle of Anycubic plant-based resin and nitrile gloves sit nearby. Moody workshop lighting with purple UV accent glow. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 27. creality-halot-mage-pro

```
A Creality Halot-Mage Pro resin 3D printer on a clean workstation. The printer has a distinctive Creality design with a black base, a red/orange tinted UV-blocking cover, and a color touchscreen on the front. The integral light source is a distinguishing feature. The cover shows the build plate descending with a detailed bust being printed in the resin vat. An air purifier unit is built into the top of the machine. Several completed gray resin prints are arranged on the desk -- detailed miniatures, a bust, and some jewelry pieces. A bottle of Creality ABS-like resin sits nearby. Clean workspace with balanced lighting. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 28. elegoo-mars-4

```
An Elegoo Mars 4 compact resin 3D printer on a small desk. The printer is a compact, budget-friendly unit with a black base and an orange/amber UV-blocking cover. A small screen is on the front. It is very small and lightweight at 6.2kg. The cover is slightly raised, showing a few small miniatures on the build plate. Around the printer on the desk are a handful of completed gray resin D&D miniatures -- small heroes, monsters, and treasure chests. A small bottle of Elegoo basic resin and a pair of nitrile gloves are nearby. Warm, cozy hobby room lighting with a bookshelf in the background. The scene conveys affordable entry-level resin printing. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 29. elegoo-mars-4-ultra

```
An Elegoo Mars 4 Ultra resin 3D printer on a wooden desk in a miniature painting workspace. The printer is a compact black unit with an orange/amber UV-blocking cover and a color touchscreen on the front. It has a tilt-release mechanism visible through the cover. The build plate shows several 9K-resolution miniatures being pulled from the resin. Around the printer are beautifully detailed gray resin miniatures -- some unpainted, some in the process of being painted with tiny paint pots and brushes nearby. A wash and cure station sits to the right. The desk has a hobby cutting mat, fine-tip tweezers, and a bottle of Elegoo ABS-like resin. Warm hobby room lighting. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 30. elegoo-saturn-3-ultra

```
An Elegoo Saturn 3 Ultra resin 3D printer on a sturdy desk in a dedicated resin printing workshop. The printer is a medium-large resin machine -- noticeably bigger than the Mars line -- with a black base, an orange/amber UV-blocking cover, and a color touchscreen. The 12K LCD is visible through the cover along with a large build plate filled with dozens of small miniatures being batch-printed. The tilt-release mechanism is visible. Around the printer on the desk are many completed gray resin miniatures arranged in formation -- an entire D&D army of 30+ figures. Terrain pieces and larger busts also sit nearby. A large bottle of water-washable resin and a resin funnel filter are on the desk. Moody purple/warm lighting. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 31. phrozen-sonic-mega-8k-s2

```
A Phrozen Sonic Mega 8K S2 large-format resin 3D printer on a heavy-duty workstation. The printer is large and imposing for a resin printer -- 330mm build plate width, significantly bigger than desktop resin printers. It has a dark chassis with a tinted UV cover, a color touchscreen on the front, and a professional, industrial look. The cover shows a massive build plate with a large bust or terrain board being printed. Around the printer are large completed resin prints -- a life-size human skull, large terrain pieces, and detailed architectural models. Bottles of bulk Phrozen resin sit nearby. The workspace is professional and organized with industrial lighting. The scene conveys professional-grade large-format resin capability. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 32. phrozen-sonic-mini-4k

```
A Phrozen Sonic Mini 4K compact resin 3D printer on a desk. The printer is very small and compact -- one of the smallest resin printers available at just 5kg. It has a dark base with a semi-transparent cover and a basic interface on the front. The ParaLED 2.0 light unit gives a clean, uniform glow visible through the cover. Several tiny, incredibly detailed miniatures are on the build plate. Around the printer are completed miniatures -- exquisitely detailed D&D heroes and creatures at 28mm scale showing the 35-micron XY resolution. A small bottle of Phrozen Aqua-Gray resin and precision tweezers are nearby. Cozy hobby desk with warm lamp lighting. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

#### 33. longer-orange-4k-v2

```
A Longer Orange 4K V2 compact resin 3D printer on a small desk. The printer is very compact and lightweight at 4.8kg with a dark base and an orange-tinted UV-blocking cover. It has a small screen and a minimal, no-frills design. A USB drive is plugged into the front. The cover shows a small build plate with a few miniatures being printed. A small selection of completed gray resin miniatures are placed on the desk -- basic figurines and simple models. A small bottle of generic resin and basic tools (nitrile gloves, paper towels) sit nearby. Simple, modest workspace with warm lighting. The scene conveys budget-friendly entry into resin printing. Editorial product photography, 3/4 angle view, warm atmospheric lighting, shallow depth of field, shot on a 50mm lens, 1024x1024, photorealistic, high detail
```

---

## Notes for Image Generation

1. **Consistency**: Run all prompts through the same DALL-E model version in one session if possible to maintain visual consistency across the product catalog.

2. **Post-processing**: After generation, consider:
   - Running through a consistent color grading/tone pass
   - Ensuring all images are exactly 1024x1024
   - Compressing to reasonable file sizes (target ~500KB-2MB per image, matching existing files)

3. **File naming**: Save each as `/public/images/printers/{slug}.png` exactly matching the slug.

4. **Verification**: After adding images, check the site to ensure:
   - Images load correctly at 96-112px display size
   - No visible artifacts at thumbnail scale
   - Consistent look-and-feel with the 24 existing images

5. **Resin vs FDM visual cues**:
   - FDM printers: Show filament spools, visible extruder/nozzle, open or enclosed frame
   - Resin printers: Show orange/amber UV cover, gray cured miniatures around, resin bottles nearby, purple UV glow

---

## REDESIGN: Print Gallery Images (What Printers MAKE)

These images show the OUTPUT of each tier, what you'll build, not the printers themselves. Used for identity cards on the homepage and tier landing page heroes.

### First Printer Tier, "See what's possible"

#### FP-1: Identity Card Hero
```
A collection of colorful 3D printed objects arranged on a warm wooden desk: a geometric phone stand, a small articulated dragon toy, a custom cable organizer, and a lithophane photo frame glowing softly. Vibrant PLA filament colors, orange, teal, white. Warm evening lighting, shallow depth of field, editorial lifestyle photography, shot on 50mm lens, 1024x1024, photorealistic
```

#### FP-2: Tier Page Showcase
```
Close-up of a 3D printed articulated flexi-rex dinosaur toy in translucent teal PLA, sitting on a dark slate surface. Soft directional lighting from the left, visible layer lines that look intentional and satisfying. Background is a blurred maker desk with a roll of filament. Editorial product photography, warm tones, shallow depth of field, 1024x1024, photorealistic
```

#### FP-3: Tier Page Secondary
```
A 3D printed custom mechanical keyboard case in matte white PLA, partially assembled with switches visible, on a dark desk with warm ambient lighting. Tweezers and keycaps scattered nearby. Maker workshop atmosphere. Editorial photography, 3/4 angle, shallow depth of field, 1024x1024, photorealistic
```

### Maker Tier, "Level up your builds"

#### MK-1: Identity Card Hero
```
A functional 3D printed drone frame in carbon fiber PETG, matte black, sitting on a workbench next to motors and a soldering iron. Partially assembled, with wires visible. Industrial maker aesthetic. Dramatic side lighting, dark moody background, shallow depth of field, editorial photography, 1024x1024, photorealistic
```

#### MK-2: Tier Page Showcase
```
A multi-color 3D printed cosplay helmet, a sci-fi space marine design, sitting on a workshop table. Multiple filament colors visible: metallic silver, deep blue, matte black. Smooth finish from careful post-processing. Dramatic directional lighting, dark background, editorial photography, 1024x1024, photorealistic
```

#### MK-3: Tier Page Secondary
```
An array of functional 3D printed replacement parts: custom brackets, gear assemblies, and mounting clips in PETG, laid out on a dark metal surface with calipers and a ruler beside them. Technical precision vibe. Clean editorial photography, overhead 3/4 angle, warm workshop lighting, 1024x1024, photorealistic
```

### Professional Tier, "Precision at scale"

#### PRO-1: Identity Card Hero
```
A 3D printed engineering prototype, a complex mechanical housing in carbon-fiber nylon, matte dark gray, sitting on a precision measurement station next to digital calipers showing tight tolerances. Clean, professional lab environment. Cool directional lighting, minimal background, editorial industrial photography, 1024x1024, photorealistic
```

#### PRO-2: Tier Page Showcase
```
A series of 3D printed production jigs and fixtures in high-temperature ASA plastic, mounted on an aluminum workstation in a small manufacturing facility. Orange and gray parts, clearly functional and in active use. Professional industrial photography, clean lighting, 1024x1024, photorealistic
```

#### PRO-3: Tier Page Secondary
```
A 3D printed architectural scale model of a modern building in white PLA, sitting on a dark presentation table with a spotlight from above. Clean geometric lines, multiple floors visible, tiny window details. Gallery-like presentation. Editorial photography, dramatic single-source lighting, 1024x1024, photorealistic
```

### Resin Tier, "Insane detail, tiny scale"

#### RES-1: Identity Card Hero
```
An extreme close-up of a 3D printed resin miniature, a fantasy wizard character approximately 30mm tall, sitting on a fingertip for scale. Incredible surface detail: flowing robes with individual folds, a staff with carved runes, facial expression visible. Soft macro photography lighting, dark background, shallow depth of field, 1024x1024, photorealistic
```

#### RES-2: Tier Page Showcase
```
A painted army of 3D printed resin miniatures for tabletop gaming, knights, archers, and a dragon, arranged on a terrain board. The unpainted gray resin pieces on the left transition to fully painted ones on the right, showing the journey from print to finished piece. Warm hobby desk lighting, editorial photography, 1024x1024, photorealistic
```

#### RES-3: Tier Page Secondary
```
A 3D printed resin jewelry piece, an intricate Celtic knot ring, sitting on a dark velvet jewelry display stand. The surface is impossibly smooth, catching light with subtle reflections. Beside it, the same design shown on a laptop screen in CAD software, blurred in the background. Luxury product photography, single dramatic light source, 1024x1024, photorealistic
```

### Homepage Hero (Optional, CSS gradient may suffice)

#### HERO-1: Dark Maker Workspace
```
A dramatic overhead shot of a maker's desk at night, a 3D printer glowing with its LED lights in the background, out of focus. In the foreground, scattered 3D printed objects in various colors: gears, a small robot, a vase, and tools. Dark atmospheric workspace, warm amber accent lighting, cinematic mood. Wide angle, shallow depth of field, editorial lifestyle photography, 1024x1024, photorealistic
```

---

### File Naming for Gallery Images

Save to: `/public/images/gallery/`

```
gallery/first-printer-hero.png    (FP-1)
gallery/first-printer-1.png       (FP-2)
gallery/first-printer-2.png       (FP-3)
gallery/maker-hero.png            (MK-1)
gallery/maker-1.png               (MK-2)
gallery/maker-2.png               (MK-3)
gallery/professional-hero.png     (PRO-1)
gallery/professional-1.png        (PRO-2)
gallery/professional-2.png        (PRO-3)
gallery/resin-hero.png            (RES-1)
gallery/resin-1.png               (RES-2)
gallery/resin-2.png               (RES-3)
gallery/hero-workspace.png        (HERO-1, optional)
```

---
[[MOC - Side Projects]]
