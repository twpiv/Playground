/*
 * Honda Ridgeline data.
 *
 * Feature values are listed in trim order (same order as `trims`):
 *   true   = standard on that trim
 *   false  = not available on that trim
 *   "text" = trim-specific value (e.g. seat material, audio system)
 * `verify: true` marks items where public sources disagreed. They show a small
 * "verify" tag in the app until someone confirms them against Honda's spec sheet.
 *
 * Factory equipment only. Dealer/port accessories are intentionally excluded.
 */
window.HONDA_MODELS = window.HONDA_MODELS || [];
window.HONDA_MODELS.push({
  id: "ridgeline",
  name: "Ridgeline",
  modelYear: 2026,
  bodyType: "truck",
  category: "Midsize Pickup",
  tagline: "Unibody midsize pickup: standard V6 and AWD, rides like an SUV.",
  dataAsOf: "Oct 2026",
  priceNote: "MSRP excludes destination, tax, title and license. Confirm with current Honda pricing.",
  colors: [
    { name: "Platinum White Pearl", hex: "#ecebe6" },
    { name: "Lunar Silver Metallic", hex: "#b9bdc1" },
    { name: "Sonic Gray Pearl", hex: "#7b8187" },
    { name: "Crystal Black Pearl", hex: "#1c1d21" },
    { name: "Radiant Red Metallic", hex: "#9e1b22" },
    { name: "Ash Green Metallic (TrailSport)", hex: "#6f7a64" }
  ],
  colorNote: "Preview colors only. Paint availability varies by trim, so check the current color chart.",
  heroStats: [
    { label: "Starting MSRP", value: "$40,795" },
    { label: "Engine", value: "280-hp 3.5L V6" },
    { label: "Towing", value: "5,000 lb" },
    { label: "MPG (city/hwy)", value: "18 / 24" }
  ],
  trims: [
    { id: "sport", name: "Sport", msrp: 40795, priceText: "$40,795",
      pitch: "Value pick. Same V6, AWD and towing as every Ridgeline, with cloth seats." },
    { id: "rtl", name: "RTL", msrp: 43595, priceText: "$43,595",
      pitch: "Comfort step: leather, heated seats, moonroof, power sliding rear window." },
    { id: "trailsport", name: "TrailSport", msrp: 45995, priceText: "$45,995",
      priceSub: "$47,195 with HPD wheels",
      pitch: "RTL comfort plus off-road hardware: A/T tires, trail-tuned suspension, underbody protection." },
    { id: "black", name: "Black Edition", msrp: 47395, priceText: "$47,395",
      priceSub: "Two-Tone (black roof) $47,895",
      pitch: "Top trim: ventilated seats, heated wheel and rear seats, truck-bed audio, premium sound." }
  ],
  featureGroups: [
    {
      name: "Powertrain & Capability",
      features: [
        { name: "3.5L V6 (280 hp / 262 lb-ft)", v: [true, true, true, true] },
        { name: "9-speed automatic transmission", v: [true, true, true, true] },
        { name: "i-VTM4 torque-vectoring AWD", v: [true, true, true, true],
          note: "Standard on every trim since 2021. Sends torque side-to-side across the rear axle." },
        { name: "Intelligent Traction Management (Normal / Snow / Mud / Sand)", v: [true, true, true, true] },
        { name: "Max towing", v: ["5,000 lb", "5,000 lb", "5,000 lb", "5,000 lb"] },
        { name: "EPA fuel economy (city/hwy/comb)", v: ["18/24/21", "18/24/21", "18/23/20", "18/24/21"], verify: true },
        { name: "Off-road-tuned suspension", v: [false, false, true, false] },
        { name: "Steel underbody protection (skid plates)", v: [false, false, true, false], verify: true },
        { name: "Tires", v: ["18-in all-season", "18-in all-season", "18-in all-terrain", "18-in all-season"] }
      ]
    },
    {
      name: "Exterior",
      features: [
        { name: "Wheels", v: ["18-in black alloy", "18-in alloy", "18-in TrailSport alloy (HPD wheels avail.)", "18-in gloss-black alloy"], verify: true },
        { name: "LED headlights", v: [true, true, true, true] },
        { name: "One-touch power moonroof", v: [false, true, true, true] },
        { name: "Power sliding rear window", v: [false, true, true, true] },
        { name: "Acoustic windshield (quieter cabin)", v: [false, true, true, true] },
        { name: "TrailSport grille, badging & orange accents", v: [false, false, true, false] },
        { name: "Blacked-out exterior trim & Black Edition badging", v: [false, false, false, true] },
        { name: "Contrasting black roof", v: [false, false, false, "Two-Tone version"],
          note: "New for 2026. Paired with Sonic Gray Pearl or Platinum White Pearl." },
        { name: "Front & rear parking sensors", v: [false, false, false, true], verify: true }
      ]
    },
    {
      name: "Truck Bed",
      features: [
        { name: "Dual-action tailgate (folds down or swings open)", v: [true, true, true, true] },
        { name: "Lockable, drainable in-bed trunk (7.3 cu ft)", v: [true, true, true, true] },
        { name: "Fits 4x8 sheet flat between wheel wells", v: [true, true, true, true] },
        { name: "Integrated Class III hitch", v: [true, true, true, true] },
        { name: "Truck-bed audio system", v: [false, false, false, true], verify: true,
          note: "Speakers (exciters) inside the bed walls play music outside the cab. Handy for tailgating." },
        { name: "150W / 400W truck-bed AC power outlet", v: [false, false, false, true] }
      ]
    },
    {
      name: "Interior & Comfort",
      features: [
        { name: "Seat material", v: ["Cloth", "Leather-trimmed", "Leather-trimmed w/ TrailSport accents", "Black leather-trimmed w/ red accents"], verify: true },
        { name: "Heated front seats", v: [false, true, true, true] },
        { name: "Ventilated front seats", v: [false, false, false, true] },
        { name: "Heated rear outboard seats", v: [false, false, false, true] },
        { name: "Heated steering wheel", v: [false, false, false, true] },
        { name: "Power front seats w/ driver memory", v: [false, true, true, true] },
        { name: "Tri-zone automatic climate control", v: [true, true, true, true] },
        { name: "60/40 lift-up rear seat w/ under-seat storage", v: [true, true, true, true] },
        { name: "Red ambient interior lighting", v: [false, false, false, true], verify: true }
      ]
    },
    {
      name: "Technology & Audio",
      features: [
        { name: "9-in touchscreen", v: [true, true, true, true] },
        { name: "Wireless Apple CarPlay & Android Auto", v: [true, true, true, true] },
        { name: "7-in digital driver display", v: [true, true, true, true] },
        { name: "Wireless phone charger", v: [false, false, false, true], verify: true },
        { name: "Audio system", v: ["215W, 7 speakers + sub", "215W, 7 speakers + sub", "215W, 7 speakers + sub", "540W, 8-speaker premium"] },
        { name: "Smart Entry, push-button start & remote engine start", v: [true, true, true, true] }
      ]
    },
    {
      name: "Safety (Honda Sensing)",
      features: [
        { name: "Collision Mitigation Braking System", v: [true, true, true, true] },
        { name: "Adaptive Cruise Control", v: [true, true, true, true] },
        { name: "Lane Keeping Assist & Road Departure Mitigation", v: [true, true, true, true] },
        { name: "Blind Spot Information w/ Cross Traffic Monitor", v: [true, true, true, true], verify: true },
        { name: "Auto high-beam headlights", v: [true, true, true, true] },
        { name: "Multi-angle rearview camera", v: [true, true, true, true] }
      ]
    }
  ],
  specs: [
    { group: "Capability", items: [
      ["Max towing", "5,000 lb (all trims)"],
      ["Payload", "About 1,470–1,580 lb, varies by trim"],
      ["Bed length", "64 in (5 ft 4 in)"],
      ["Bed width between wheel wells", "50 in (fits a 4x8 sheet flat)"],
      ["In-bed trunk", "7.3 cu ft, lockable, with drain plug"],
      ["Ground clearance", "About 7.6 in"]
    ]},
    { group: "Powertrain", items: [
      ["Engine", "3.5L direct-injected V6"],
      ["Output", "280 hp / 262 lb-ft"],
      ["Transmission", "9-speed automatic"],
      ["Drivetrain", "i-VTM4 AWD, standard"],
      ["Fuel", "Regular unleaded, 19.5-gal tank"],
      ["EPA (most trims)", "18 city / 24 hwy / 21 comb"]
    ]},
    { group: "Ownership", items: [
      ["Built in", "Lincoln, Alabama"],
      ["Basic warranty", "3 yr / 36,000 mi"],
      ["Powertrain warranty", "5 yr / 60,000 mi"],
      ["Seating", "5 (crew cab only)"],
      ["Configurations", "One cab, one bed length"]
    ]}
  ],
  generations: [
    { name: "1st Generation", years: "2006–2014", summary: "Unibody pickup with the first in-bed trunk and dual-action tailgate. 5-speed auto, VTM-4 4WD standard." },
    { name: "No Ridgeline", years: "2015–2016", summary: "Production paused. No 2015 or 2016 model year.", gap: true },
    { name: "2nd Generation", years: "2017–present", summary: "All-new, Pilot-based platform. 280-hp V6, truck-bed audio, bed power outlet. Refreshed for 2021 and updated for 2024." }
  ],
  history: [
    { year: "2027+", type: "news", title: "What's next (unconfirmed)",
      changes: [
        "Media reports point to a future redesign and possibly a production pause while the V6 is updated for tougher emissions rules.",
        "Honda has not officially announced a next-generation Ridgeline. Don't promise timing to customers."
      ] },
    { year: 2026, type: "update", title: "Black Edition Two-Tone",
      changes: [
        "New Black Edition Two-Tone with a contrasting black roof (Sonic Gray Pearl or Platinum White Pearl).",
        "TrailSport offered with HPD wheels as a separate price point.",
        "New TrailSport color: Ash Green Metallic.",
        "Small MSRP increases. Mechanically unchanged."
      ] },
    { year: 2025, type: "update", title: "All-terrain \"+\" variants",
      changes: [
        "Sport+, RTL+ and TrailSport+ variants added, pairing all-terrain tires with HPD-style 18-in wheels.",
        "Otherwise carryover from 2024."
      ], verify: true },
    { year: 2024, type: "refresh", title: "Tech update + TrailSport arrives",
      changes: [
        "New 9-in touchscreen with wireless Apple CarPlay & Android Auto (was 8 in, wired).",
        "New 7-in digital driver display.",
        "Redesigned center console and updated interior trim.",
        "New TrailSport trim: all-terrain tires, off-road suspension tuning, underbody protection.",
        "RTL-E trim dropped. Black Edition becomes the top trim."
      ] },
    { year: 2023, type: "carryover", title: "Carryover",
      changes: ["No significant changes."] },
    { year: 2022, type: "carryover", title: "Carryover",
      changes: ["No significant changes. HPD appearance package continues to be offered."] },
    { year: 2021, type: "refresh", title: "Major mid-cycle refresh: tougher styling, AWD standard",
      changes: [
        "New truck-like front end: squared-off hood, larger grille, new fenders and bumper.",
        "AWD (i-VTM4) becomes standard. Front-wheel drive dropped.",
        "New 18-in wheels with a wider stance (track widened about 0.8 in).",
        "Interior update, including a physical volume knob.",
        "HPD package introduced (bronze wheels, fender flares, graphics)."
      ] },
    { year: 2020, type: "update", title: "9-speed and Honda Sensing for all",
      changes: [
        "9-speed automatic replaces the 6-speed.",
        "Honda Sensing becomes standard on every trim.",
        "Push-button start and remote start become standard.",
        "Trim lineup simplified to Sport, RTL, RTL-E and Black Edition."
      ] },
    { year: 2019, type: "carryover", title: "Minor changes",
      changes: ["Minor feature and trim adjustments. Little changed in practice."] },
    { year: 2018, type: "carryover", title: "Carryover",
      changes: ["No significant changes."] },
    { year: 2017, type: "generation", title: "All-new 2nd generation",
      changes: [
        "All-new design on a platform shared with the Pilot.",
        "New 280-hp direct-injected 3.5L V6 with a 6-speed automatic.",
        "FWD standard on lower trims, i-VTM4 torque-vectoring AWD available.",
        "Industry-first truck-bed audio system and 150W/400W bed outlet.",
        "Longer, wider bed. Dual-action tailgate and in-bed trunk carry over.",
        "Honda Sensing available on upper trims.",
        "North American Truck of the Year."
      ] },
    { year: "2015–16", type: "gap", title: "No Ridgeline produced",
      changes: ["Honda skipped the 2015 and 2016 model years ahead of the redesign."] },
    { year: 2014, type: "carryover", title: "Final 1st-gen year",
      changes: ["Special Edition trim. Last year of the original design."] },
    { year: 2012, type: "update", title: "Minor refresh",
      changes: ["Sport trim added with blacked-out grille and wheels.", "Minor styling and feature updates."] },
    { year: 2010, type: "carryover", title: "Production moves to Alabama",
      changes: ["Assembly moves from Alliston, Ontario to Lincoln, Alabama."], verify: true },
    { year: 2009, type: "refresh", title: "Mid-cycle refresh",
      changes: [
        "New front fascia and grille.",
        "Output up slightly to 250 hp.",
        "Updated interior, with navigation and rearview camera available."
      ] },
    { year: 2006, type: "generation", title: "Original Ridgeline launches",
      changes: [
        "Unibody construction with integrated frame and 4-wheel independent suspension, unusual for a pickup.",
        "First in-bed trunk and dual-action tailgate.",
        "3.5L V6 with 5-speed automatic. VTM-4 4WD standard.",
        "5,000 lb towing.",
        "North American Truck of the Year and Motor Trend Truck of the Year."
      ] }
  ],
  faqs: [
    { q: "Is it a \"real\" truck if it's unibody?",
      a: "Yes, for what most owners do. It tows 5,000 lb, hauls about 1,500 lb, and the bed fits a 4x8 sheet flat. Unibody plus independent rear suspension means it rides and handles like an SUV, with no bouncy empty-bed ride. For towing over 5,000 lb or serious rock-crawling, a body-on-frame truck is the better tool." },
    { q: "How much can it tow?",
      a: "5,000 lb on every trim. AWD and the Class III hitch are standard, so there's no tow package to add." },
    { q: "Does a sheet of plywood fit?",
      a: "Yes. There's 50 in between the wheel wells, so a 4x8 sheet lies flat on the bed floor. The bed is 64 in long, so drop the tailgate for full 8-ft length." },
    { q: "What's the in-bed trunk?",
      a: "A 7.3 cu-ft lockable, weatherproof compartment under the bed floor. It has a drain plug, so customers fill it with ice and use it as a cooler. It also keeps valuables out of sight." },
    { q: "What does the dual-action tailgate do?",
      a: "It folds down like a normal tailgate or swings open sideways like a door. That lets you step right up to the bed or reach the in-bed trunk without leaning over a dropped gate." },
    { q: "Is AWD standard?",
      a: "Yes, on every Ridgeline since 2021. It's i-VTM4, which can shift torque between the rear wheels to help it turn and climb. 2017–2020 lower trims could be FWD, which matters on trade-ins and used units." },
    { q: "What's the difference between TrailSport and Black Edition?",
      a: "TrailSport is the off-road trim: all-terrain tires, trail-tuned suspension and underbody protection, with RTL-level comfort. Black Edition is the luxury trim: ventilated seats, heated wheel and rear seats, premium audio, truck-bed audio and bed outlet. It has street tires and no off-road hardware." },
    { q: "Is there a hybrid?",
      a: "Not currently. Every Ridgeline uses the 3.5L V6 on regular fuel." },
    { q: "Fuel economy?",
      a: "EPA 18 city / 24 hwy / 21 combined on most trims. TrailSport is slightly lower (about 20 combined) because of its all-terrain tires." },
    { q: "Is a new generation coming?",
      a: "Honda hasn't announced one. Reports suggest a future redesign, but there's no confirmed date. The current generation has been refined since 2017, and the 2024 tech update addressed the old screen." }
  ],
  competitors: [
    { name: "Toyota Tacoma", note: "Tacoma tows more and is more trail-capable. Ridgeline wins on ride comfort, standard AWD, bed versatility (trunk, dual tailgate, flat 4x8), and rear-seat room." },
    { name: "Ford Ranger / Chevy Colorado / GMC Canyon", note: "Body-on-frame with higher tow ratings. Ridgeline counters with a smoother ride, standard V6 + AWD at every trim, and features they don't offer: in-bed trunk, bed audio, dual-action tailgate." },
    { name: "Nissan Frontier", note: "Also a V6, but RWD/4WD body-on-frame. Ridgeline offers more refinement and standard AWD." },
    { name: "Ford Maverick / Hyundai Santa Cruz", note: "Smaller compact unibody trucks. Ridgeline is larger, with a full midsize bed and 5,000 lb towing across the lineup." }
  ],
  quickPitch: [
    "Every trim has the same V6, AWD and 5,000-lb towing, so customers never have to upgrade for capability.",
    "Rides like an SUV: unibody with independent rear suspension.",
    "Exclusive bed features: lockable in-bed trunk/cooler, dual-action tailgate, flat 4x8 bed.",
    "Black Edition only: truck-bed audio, bed power outlet, ventilated seats."
  ]
});
