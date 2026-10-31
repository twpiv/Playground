/*
 * Honda Prologue data. Same format as ridgeline.js:
 *   true = standard, false = not available, "text" = trim-specific value.
 * `verify: true` marks items where public sources disagreed.
 * Factory equipment only. Dealer accessories are excluded.
 */
window.HONDA_MODELS = window.HONDA_MODELS || [];
window.HONDA_MODELS.push({
  id: "prologue",
  name: "Prologue",
  modelYear: 2026,
  bodyType: "suv",
  category: "All-Electric SUV",
  tagline: "Honda's midsize all-electric SUV: 300+ mile range with wireless CarPlay and Android Auto.",
  dataAsOf: "Oct 2026",
  priceNote: "MSRP reflects Honda's $7,500 price cut (April 2026). Excludes $1,495 destination, tax, title and license.",
  colors: [
    { name: "Frostline White Pearl", hex: "#eef0ef" },
    { name: "Solar Silver Metallic", hex: "#b7bcc0" },
    { name: "Meteorite Gray Metallic", hex: "#5f6469" },
    { name: "Crystal Black Pearl", hex: "#1c1d21" },
    { name: "North Shore Pearl", hex: "#7f9aa3" },
    { name: "Radiant Red Metallic", hex: "#8f1d24" }
  ],
  colorNote: "Preview colors only. Paint availability varies by trim, so check the current color chart.",
  heroStats: [
    { label: "Starting MSRP", value: "$39,900" },
    { label: "EPA range", value: "Up to 308 mi" },
    { label: "Power", value: "220–300 hp" },
    { label: "DC fast charge", value: "~65 mi in 10 min" }
  ],
  trims: [
    { id: "ex", name: "EX", msrp: 39900, priceText: "$39,900",
      priceSub: "AWD $42,000",
      pitch: "Longest range (308 mi FWD). All the core tech: big screens, wireless CarPlay, heated seats, Qi charger." },
    { id: "touring", name: "Touring", msrp: 44200, priceText: "$44,200",
      priceSub: "AWD $47,200",
      pitch: "The upscale step: leather, panoramic roof, Bose audio, ambient lighting." },
    { id: "elite", name: "Elite", msrp: 50400, priceText: "$50,400",
      priceSub: "AWD standard",
      deltaNote: "AWD to AWD it's +$3,200 over Touring AWD",
      pitch: "Everything, plus head-up display, ventilated seats, heated wheel, surround-view camera. AWD only." }
  ],
  featureGroups: [
    {
      name: "Powertrain, Range & Charging",
      features: [
        { name: "Drivetrain", v: ["FWD or AWD", "FWD or AWD", "AWD only"] },
        { name: "Horsepower", v: ["220 hp FWD / 300 hp AWD", "220 hp FWD / 300 hp AWD", "300 hp"] },
        { name: "EPA-estimated range", v: ["308 mi FWD / 294 mi AWD", "308 mi FWD / 294 mi AWD", "283 mi"],
          note: "Elite has less range because it's AWD-only and heavier with more equipment." },
        { name: "85 kWh battery", v: [true, true, true] },
        { name: "DC fast charging (up to ~150 kW)", v: [true, true, true] },
        { name: "11.5 kW onboard Level 2 charger", v: [true, true, true] },
        { name: "Portable charging cord included", v: [true, true, true], note: "Standard for 2026." },
        { name: "One-pedal driving & Regen on Demand paddle", v: [true, true, true] },
        { name: "Max towing", v: ["1,500 lb", "1,500 lb", "1,500 lb"] }
      ]
    },
    {
      name: "Exterior",
      features: [
        { name: "21-in alloy wheels", v: [true, true, true], verify: true },
        { name: "LED headlights & taillights", v: [true, true, true] },
        { name: "Panoramic glass roof", v: [false, true, true] },
        { name: "Power tailgate", v: [true, true, true] },
        { name: "Power-folding, auto-dimming side mirrors w/ welcome lights", v: [false, false, true] },
        { name: "Heated wiper park area", v: [false, false, true], verify: true }
      ]
    },
    {
      name: "Interior & Comfort",
      features: [
        { name: "Seat material", v: ["Cloth-trimmed", "Leather-trimmed", "Leather-trimmed"], verify: true },
        { name: "Heated front seats", v: [true, true, true] },
        { name: "Ventilated front seats", v: [false, false, true] },
        { name: "Heated steering wheel", v: [false, false, true] },
        { name: "10-way power driver's seat w/ lumbar", v: [true, true, true], verify: true },
        { name: "Dual-zone automatic climate control", v: [true, true, true] },
        { name: "Ambient interior lighting", v: [false, true, true] },
        { name: "120V household outlet (rear console)", v: [false, false, true] }
      ]
    },
    {
      name: "Technology & Audio",
      features: [
        { name: "11-in digital instrument display", v: [true, true, true] },
        { name: "11.3-in touchscreen", v: [true, true, true] },
        { name: "Wireless Apple CarPlay & Android Auto", v: [true, true, true],
          note: "Big talking point: GM's Ultium-based EVs (Blazer EV, Equinox EV) dropped CarPlay. Prologue keeps it." },
        { name: "Google built-in (Maps, Assistant, Play)", v: [true, true, true], verify: true },
        { name: "Qi wireless phone charger", v: [true, true, true] },
        { name: "Head-up display", v: [false, false, true] },
        { name: "Audio system", v: ["Standard audio", "Bose premium audio", "Bose premium audio"] }
      ]
    },
    {
      name: "Safety (Honda Sensing)",
      features: [
        { name: "Collision Mitigation Braking System", v: [true, true, true] },
        { name: "Adaptive Cruise Control w/ Low-Speed Follow", v: [true, true, true] },
        { name: "Lane Keeping Assist & Road Departure Mitigation", v: [true, true, true] },
        { name: "Blind Spot Information w/ Rear Cross Traffic", v: [true, true, true] },
        { name: "Rearview camera", v: [true, true, true] },
        { name: "Surround-view camera system", v: [false, false, true] }
      ]
    }
  ],
  specs: [
    { group: "Range & Charging", items: [
      ["EPA range", "308 mi (FWD) · 294 mi (AWD) · 283 mi (Elite)"],
      ["Battery", "85 kWh lithium-ion"],
      ["DC fast charge", "Up to ~150 kW, ~65 mi in 10 min, ~35 min for 20–80%"],
      ["Home Level 2 (11.5 kW)", "Overnight: roughly 8–9 hrs from low"],
      ["Tesla Superchargers", "Yes, with Honda NACS-to-CCS adapter"],
      ["Front trunk (frunk)", "None"]
    ]},
    { group: "Size & Capability", items: [
      ["Cargo", "~25 cu ft behind rear seat · ~57 cu ft max"],
      ["Wheelbase", "121.8 in (long, so rear legroom is generous)"],
      ["Ground clearance", "About 8.1 in (7.9 in some FWD)"],
      ["Max towing", "1,500 lb"],
      ["Seating", "5"]
    ]},
    { group: "Ownership", items: [
      ["Built in", "Ramos Arizpe, Mexico (by GM, on its Ultium EV platform)"],
      ["Designed by", "Honda (LA design studio). Honda-specific tuning"],
      ["Basic warranty", "3 yr / 36,000 mi"],
      ["EV battery & components", "8 yr / 100,000 mi"],
      ["Federal EV tax credit", "Ended Sept 30, 2025. Honda cut MSRP $7,500 instead"]
    ]}
  ],
  generations: [
    { name: "1st Generation", years: "2024–present", summary: "Honda's first mass-market EV for North America, co-developed with GM on the Ultium platform." }
  ],
  history: [
    { year: 2026, type: "update", title: "Price cut + charging packages",
      changes: [
        "April 2026: Honda cuts MSRP by $7,500 on every trim (EX now $39,900), replacing the expired federal tax credit.",
        "Portable charging kit now standard on every Prologue.",
        "Enhanced home-charging package: home charging station with installation credit, or a sales credit instead.",
        "Frostline White Pearl replaces Snowfall Pearl.",
        "Design, battery and powertrain carry over from 2025."
      ] },
    { year: 2025, type: "update", title: "More power, 300+ mile range",
      changes: [
        "Horsepower up: FWD 212 → 220 hp, AWD 288 → 300 hp.",
        "EPA range up: FWD 296 → 308 mi, AWD 281 → 294 mi, Elite 273 → 283 mi.",
        "Tesla Supercharger access via Honda NACS adapter.",
        "Same styling, trims and battery."
      ] },
    { year: 2024, type: "generation", title: "Prologue launches",
      changes: [
        "Honda's first mass-market EV in North America.",
        "Built by GM on the Ultium platform (shared with the Chevy Blazer EV). Honda design and tuning.",
        "85 kWh battery. FWD 212 hp / AWD 288 hp.",
        "EX, Touring and Elite trims. Elite AWD only.",
        "Qualified for the $7,500 federal EV credit (credit ended Sept 2025)."
      ] }
  ],
  faqs: [
    { q: "How far will it go on a charge?",
      a: "EPA estimates: 308 mi for FWD EX/Touring, 294 mi for AWD EX/Touring, 283 mi for Elite. Expect 20–30% less in deep winter or at sustained highway speeds above 75 mph." },
    { q: "How long does it take to charge?",
      a: "On a DC fast charger, about 65 miles in 10 minutes, or roughly 35 minutes from 20–80%. At home on Level 2 (240V), overnight is roughly 8–9 hours from low. A standard 120V outlet adds only about 3–4 miles per hour, so it's for emergencies or light use." },
    { q: "Can I use Tesla Superchargers?",
      a: "Yes, with Honda's NACS-to-CCS adapter. It also uses the existing CCS fast-charging networks (Electrify America, EVgo, etc.) natively." },
    { q: "Does it get the $7,500 tax credit?",
      a: "No. The federal EV credit ended Sept 30, 2025. Honda cut the MSRP by $7,500 in April 2026 to make up for it. State or utility rebates may still apply, so check your local programs." },
    { q: "Does it have Apple CarPlay?",
      a: "Yes, wireless Apple CarPlay and Android Auto on every trim. GM's own Ultium EVs (Blazer EV, Equinox EV) don't offer it." },
    { q: "Isn't it just a Chevy?",
      a: "It shares GM's Ultium battery and platform, which is proven EV hardware. Honda did its own exterior and interior design and chassis tuning, and kept CarPlay/Android Auto. It's sold and serviced by Honda dealers with Honda's warranty." },
    { q: "Is there a frunk?",
      a: "No front trunk. Cargo is about 25 cu ft behind the rear seat and about 57 cu ft with seats folded." },
    { q: "Can it tow?",
      a: "Up to 1,500 lb. That's fine for a small utility trailer or jet ski. For serious towing, look at the Ridgeline (5,000 lb), Passport or Pilot." },
    { q: "Do I need AWD?",
      a: "FWD gives the most range (308 mi) and is the lowest price. AWD adds traction for snow and adds power (300 vs 220 hp), at about 14 miles less range and about $2,100–3,000 more." },
    { q: "Battery warranty?",
      a: "8 years / 100,000 miles on the battery and EV components." }
  ],
  competitors: [
    { name: "Chevy Blazer EV / Equinox EV", note: "Same Ultium platform. Prologue keeps Apple CarPlay & Android Auto, has its own Honda design, and has Honda dealer service." },
    { name: "Hyundai Ioniq 5 / Kia EV6", note: "They fast-charge quicker (800V). Prologue counters with a roomier cabin (121.8-in wheelbase), more cargo, a traditional SUV shape and 300+ mi range." },
    { name: "Toyota bZ (bZ4X)", note: "Prologue offers more range, more power and more interior space." },
    { name: "Tesla Model Y", note: "Prologue offers physical controls, a conventional dashboard, CarPlay/Android Auto, the Honda dealer network, and Supercharger access via adapter." },
    { name: "Ford Mustang Mach-E / VW ID.4", note: "Prologue is roomier, and after the $7,500 cut it's very competitively priced." }
  ],
  quickPitch: [
    "308-mile EPA range (FWD), 300+ for most trims.",
    "Wireless CarPlay & Android Auto, which GM's own EVs dropped.",
    "$7,500 MSRP cut means the EX starts at $39,900.",
    "Elite only: head-up display, ventilated seats, heated wheel, surround-view camera."
  ]
});
