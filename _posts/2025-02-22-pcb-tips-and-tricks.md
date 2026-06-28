---
title: "PCB Tips and Tricks"
date: 2025-02-22 00:01:00
slug: pcb-tips-and-tricks
categories:
  - Projects
tags:
  - pcb
  - kicad
  - code
excerpt: "A few tools I keep coming back to when making PCBs: EasyEDA2Kicad, Gingerbread, and KiKit."
---
Some links useful when making new PCBs

- [EasyEDA2Kicad](https://github.com/uPesy/easyeda2kicad.py) - Converts JLCPCB parts to KiCad files.
- [Gingerbread](https://gingerbread.wntr.dev/index.html) - Converts SVG or Affinity Designer files to KiCad files.
- [KiKit](https://github.com/yaqwsx/KiKit) - Helps with panelization of KiCad file.

```bash
easyeda2kicad --full --output ./C470742-RotaryEncoders/C470742 --lcsc_id=C470742
```
