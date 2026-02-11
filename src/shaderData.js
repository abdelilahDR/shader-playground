export const shaderComponents = [
  {
    "name": "AngularBlur",
    "category": "Blurs",
    "description": "Radial motion blur rotating around a center point",
    "requiresChild": true,
    "props": [
      {
        "name": "intensity",
        "type": "range",
        "default": 20,
        "description": "Intensity of the angular blur effect",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Effect",
        "label": "Blur Intensity"
      },
      {
        "name": "center",
        "type": "position",
        "default": {
          "x": 0.5,
          "y": 0.5
        },
        "description": "The center point of the rotation",
        "group": "Position",
        "label": "Center Position"
      }
    ]
  },
  {
    "name": "Ascii",
    "category": "Stylize",
    "description": "Convert imagery to ASCII character art",
    "requiresChild": true,
    "props": [
      {
        "name": "characters",
        "type": "text",
        "default": "@%#*+=-:.",
        "description": "Characters ordered from dense to sparse. First character is used for bright areas, last for dark areas.",
        "group": "Effect",
        "label": "Characters"
      },
      {
        "name": "cellSize",
        "type": "range",
        "default": 30,
        "description": "Size of each ASCII character cell (normalized to 1080p reference, scales proportionally at other resolutions)",
        "min": 8,
        "max": 100,
        "step": 1,
        "group": "Effect",
        "label": "Cell Size"
      },
      {
        "name": "fontFamily",
        "type": "select",
        "default": "JetBrains Mono",
        "description": "Font family for characters",
        "options": [
          {
            "label": "Azeret Mono",
            "value": "Azeret Mono"
          },
          {
            "label": "Courier Prime",
            "value": "Courier Prime"
          },
          {
            "label": "Cutive Mono",
            "value": "Cutive Mono"
          },
          {
            "label": "Fira Code",
            "value": "Fira Code"
          },
          {
            "label": "Geist Mono",
            "value": "Geist Mono"
          },
          {
            "label": "IBM Plex Mono",
            "value": "IBM Plex Mono"
          },
          {
            "label": "JetBrains Mono",
            "value": "JetBrains Mono"
          },
          {
            "label": "Major Mono Display",
            "value": "Major Mono Display"
          },
          {
            "label": "Martian Mono",
            "value": "Martian Mono"
          },
          {
            "label": "Nova Mono",
            "value": "Nova Mono"
          },
          {
            "label": "Press Start 2P",
            "value": "Press Start 2P"
          },
          {
            "label": "Roboto Mono",
            "value": "Roboto Mono"
          },
          {
            "label": "Share Tech Mono",
            "value": "Share Tech Mono"
          },
          {
            "label": "Silkscreen",
            "value": "Silkscreen"
          },
          {
            "label": "Source Code Pro",
            "value": "Source Code Pro"
          },
          {
            "label": "Space Mono",
            "value": "Space Mono"
          },
          {
            "label": "Syne Mono",
            "value": "Syne Mono"
          },
          {
            "label": "VT323",
            "value": "VT323"
          },
          {
            "label": "Xanh Mono",
            "value": "Xanh Mono"
          }
        ],
        "group": "Appearance",
        "label": "Font Family"
      },
      {
        "name": "spacing",
        "type": "range",
        "default": 1,
        "description": "Character size within each cell (1.0 = optimal size, 0.0 = smallest)",
        "min": 0,
        "max": 1,
        "step": 0.05,
        "group": "Effect",
        "label": "Character Size"
      },
      {
        "name": "gamma",
        "type": "range",
        "default": 1,
        "description": "Brightness curve adjustment. <1 brightens darks (more light characters), >1 darkens midtones (more dark characters). Use to better fit characters to image brightness range.",
        "min": 0.25,
        "max": 3,
        "step": 0.05,
        "group": "Effect",
        "label": "Gamma"
      },
      {
        "name": "alphaThreshold",
        "type": "range",
        "default": 0,
        "description": "Pixels with alpha below this threshold become fully transparent.",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "group": "Effect",
        "label": "Alpha Threshold"
      },
      {
        "name": "preserveAlpha",
        "type": "checkbox",
        "default": true,
        "description": "When enabled, output alpha matches input alpha. When disabled, pixels above the alpha threshold become fully opaque.",
        "group": "Effect",
        "label": "Preserve Alpha"
      }
    ]
  },
  {
    "name": "Aurora",
    "category": "Textures",
    "description": "Mesmerizing aurora borealis with layered curtains, vertical rays, and flowing light.",
    "requiresChild": false,
    "props": [
      {
        "name": "colorA",
        "type": "color",
        "default": "#a533f8",
        "description": "Edge color at the curtain base",
        "group": "Colors",
        "label": "Color A"
      },
      {
        "name": "colorB",
        "type": "color",
        "default": "#22ee88",
        "description": "Core color in the bright center",
        "group": "Colors",
        "label": "Color B"
      },
      {
        "name": "colorC",
        "type": "color",
        "default": "#1694e8",
        "description": "Tip color at the ray ends",
        "group": "Colors",
        "label": "Color C"
      },
      {
        "name": "colorSpace",
        "type": "select",
        "default": "linear",
        "description": "Color space for color interpolation",
        "options": [
          {
            "label": "Linear RGB",
            "value": "linear"
          },
          {
            "label": "OKLCh",
            "value": "oklch"
          },
          {
            "label": "OKLAB",
            "value": "oklab"
          }
        ],
        "group": "Colors",
        "label": "Color Space"
      },
      {
        "name": "balance",
        "type": "range",
        "default": 50,
        "description": "Shifts color distribution across the curtain height",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Colors",
        "label": "Balance"
      },
      {
        "name": "intensity",
        "type": "range",
        "default": 80,
        "description": "Overall aurora brightness",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Aurora",
        "label": "Intensity"
      },
      {
        "name": "curtainCount",
        "type": "range",
        "default": 4,
        "description": "Number of aurora curtain layers",
        "min": 1,
        "max": 4,
        "step": 1,
        "group": "Aurora",
        "label": "Curtains"
      },
      {
        "name": "speed",
        "type": "range",
        "default": 5,
        "description": "Animation speed",
        "min": -10,
        "max": 10,
        "step": 0.1,
        "group": "Aurora",
        "label": "Speed"
      },
      {
        "name": "waviness",
        "type": "range",
        "default": 50,
        "description": "How much the curtains undulate",
        "min": 0,
        "max": 200,
        "step": 1,
        "group": "Aurora",
        "label": "Waviness"
      },
      {
        "name": "rayDensity",
        "type": "range",
        "default": 20,
        "description": "Density of vertical ray structures",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Aurora",
        "label": "Ray Detail"
      },
      {
        "name": "height",
        "type": "range",
        "default": 120,
        "description": "How tall the aurora extends",
        "min": 10,
        "max": 200,
        "step": 1,
        "group": "Scene",
        "label": "Height"
      },
      {
        "name": "center",
        "type": "position",
        "default": {
          "x": 0.5,
          "y": 0.5
        },
        "description": "Center position of the aurora",
        "group": "Scene",
        "label": "Center"
      },
      {
        "name": "seed",
        "type": "range",
        "default": 0,
        "description": "Random seed for variation",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Aurora",
        "label": "Seed"
      }
    ]
  },
  {
    "name": "Beam",
    "category": "Textures",
    "description": "A beam of light from one point to another.",
    "requiresChild": false,
    "props": [
      {
        "name": "startPosition",
        "type": "position",
        "default": {
          "x": 0.2,
          "y": 0.5
        },
        "description": "Starting point of the beam",
        "group": "Position",
        "label": "Start Position"
      },
      {
        "name": "endPosition",
        "type": "position",
        "default": {
          "x": 0.8,
          "y": 0.5
        },
        "description": "Ending point of the beam",
        "group": "Position",
        "label": "End Position"
      },
      {
        "name": "startThickness",
        "type": "range",
        "default": 0.2,
        "description": "Thickness at the start of the beam",
        "min": 0,
        "max": 2,
        "step": 0.1,
        "group": "Effect",
        "label": "Start Thickness"
      },
      {
        "name": "endThickness",
        "type": "range",
        "default": 0.2,
        "description": "Thickness at the end of the beam",
        "min": 0,
        "max": 2,
        "step": 0.1,
        "group": "Effect",
        "label": "End Thickness"
      },
      {
        "name": "startSoftness",
        "type": "range",
        "default": 0.5,
        "description": "Edge softness at the start of the beam",
        "min": 0,
        "max": 50,
        "step": 0.1,
        "group": "Effect",
        "label": "Start Softness"
      },
      {
        "name": "endSoftness",
        "type": "range",
        "default": 0.5,
        "description": "Edge softness at the end of the beam",
        "min": 0,
        "max": 20,
        "step": 0.1,
        "group": "Effect",
        "label": "End Softness"
      },
      {
        "name": "insideColor",
        "type": "color",
        "default": "#FF0000",
        "description": "Color at the center of the beam",
        "group": "Colors",
        "label": "Inside Color"
      },
      {
        "name": "outsideColor",
        "type": "color",
        "default": "#0000FF",
        "description": "Color at the edges of the beam",
        "group": "Colors",
        "label": "Outside Color"
      },
      {
        "name": "colorSpace",
        "type": "select",
        "default": "linear",
        "description": "Color space for color interpolation",
        "options": [
          {
            "label": "Linear RGB",
            "value": "linear"
          },
          {
            "label": "OKLCh",
            "value": "oklch"
          },
          {
            "label": "OKLAB",
            "value": "oklab"
          }
        ],
        "group": "Colors",
        "label": "Color Space"
      }
    ]
  },
  {
    "name": "Blob",
    "category": "Textures",
    "description": "Organic animated blob with 3D lighting and gradients",
    "requiresChild": false,
    "props": [
      {
        "name": "colorA",
        "type": "color",
        "default": "#ff6b35",
        "description": "Primary color of the blob",
        "group": "Colors",
        "label": "Color A"
      },
      {
        "name": "colorB",
        "type": "color",
        "default": "#e91e63",
        "description": "Secondary color of the blob",
        "group": "Colors",
        "label": "Color B"
      },
      {
        "name": "size",
        "type": "range",
        "default": 0.5,
        "description": "Size of the blob",
        "min": 0,
        "max": 2,
        "step": 0.05,
        "group": "Effect",
        "label": "Size"
      },
      {
        "name": "deformation",
        "type": "range",
        "default": 0.5,
        "description": "How organic and blobby the shape is (0 = circle, 1 = very blobby)",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Deformation"
      },
      {
        "name": "softness",
        "type": "range",
        "default": 0.5,
        "description": "Softness of the blob edges (combines edge width and transition curve)",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Softness"
      },
      {
        "name": "highlightIntensity",
        "type": "range",
        "default": 0.5,
        "description": "Intensity of specular highlight effect",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Highlight",
        "label": "Highlight Intensity"
      },
      {
        "name": "highlightX",
        "type": "range",
        "default": 0.3,
        "description": "Light direction X component",
        "min": -1,
        "max": 1,
        "step": 0.1,
        "group": "Highlight",
        "label": "Highlight X"
      },
      {
        "name": "highlightY",
        "type": "range",
        "default": -0.3,
        "description": "Light direction Y component",
        "min": -1,
        "max": 1,
        "step": 0.1,
        "group": "Highlight",
        "label": "Highlight Y"
      },
      {
        "name": "highlightZ",
        "type": "range",
        "default": 0.4,
        "description": "Light direction Z component",
        "min": -1,
        "max": 1,
        "step": 0.1,
        "group": "Highlight",
        "label": "Highlight Z"
      },
      {
        "name": "highlightColor",
        "type": "color",
        "default": "#ffe11a",
        "description": "Color of the specular highlight",
        "group": "Highlight",
        "label": "Highlight Color"
      },
      {
        "name": "speed",
        "type": "range",
        "default": 0.5,
        "description": "Animation speed",
        "min": 0,
        "max": 2,
        "step": 0.1,
        "group": "Animation",
        "label": "Speed"
      },
      {
        "name": "seed",
        "type": "range",
        "default": 1,
        "description": "Adjusts the starting state, useful for variation",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Effect",
        "label": "Seed"
      },
      {
        "name": "center",
        "type": "position",
        "default": {
          "x": 0.5,
          "y": 0.5
        },
        "description": "The center point of the blob",
        "group": "Position",
        "label": "Center Position"
      },
      {
        "name": "colorSpace",
        "type": "select",
        "default": "linear",
        "description": "Color space for color interpolation",
        "options": [
          {
            "label": "Linear RGB",
            "value": "linear"
          },
          {
            "label": "OKLCh",
            "value": "oklch"
          },
          {
            "label": "OKLAB",
            "value": "oklab"
          }
        ],
        "group": "Colors",
        "label": "Color Space"
      }
    ]
  },
  {
    "name": "Blur",
    "category": "Blurs",
    "description": "A simple Gaussian blur effect",
    "requiresChild": true,
    "props": [
      {
        "name": "intensity",
        "type": "range",
        "default": 50,
        "description": "Intensity of the blur effect",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Effect",
        "label": "Intensity"
      }
    ]
  },
  {
    "name": "BrightnessContrast",
    "category": "Adjustments",
    "description": "Adjust brightness and contrast of the image",
    "requiresChild": true,
    "props": [
      {
        "name": "brightness",
        "type": "range",
        "default": 0,
        "description": "Brightness adjustment (-1 to 1)",
        "min": -1,
        "max": 1,
        "step": 0.05,
        "group": "Appearance",
        "label": "Brightness"
      },
      {
        "name": "contrast",
        "type": "range",
        "default": 0,
        "description": "Contrast adjustment (-1 to 1)",
        "min": -1,
        "max": 1,
        "step": 0.05,
        "group": "Appearance",
        "label": "Contrast"
      }
    ]
  },
  {
    "name": "Bulge",
    "category": "Distortions",
    "description": "Magnify or pinch content around a center point",
    "requiresChild": true,
    "props": [
      {
        "name": "center",
        "type": "position",
        "default": {
          "x": 0.5,
          "y": 0.5
        },
        "description": "The center point of the bulge effect",
        "group": "Position",
        "label": "Center"
      },
      {
        "name": "strength",
        "type": "range",
        "default": 1,
        "description": "The intensity of the bulge effect (positive = bulge out, negative = pinch in)",
        "min": -1,
        "max": 1,
        "step": 0.05,
        "group": "Effect",
        "label": "Strength"
      },
      {
        "name": "radius",
        "type": "range",
        "default": 1,
        "description": "The radius of the bulge effect area",
        "min": 0,
        "max": 5,
        "step": 0.1,
        "group": "Effect",
        "label": "Radius"
      },
      {
        "name": "falloff",
        "type": "range",
        "default": 0.5,
        "description": "Controls the smoothness of the transition (0 = hard edge, 1 = very smooth)",
        "min": 0,
        "max": 1,
        "step": 0.05,
        "group": "Effect",
        "label": "Falloff"
      },
      {
        "name": "edges",
        "type": "select",
        "default": "stretch",
        "description": "How to handle edges when distortion pushes content out of bounds",
        "options": [
          {
            "label": "Stretch",
            "value": "stretch"
          },
          {
            "label": "Transparent",
            "value": "transparent"
          },
          {
            "label": "Mirror",
            "value": "mirror"
          },
          {
            "label": "Wrap",
            "value": "wrap"
          }
        ],
        "group": "Effect",
        "label": "Edges"
      }
    ]
  },
  {
    "name": "ChannelBlur",
    "category": "Blurs",
    "description": "Independent blur for red, green, and blue channels",
    "requiresChild": true,
    "props": [
      {
        "name": "redIntensity",
        "type": "range",
        "default": 0,
        "description": "Blur intensity for red channel",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Effect",
        "label": "Red Intensity"
      },
      {
        "name": "greenIntensity",
        "type": "range",
        "default": 20,
        "description": "Blur intensity for green channel",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Effect",
        "label": "Green Intensity"
      },
      {
        "name": "blueIntensity",
        "type": "range",
        "default": 40,
        "description": "Blur intensity for blue channel",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Effect",
        "label": "Blue Intensity"
      }
    ]
  },
  {
    "name": "Checkerboard",
    "category": "Textures",
    "description": "Classic checkerboard pattern with two alternating colors",
    "requiresChild": false,
    "props": [
      {
        "name": "colorA",
        "type": "color",
        "default": "#cccccc",
        "description": "First color of the checkerboard pattern",
        "group": "Colors",
        "label": "Color A"
      },
      {
        "name": "colorB",
        "type": "color",
        "default": "#999999",
        "description": "Second color of the checkerboard pattern",
        "group": "Colors",
        "label": "Color B"
      },
      {
        "name": "cells",
        "type": "range",
        "default": 8,
        "description": "Number of cells along the shortest canvas edge (creates square cells)",
        "min": 1,
        "max": 50,
        "step": 1,
        "group": "Effect",
        "label": "Cells"
      },
      {
        "name": "softness",
        "type": "range",
        "default": 0,
        "description": "Smoothness of the transition between colors (0 = hard edges, 1 = very soft)",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Softness"
      },
      {
        "name": "colorSpace",
        "type": "select",
        "default": "linear",
        "description": "Color space for color interpolation",
        "options": [
          {
            "label": "Linear RGB",
            "value": "linear"
          },
          {
            "label": "OKLCh",
            "value": "oklch"
          },
          {
            "label": "OKLAB",
            "value": "oklab"
          }
        ],
        "group": "Colors",
        "label": "Color Space"
      }
    ]
  },
  {
    "name": "ChromaFlow",
    "category": "Interactive",
    "description": "Interactive liquid flow effect that follows your cursor",
    "requiresChild": false,
    "props": [
      {
        "name": "baseColor",
        "type": "color",
        "default": "#0066ff",
        "description": "Base liquid color",
        "group": "Colors",
        "label": "Base Color"
      },
      {
        "name": "upColor",
        "type": "color",
        "default": "#00ff00",
        "description": "Color for upward movement",
        "group": "Colors",
        "label": "Up Color"
      },
      {
        "name": "downColor",
        "type": "color",
        "default": "#ff0000",
        "description": "Color for downward movement",
        "group": "Colors",
        "label": "Down Color"
      },
      {
        "name": "leftColor",
        "type": "color",
        "default": "#0000ff",
        "description": "Color for leftward movement",
        "group": "Colors",
        "label": "Left Color"
      },
      {
        "name": "rightColor",
        "type": "color",
        "default": "#ffff00",
        "description": "Color for rightward movement",
        "group": "Colors",
        "label": "Right Color"
      },
      {
        "name": "intensity",
        "type": "range",
        "default": 1,
        "description": "Strength of the liquid effect",
        "min": 0.5,
        "max": 1.5,
        "step": 0.1,
        "group": "Effect",
        "label": "Intensity"
      },
      {
        "name": "radius",
        "type": "range",
        "default": 1.5,
        "description": "Radius of the liquid effect",
        "min": 0,
        "max": 3,
        "step": 0.1,
        "group": "Effect",
        "label": "Radius"
      },
      {
        "name": "momentum",
        "type": "range",
        "default": 30,
        "description": "How much momentum colors retain in their flow direction",
        "min": 10,
        "max": 60,
        "step": 1,
        "group": "Effect",
        "label": "Momentum"
      }
    ]
  },
  {
    "name": "ChromaticAberration",
    "category": "Stylize",
    "description": "Separate RGB channels for a prismatic distortion effect",
    "requiresChild": true,
    "props": [
      {
        "name": "strength",
        "type": "range",
        "default": 0.2,
        "description": "Overall strength of the chromatic aberration effect",
        "min": 0,
        "max": 1,
        "step": 0.05,
        "group": "Effect",
        "label": "Strength"
      },
      {
        "name": "angle",
        "type": "range",
        "default": 0,
        "description": "Direction of the chromatic aberration in degrees",
        "min": 0,
        "max": 360,
        "step": 1,
        "group": "Effect",
        "label": "Angle"
      },
      {
        "name": "redOffset",
        "type": "range",
        "default": -1,
        "description": "Red channel offset multiplier",
        "min": -2,
        "max": 2,
        "step": 0.1,
        "group": "Effect",
        "label": "Red Offset"
      },
      {
        "name": "greenOffset",
        "type": "range",
        "default": 0,
        "description": "Green channel offset multiplier",
        "min": -2,
        "max": 2,
        "step": 0.1,
        "group": "Effect",
        "label": "Green Offset"
      },
      {
        "name": "blueOffset",
        "type": "range",
        "default": 1,
        "description": "Blue channel offset multiplier",
        "min": -2,
        "max": 2,
        "step": 0.1,
        "group": "Effect",
        "label": "Blue Offset"
      }
    ]
  },
  {
    "name": "Circle",
    "category": "Textures",
    "description": "Generate a circle with adjustable size and softness",
    "requiresChild": false,
    "props": [
      {
        "name": "color",
        "type": "color",
        "default": "#ffffff",
        "description": "The color of the circle",
        "group": "Colors",
        "label": "Color"
      },
      {
        "name": "radius",
        "type": "range",
        "default": 1,
        "description": "The radius of the circle. A value of one (1) is sets the circle to fit the canvas.",
        "min": 0,
        "max": 2,
        "step": 0.05,
        "group": "Effect",
        "label": "Radius"
      },
      {
        "name": "softness",
        "type": "range",
        "default": 0,
        "description": "Edge softness. Lower values like zero (0) are sharp, higher values like one (1) are softer.",
        "min": 0,
        "max": 1,
        "step": 0.05,
        "group": "Effect",
        "label": "Softness"
      },
      {
        "name": "center",
        "type": "position",
        "default": {
          "x": 0.5,
          "y": 0.5
        },
        "description": "The center point of the circle",
        "group": "Position",
        "label": "Center Position"
      }
    ]
  },
  {
    "name": "ConcentricSpin",
    "category": "Distortions",
    "description": "Concentric rings that each rotate the underlying image by different amounts",
    "requiresChild": true,
    "props": [
      {
        "name": "intensity",
        "type": "range",
        "default": 20,
        "description": "Maximum rotation angle per ring",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Effect",
        "label": "Intensity"
      },
      {
        "name": "rings",
        "type": "range",
        "default": 8,
        "description": "Number of concentric rings",
        "min": 1,
        "max": 30,
        "step": 1,
        "group": "Effect",
        "label": "Rings"
      },
      {
        "name": "smoothness",
        "type": "range",
        "default": 0.03,
        "description": "Softness of transitions between rings",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "group": "Effect",
        "label": "Smoothness"
      },
      {
        "name": "seed",
        "type": "range",
        "default": 0,
        "description": "Randomization seed for per-ring rotation variation",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Effect",
        "label": "Seed"
      },
      {
        "name": "speed",
        "type": "range",
        "default": 0.1,
        "description": "Speed of continuous ring rotation",
        "min": -5,
        "max": 5,
        "step": 0.1,
        "group": "Animation",
        "label": "Speed"
      },
      {
        "name": "speedRandomness",
        "type": "range",
        "default": 0.5,
        "description": "How much each ring varies in rotation speed and direction",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "group": "Animation",
        "label": "Speed Randomness"
      },
      {
        "name": "edges",
        "type": "select",
        "default": "mirror",
        "description": "How to handle edges when distortion pushes content out of bounds",
        "options": [
          {
            "label": "Stretch",
            "value": "stretch"
          },
          {
            "label": "Transparent",
            "value": "transparent"
          },
          {
            "label": "Mirror",
            "value": "mirror"
          },
          {
            "label": "Wrap",
            "value": "wrap"
          }
        ],
        "group": "Effect",
        "label": "Edges"
      },
      {
        "name": "center",
        "type": "position",
        "default": {
          "x": 0.5,
          "y": 0.5
        },
        "description": "Center point of the concentric rings",
        "group": "Position",
        "label": "Center Position"
      }
    ]
  },
  {
    "name": "ContourLines",
    "category": "Stylize",
    "description": "Draw topographical contour lines based on luminance or alpha",
    "requiresChild": true,
    "props": [
      {
        "name": "levels",
        "type": "range",
        "default": 5,
        "description": "Number of contour levels",
        "min": 2,
        "max": 30,
        "step": 1,
        "group": "Effect",
        "label": "Levels"
      },
      {
        "name": "lineWidth",
        "type": "range",
        "default": 2,
        "description": "Width of the contour lines in pixels",
        "min": 0.5,
        "max": 5,
        "step": 0.1,
        "group": "Effect",
        "label": "Line Width"
      },
      {
        "name": "softness",
        "type": "range",
        "default": 0,
        "description": "Edge softness of the lines (0 = sharp, 1 = soft)",
        "min": 0,
        "max": 1,
        "step": 0.05,
        "group": "Effect",
        "label": "Softness"
      },
      {
        "name": "gamma",
        "type": "range",
        "default": 0.5,
        "description": "Contour distribution. <1 clusters in bright, >1 clusters in dark",
        "min": 0.1,
        "max": 2,
        "step": 0.05,
        "group": "Effect",
        "label": "Gamma"
      },
      {
        "name": "invert",
        "type": "checkbox",
        "default": false,
        "description": "Invert the source values",
        "group": "Effect",
        "label": "Invert"
      },
      {
        "name": "source",
        "type": "select",
        "default": "luminance",
        "description": "Use luminance or alpha channel for contours",
        "options": [
          {
            "label": "Luminance",
            "value": "luminance"
          },
          {
            "label": "Alpha",
            "value": "alpha"
          }
        ],
        "group": "Effect",
        "label": "Source"
      },
      {
        "name": "colorMode",
        "type": "select",
        "default": "source",
        "description": "Use source image colors or custom colors",
        "options": [
          {
            "label": "Source",
            "value": "source"
          },
          {
            "label": "Custom",
            "value": "custom"
          }
        ],
        "group": "Colors",
        "label": "Color Mode"
      },
      {
        "name": "lineColor",
        "type": "color",
        "default": "#000000",
        "description": "Color of the contour lines (custom mode)",
        "group": "Colors",
        "label": "Line Color"
      },
      {
        "name": "backgroundColor",
        "type": "color",
        "default": "transparent",
        "description": "Background color (custom mode)",
        "group": "Colors",
        "label": "Background Color"
      }
    ]
  },
  {
    "name": "CRTScreen",
    "category": "Stylize",
    "description": "Retro CRT monitor simulation with scanlines",
    "requiresChild": true,
    "props": [
      {
        "name": "pixelSize",
        "type": "range",
        "default": 128,
        "description": "Size of individual TV pixels (lower = more pixels)",
        "min": 8,
        "max": 128,
        "step": 1,
        "group": "Effect",
        "label": "Pixel Size"
      },
      {
        "name": "colorShift",
        "type": "range",
        "default": 1,
        "description": "Chromatic aberration amount",
        "min": 0,
        "max": 10,
        "step": 0.1,
        "group": "Effect",
        "label": "Color Shift"
      },
      {
        "name": "scanlineIntensity",
        "type": "range",
        "default": 0.3,
        "description": "Strength of horizontal scanlines",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Scanline Intensity"
      },
      {
        "name": "scanlineFrequency",
        "type": "range",
        "default": 200,
        "description": "Number of scanlines across screen",
        "min": 100,
        "max": 800,
        "step": 10,
        "group": "Effect",
        "label": "Scanline Frequency"
      },
      {
        "name": "brightness",
        "type": "range",
        "default": 1.1,
        "description": "Screen brightness boost",
        "min": 0.5,
        "max": 2,
        "step": 0.1,
        "group": "Appearance",
        "label": "Brightness"
      },
      {
        "name": "contrast",
        "type": "range",
        "default": 1.2,
        "description": "Screen contrast enhancement",
        "min": 0.5,
        "max": 2,
        "step": 0.1,
        "group": "Appearance",
        "label": "Contrast"
      },
      {
        "name": "vignetteIntensity",
        "type": "range",
        "default": 1,
        "description": "Strength of corner darkening effect (0 = off)",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Vignette Intensity"
      },
      {
        "name": "vignetteRadius",
        "type": "range",
        "default": 0.5,
        "description": "How far the vignette extends inward (0 = edges only, 1 = reaches center)",
        "min": 0,
        "max": 1,
        "step": 0.05,
        "group": "Effect",
        "label": "Vignette Radius"
      }
    ]
  },
  {
    "name": "CursorTrail",
    "category": "Interactive",
    "description": "Animated trail effect that tracks cursor movement",
    "requiresChild": false,
    "props": [
      {
        "name": "colorA",
        "type": "color",
        "default": "#00aaff",
        "description": "Color of fresh trails",
        "group": "Colors",
        "label": "Start Color"
      },
      {
        "name": "colorB",
        "type": "color",
        "default": "#ff00aa",
        "description": "Color trails transition to as they fade",
        "group": "Colors",
        "label": "End Color"
      },
      {
        "name": "radius",
        "type": "range",
        "default": 0.5,
        "description": "Base radius of trail circles",
        "min": 0.5,
        "max": 2,
        "step": 0.1,
        "group": "Effect",
        "label": "Radius"
      },
      {
        "name": "length",
        "type": "range",
        "default": 0.5,
        "description": "How long trail circles persist (in seconds)",
        "min": 0.1,
        "max": 2,
        "step": 0.1,
        "group": "Animation",
        "label": "Trail Length"
      },
      {
        "name": "shrink",
        "type": "range",
        "default": 1,
        "description": "How much circles shrink as they fade out (0 = no shrink, 1 = full shrink)",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Shrink Amount"
      },
      {
        "name": "colorSpace",
        "type": "select",
        "default": "linear",
        "description": "Color space for color interpolation",
        "options": [
          {
            "label": "Linear RGB",
            "value": "linear"
          },
          {
            "label": "OKLCh",
            "value": "oklch"
          },
          {
            "label": "OKLAB",
            "value": "oklab"
          }
        ],
        "group": "Colors",
        "label": "Color Space"
      }
    ]
  },
  {
    "name": "DiffuseBlur",
    "category": "Blurs",
    "description": "Grain-like pixel displacement at random",
    "requiresChild": true,
    "props": [
      {
        "name": "intensity",
        "type": "range",
        "default": 30,
        "description": "Intensity of the diffuse blur effect",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Effect",
        "label": "Intensity"
      },
      {
        "name": "edges",
        "type": "select",
        "default": "stretch",
        "description": "How to handle edges when distortion pushes content out of bounds",
        "options": [
          {
            "label": "Stretch",
            "value": "stretch"
          },
          {
            "label": "Transparent",
            "value": "transparent"
          },
          {
            "label": "Mirror",
            "value": "mirror"
          },
          {
            "label": "Wrap",
            "value": "wrap"
          }
        ],
        "group": "Effect",
        "label": "Edges"
      }
    ]
  },
  {
    "name": "Dither",
    "category": "Stylize",
    "description": "Dithering effect with multiple pattern options",
    "requiresChild": true,
    "props": [
      {
        "name": "pattern",
        "type": "select",
        "default": "bayer4",
        "description": "Dithering pattern algorithm",
        "options": [
          {
            "label": "Bayer 2x2",
            "value": "bayer2"
          },
          {
            "label": "Bayer 4x4",
            "value": "bayer4"
          },
          {
            "label": "Bayer 8x8",
            "value": "bayer8"
          },
          {
            "label": "Clustered Dot",
            "value": "clusteredDot"
          },
          {
            "label": "Blue Noise",
            "value": "blueNoise"
          },
          {
            "label": "White Noise",
            "value": "whiteNoise"
          }
        ],
        "group": "Effect",
        "label": "Pattern"
      },
      {
        "name": "pixelSize",
        "type": "range",
        "default": 4,
        "description": "Size of dithering pixels",
        "min": 1,
        "max": 20,
        "step": 1,
        "group": "Effect",
        "label": "Pixel Size"
      },
      {
        "name": "threshold",
        "type": "range",
        "default": 0.5,
        "description": "Luminance threshold for dithering",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "group": "Effect",
        "label": "Threshold"
      },
      {
        "name": "spread",
        "type": "range",
        "default": 1,
        "description": "How much of the luminance range participates in dithering (lower = more solid areas)",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "group": "Effect",
        "label": "Spread"
      },
      {
        "name": "colorMode",
        "type": "select",
        "default": "custom",
        "description": "How colors are determined",
        "options": [
          {
            "label": "Custom Colors",
            "value": "custom"
          },
          {
            "label": "Source Colors",
            "value": "source"
          }
        ],
        "group": "Colors",
        "label": "Color Mode"
      },
      {
        "name": "colorA",
        "type": "color",
        "default": "transparent",
        "description": "Dark color for dithering",
        "group": "Colors",
        "label": "Dark Color"
      },
      {
        "name": "colorB",
        "type": "color",
        "default": "#ffffff",
        "description": "Light color for dithering",
        "group": "Colors",
        "label": "Light Color"
      }
    ]
  },
  {
    "name": "DotGrid",
    "category": "Textures",
    "description": "Grid of dots with optional twinkling animation",
    "requiresChild": false,
    "props": [
      {
        "name": "color",
        "type": "color",
        "default": "#ffffff",
        "description": "The color of the dot",
        "group": "Colors",
        "label": "Color"
      },
      {
        "name": "density",
        "type": "range",
        "default": 30,
        "description": "The number of dots on the longest canvas edge",
        "min": 1,
        "max": 200,
        "step": 1,
        "group": "Effect",
        "label": "Density"
      },
      {
        "name": "dotSize",
        "type": "range",
        "default": 0.3,
        "description": "The size of each dot, zero (0) being invisible, one (1) filled the grid with no gaps",
        "min": 0,
        "max": 1,
        "step": 0.05,
        "group": "Effect",
        "label": "Dot Size"
      },
      {
        "name": "twinkle",
        "type": "range",
        "default": 0,
        "description": "Intensity of the twinkle effect (0 = off, 1 = full twinkle)",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Animation",
        "label": "Twinkle"
      }
    ]
  },
  {
    "name": "Duotone",
    "category": "Adjustments",
    "description": "Map colors to two tones based on luminance",
    "requiresChild": true,
    "props": [
      {
        "name": "colorA",
        "type": "color",
        "default": "#ff0000",
        "description": "First color (used for darker areas)",
        "group": "Colors",
        "label": "Color A"
      },
      {
        "name": "colorB",
        "type": "color",
        "default": "#023af4",
        "description": "Second color (used for brighter areas)",
        "group": "Colors",
        "label": "Color B"
      },
      {
        "name": "blend",
        "type": "range",
        "default": 0.5,
        "description": "Blend point between the two colors",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Blend"
      },
      {
        "name": "colorSpace",
        "type": "select",
        "default": "linear",
        "description": "Color space for color interpolation",
        "options": [
          {
            "label": "Linear RGB",
            "value": "linear"
          },
          {
            "label": "OKLCh",
            "value": "oklch"
          },
          {
            "label": "OKLAB",
            "value": "oklab"
          }
        ],
        "group": "Colors",
        "label": "Color Space"
      }
    ]
  },
  {
    "name": "FilmGrain",
    "category": "Stylize",
    "description": "Analog film grain texture overlay",
    "requiresChild": true,
    "props": [
      {
        "name": "strength",
        "type": "range",
        "default": 0.5,
        "description": "Intensity of the film grain noise",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Strength"
      }
    ]
  },
  {
    "name": "FloatingParticles",
    "category": "Textures",
    "description": "Animated floating particles with twinkle effects",
    "requiresChild": false,
    "props": [
      {
        "name": "randomness",
        "type": "range",
        "default": 0.25,
        "description": "Randomness of particle animation",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Randomness"
      },
      {
        "name": "speed",
        "type": "range",
        "default": 0.25,
        "description": "Speed of particle movement",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Animation",
        "label": "Speed"
      },
      {
        "name": "angle",
        "type": "range",
        "default": 90,
        "description": "Movement angle in degrees (0=right, 90=down, 180=left, 270=up)",
        "min": 0,
        "max": 360,
        "step": 1,
        "group": "Animation",
        "label": "Angle"
      },
      {
        "name": "particleSize",
        "type": "range",
        "default": 1,
        "description": "Size of particles",
        "min": 0.1,
        "max": 20,
        "step": 0.1,
        "group": "Effect",
        "label": "Particle Size"
      },
      {
        "name": "particleSoftness",
        "type": "range",
        "default": 0,
        "description": "Edge softness of particles (0 = sharp, 1 = very soft)",
        "min": 0,
        "max": 5,
        "step": 0.1,
        "group": "Effect",
        "label": "Particle Softness"
      },
      {
        "name": "twinkle",
        "type": "range",
        "default": 0.5,
        "description": "Intensity of the twinkle effect (0 = off, 1 = full twinkle)",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Animation",
        "label": "Twinkle"
      },
      {
        "name": "count",
        "type": "range",
        "default": 5,
        "description": "Number of particle layers",
        "min": 1,
        "max": 5,
        "step": 1,
        "group": "Effect",
        "label": "Count"
      },
      {
        "name": "particleColor",
        "type": "color",
        "default": "#ffffff",
        "description": "Color of the particles",
        "group": "Colors",
        "label": "Particle Color"
      },
      {
        "name": "speedVariance",
        "type": "range",
        "default": 0.3,
        "description": "Per-layer speed variance (0 = all layers same speed, 1 = high variance)",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Animation",
        "label": "Speed Variance"
      },
      {
        "name": "angleVariance",
        "type": "range",
        "default": 30,
        "description": "Per-layer angle variance in degrees (0 = all layers same angle, 180 = full variance)",
        "min": 0,
        "max": 180,
        "step": 1,
        "group": "Animation",
        "label": "Angle Variance"
      },
      {
        "name": "particleDensity",
        "type": "range",
        "default": 3,
        "description": "Particle density (lower = more spread out, higher = more dense)",
        "min": 0.5,
        "max": 3,
        "step": 0.1,
        "group": "Effect",
        "label": "Particle Density"
      }
    ]
  },
  {
    "name": "FlowField",
    "category": "Distortions",
    "description": "Fluid-like distortion with constant smooth motion",
    "requiresChild": true,
    "props": [
      {
        "name": "strength",
        "type": "range",
        "default": 0.15,
        "description": "Intensity of the flow distortion",
        "min": 0,
        "max": 0.5,
        "step": 0.05,
        "group": "Effect",
        "label": "Strength"
      },
      {
        "name": "detail",
        "type": "range",
        "default": 2,
        "description": "Scale of the flow patterns",
        "min": 0.5,
        "max": 5,
        "step": 0.1,
        "group": "Effect",
        "label": "Detail"
      },
      {
        "name": "speed",
        "type": "range",
        "default": 1,
        "description": "Speed of the flow",
        "min": 0,
        "max": 5,
        "step": 0.1,
        "group": "Animation",
        "label": "Speed"
      },
      {
        "name": "edges",
        "type": "select",
        "default": "mirror",
        "description": "How to handle edges when distortion pushes content out of bounds",
        "options": [
          {
            "label": "Stretch",
            "value": "stretch"
          },
          {
            "label": "Transparent",
            "value": "transparent"
          },
          {
            "label": "Mirror",
            "value": "mirror"
          },
          {
            "label": "Wrap",
            "value": "wrap"
          }
        ],
        "group": "Effect",
        "label": "Edges"
      }
    ]
  },
  {
    "name": "GlassTiles",
    "category": "Distortions",
    "description": "Refraction-like distortion in a tile grid pattern",
    "requiresChild": true,
    "props": [
      {
        "name": "intensity",
        "type": "range",
        "default": 2,
        "description": "The intensity of the glass tiles effect",
        "min": 0,
        "max": 10,
        "step": 0.1,
        "group": "Effect",
        "label": "Intensity"
      },
      {
        "name": "tileCount",
        "type": "range",
        "default": 20,
        "description": "Number of tiles across the longest dimension",
        "min": 5,
        "max": 50,
        "step": 1,
        "group": "Effect",
        "label": "Tile Count"
      },
      {
        "name": "rotation",
        "type": "range",
        "default": 0,
        "description": "Rotation angle of the tile grid in degrees",
        "min": 0,
        "max": 360,
        "step": 1,
        "group": "Effect",
        "label": "Rotation"
      },
      {
        "name": "roundness",
        "type": "range",
        "default": 0,
        "description": "Makes tiles more circular instead of square",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Roundness"
      }
    ]
  },
  {
    "name": "Glitch",
    "category": "Stylize",
    "description": "Digital glitch that melts pixels and distorts colors",
    "requiresChild": true,
    "props": [
      {
        "name": "intensity",
        "type": "range",
        "default": 0.5,
        "description": "Overall glitch strength and frequency of glitch bursts",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "group": "Effect",
        "label": "Intensity"
      },
      {
        "name": "speed",
        "type": "range",
        "default": 1,
        "description": "How fast the glitch pattern evolves",
        "min": 0.1,
        "max": 5,
        "step": 0.1,
        "group": "Effect",
        "label": "Speed"
      },
      {
        "name": "rgbShift",
        "type": "range",
        "default": 5,
        "description": "Amount of chromatic aberration (RGB channel splitting)",
        "min": 0,
        "max": 20,
        "step": 0.5,
        "group": "Effect",
        "label": "RGB Shift"
      },
      {
        "name": "blockDensity",
        "type": "range",
        "default": 10,
        "description": "Base number of horizontal glitch bands",
        "min": 2,
        "max": 50,
        "step": 1,
        "group": "Effect",
        "label": "Block Density"
      },
      {
        "name": "colorBarIntensity",
        "type": "range",
        "default": 0.2,
        "description": "Intensity of vivid neon color bar overlay in glitch regions",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "group": "Effect",
        "label": "Color Bars"
      },
      {
        "name": "mirrorAmount",
        "type": "range",
        "default": 0.3,
        "description": "Chance of glitch blocks showing mirrored/flipped content",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "group": "Effect",
        "label": "Mirror"
      },
      {
        "name": "scanlineIntensity",
        "type": "range",
        "default": 0.2,
        "description": "Visibility of CRT-style horizontal scanlines in distorted areas",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "group": "Effect",
        "label": "Scanlines"
      }
    ]
  },
  {
    "name": "Glow",
    "category": "Stylize",
    "description": "Soft glow effect with adjustable intensity",
    "requiresChild": true,
    "props": [
      {
        "name": "intensity",
        "type": "range",
        "default": 1,
        "description": "Glow intensity (brightness of the glow effect)",
        "min": 0,
        "max": 10,
        "step": 0.1,
        "group": "Effect",
        "label": "Intensity"
      },
      {
        "name": "threshold",
        "type": "range",
        "default": 0.5,
        "description": "Brightness threshold for glow extraction (lower = more glow)",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Threshold"
      },
      {
        "name": "size",
        "type": "range",
        "default": 10,
        "description": "Size/spread of the glow effect",
        "min": 1,
        "max": 20,
        "step": 0.1,
        "group": "Effect",
        "label": "Glow Size"
      }
    ]
  },
  {
    "name": "Godrays",
    "category": "Textures",
    "description": "Volumetric light rays emanating from a point",
    "requiresChild": false,
    "props": [
      {
        "name": "center",
        "type": "position",
        "default": {
          "x": 0,
          "y": 0
        },
        "description": "The center point of the god rays",
        "group": "Position",
        "label": "Center"
      },
      {
        "name": "density",
        "type": "range",
        "default": 0.3,
        "description": "Frequency of ray sectors",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Density"
      },
      {
        "name": "intensity",
        "type": "range",
        "default": 0.8,
        "description": "Ray visibility within sectors",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Intensity"
      },
      {
        "name": "spotty",
        "type": "range",
        "default": 1,
        "description": "Density of spots on rays (higher = more spots)",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Spotty"
      },
      {
        "name": "speed",
        "type": "range",
        "default": 0.5,
        "description": "Animation speed of the rays",
        "min": 0,
        "max": 2,
        "step": 0.1,
        "group": "Animation",
        "label": "Speed"
      },
      {
        "name": "rayColor",
        "type": "color",
        "default": "#4283fb",
        "description": "Color of the light rays",
        "group": "Colors",
        "label": "Ray Color"
      },
      {
        "name": "backgroundColor",
        "type": "color",
        "default": "transparent",
        "description": "Background color",
        "group": "Colors",
        "label": "Background Color"
      }
    ]
  },
  {
    "name": "Grayscale",
    "category": "Adjustments",
    "description": "Convert colors to black and white",
    "requiresChild": true,
    "props": []
  },
  {
    "name": "Grid",
    "category": "Textures",
    "description": "Simple grid lines pattern with adjustable thickness",
    "requiresChild": false,
    "props": [
      {
        "name": "color",
        "type": "color",
        "default": "#ffffff",
        "description": "The color of the grid lines",
        "group": "Colors",
        "label": "Color"
      },
      {
        "name": "cells",
        "type": "range",
        "default": 10,
        "description": "Number of cells along the shortest canvas edge (creates square cells)",
        "min": 1,
        "max": 50,
        "step": 1,
        "group": "Effect",
        "label": "Cells"
      },
      {
        "name": "thickness",
        "type": "range",
        "default": 1,
        "description": "Thickness of grid lines (normalized, 0.0-1.0)",
        "min": 0,
        "max": 5,
        "step": 0.1,
        "group": "Effect",
        "label": "Thickness"
      }
    ]
  },
  {
    "name": "GridDistortion",
    "category": "Interactive",
    "description": "Interactive grid distortion controlled by mouse position",
    "requiresChild": true,
    "props": [
      {
        "name": "intensity",
        "type": "range",
        "default": 1,
        "description": "Strength of the distortion effect",
        "min": 0,
        "max": 5,
        "step": 0.1,
        "group": "Effect",
        "label": "Intensity"
      },
      {
        "name": "decay",
        "type": "range",
        "default": 3,
        "description": "Rate of distortion decay (higher = faster)",
        "min": 0,
        "max": 10,
        "step": 0.1,
        "group": "Effect",
        "label": "Decay"
      },
      {
        "name": "radius",
        "type": "range",
        "default": 1,
        "description": "Radius of the distortion effect",
        "min": 0,
        "max": 3,
        "step": 0.1,
        "group": "Effect",
        "label": "Radius"
      },
      {
        "name": "gridSize",
        "type": "range",
        "default": 20,
        "description": "Resolution of the distortion grid (higher = more detailed)",
        "min": 8,
        "max": 128,
        "step": 1,
        "group": "Effect",
        "label": "Grid Size"
      },
      {
        "name": "edges",
        "type": "select",
        "default": "stretch",
        "description": "How to handle edges when distortion pushes content out of bounds",
        "options": [
          {
            "label": "Stretch",
            "value": "stretch"
          },
          {
            "label": "Transparent",
            "value": "transparent"
          },
          {
            "label": "Mirror",
            "value": "mirror"
          },
          {
            "label": "Wrap",
            "value": "wrap"
          }
        ],
        "group": "Effect",
        "label": "Edges"
      }
    ]
  },
  {
    "name": "Group",
    "category": "Utilities",
    "description": "Container for organizing and composing child effects",
    "requiresChild": true,
    "props": []
  },
  {
    "name": "Halftone",
    "category": "Stylize",
    "description": "Halftone dot pattern effect for printing aesthetics",
    "requiresChild": true,
    "props": [
      {
        "name": "frequency",
        "type": "range",
        "default": 100,
        "description": "Frequency of the halftone dots",
        "min": 10,
        "max": 300,
        "step": 1,
        "group": "Effect",
        "label": "Frequency"
      },
      {
        "name": "angle",
        "type": "range",
        "default": 45,
        "description": "Rotation angle of the pattern (in degrees)",
        "min": 0,
        "max": 360,
        "step": 1,
        "group": "Effect",
        "label": "Angle"
      },
      {
        "name": "smoothness",
        "type": "range",
        "default": 0.1,
        "description": "Edge smoothness of the dots",
        "min": 0,
        "max": 0.3,
        "step": 0.1,
        "group": "Effect",
        "label": "Smoothness"
      }
    ]
  },
  {
    "name": "HueShift",
    "category": "Adjustments",
    "description": "Rotate hue around the color wheel",
    "requiresChild": true,
    "props": [
      {
        "name": "shift",
        "type": "range",
        "default": 0,
        "description": "The amount to shift the hue by",
        "min": -180,
        "max": 180,
        "step": 1,
        "group": "Appearance",
        "label": "Shift"
      }
    ]
  },
  {
    "name": "ImageTexture",
    "category": "Textures",
    "description": "Display an image with customizable object-fit modes",
    "requiresChild": false,
    "props": [
      {
        "name": "url",
        "type": "image-upload",
        "default": "https://picsum.photos/800/600",
        "description": "Upload an image or provide a URL",
        "group": "Media",
        "label": "Image"
      },
      {
        "name": "objectFit",
        "type": "select",
        "default": "cover",
        "description": "How the image should be sized within the viewport",
        "options": [
          {
            "label": "Cover",
            "value": "cover"
          },
          {
            "label": "Contain",
            "value": "contain"
          },
          {
            "label": "Fill",
            "value": "fill"
          },
          {
            "label": "Scale Down",
            "value": "scale-down"
          },
          {
            "label": "None",
            "value": "none"
          }
        ],
        "group": "Appearance",
        "label": "Object Fit"
      }
    ]
  },
  {
    "name": "Invert",
    "category": "Adjustments",
    "description": "Invert RGB colors while preserving alpha",
    "requiresChild": true,
    "props": []
  },
  {
    "name": "Kaleidoscope",
    "category": "Distortions",
    "description": "Create a kaleidoscope effect with radial mirrored segments",
    "requiresChild": true,
    "props": [
      {
        "name": "center",
        "type": "position",
        "default": {
          "x": 0.5,
          "y": 0.5
        },
        "description": "The center point of the kaleidoscope effect",
        "group": "Position",
        "label": "Center"
      },
      {
        "name": "segments",
        "type": "range",
        "default": 6,
        "description": "Number of radial segments in the kaleidoscope",
        "min": 2,
        "max": 24,
        "step": 1,
        "group": "Effect",
        "label": "Segments"
      },
      {
        "name": "angle",
        "type": "range",
        "default": 0,
        "description": "Rotation offset for the entire kaleidoscope pattern",
        "min": 0,
        "max": 360,
        "step": 1,
        "group": "Effect",
        "label": "Angle"
      },
      {
        "name": "edges",
        "type": "select",
        "default": "mirror",
        "description": "How to handle edges when distortion pushes content out of bounds",
        "options": [
          {
            "label": "Stretch",
            "value": "stretch"
          },
          {
            "label": "Transparent",
            "value": "transparent"
          },
          {
            "label": "Mirror",
            "value": "mirror"
          },
          {
            "label": "Wrap",
            "value": "wrap"
          }
        ],
        "group": "Effect",
        "label": "Edges"
      }
    ]
  },
  {
    "name": "LensFlare",
    "category": "Stylize",
    "description": "Realistic camera lens flare with artifacts.",
    "requiresChild": false,
    "props": [
      {
        "name": "lightPosition",
        "type": "position",
        "default": {
          "x": 0.3,
          "y": 0.3
        },
        "description": "Position of the light source",
        "group": "Light",
        "label": "Light Position"
      },
      {
        "name": "intensity",
        "type": "range",
        "default": 0.5,
        "description": "Master brightness of the entire lens flare effect",
        "min": 0,
        "max": 2,
        "step": 0.01,
        "group": "Light",
        "label": "Intensity"
      },
      {
        "name": "ghostIntensity",
        "type": "range",
        "default": 0.4,
        "description": "Brightness of internal reflection ghost discs along the flare axis",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "group": "Reflections",
        "label": "Ghosts"
      },
      {
        "name": "ghostSpread",
        "type": "range",
        "default": 0.7,
        "description": "Spacing between ghost reflections along the flare axis",
        "min": 0.1,
        "max": 2,
        "step": 0.01,
        "group": "Reflections",
        "label": "Ghost Spread"
      },
      {
        "name": "ghostChroma",
        "type": "range",
        "default": 0.3,
        "description": "Rainbow chromatic fringing around ghost element edges",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "group": "Reflections",
        "label": "Ghost Chroma"
      },
      {
        "name": "haloIntensity",
        "type": "range",
        "default": 0.4,
        "description": "Brightness of the circular halo ring from internal reflection",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "group": "Reflections",
        "label": "Halo"
      },
      {
        "name": "haloRadius",
        "type": "range",
        "default": 0.6,
        "description": "Radius of the halo ring",
        "min": 0.1,
        "max": 1,
        "step": 0.01,
        "group": "Reflections",
        "label": "Halo Size"
      },
      {
        "name": "haloChroma",
        "type": "range",
        "default": 0.6,
        "description": "Spectral dispersion on the halo creating rainbow color separation",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "group": "Reflections",
        "label": "Halo Chroma"
      },
      {
        "name": "haloSoftness",
        "type": "range",
        "default": 0.8,
        "description": "Thickness and softness of the halo ring",
        "min": 0.01,
        "max": 3,
        "step": 0.01,
        "group": "Reflections",
        "label": "Halo Softness"
      },
      {
        "name": "starburstIntensity",
        "type": "range",
        "default": 0.3,
        "description": "Brightness of diffraction spikes radiating from the light source",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "group": "Effects",
        "label": "Starburst"
      },
      {
        "name": "starburstPoints",
        "type": "range",
        "default": 6,
        "description": "Number of starburst spikes (simulates aperture blade count)",
        "min": 4,
        "max": 16,
        "step": 1,
        "group": "Effects",
        "label": "Blades"
      },
      {
        "name": "streakIntensity",
        "type": "range",
        "default": 0.15,
        "description": "Brightness of horizontal anamorphic light streak",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "group": "Effects",
        "label": "Streak"
      },
      {
        "name": "streakLength",
        "type": "range",
        "default": 0.5,
        "description": "Horizontal extent of the anamorphic streak",
        "min": 0.1,
        "max": 1,
        "step": 0.01,
        "group": "Effects",
        "label": "Streak Length"
      },
      {
        "name": "glareIntensity",
        "type": "range",
        "default": 0.2,
        "description": "Soft veiling glare that washes out contrast around the light",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "group": "Effects",
        "label": "Glare"
      },
      {
        "name": "glareSize",
        "type": "range",
        "default": 0.5,
        "description": "Size of the soft glare glow",
        "min": 0.1,
        "max": 1,
        "step": 0.01,
        "group": "Effects",
        "label": "Glare Size"
      },
      {
        "name": "edgeFade",
        "type": "range",
        "default": 0.2,
        "description": "How much the flare fades when the light source is near the screen edge (0 = no fade, 1 = heavy fade)",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "group": "Light",
        "label": "Edge Fade"
      },
      {
        "name": "speed",
        "type": "range",
        "default": 0.5,
        "description": "Speed of subtle flare shimmer and starburst rotation",
        "min": 0,
        "max": 3,
        "step": 0.1,
        "group": "Animation",
        "label": "Speed"
      }
    ]
  },
  {
    "name": "LinearBlur",
    "category": "Blurs",
    "description": "Directional motion blur in a specific angle",
    "requiresChild": true,
    "props": [
      {
        "name": "intensity",
        "type": "range",
        "default": 30,
        "description": "Intensity of the linear blur effect",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Effect",
        "label": "Intensity"
      },
      {
        "name": "angle",
        "type": "range",
        "default": 0,
        "description": "Direction of the linear blur (in degrees)",
        "min": 0,
        "max": 360,
        "step": 1,
        "group": "Effect",
        "label": "Angle"
      }
    ]
  },
  {
    "name": "LinearGradient",
    "category": "Textures",
    "description": "Create smooth linear color gradients",
    "requiresChild": false,
    "props": [
      {
        "name": "colorA",
        "type": "color",
        "default": "#1aff00",
        "description": "The starting color of the gradient",
        "group": "Colors",
        "label": "Color A"
      },
      {
        "name": "colorB",
        "type": "color",
        "default": "#0000ff",
        "description": "The ending color of the gradient",
        "group": "Colors",
        "label": "Color B"
      },
      {
        "name": "start",
        "type": "position",
        "default": {
          "x": 0,
          "y": 0.5
        },
        "description": "The starting point of the gradient",
        "group": "Position",
        "label": "Start"
      },
      {
        "name": "end",
        "type": "position",
        "default": {
          "x": 1,
          "y": 0.5
        },
        "description": "The ending point of the gradient",
        "group": "Position",
        "label": "End"
      },
      {
        "name": "angle",
        "type": "range",
        "default": 0,
        "description": "Additional rotation angle of the gradient (in degrees)",
        "min": 0,
        "max": 360,
        "step": 1,
        "group": "Effect",
        "label": "Angle"
      },
      {
        "name": "edges",
        "type": "select",
        "default": "stretch",
        "description": "How to handle areas beyond the gradient endpoints",
        "options": [
          {
            "label": "Stretch",
            "value": "stretch"
          },
          {
            "label": "Transparent",
            "value": "transparent"
          },
          {
            "label": "Mirror",
            "value": "mirror"
          },
          {
            "label": "Wrap",
            "value": "wrap"
          }
        ],
        "group": "Effect",
        "label": "Edges"
      },
      {
        "name": "colorSpace",
        "type": "select",
        "default": "linear",
        "description": "Color space for color interpolation",
        "options": [
          {
            "label": "Linear RGB",
            "value": "linear"
          },
          {
            "label": "OKLCh",
            "value": "oklch"
          },
          {
            "label": "OKLAB",
            "value": "oklab"
          }
        ],
        "group": "Colors",
        "label": "Color Space"
      }
    ]
  },
  {
    "name": "Liquify",
    "category": "Interactive",
    "description": "Liquid-like interactive deformation effect",
    "requiresChild": true,
    "props": [
      {
        "name": "intensity",
        "type": "range",
        "default": 1,
        "description": "Strength of the distortion effect",
        "min": 0,
        "max": 5,
        "step": 0.1,
        "group": "Effect",
        "label": "Intensity"
      },
      {
        "name": "decay",
        "type": "range",
        "default": 3,
        "description": "Rate of distortion decay (higher = faster)",
        "min": 0,
        "max": 10,
        "step": 0.1,
        "group": "Effect",
        "label": "Decay"
      },
      {
        "name": "radius",
        "type": "range",
        "default": 1,
        "description": "Radius of the distortion effect",
        "min": 0,
        "max": 3,
        "step": 0.1,
        "group": "Effect",
        "label": "Radius"
      },
      {
        "name": "edges",
        "type": "select",
        "default": "stretch",
        "description": "How to handle edges when distortion pushes content out of bounds",
        "options": [
          {
            "label": "Stretch",
            "value": "stretch"
          },
          {
            "label": "Transparent",
            "value": "transparent"
          },
          {
            "label": "Mirror",
            "value": "mirror"
          },
          {
            "label": "Wrap",
            "value": "wrap"
          }
        ],
        "group": "Effect",
        "label": "Edges"
      }
    ]
  },
  {
    "name": "Mirror",
    "category": "Distortions",
    "description": "Mirror content across a line defined by center point and angle",
    "requiresChild": true,
    "props": [
      {
        "name": "center",
        "type": "position",
        "default": {
          "x": 0.5,
          "y": 0.5
        },
        "description": "The point the mirror line passes through",
        "group": "Position",
        "label": "Center"
      },
      {
        "name": "angle",
        "type": "range",
        "default": 0,
        "description": "The angle of the mirror line in degrees",
        "min": 0,
        "max": 360,
        "step": 1,
        "group": "Effect",
        "label": "Angle"
      },
      {
        "name": "edges",
        "type": "select",
        "default": "mirror",
        "description": "How to handle edges when distortion pushes content out of bounds",
        "options": [
          {
            "label": "Stretch",
            "value": "stretch"
          },
          {
            "label": "Transparent",
            "value": "transparent"
          },
          {
            "label": "Mirror",
            "value": "mirror"
          },
          {
            "label": "Wrap",
            "value": "wrap"
          }
        ],
        "group": "Effect",
        "label": "Edges"
      }
    ]
  },
  {
    "name": "Perspective",
    "category": "Distortions",
    "description": "Rotate the plane in 3D space with pan and tilt",
    "requiresChild": true,
    "props": [
      {
        "name": "center",
        "type": "position",
        "default": {
          "x": 0.5,
          "y": 0.5
        },
        "description": "Center point of rotation",
        "group": "Position",
        "label": "Center"
      },
      {
        "name": "pan",
        "type": "range",
        "default": 0,
        "description": "Horizontal rotation (left/right)",
        "min": -90,
        "max": 90,
        "step": 0.1,
        "group": "Effect",
        "label": "Pan"
      },
      {
        "name": "tilt",
        "type": "range",
        "default": 0,
        "description": "Vertical rotation (up/down)",
        "min": -90,
        "max": 90,
        "step": 0.1,
        "group": "Effect",
        "label": "Tilt"
      },
      {
        "name": "fov",
        "type": "range",
        "default": 60,
        "description": "Field of view - controls perspective intensity",
        "min": 30,
        "max": 120,
        "step": 1,
        "group": "Effect",
        "label": "FOV"
      },
      {
        "name": "zoom",
        "type": "range",
        "default": 1,
        "description": "Zoom in to fill the frame after rotation",
        "min": 0.5,
        "max": 3,
        "step": 0.1,
        "group": "Effect",
        "label": "Zoom"
      },
      {
        "name": "offset",
        "type": "position",
        "default": {
          "x": 0.5,
          "y": 0.5
        },
        "description": "Shift the result in X/Y",
        "group": "Position",
        "label": "Offset"
      },
      {
        "name": "edges",
        "type": "select",
        "default": "transparent",
        "description": "How to handle edges",
        "options": [
          {
            "label": "Stretch",
            "value": "stretch"
          },
          {
            "label": "Transparent",
            "value": "transparent"
          },
          {
            "label": "Mirror",
            "value": "mirror"
          },
          {
            "label": "Wrap",
            "value": "wrap"
          }
        ],
        "group": "Effect",
        "label": "Edges"
      }
    ]
  },
  {
    "name": "Pixelate",
    "category": "Stylize",
    "description": "Pixelation effect with adjustable cell size",
    "requiresChild": true,
    "props": [
      {
        "name": "scale",
        "type": "range",
        "default": 50,
        "description": "Number of pixels along the longest edge (higher = smaller pixels)",
        "min": 1,
        "max": 200,
        "step": 1,
        "group": "Effect",
        "label": "Scale"
      }
    ]
  },
  {
    "name": "Plasma",
    "category": "Textures",
    "description": "Animated effect of glowing plasma",
    "requiresChild": false,
    "props": [
      {
        "name": "density",
        "type": "range",
        "default": 2,
        "description": "Density of the plasma pattern",
        "min": 0,
        "max": 4,
        "step": 0.1,
        "group": "Effect",
        "label": "Density"
      },
      {
        "name": "speed",
        "type": "range",
        "default": 2,
        "description": "Animation speed",
        "min": 0,
        "max": 5,
        "step": 0.1,
        "group": "Effect",
        "label": "Speed"
      },
      {
        "name": "intensity",
        "type": "range",
        "default": 1.5,
        "description": "Brightness and spread of the plasma glow",
        "min": 0.1,
        "max": 3,
        "step": 0.1,
        "group": "Colors",
        "label": "Intensity"
      },
      {
        "name": "warp",
        "type": "range",
        "default": 0.4,
        "description": "How much the flow distorts and swirls",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "group": "Effect",
        "label": "Warp"
      },
      {
        "name": "contrast",
        "type": "range",
        "default": 1,
        "description": "Push darks darker and lights lighter",
        "min": 0,
        "max": 3,
        "step": 0.1,
        "group": "Colors",
        "label": "Contrast"
      },
      {
        "name": "balance",
        "type": "range",
        "default": 50,
        "description": "Skew color balance toward A (higher) or B (lower)",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Colors",
        "label": "Balance"
      },
      {
        "name": "colorA",
        "type": "color",
        "default": "#7018be",
        "description": "Primary color",
        "group": "Colors",
        "label": "Color A"
      },
      {
        "name": "colorB",
        "type": "color",
        "default": "#000000",
        "description": "Secondary color",
        "group": "Colors",
        "label": "Color B"
      },
      {
        "name": "colorSpace",
        "type": "select",
        "default": "linear",
        "description": "Color space for color interpolation",
        "options": [
          {
            "label": "Linear RGB",
            "value": "linear"
          },
          {
            "label": "OKLCh",
            "value": "oklch"
          },
          {
            "label": "OKLAB",
            "value": "oklab"
          }
        ],
        "group": "Colors",
        "label": "Color Space"
      }
    ]
  },
  {
    "name": "PolarCoordinates",
    "category": "Distortions",
    "description": "Convert rectangular coordinates to polar space",
    "requiresChild": true,
    "props": [
      {
        "name": "center",
        "type": "position",
        "default": {
          "x": 0.5,
          "y": 0.5
        },
        "description": "The center point for polar coordinate conversion",
        "group": "Position",
        "label": "Center"
      },
      {
        "name": "wrap",
        "type": "range",
        "default": 1,
        "description": "Controls how much of the angular range to use (1 = full 360°, 0.5 = 180°)",
        "min": 0,
        "max": 2,
        "step": 0.1,
        "group": "Effect",
        "label": "Wrap"
      },
      {
        "name": "radius",
        "type": "range",
        "default": 1,
        "description": "Controls how much of the radius range to use (affects the radial mapping)",
        "min": 0,
        "max": 2,
        "step": 0.1,
        "group": "Effect",
        "label": "Radius"
      },
      {
        "name": "intensity",
        "type": "range",
        "default": 1,
        "description": "Blends between original UVs (0) and polar coordinates (1)",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Intensity"
      },
      {
        "name": "edges",
        "type": "select",
        "default": "transparent",
        "description": "How to handle edges when distortion pushes content out of bounds",
        "options": [
          {
            "label": "Stretch",
            "value": "stretch"
          },
          {
            "label": "Transparent",
            "value": "transparent"
          },
          {
            "label": "Mirror",
            "value": "mirror"
          },
          {
            "label": "Wrap",
            "value": "wrap"
          }
        ],
        "group": "Effect",
        "label": "Edges"
      }
    ]
  },
  {
    "name": "Posterize",
    "category": "Adjustments",
    "description": "Reduce color depth to create a poster effect",
    "requiresChild": true,
    "props": [
      {
        "name": "intensity",
        "type": "range",
        "default": 5,
        "description": "The intensity of the posterization effect (lower is more posterized)",
        "min": 2,
        "max": 20,
        "step": 1,
        "group": "Effect",
        "label": "Intensity"
      }
    ]
  },
  {
    "name": "ProgressiveBlur",
    "category": "Blurs",
    "description": "Blur that increases progressively in one direction",
    "requiresChild": true,
    "props": [
      {
        "name": "intensity",
        "type": "range",
        "default": 50,
        "description": "Maximum intensity of the blur effect",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Effect",
        "label": "Intensity"
      },
      {
        "name": "angle",
        "type": "range",
        "default": 0,
        "description": "Direction of the blur gradient (in degrees)",
        "min": 0,
        "max": 360,
        "step": 1,
        "group": "Effect",
        "label": "Angle"
      },
      {
        "name": "center",
        "type": "position",
        "default": {
          "x": 0,
          "y": 0.5
        },
        "description": "Center point where blur begins",
        "group": "Position",
        "label": "Center"
      },
      {
        "name": "falloff",
        "type": "range",
        "default": 1,
        "description": "Distance over which blur transitions to full strength",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Falloff"
      }
    ]
  },
  {
    "name": "RadialGradient",
    "category": "Textures",
    "description": "Radial gradient radiating from a center point",
    "requiresChild": false,
    "props": [
      {
        "name": "colorA",
        "type": "color",
        "default": "#ff0000",
        "description": "The starting color at the center of the gradient",
        "group": "Colors",
        "label": "Color A"
      },
      {
        "name": "colorB",
        "type": "color",
        "default": "#0000ff",
        "description": "The ending color at the edge of the gradient",
        "group": "Colors",
        "label": "Color B"
      },
      {
        "name": "center",
        "type": "position",
        "default": {
          "x": 0.5,
          "y": 0.5
        },
        "description": "The center point of the radial gradient",
        "group": "Position",
        "label": "Center"
      },
      {
        "name": "radius",
        "type": "range",
        "default": 1,
        "description": "The radius of the gradient (normalized, 0.0-1.0)",
        "min": 0,
        "max": 2,
        "step": 0.1,
        "group": "Effect",
        "label": "Radius"
      },
      {
        "name": "colorSpace",
        "type": "select",
        "default": "linear",
        "description": "Color space for color interpolation",
        "options": [
          {
            "label": "Linear RGB",
            "value": "linear"
          },
          {
            "label": "OKLCh",
            "value": "oklch"
          },
          {
            "label": "OKLAB",
            "value": "oklab"
          }
        ],
        "group": "Colors",
        "label": "Color Space"
      }
    ]
  },
  {
    "name": "RectangularCoordinates",
    "category": "Distortions",
    "description": "Convert polar coordinates back to rectangular space",
    "requiresChild": true,
    "props": [
      {
        "name": "center",
        "type": "position",
        "default": {
          "x": 0.5,
          "y": 0.5
        },
        "description": "The center point for rectangular coordinate conversion",
        "group": "Position",
        "label": "Center"
      },
      {
        "name": "scale",
        "type": "range",
        "default": 1,
        "description": "Scale factor for the rectangular output",
        "min": 0.1,
        "max": 3,
        "step": 0.1,
        "group": "Effect",
        "label": "Scale"
      },
      {
        "name": "intensity",
        "type": "range",
        "default": 1,
        "description": "Blends between original UVs (0) and rectangular coordinates (1)",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Intensity"
      },
      {
        "name": "edges",
        "type": "select",
        "default": "transparent",
        "description": "How to handle edges when distortion pushes content out of bounds",
        "options": [
          {
            "label": "Stretch",
            "value": "stretch"
          },
          {
            "label": "Transparent",
            "value": "transparent"
          },
          {
            "label": "Mirror",
            "value": "mirror"
          },
          {
            "label": "Wrap",
            "value": "wrap"
          }
        ],
        "group": "Effect",
        "label": "Edges"
      }
    ]
  },
  {
    "name": "Ripples",
    "category": "Textures",
    "description": "Concentric animated ripples emanating from a point",
    "requiresChild": false,
    "props": [
      {
        "name": "center",
        "type": "position",
        "default": {
          "x": 0.5,
          "y": 0.5
        },
        "description": "The center point where ripples emanate from",
        "group": "Position",
        "label": "Center"
      },
      {
        "name": "colorA",
        "type": "color",
        "default": "#ffffff",
        "description": "Color of the ripple waves",
        "group": "Colors",
        "label": "Color A"
      },
      {
        "name": "colorB",
        "type": "color",
        "default": "#000000",
        "description": "Background color between ripples",
        "group": "Colors",
        "label": "Color B"
      },
      {
        "name": "speed",
        "type": "range",
        "default": 1,
        "description": "Speed of ripple animation",
        "min": -5,
        "max": 5,
        "step": 0.1,
        "group": "Animation",
        "label": "Speed"
      },
      {
        "name": "frequency",
        "type": "range",
        "default": 20,
        "description": "Number of ripples/spacing between them",
        "min": 1,
        "max": 80,
        "step": 0.1,
        "group": "Effect",
        "label": "Frequency"
      },
      {
        "name": "softness",
        "type": "range",
        "default": 0,
        "description": "Softness of ripple edges",
        "min": 0,
        "max": 3,
        "step": 0.1,
        "group": "Effect",
        "label": "Softness"
      },
      {
        "name": "thickness",
        "type": "range",
        "default": 0.5,
        "description": "Thickness of each ripple band",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Thickness"
      },
      {
        "name": "phase",
        "type": "range",
        "default": 0,
        "description": "Phase offset for ripple animation",
        "min": 0,
        "max": 6.28,
        "step": 0.1,
        "group": "Animation",
        "label": "Phase"
      }
    ]
  },
  {
    "name": "Saturation",
    "category": "Adjustments",
    "description": "Adjust color saturation intensity",
    "requiresChild": true,
    "props": [
      {
        "name": "intensity",
        "type": "range",
        "default": 1,
        "description": "The intensity of the saturation effect (1 being no change)",
        "min": 0,
        "max": 3,
        "step": 0.1,
        "group": "Appearance",
        "label": "Intensity"
      }
    ]
  },
  {
    "name": "Sharpness",
    "category": "Adjustments",
    "description": "Adjust image sharpness using a convolution kernel",
    "requiresChild": true,
    "props": [
      {
        "name": "sharpness",
        "type": "range",
        "default": 0,
        "description": "How sharp to make the underlying image",
        "min": 0,
        "max": 5,
        "step": 0.1,
        "group": "Appearance",
        "label": "Sharpness"
      }
    ]
  },
  {
    "name": "Shatter",
    "category": "Interactive",
    "description": "Broken glass effect with tectonic plate displacement",
    "requiresChild": true,
    "props": [
      {
        "name": "crackWidth",
        "type": "range",
        "default": 1,
        "description": "Thickness of crack lines",
        "min": 0.5,
        "max": 5,
        "step": 0.1,
        "group": "Effect",
        "label": "Crack Width"
      },
      {
        "name": "intensity",
        "type": "range",
        "default": 4,
        "description": "How much shards shift",
        "min": 0,
        "max": 20,
        "step": 1,
        "group": "Effect",
        "label": "Intensity"
      },
      {
        "name": "radius",
        "type": "range",
        "default": 0.4,
        "description": "Cursor influence radius",
        "min": 0.1,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Radius"
      },
      {
        "name": "decay",
        "type": "range",
        "default": 1,
        "description": "How fast shards return to rest",
        "min": 0.1,
        "max": 10,
        "step": 0.1,
        "group": "Effect",
        "label": "Decay"
      },
      {
        "name": "seed",
        "type": "range",
        "default": 2,
        "description": "Random seed for pattern",
        "min": 0,
        "max": 50,
        "step": 1,
        "group": "Effect",
        "label": "Seed"
      },
      {
        "name": "chromaticSplit",
        "type": "range",
        "default": 1,
        "description": "RGB separation for prismatic glass effect",
        "min": 0,
        "max": 5,
        "step": 0.1,
        "group": "Effect",
        "label": "Chromatic Split"
      },
      {
        "name": "refractionStrength",
        "type": "range",
        "default": 5,
        "description": "How much cracks bend/distort the underlying image",
        "min": 0,
        "max": 10,
        "step": 0.1,
        "group": "Effect",
        "label": "Refraction"
      },
      {
        "name": "shardLighting",
        "type": "range",
        "default": 0.1,
        "description": "Subtle lighting on tilted shards for 3D depth",
        "min": 0,
        "max": 0.5,
        "step": 0.1,
        "group": "Effect",
        "label": "Shard Lighting"
      },
      {
        "name": "edges",
        "type": "select",
        "default": "mirror",
        "description": "How to handle edges when displacement pushes content out of bounds",
        "options": [
          {
            "label": "Stretch",
            "value": "stretch"
          },
          {
            "label": "Transparent",
            "value": "transparent"
          },
          {
            "label": "Mirror",
            "value": "mirror"
          },
          {
            "label": "Wrap",
            "value": "wrap"
          }
        ],
        "group": "Effect",
        "label": "Edges"
      }
    ]
  },
  {
    "name": "SimplexNoise",
    "category": "Textures",
    "description": "Organic noise with animated movement",
    "requiresChild": false,
    "props": [
      {
        "name": "colorA",
        "type": "color",
        "default": "#ffffff",
        "description": "First color",
        "group": "Colors",
        "label": "Color A"
      },
      {
        "name": "colorB",
        "type": "color",
        "default": "#000000",
        "description": "Second color",
        "group": "Colors",
        "label": "Color B"
      },
      {
        "name": "scale",
        "type": "range",
        "default": 2,
        "description": "Pattern scale (higher = larger patterns)",
        "min": -2,
        "max": 5,
        "step": 0.1,
        "group": "Effect",
        "label": "Scale"
      },
      {
        "name": "balance",
        "type": "range",
        "default": 0,
        "description": "Balance between colors (negative = more colorB, positive = more colorA)",
        "min": -1,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Balance"
      },
      {
        "name": "contrast",
        "type": "range",
        "default": 0,
        "description": "Pattern contrast (higher = sharper transitions)",
        "min": -2,
        "max": 5,
        "step": 0.1,
        "group": "Appearance",
        "label": "Contrast"
      },
      {
        "name": "seed",
        "type": "range",
        "default": 0,
        "description": "Random seed for pattern variation",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Effect",
        "label": "Seed"
      },
      {
        "name": "speed",
        "type": "range",
        "default": 1,
        "description": "Animation speed",
        "min": 0,
        "max": 5,
        "step": 0.1,
        "group": "Animation",
        "label": "Speed"
      }
    ]
  },
  {
    "name": "SineWave",
    "category": "Textures",
    "description": "Animated wave with thickness and softness",
    "requiresChild": false,
    "props": [
      {
        "name": "color",
        "type": "color",
        "default": "#ffffff",
        "description": "The color of the sine wave",
        "group": "Colors",
        "label": "Color"
      },
      {
        "name": "amplitude",
        "type": "range",
        "default": 0.15,
        "description": "The height/amplitude of the sine wave",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Amplitude"
      },
      {
        "name": "frequency",
        "type": "range",
        "default": 1,
        "description": "The frequency/number of wave cycles",
        "min": 0.1,
        "max": 20,
        "step": 0.1,
        "group": "Effect",
        "label": "Frequency"
      },
      {
        "name": "speed",
        "type": "range",
        "default": 1,
        "description": "The animation speed of the wave",
        "min": -5,
        "max": 5,
        "step": 0.1,
        "group": "Animation",
        "label": "Speed"
      },
      {
        "name": "angle",
        "type": "range",
        "default": 0,
        "description": "The rotation angle of the wave (in degrees)",
        "min": 0,
        "max": 360,
        "step": 1,
        "group": "Effect",
        "label": "Angle"
      },
      {
        "name": "position",
        "type": "position",
        "default": {
          "x": 0.5,
          "y": 0.5
        },
        "description": "The center position of the wave",
        "group": "Position",
        "label": "Position"
      },
      {
        "name": "thickness",
        "type": "range",
        "default": 0.2,
        "description": "The thickness of the wave line",
        "min": 0,
        "max": 2,
        "step": 0.1,
        "group": "Effect",
        "label": "Thickness"
      },
      {
        "name": "softness",
        "type": "range",
        "default": 0.4,
        "description": "Edge softness of the wave line",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Softness"
      }
    ]
  },
  {
    "name": "SolidColor",
    "category": "Textures",
    "description": "Fill the canvas with a single solid color",
    "requiresChild": false,
    "props": [
      {
        "name": "color",
        "type": "color",
        "default": "#5b18ca",
        "description": "The solid color to display",
        "group": "Colors",
        "label": "Color"
      }
    ]
  },
  {
    "name": "Spherize",
    "category": "Distortions",
    "description": "Map content onto a 3D sphere surface with depth distortion",
    "requiresChild": true,
    "props": [
      {
        "name": "radius",
        "type": "range",
        "default": 1,
        "description": "Radius of the sphere (1 = half viewport height)",
        "min": 0.1,
        "max": 3,
        "step": 0.1,
        "group": "Effect",
        "label": "Radius"
      },
      {
        "name": "depth",
        "type": "range",
        "default": 1,
        "description": "How much the sphere bulges toward viewer (0 = flat, higher = more bulge)",
        "min": 0,
        "max": 3,
        "step": 0.1,
        "group": "Effect",
        "label": "Depth"
      },
      {
        "name": "center",
        "type": "position",
        "default": {
          "x": 0.5,
          "y": 0.5
        },
        "description": "The center point of the sphere",
        "group": "Position",
        "label": "Center"
      },
      {
        "name": "lightPosition",
        "type": "position",
        "default": {
          "x": 0.3,
          "y": 0.3
        },
        "description": "Position of the specular light source",
        "group": "Position",
        "label": "Light Position"
      },
      {
        "name": "lightIntensity",
        "type": "range",
        "default": 0.5,
        "description": "Intensity of the rim light (0 = off)",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Light Intensity"
      },
      {
        "name": "lightSoftness",
        "type": "range",
        "default": 0.5,
        "description": "Softness of the rim light falloff (0 = hard edge, 1 = soft glow)",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Light Softness"
      },
      {
        "name": "lightColor",
        "type": "color",
        "default": "#ffffff",
        "description": "Color of the specular highlight",
        "group": "Effect",
        "label": "Light Color"
      }
    ]
  },
  {
    "name": "Spiral",
    "category": "Textures",
    "description": "Rotating spiral pattern with animated movement",
    "requiresChild": false,
    "props": [
      {
        "name": "colorA",
        "type": "color",
        "default": "#000000",
        "description": "Background color",
        "group": "Colors",
        "label": "Color A"
      },
      {
        "name": "colorB",
        "type": "color",
        "default": "#ffffff",
        "description": "Spiral stroke color",
        "group": "Colors",
        "label": "Color B"
      },
      {
        "name": "strokeWidth",
        "type": "range",
        "default": 0.5,
        "description": "Thickness of spiral stroke",
        "min": 0,
        "max": 2,
        "step": 0.1,
        "group": "Effect",
        "label": "Stroke Width"
      },
      {
        "name": "strokeFalloff",
        "type": "range",
        "default": 0,
        "description": "Stroke losing width further from center",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Stroke Falloff"
      },
      {
        "name": "softness",
        "type": "range",
        "default": 0,
        "description": "Color transition sharpness (0 = hard edge, 1 = smooth fade)",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Softness"
      },
      {
        "name": "speed",
        "type": "range",
        "default": 1,
        "description": "Animation speed (negative values reverse direction)",
        "min": -3,
        "max": 3,
        "step": 0.1,
        "group": "Animation",
        "label": "Speed"
      },
      {
        "name": "center",
        "type": "position",
        "default": {
          "x": 0.5,
          "y": 0.5
        },
        "description": "The center point of the spiral",
        "group": "Position",
        "label": "Center"
      },
      {
        "name": "scale",
        "type": "range",
        "default": 1,
        "description": "Scale factor for spiral bands (higher = more bands, lower = fewer bands)",
        "min": 0.1,
        "max": 5,
        "step": 0.1,
        "group": "Effect",
        "label": "Scale"
      },
      {
        "name": "colorSpace",
        "type": "select",
        "default": "linear",
        "description": "Color space for color interpolation",
        "options": [
          {
            "label": "Linear RGB",
            "value": "linear"
          },
          {
            "label": "OKLCh",
            "value": "oklch"
          },
          {
            "label": "OKLAB",
            "value": "oklab"
          }
        ],
        "group": "Colors",
        "label": "Color Space"
      }
    ]
  },
  {
    "name": "Strands",
    "category": "Textures",
    "description": "Procedural wavy strands with layered animation",
    "requiresChild": false,
    "props": [
      {
        "name": "speed",
        "type": "range",
        "default": 0.5,
        "description": "Overall animation speed",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Animation",
        "label": "Speed"
      },
      {
        "name": "amplitude",
        "type": "range",
        "default": 1,
        "description": "Wave height amplitude",
        "min": 0,
        "max": 5,
        "step": 0.1,
        "group": "Effect",
        "label": "Amplitude"
      },
      {
        "name": "frequency",
        "type": "range",
        "default": 1,
        "description": "Wave frequency",
        "min": 0,
        "max": 5,
        "step": 0.1,
        "group": "Effect",
        "label": "Frequency"
      },
      {
        "name": "lineCount",
        "type": "range",
        "default": 12,
        "description": "Number of wave lines",
        "min": 4,
        "max": 32,
        "step": 1,
        "group": "Effect",
        "label": "Line Count"
      },
      {
        "name": "lineWidth",
        "type": "range",
        "default": 0.1,
        "description": "Width of wave lines",
        "min": 0,
        "max": 1,
        "step": 0.05,
        "group": "Effect",
        "label": "Line Width"
      },
      {
        "name": "waveColor",
        "type": "color",
        "default": "#f1c907",
        "description": "Color of the waves",
        "group": "Colors",
        "label": "Wave Color"
      },
      {
        "name": "pinEdges",
        "type": "checkbox",
        "default": true,
        "description": "Pin waves at edges (fade effect)",
        "group": "Effect",
        "label": "Pin Edges"
      },
      {
        "name": "start",
        "type": "position",
        "default": {
          "x": 0,
          "y": 0.5
        },
        "description": "Starting point of the waves",
        "group": "Position",
        "label": "Start"
      },
      {
        "name": "end",
        "type": "position",
        "default": {
          "x": 1,
          "y": 0.5
        },
        "description": "Ending point of the waves",
        "group": "Position",
        "label": "End"
      }
    ]
  },
  {
    "name": "Stretch",
    "category": "Distortions",
    "description": "Stretch content towards a direction from a center point",
    "requiresChild": true,
    "props": [
      {
        "name": "center",
        "type": "position",
        "default": {
          "x": 0.5,
          "y": 0.5
        },
        "description": "The center point of the stretch effect",
        "group": "Position",
        "label": "Center"
      },
      {
        "name": "strength",
        "type": "range",
        "default": 1,
        "description": "The intensity of the stretch effect",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Strength"
      },
      {
        "name": "angle",
        "type": "range",
        "default": 0,
        "description": "The direction of the stretch in degrees",
        "min": 0,
        "max": 360,
        "step": 1,
        "group": "Effect",
        "label": "Angle"
      },
      {
        "name": "falloff",
        "type": "range",
        "default": 0,
        "description": "Controls the sharpness of the transition (0 = sharp edge, 1 = gradual transition)",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Falloff"
      },
      {
        "name": "edges",
        "type": "select",
        "default": "stretch",
        "description": "How to handle edges when distortion pushes content out of bounds",
        "options": [
          {
            "label": "Stretch",
            "value": "stretch"
          },
          {
            "label": "Transparent",
            "value": "transparent"
          },
          {
            "label": "Mirror",
            "value": "mirror"
          },
          {
            "label": "Wrap",
            "value": "wrap"
          }
        ],
        "group": "Effect",
        "label": "Edges"
      }
    ]
  },
  {
    "name": "Stripes",
    "category": "Textures",
    "description": "Alternating colored stripes with animation",
    "requiresChild": false,
    "props": [
      {
        "name": "colorA",
        "type": "color",
        "default": "#000000",
        "description": "First stripe color",
        "group": "Colors",
        "label": "Color A"
      },
      {
        "name": "colorB",
        "type": "color",
        "default": "#ffffff",
        "description": "Second stripe color",
        "group": "Colors",
        "label": "Color B"
      },
      {
        "name": "angle",
        "type": "range",
        "default": 45,
        "description": "Angle of stripes in degrees",
        "min": -180,
        "max": 180,
        "step": 1,
        "group": "Effect",
        "label": "Angle"
      },
      {
        "name": "density",
        "type": "range",
        "default": 5,
        "description": "Number of stripe pairs visible",
        "min": 1,
        "max": 30,
        "step": 1,
        "group": "Effect",
        "label": "Density"
      },
      {
        "name": "balance",
        "type": "range",
        "default": 0.5,
        "description": "Ratio of the two colors",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Balance"
      },
      {
        "name": "softness",
        "type": "range",
        "default": 0,
        "description": "Edge softness",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Softness"
      },
      {
        "name": "speed",
        "type": "range",
        "default": 0.2,
        "description": "Animation speed",
        "min": -1,
        "max": 1,
        "step": 0.1,
        "group": "Animation",
        "label": "Speed"
      },
      {
        "name": "offset",
        "type": "range",
        "default": 0,
        "description": "Phase offset for pattern positioning",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Animation",
        "label": "Offset"
      },
      {
        "name": "colorSpace",
        "type": "select",
        "default": "linear",
        "description": "Color space for interpolation",
        "options": [
          {
            "label": "Linear RGB",
            "value": "linear"
          },
          {
            "label": "OKLCh",
            "value": "oklch"
          },
          {
            "label": "OKLAB",
            "value": "oklab"
          }
        ],
        "group": "Colors",
        "label": "Color Space"
      }
    ]
  },
  {
    "name": "StudioBackground",
    "category": "Textures",
    "description": "Multi-light studio background with ambient motion.",
    "requiresChild": false,
    "props": [
      {
        "name": "color",
        "type": "color",
        "default": "#d8dbec",
        "description": "Base studio surface color",
        "group": "Colors",
        "label": "Surface Color"
      },
      {
        "name": "keyColor",
        "type": "color",
        "default": "#d5e4ea",
        "description": "Color of the overhead key light",
        "group": "Key Light",
        "label": "Key Color"
      },
      {
        "name": "keyIntensity",
        "type": "range",
        "default": 40,
        "description": "Intensity of the key light",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Key Light",
        "label": "Intensity"
      },
      {
        "name": "keySoftness",
        "type": "range",
        "default": 50,
        "description": "How diffuse the key light is",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Key Light",
        "label": "Softness"
      },
      {
        "name": "fillColor",
        "type": "color",
        "default": "#d5e4ea",
        "description": "Color of the side fill lights",
        "group": "Fill Lights",
        "label": "Fill Color"
      },
      {
        "name": "fillIntensity",
        "type": "range",
        "default": 10,
        "description": "Intensity of the fill lights",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Fill Lights",
        "label": "Intensity"
      },
      {
        "name": "fillSoftness",
        "type": "range",
        "default": 70,
        "description": "How diffuse the fill lights are",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Fill Lights",
        "label": "Softness"
      },
      {
        "name": "fillAngle",
        "type": "range",
        "default": 70,
        "description": "How far apart the fill lights are from center",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Fill Lights",
        "label": "Spread"
      },
      {
        "name": "backColor",
        "type": "color",
        "default": "#c8d4e8",
        "description": "Color of the upward back wash",
        "group": "Back Light",
        "label": "Back Color"
      },
      {
        "name": "backIntensity",
        "type": "range",
        "default": 20,
        "description": "Intensity of the back wash",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Back Light",
        "label": "Intensity"
      },
      {
        "name": "backSoftness",
        "type": "range",
        "default": 80,
        "description": "How diffuse the back wash is",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Back Light",
        "label": "Softness"
      },
      {
        "name": "brightness",
        "type": "range",
        "default": 20,
        "description": "Overall ambient light level",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Lighting",
        "label": "Ambient"
      },
      {
        "name": "vignette",
        "type": "range",
        "default": 0,
        "description": "Edge darkening",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Lighting",
        "label": "Vignette"
      },
      {
        "name": "center",
        "type": "position",
        "default": {
          "x": 0.5,
          "y": 0.8
        },
        "description": "Where the spotlight meets the floor",
        "group": "Scene",
        "label": "Stage Center"
      },
      {
        "name": "lightTarget",
        "type": "range",
        "default": 100,
        "description": "How far toward the floor vs wall the spotlights aim",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Scene",
        "label": "Light Depth"
      },
      {
        "name": "wallCurvature",
        "type": "range",
        "default": 10,
        "description": "How rounded the cove is",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Scene",
        "label": "Wall Curvature"
      },
      {
        "name": "ambientIntensity",
        "type": "range",
        "default": 50,
        "description": "Intensity of drifting ambient lights",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Environment",
        "label": "Ambient Detail"
      },
      {
        "name": "ambientSpeed",
        "type": "range",
        "default": 2,
        "description": "Drift speed",
        "min": -5,
        "max": 5,
        "step": 0.1,
        "group": "Environment",
        "label": "Speed"
      },
      {
        "name": "seed",
        "type": "range",
        "default": 0,
        "description": "Seed for ambient pattern",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Environment",
        "label": "Seed"
      }
    ]
  },
  {
    "name": "Swirl",
    "category": "Textures",
    "description": "Flowing swirl pattern with multi-layered noise",
    "requiresChild": false,
    "props": [
      {
        "name": "colorA",
        "type": "color",
        "default": "#1275d8",
        "description": "Primary gradient color",
        "group": "Colors",
        "label": "Color A"
      },
      {
        "name": "colorB",
        "type": "color",
        "default": "#e19136",
        "description": "Secondary gradient color",
        "group": "Colors",
        "label": "Color B"
      },
      {
        "name": "speed",
        "type": "range",
        "default": 1,
        "description": "Flow animation speed",
        "min": 0,
        "max": 5,
        "step": 0.1,
        "group": "Animation",
        "label": "Speed"
      },
      {
        "name": "detail",
        "type": "range",
        "default": 1,
        "description": "Level of detail and intricacy in the swirl patterns",
        "min": 0,
        "max": 5,
        "step": 0.1,
        "group": "Effect",
        "label": "Detail"
      },
      {
        "name": "blend",
        "type": "range",
        "default": 50,
        "description": "Skew color balance toward A (lower values) or B (higher values)",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Effect",
        "label": "Blend"
      },
      {
        "name": "colorSpace",
        "type": "select",
        "default": "linear",
        "description": "Color space for color interpolation",
        "options": [
          {
            "label": "Linear RGB",
            "value": "linear"
          },
          {
            "label": "OKLCh",
            "value": "oklch"
          },
          {
            "label": "OKLAB",
            "value": "oklab"
          }
        ],
        "group": "Colors",
        "label": "Color Space"
      }
    ]
  },
  {
    "name": "TiltShift",
    "category": "Blurs",
    "description": "Selective focus blur mimicking tilt-shift photography",
    "requiresChild": true,
    "props": [
      {
        "name": "intensity",
        "type": "range",
        "default": 50,
        "description": "Maximum blur intensity at edges",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Effect",
        "label": "Intensity"
      },
      {
        "name": "width",
        "type": "range",
        "default": 0.3,
        "description": "Width of the sharp focus area",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Width"
      },
      {
        "name": "falloff",
        "type": "range",
        "default": 0.3,
        "description": "Distance over which blur transitions to full strength",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Falloff"
      },
      {
        "name": "angle",
        "type": "range",
        "default": 0,
        "description": "Rotation angle of the focus line (in degrees)",
        "min": 0,
        "max": 360,
        "step": 1,
        "group": "Effect",
        "label": "Angle"
      },
      {
        "name": "center",
        "type": "position",
        "default": {
          "x": 0.5,
          "y": 0.5
        },
        "description": "Center point of the focus line",
        "group": "Position",
        "label": "Center"
      }
    ]
  },
  {
    "name": "Tint",
    "category": "Adjustments",
    "description": "Apply a color tint to the image",
    "requiresChild": true,
    "props": [
      {
        "name": "color",
        "type": "color",
        "default": "#ff8800",
        "description": "Tint color",
        "group": "Colors",
        "label": "Tint Color"
      },
      {
        "name": "amount",
        "type": "range",
        "default": 0.5,
        "description": "Tint amount (0 = no tint, 1 = full tint)",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Amount"
      },
      {
        "name": "preserveLuminosity",
        "type": "checkbox",
        "default": true,
        "description": "Preserve original brightness",
        "group": "Effect",
        "label": "Preserve Luminosity"
      }
    ]
  },
  {
    "name": "Tritone",
    "category": "Adjustments",
    "description": "Map colors to three tones: shadows, midtones, highlights",
    "requiresChild": true,
    "props": [
      {
        "name": "colorA",
        "type": "color",
        "default": "#ce1bea",
        "description": "First color (used for shadows/darkest areas)",
        "group": "Colors",
        "label": "Color A (Shadows)"
      },
      {
        "name": "colorB",
        "type": "color",
        "default": "#2fff00",
        "description": "Second color (used for midtones)",
        "group": "Colors",
        "label": "Color B (Midtones)"
      },
      {
        "name": "colorC",
        "type": "color",
        "default": "#ffff00",
        "description": "Third color (used for highlights/brightest areas)",
        "group": "Colors",
        "label": "Color C (Highlights)"
      },
      {
        "name": "blendMid",
        "type": "range",
        "default": 0.5,
        "description": "Midpoint position between the three colors",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Midpoint"
      },
      {
        "name": "colorSpace",
        "type": "select",
        "default": "linear",
        "description": "Color space for color interpolation",
        "options": [
          {
            "label": "Linear RGB",
            "value": "linear"
          },
          {
            "label": "OKLCh",
            "value": "oklch"
          },
          {
            "label": "OKLAB",
            "value": "oklab"
          }
        ],
        "group": "Colors",
        "label": "Color Space"
      }
    ]
  },
  {
    "name": "Twirl",
    "category": "Distortions",
    "description": "Rotate and twist content around a center point",
    "requiresChild": true,
    "props": [
      {
        "name": "center",
        "type": "position",
        "default": {
          "x": 0.5,
          "y": 0.5
        },
        "description": "The center point of the twirl effect",
        "group": "Position",
        "label": "Center"
      },
      {
        "name": "intensity",
        "type": "range",
        "default": 1,
        "description": "The strength of the twirl effect",
        "min": -5,
        "max": 5,
        "step": 0.1,
        "group": "Effect",
        "label": "Intensity"
      },
      {
        "name": "edges",
        "type": "select",
        "default": "stretch",
        "description": "How to handle edges when distortion pushes content out of bounds",
        "options": [
          {
            "label": "Stretch",
            "value": "stretch"
          },
          {
            "label": "Transparent",
            "value": "transparent"
          },
          {
            "label": "Mirror",
            "value": "mirror"
          },
          {
            "label": "Wrap",
            "value": "wrap"
          }
        ],
        "group": "Effect",
        "label": "Edges"
      }
    ]
  },
  {
    "name": "Vibrance",
    "category": "Adjustments",
    "description": "Selective saturation adjustment protecting skin tones",
    "requiresChild": true,
    "props": [
      {
        "name": "intensity",
        "type": "range",
        "default": 0,
        "description": "The intensity of the vibrance effect",
        "min": -2,
        "max": 2,
        "step": 0.1,
        "group": "Appearance",
        "label": "Intensity"
      }
    ]
  },
  {
    "name": "VideoTexture",
    "category": "Textures",
    "description": "Display a video with customizable playback and object-fit modes",
    "requiresChild": false,
    "props": [
      {
        "name": "url",
        "type": "video-upload",
        "default": "https://www.w3schools.com/html/mov_bbb.mp4",
        "description": "Upload a video or provide a URL",
        "group": "Media",
        "label": "Video"
      },
      {
        "name": "objectFit",
        "type": "select",
        "default": "cover",
        "description": "How the video should be sized within the viewport",
        "options": [
          {
            "label": "Cover",
            "value": "cover"
          },
          {
            "label": "Contain",
            "value": "contain"
          },
          {
            "label": "Fill",
            "value": "fill"
          },
          {
            "label": "Scale Down",
            "value": "scale-down"
          },
          {
            "label": "None",
            "value": "none"
          }
        ],
        "group": "Appearance",
        "label": "Object Fit"
      },
      {
        "name": "loop",
        "type": "checkbox",
        "default": true,
        "description": "Loop the video playback",
        "group": "Playback",
        "label": "Loop"
      }
    ]
  },
  {
    "name": "WaveDistortion",
    "category": "Distortions",
    "description": "Wave-based distortion with multiple waveform types",
    "requiresChild": true,
    "props": [
      {
        "name": "strength",
        "type": "range",
        "default": 0.3,
        "description": "Distortion intensity",
        "min": 0,
        "max": 1,
        "step": 0.1,
        "group": "Effect",
        "label": "Strength"
      },
      {
        "name": "frequency",
        "type": "range",
        "default": 1,
        "description": "Number of bends/waves",
        "min": 0.1,
        "max": 10,
        "step": 0.1,
        "group": "Effect",
        "label": "Frequency"
      },
      {
        "name": "speed",
        "type": "range",
        "default": 1,
        "description": "Animation speed",
        "min": 0,
        "max": 5,
        "step": 0.1,
        "group": "Animation",
        "label": "Speed"
      },
      {
        "name": "angle",
        "type": "range",
        "default": 0,
        "description": "Direction of wave distortion in degrees",
        "min": 0,
        "max": 360,
        "step": 1,
        "group": "Effect",
        "label": "Angle"
      },
      {
        "name": "waveType",
        "type": "select",
        "default": "sine",
        "description": "Shape of the distortion wave",
        "options": [
          {
            "label": "Sine",
            "value": "sine"
          },
          {
            "label": "Triangle",
            "value": "triangle"
          },
          {
            "label": "Square",
            "value": "square"
          },
          {
            "label": "Sawtooth",
            "value": "sawtooth"
          }
        ],
        "group": "Effect",
        "label": "Wave Type"
      },
      {
        "name": "edges",
        "type": "select",
        "default": "stretch",
        "description": "How to handle edges when distortion pushes content out of bounds",
        "options": [
          {
            "label": "Stretch",
            "value": "stretch"
          },
          {
            "label": "Transparent",
            "value": "transparent"
          },
          {
            "label": "Mirror",
            "value": "mirror"
          },
          {
            "label": "Wrap",
            "value": "wrap"
          }
        ],
        "group": "Effect",
        "label": "Edges"
      }
    ]
  },
  {
    "name": "WebcamTexture",
    "category": "Textures",
    "description": "Display a live webcam feed with customizable object-fit modes",
    "requiresChild": false,
    "props": [
      {
        "name": "objectFit",
        "type": "select",
        "default": "cover",
        "description": "How the webcam feed should be sized within the viewport",
        "options": [
          {
            "label": "Cover",
            "value": "cover"
          },
          {
            "label": "Contain",
            "value": "contain"
          },
          {
            "label": "Fill",
            "value": "fill"
          },
          {
            "label": "Scale Down",
            "value": "scale-down"
          },
          {
            "label": "None",
            "value": "none"
          }
        ],
        "group": "Appearance",
        "label": "Object Fit"
      },
      {
        "name": "mirror",
        "type": "checkbox",
        "default": true,
        "description": "Mirror the webcam feed horizontally (selfie mode)",
        "group": "Effect",
        "label": "Mirror"
      }
    ]
  },
  {
    "name": "ZoomBlur",
    "category": "Blurs",
    "description": "Radial zoom blur expanding from a center point",
    "requiresChild": true,
    "props": [
      {
        "name": "intensity",
        "type": "range",
        "default": 30,
        "description": "Intensity of the zoom blur effect",
        "min": 0,
        "max": 100,
        "step": 1,
        "group": "Effect",
        "label": "Intensity"
      },
      {
        "name": "center",
        "type": "position",
        "default": {
          "x": 0.5,
          "y": 0.5
        },
        "description": "Center point of the zoom blur",
        "group": "Position",
        "label": "Center"
      }
    ]
  }
];
