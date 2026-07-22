export const branchVariants = {
  A: {
    // Long flowing curved branch
    viewBox: "0 0 300 700",
    stemPath: "M 10,20 C 110,140 210,280 240,440 C 255,520 220,600 180,680",
    strokeWidth: 3.5,
    leaves: [
      { x: 34, y: 50, rotate: -35, size: 0.9 },
      { x: 68, y: 92, rotate: 45, size: 1.0 },
      { x: 104, y: 142, rotate: -25, size: 0.85 },
      { x: 138, y: 194, rotate: 35, size: 1.1 },
      { x: 172, y: 252, rotate: -30, size: 0.95 },
      { x: 202, y: 312, rotate: 40, size: 1.05 },
      { x: 226, y: 374, rotate: -20, size: 0.8 },
      { x: 240, y: 440, rotate: 45, size: 1.0 },
      { x: 236, y: 502, rotate: -35, size: 0.75 },
      { x: 218, y: 564, rotate: 30, size: 0.9 },
      { x: 196, y: 624, rotate: -25, size: 0.7 }
    ]
  },
  B: {
    // Short compact branch with dense leaves
    viewBox: "0 0 250 450",
    stemPath: "M 10,40 C 90,100 170,180 180,280 C 185,330 160,380 130,430",
    strokeWidth: 4.5,
    leaves: [
      { x: 28, y: 52, rotate: -40, size: 1.05 },
      { x: 48, y: 74, rotate: 45, size: 1.15 },
      { x: 74, y: 102, rotate: -30, size: 0.95 },
      { x: 100, y: 132, rotate: 35, size: 1.1 },
      { x: 126, y: 168, rotate: -25, size: 1.2 },
      { x: 148, y: 204, rotate: 40, size: 0.95 },
      { x: 168, y: 244, rotate: -35, size: 1.05 },
      { x: 180, y: 286, rotate: 45, size: 0.85 },
      { x: 178, y: 326, rotate: -30, size: 1.0 },
      { x: 162, y: 368, rotate: 35, size: 0.75 },
      { x: 144, y: 408, rotate: -20, size: 0.85 }
    ]
  },
  C: {
    // Thin organic vine, sparse leaves
    viewBox: "0 0 220 600",
    stemPath: "M 10,20 C 60,70 130,130 110,240 C 90,330 50,420 90,510 C 105,540 120,570 115,590",
    strokeWidth: 2.2,
    leaves: [
      { x: 26, y: 40, rotate: -25, size: 0.85 },
      { x: 62, y: 72, rotate: 35, size: 0.9 },
      { x: 100, y: 110, rotate: -45, size: 1.0 },
      { x: 122, y: 162, rotate: 30, size: 0.8 },
      { x: 116, y: 220, rotate: -35, size: 1.05 },
      { x: 98, y: 280, rotate: 40, size: 0.75 },
      { x: 74, y: 342, rotate: -30, size: 0.95 },
      { x: 58, y: 404, rotate: 35, size: 0.7 },
      { x: 72, y: 470, rotate: -25, size: 0.9 },
      { x: 98, y: 528, rotate: 35, size: 0.8 }
    ]
  },
  D: {
    // Small corner botanical decoration
    viewBox: "0 0 200 300",
    stemPath: "M 10,10 C 50,40 90,80 110,140 C 120,180 100,220 80,270",
    strokeWidth: 3.0,
    leaves: [
      { x: 24, y: 22, rotate: -45, size: 0.9 },
      { x: 50, y: 48, rotate: 40, size: 1.0 },
      { x: 74, y: 76, rotate: -30, size: 0.85 },
      { x: 94, y: 112, rotate: 35, size: 0.95 },
      { x: 108, y: 148, rotate: -35, size: 1.0 },
      { x: 110, y: 184, rotate: 45, size: 0.75 },
      { x: 100, y: 222, rotate: -30, size: 0.85 },
      { x: 88, y: 256, rotate: 35, size: 0.7 }
    ]
  }
};
