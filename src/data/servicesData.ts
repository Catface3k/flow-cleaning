import { CleaningService, AddOnItem, CleanerProfile, ReviewItem, ChecklistCategory, LocationCoverage, FAQItem } from '../types';

export const SERVICES_DATA: CleaningService[] = [
  {
    id: 'residential-standard',
    slug: 'residential-standard',
    name: 'Residential Regular Clean',
    category: 'residential',
    tagline: 'Effortless, recurring perfection for your everyday home sanctuary.',
    description: 'Our signature recurring maintenance clean designed to keep your home immaculately fresh, dust-free, and sanitized on a predictable schedule.',
    longDescription: 'The Flow Regular Maintenance Clean is engineered for busy homeowners and apartment dwellers who demand consistent, hospital-grade freshness without the hassle. Our trained and vetted cleaning professionals work through our comprehensive 36-point standard protocol covering all living areas, kitchens, bathrooms, and bedrooms using certified non-toxic, pet-safe plant-derived cleansers.',
    basePrice: 139,
    pricePerSqft: 0.05,
    estimatedHours: '2.5 - 3.5 hrs',
    popular: true,
    badge: 'Most Popular',
    iconName: 'Sparkles',
    heroImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Eco-friendly, child and pet-safe botanical cleaning solutions',
      'All high-touch surfaces disinfected (handles, switches, remotes)',
      'Floors vacuumed and hand-mopped with pH-neutral floor care',
      'Beds made and linens straightened with hospital corners',
      'Trash emptied and new liners replaced throughout home'
    ],
    recommendedFrequency: 'Weekly or Bi-Weekly (Save up to 20%)',
    includedRooms: [
      {
        room: 'Kitchen & Dining',
        tasks: [
          'Countertops, backsplashes & kitchen island sanitized',
          'Exterior of all appliances cleaned (refrigerator, oven, dishwasher, microwave)',
          'Microwave interior wiped and deodorized',
          'Sinks, faucet fixtures scrubbed and chrome polished',
          'Dining table & chairs wiped down',
          'Cabinet exteriors spot-cleaned for fingerprints & spills',
          'Floor thoroughly vacuumed and sanitized mop finish'
        ]
      },
      {
        room: 'Bathrooms',
        tasks: [
          'Showers, tubs, and glass shower doors descaled and scrubbed',
          'Toilets disinfected inside and out (base, behind seat, rim)',
          'Vanity countertops, sinks, and chrome faucets polished',
          'Mirrors cleaned streak-free',
          'Tile grout surface cleaned and rinsed',
          'Bathmats vacuumed and trash emptied'
        ]
      },
      {
        room: 'Bedrooms & Living Areas',
        tasks: [
          'Dusting of all surfaces, shelves, decor, and picture frames',
          'Beds neatly made (fresh sheets changed upon request)',
          'Sofas and upholstered furniture vacuumed and pillows fluffed',
          'Coffee tables, end tables, and TV consoles polished',
          'High-touch light switches and door handles wiped',
          'Carpets vacuumed with HEPA filtration; hard floors mopped'
        ]
      }
    ],
    notIncluded: [
      'Inside oven interior (available as add-on)',
      'Inside refrigerator shelving (available as add-on)',
      'Window exterior tracks and outdoor glass',
      'Biohazard or excessive clutter organization'
    ]
  },
  {
    id: 'deep-cleaning',
    slug: 'deep-cleaning',
    name: 'Pure Flow Deep Revival Clean',
    category: 'deep',
    tagline: 'An intensive, restorative reset removing months of hidden grime and buildup.',
    description: 'A comprehensive top-to-bottom scrub targeting neglected corners, baseboards, vents, scale buildup, and detailed surface restorations.',
    longDescription: 'When a standard wipe-down simply is not enough, our Deep Revival Clean penetrates deeper. We allocate dedicated time for scrubbing baseboards by hand, detailed grout restoration in moisture-heavy zones, degreasing stove hoods, wiping door frames, cleaning AC vent covers, and polishing all architectural woodwork.',
    basePrice: 229,
    pricePerSqft: 0.09,
    estimatedHours: '4.0 - 6.0 hrs',
    popular: true,
    badge: 'Recommended for First-Time Clients',
    iconName: 'Zap',
    heroImage: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Hand-washing all baseboards, door frames, and crown molding',
      'Intensive shower and tub tile descaling, soap scum and hard water mineral removal',
      'Range hood degreasing and stove burner restoration',
      'Detailed dusting of ceiling fan blades, HVAC vents, and light fixtures',
      'Behind and under movable furniture vacuuming'
    ],
    recommendedFrequency: 'Every 3 to 6 months or season transitions',
    includedRooms: [
      {
        room: 'Detailed Kitchen Scrub',
        tasks: [
          'Heavy grease breakdown on stovetops, control knobs, and hood filters',
          'Backsplash grout scrubbed and degreased',
          'Kitchen cabinet faces hand-wiped top-to-bottom',
          'Under-sink cabinet organization and floor disinfection',
          'Appliance stainless steel conditioned and scratch-free polished',
          'Trash receptacle washed and sanitized'
        ]
      },
      {
        room: 'Intensive Bathroom Restoration',
        tasks: [
          'High-concentration eco-descaler on tile walls & shower basin',
          'Grout lines agitated with specialty detailing brushes',
          'Mineral deposit removal on glass doors and shower heads',
          'Detailed wipe of medicine cabinets, exhaust fans, and plumbing escutcheons',
          'Baseboards and floor edges hand-detailed'
        ]
      },
      {
        room: 'Full Residence Architectural Care',
        tasks: [
          'Every baseboard in the home wiped down by hand with microfiber',
          'Interior doors, trim, and door frames washed',
          'Window sills, latches, and window tracks vacuumed and wiped',
          'HVAC vents and return grilles vacuumed and dusted',
          'Light switches, wall plates, and power outlets cleaned safely'
        ]
      }
    ]
  },
  {
    id: 'move-in-out',
    slug: 'move-in-out',
    name: 'Move-In / Move-Out Clean',
    category: 'move',
    tagline: '100% Security Deposit & Move-Ready Perfection for Empty Residences.',
    description: 'Complete empty-home deep sanitization tailored to satisfy landlord lease requirements and welcome new homeowners with pristine comfort.',
    longDescription: 'Moving is stressful enough without having to scrub every drawer and closet. Our Move-In / Move-Out package includes everything in our Deep Clean plus full interior cleaning of all empty drawers, cabinets, closets, and major appliances (inside fridge & oven included by standard!). We guarantee landlord inspection approval or we come back free.',
    basePrice: 289,
    pricePerSqft: 0.11,
    estimatedHours: '5.0 - 7.5 hrs',
    popular: false,
    badge: 'Deposit Return Guarantee',
    iconName: 'Home',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Inside all kitchen cabinets, pantry shelving, and drawers wiped clean',
      'Inside oven interior baked-on carbon and grease removal included',
      'Inside refrigerator & freezer defrosted/sanitized included',
      'Closet shelving, rods, and shoe racks washed down',
      'Landlord / Property Manager pass guarantee with 48-hour re-clean safety net'
    ],
    recommendedFrequency: 'During home transitions, leases, or property sale stagings',
    includedRooms: [
      {
        room: 'Empty Home Kitchen',
        tasks: [
          'Inside & outside oven interior baked residue dissolved',
          'Inside & outside refrigerator and freezer shelves disinfected',
          'Inside all cabinets, cupboards, drawers, and pantry shelves washed',
          'Stovetop, backsplash, exhaust hood, and dishwasher interior wiped',
          'Deep sink scale removal and drain deodorization'
        ]
      },
      {
        room: 'Empty Bathrooms',
        tasks: [
          'Medicine cabinets and under-sink vanities wiped inside and out',
          'Heavy calcium, lime, and rust removal from plumbing fixtures',
          'Toilets, bathtubs, and tiles detailed to sterile standard',
          'Exhaust fans cleared of lint and hair'
        ]
      },
      {
        room: 'Bedrooms, Closets & Common Areas',
        tasks: [
          'All bedroom and linen closet shelving vacuumed and wiped',
          'Baseboards, doors, door casings, and window ledges washed',
          'Cobweb removal from all ceilings, light fixtures, and wall corners',
          'Floors edge-to-edge vacuumed and high-grade sanitized mop'
        ]
      }
    ]
  },
  {
    id: 'commercial-office',
    slug: 'commercial-office',
    name: 'Commercial & Office Sanity Clean',
    category: 'commercial',
    tagline: 'Pristine, inspiring workspaces that boost productivity and impress clients.',
    description: 'Customized after-hours or midday janitorial and sanitization solutions for creative studios, tech offices, clinics, and retail storefronts.',
    longDescription: 'A clean workplace reflects your brand integrity. Flow Commercial provides discreet, dependable janitorial care tailored to corporate environments. We maintain reception areas, open-plan desk pods, conference rooms, breakroom kitchens, restrooms, and trash management with bonded, insured personnel and zero disruption to your daily operations.',
    basePrice: 199,
    pricePerSqft: 0.04,
    estimatedHours: 'Custom / Flexible',
    popular: false,
    badge: 'Bonded & Insured up to $2M',
    iconName: 'Building2',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Tailored after-hours or weekend scheduling with secure lock-up protocols',
      'Conference room AV gear, glass whiteboards, and presentation tables sanitized',
      'Office kitchenette, espresso machines, and breakroom sanitization',
      'Restroom restocking, bacterial disinfection, and odor neutralization',
      'Electronic-safe microfiber dusting for monitors, keyboards, and server racks'
    ],
    recommendedFrequency: 'Daily, 3x Weekly, or Weekly contracts available',
    includedRooms: [
      {
        room: 'Workstations & Boardrooms',
        tasks: [
          'Desk surfaces cleared and sanitized with non-residue disinfectants',
          'Conference tables polished and chairs arranged',
          'Whiteboards cleaned and markers organized',
          'Floor vacuuming under chairs and conference zones'
        ]
      },
      {
        room: 'Office Kitchenette & Dining',
        tasks: [
          'Coffee station & water cooler drip trays sanitized',
          'Dishwasher loaded, started, and emptied upon arrival',
          'Microwave interior cleaned and countertops sanitized',
          'Trash, compost, and recycling separated and disposed of in dumpsters'
        ]
      },
      {
        room: 'Commercial Restrooms',
        tasks: [
          'Multi-stall disinfection and touchpoint sanitization',
          'Soap dispensers, paper towel holders, and toilet paper restocked',
          'Mirrors polished and floors wet-mopped with antibacterial solution'
        ]
      }
    ]
  },
  {
    id: 'eco-green-pure',
    slug: 'eco-green-pure',
    name: 'Eco-Green 100% Plant Pure Clean',
    category: 'specialty',
    tagline: 'Zero petrochemicals, zero synthetic fragrances. 100% hypoallergenic wellness.',
    description: 'A certified green cleaning protocol utilizing biodegradable, organic botanical essential oils and zero-VOC solutions for allergy sufferers, infants, and pets.',
    longDescription: 'Specially engineered for families with severe chemical sensitivities, asthma, newborns, or curious pets who lick floors. We use USDA-certified bio-based cleaners formulated with thyme oil, citric acid, and plant glucoside surfactants. Completely free of bleach, synthetic ammonia, parabens, and artificial fragrances.',
    basePrice: 159,
    pricePerSqft: 0.06,
    estimatedHours: '3.0 - 4.0 hrs',
    popular: false,
    badge: '100% Hypoallergenic',
    iconName: 'Leaf',
    heroImage: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'USDA Certified Biobased and Green Seal approved formulations',
      'Pure essential oil air-freshening (organic lavender, eucalyptus, or fragrance-free)',
      'HEPA 13 vacuum filtration capturing 99.97% of dust mites and pet dander',
      'Color-coded microfiber cross-contamination prevention protocol',
      'Naturally antiseptic without harsh chlorine fumes'
    ],
    recommendedFrequency: 'Weekly or Bi-weekly',
    includedRooms: [
      {
        room: 'All Living & Sleeping Zones',
        tasks: [
          'HEPA-sealed air particulate vacuuming on rugs, draperies, and mattresses',
          'Plant-enzyme dust repellent application on wooden furniture',
          'Organic citrus-vinegar streak-free glass and mirror polishing'
        ]
      },
      {
        room: 'Eco-Kitchen & Nursery',
        tasks: [
          'Food-safe plant surfactant scrub on cutting board zones and high chairs',
          'Chemical-free steam sanitization on refrigerator handles and baby bottle areas',
          'Naturally scented organic peppermint floor mopping'
        ]
      }
    ]
  },
  {
    id: 'post-construction',
    slug: 'post-construction',
    name: 'Post-Construction Fine Dust Clean',
    category: 'specialty',
    tagline: 'Industrial-grade extraction of drywall dust, paint flecks, and remodel debris.',
    description: 'A heavy-duty post-renovation service to eliminate airborne silica, drywall particulate, sticker adhesive, and grout haze after contractors finish.',
    longDescription: 'Remodeling creates microscopic drywall dust that settles into every crevice, HVAC vent, and recessed light. Our specialized team arrives equipped with two-stage industrial HEPA extraction vacuums, paint splatter removers, and adhesive dissolving solvents to transition your construction site into a spotless, move-in ready home.',
    basePrice: 349,
    pricePerSqft: 0.14,
    estimatedHours: '6.0 - 9.0 hrs',
    popular: false,
    badge: 'HEPA Fine-Particle Certified',
    iconName: 'Hammer',
    heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Multi-pass HEPA air filtration and fine silica particulate extraction',
      'Removal of protective tape, builder stickers, and window films',
      'Paint overspray and silicone adhesive spot cleanup on glass and hardware',
      'Inside all newly installed cabinets and recessed fixtures detailed',
      'Hardwood floors treated with gentle residue-free builder rinse'
    ],
    recommendedFrequency: 'Post-renovation or contractor handover',
    includedRooms: [
      {
        room: 'Newly Built / Renovated Spaces',
        tasks: [
          'Ceiling, walls, and trim wiped from top down to capture floating drywall powder',
          'Recessed light can interiors vacuumed and wiped',
          'Windows scraped of paint flecks, labels, and grout residue',
          'Cabinet hinges and drawer slider tracks blown out and vacuumed'
        ]
      }
    ]
  },
  {
    id: 'airbnb-turnover',
    slug: 'airbnb-turnover',
    name: 'Airbnb & Vacation Rental Turnover',
    category: 'residential',
    tagline: '5-Star hotel standards, guest restocking, and photo-ready staging.',
    description: 'Rapid turnaround cleaning with linen laundry service, guest amenity replenishment, damage inspection, and immaculate hotel-style bed styling.',
    longDescription: 'Maintain your Superhost status effortlessly. We coordinate directly with your booking calendar to ensure your rental is flawlessly turned over between 11:00 AM check-out and 3:00 PM check-in. Our team washes sheets on-site, inspects for guest damage, restocks welcome toiletries, and leaves welcome cards for incoming travelers.',
    basePrice: 169,
    pricePerSqft: 0.06,
    estimatedHours: '2.5 - 3.5 hrs',
    popular: true,
    badge: 'Superhost Preferred',
    iconName: 'KeyRound',
    heroImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Same-day calendar synchronization & reliable turnover guarantee',
      'Linen wash, dry, and hotel-crisp bed dressing with towel origami',
      'Photo documentation report sent to host upon clean completion',
      'Guest toiletry restocking (shampoo, soap, coffee pods, paper goods)',
      'Immediate alert if guest property damage or left-behind items found'
    ],
    recommendedFrequency: 'Per guest turnover or weekly booking cadence',
    includedRooms: [
      {
        room: 'Guest Ready Turnaround',
        tasks: [
          'Linen cycle started immediately upon arrival',
          'Fridge cleared of previous guest leftover food and sanitized',
          'Bathroom sanitized with fresh towel roll placement',
          'Bed framed, pillows fluffed, and welcome basket staged',
          'Key lockbox verification and entry code test'
        ]
      }
    ]
  }
];

export const ADD_ONS_DATA: AddOnItem[] = [
  {
    id: 'oven-interior',
    name: 'Inside Oven Deep Degrease',
    description: 'Baked-on carbon dissolves, racks scrubbed, interior glass degreased.',
    price: 45,
    durationMins: 45,
    iconName: 'Flame',
    category: 'appliances'
  },
  {
    id: 'fridge-interior',
    name: 'Inside Refrigerator & Freezer',
    description: 'Shelves and drawers removed, sanitized, food expiration check.',
    price: 39,
    durationMins: 40,
    iconName: 'Refrigerator',
    category: 'appliances'
  },
  {
    id: 'interior-windows',
    name: 'Interior Window Panes & Tracks',
    description: 'Streak-free polish on all interior glass panes and vacuumed tracks.',
    price: 55,
    durationMins: 50,
    iconName: 'Sun',
    category: 'interior'
  },
  {
    id: 'cabinet-interiors',
    name: 'Inside Kitchen & Bath Cabinets',
    description: 'Empty cabinet shelving and drawers vacuumed and hand-wiped.',
    price: 60,
    durationMins: 60,
    iconName: 'Archive',
    category: 'interior'
  },
  {
    id: 'carpet-steam',
    name: 'Carpet & Rug Steam Extraction',
    description: 'Hot-water extraction deep sanitizing fibers, lifting stains and pet odors.',
    price: 85,
    durationMins: 60,
    iconName: 'Waves',
    category: 'heavy'
  },
  {
    id: 'balcony-patio',
    name: 'Balcony or Porch Sweep & Wipe',
    description: 'Outdoor furniture wiped down, floor swept and railings cleaned.',
    price: 35,
    durationMins: 30,
    iconName: 'Wind',
    category: 'heavy'
  },
  {
    id: 'laundry-wash-fold',
    name: 'Extra Laundry Wash & Fold (2 Loads)',
    description: 'Wash, dry, and neatly folded linens or clothing loads.',
    price: 30,
    durationMins: 45,
    iconName: 'Shirt',
    category: 'interior'
  },
  {
    id: 'dish-handwash',
    name: 'Sink Full of Dishes Hand Wash',
    description: 'Hand wash, rinse, dry, and put away excess sink dishes.',
    price: 25,
    durationMins: 25,
    iconName: 'Utensils',
    category: 'appliances'
  },
  {
    id: 'pet-hair-extraction',
    name: 'Deep Pet Hair Upholstery Scrub',
    description: 'Rubberized pet hair lifting on sofas, cushions, and cat trees.',
    price: 40,
    durationMins: 35,
    iconName: 'Dog',
    category: 'eco'
  }
];

export const CLEANERS_DATA: CleanerProfile[] = [
  {
    id: 'cl-1',
    name: 'Elena Rostova',
    rating: 4.99,
    totalCleans: 1240,
    verifiedBackground: true,
    backgroundCheckDate: 'Verified Nov 2025',
    yearsExperience: 8,
    specialty: 'Deep Sanitation & Allergy Defense',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bio: 'Lead Field Supervisor. Master of detail with over 8 years perfecting hospital-grade residential hygiene.',
    badges: ['Top Rated 2025', 'Master Detailer', 'Pet Lover']
  },
  {
    id: 'cl-2',
    name: 'Marcus Vance',
    rating: 4.97,
    totalCleans: 980,
    verifiedBackground: true,
    backgroundCheckDate: 'Verified Jan 2026',
    yearsExperience: 6,
    specialty: 'Post-Construction & Move-Out Audits',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    bio: 'Former commercial project specialist known for zero-deposit loss records on lease move-outs.',
    badges: ['Deposit Guarantee Lead', 'Fast & Thorough']
  },
  {
    id: 'cl-3',
    name: 'Sophia Chen',
    rating: 5.0,
    totalCleans: 810,
    verifiedBackground: true,
    backgroundCheckDate: 'Verified Dec 2025',
    yearsExperience: 5,
    specialty: 'Eco-Green Pure Botanicals & Nurseries',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    bio: 'Certified organic cleaning specialist dedicated to non-toxic homes for infants and pets.',
    badges: ['Eco Certified', 'Nursery Safe', '100% 5-Stars']
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Claire & David M.',
    location: 'Pacific Heights',
    rating: 5,
    date: '2 days ago',
    serviceType: 'Residential Regular Clean',
    comment: 'We have had Flow Cleaning coming every other Tuesday for 9 months now. Walking into our apartment after work feels like checking into a luxury resort. The citrus aroma is clean without any chemical smell!',
    verified: true,
    cleanerName: 'Elena Rostova',
    helpfulCount: 24
  },
  {
    id: 'rev-2',
    author: 'Jonathan K.',
    location: 'Marina District',
    rating: 5,
    date: '1 week ago',
    serviceType: 'Move-In / Move-Out Clean',
    comment: 'Saved our full $3,200 security deposit! Landlord is notoriously picky about baseboards and oven grease, but his inspection passed with flying colors. Flow Cleaning is worth every single penny.',
    verified: true,
    cleanerName: 'Marcus Vance',
    helpfulCount: 41
  },
  {
    id: 'rev-3',
    author: 'Maya Lin, Architect',
    location: 'SOMA Loft',
    rating: 5,
    date: '2 weeks ago',
    serviceType: 'Post-Construction Fine Dust Clean',
    comment: 'After our kitchen remodel, drywall dust had covered literally everything. Marcus and his crew arrived on time with HEPA vacuums and transformed our home in 5 hours. Unbelievable precision.',
    verified: true,
    cleanerName: 'Marcus Vance',
    helpfulCount: 19
  },
  {
    id: 'rev-4',
    author: 'Sarah Jenkins',
    location: 'Noe Valley',
    rating: 5,
    date: '3 weeks ago',
    serviceType: 'Eco-Green 100% Plant Pure Clean',
    comment: 'Having a 4-month-old baby and two golden retrievers made me anxious about standard chemicals. Sophia used 100% plant-based cleansers and left the house spotless. Zero synthetic scents.',
    verified: true,
    cleanerName: 'Sophia Chen',
    helpfulCount: 33
  }
];

export const CHECKLIST_DATA: ChecklistCategory[] = [
  {
    id: 'kitchen',
    name: 'Kitchen & Dining Area',
    iconName: 'UtensilsCrossed',
    description: 'Detailed food-prep hygiene, grease removal, and surface sanitation.',
    tasks: [
      { id: 'k1', task: 'Sanitize all countertops, island surfaces, and cutting zones', ecoSafe: true, detail: 'Food-contact safe botanical bactericide used.' },
      { id: 'k2', task: 'Scrub and disinfect sink, polish chrome faucets & drains', ecoSafe: true, detail: 'Limescale and soap residue dissolved.' },
      { id: 'k3', task: 'Clean exterior of all major appliances (stove, fridge, dishwasher)', ecoSafe: true, detail: 'Streak-free stainless steel or enamel conditioning.' },
      { id: 'k4', task: 'Clean microwave inside, outside, and turntable glass', ecoSafe: true, detail: 'Deodorized with natural lemon-steam.' },
      { id: 'k5', task: 'Degrease range hood, stovetop grates, and burner dials', isDeepCleanOnly: true, ecoSafe: true, detail: 'Heavy carbon & oil breakdown.' },
      { id: 'k6', task: 'Wipe all cabinet doors, drawer faces, and handles', isDeepCleanOnly: true, ecoSafe: true, detail: 'Removes sticky cooking grease and fingerprints.' },
      { id: 'k7', task: 'Hand-scrub backsplash grout and tiles', isDeepCleanOnly: true, ecoSafe: true, detail: 'Tile restoration with specialized brushes.' },
      { id: 'k8', task: 'Vacuum and sanitizing microfiber mop on entire floor area', ecoSafe: true, detail: 'Edge-to-edge floor wash under toe-kicks.' }
    ]
  },
  {
    id: 'bathrooms',
    name: 'Bathrooms & Powder Rooms',
    iconName: 'Bath',
    description: 'Hospital-standard descaling, mold prevention, and glass clarity.',
    tasks: [
      { id: 'b1', task: 'Scrub and sanitize bathtubs, shower stalls, and basin', ecoSafe: true, detail: 'Removes body oils, soap scum, and water rings.' },
      { id: 'b2', task: 'Disinfect toilet bowl, seat, hinge base, tank, and exterior', ecoSafe: true, detail: '360-degree germicidal sanitation.' },
      { id: 'b3', task: 'Polish glass shower screens with streak-free anti-fog', ecoSafe: true, detail: 'Hard water spot descaling treatment.' },
      { id: 'b4', task: 'Sanitize vanity countertops, sinks, and chrome plumbing fixtures', ecoSafe: true, detail: 'Buffed to mirror shine.' },
      { id: 'b5', task: 'Deep scrub tile wall grout lines and shower floor corners', isDeepCleanOnly: true, ecoSafe: true, detail: 'Agitated with eco-mildew inhibitor.' },
      { id: 'b6', task: 'Wipe down baseboards, towel racks, toilet paper holders', isDeepCleanOnly: true, ecoSafe: true, detail: 'Hand-detailed microfiber wash.' },
      { id: 'b7', task: 'Empty trash, wash bins, and replace fresh liners', ecoSafe: true, detail: 'Sanitized trash receptacle.' },
      { id: 'b8', task: 'Vacuum bathmats and steam-mop tile floors', ecoSafe: true, detail: 'High-temperature floor hygiene.' }
    ]
  },
  {
    id: 'bedrooms',
    name: 'Bedrooms & Sleeping Quarters',
    iconName: 'Bed',
    description: 'Dust-mite reduction, HEPA air purity, and hotel-crisp bed staging.',
    tasks: [
      { id: 'bd1', task: 'Dust all furniture tops, nightstands, dressers, and lamps', ecoSafe: true, detail: 'Microfiber trapping (no dust scattering).' },
      { id: 'bd2', task: 'Make beds with crisp hospital corners & fluff pillows', ecoSafe: true, detail: 'Fresh sheet swap upon request.' },
      { id: 'bd3', task: 'Mirror polishing and glass picture frame dusting', ecoSafe: true, detail: 'Streak-free natural cleaners.' },
      { id: 'bd4', task: 'Hand-wipe bedroom baseboards, door frames, and molding', isDeepCleanOnly: true, ecoSafe: true, detail: 'Detailed edging and wall scuff removal.' },
      { id: 'bd5', task: 'Vacuum under bed frames and behind movable nightstands', isDeepCleanOnly: true, ecoSafe: true, detail: 'Hidden allergen elimination.' },
      { id: 'bd6', task: 'HEPA 13 vacuuming of rugs and mop hardwood surfaces', ecoSafe: true, detail: 'Captures 99.97% of dander and pollen.' }
    ]
  },
  {
    id: 'living',
    name: 'Living & Common Spaces',
    iconName: 'Sofa',
    description: 'High-touch disinfection, architectural woodwork, and plush aesthetics.',
    tasks: [
      { id: 'l1', task: 'Dust entertainment centers, TV screens, coffee tables, and shelves', ecoSafe: true, detail: 'Electronics-safe antistatic cloths.' },
      { id: 'l2', task: 'Disinfect high-touch door knobs, light switches, and remotes', ecoSafe: true, detail: 'Bacterial transmission prevention.' },
      { id: 'l3', task: 'Vacuum couch cushions, sofa crevices, and fold throw blankets', ecoSafe: true, detail: 'Pet hair and crumb removal.' },
      { id: 'l4', task: 'Dust ceiling fans, HVAC ceiling registers, and light fixtures', isDeepCleanOnly: true, ecoSafe: true, detail: 'High-reach extension tool clean.' },
      { id: 'l5', task: 'Detail window sills, window tracks, and blinds/shutters', isDeepCleanOnly: true, ecoSafe: true, detail: 'Slatted blind dusting and track vacuuming.' },
      { id: 'l6', task: 'Edge-to-edge vacuuming, corner crevice cleaning, and mopping', ecoSafe: true, detail: 'Floor finish protection.' }
    ]
  }
];

export const LOCATION_COVERAGE_DATA: LocationCoverage[] = [
  {
    zip: '94102',
    areaName: 'Downtown & Hayes Valley',
    city: 'San Francisco',
    activeCleaners: 8,
    status: 'available',
    avgArrivalMinutes: 30,
    neighborhoods: ['Civic Center', 'Hayes Valley', 'Tenderloin West']
  },
  {
    zip: '94109',
    areaName: 'Nob Hill & Russian Hill',
    city: 'San Francisco',
    activeCleaners: 12,
    status: 'available',
    avgArrivalMinutes: 25,
    neighborhoods: ['Nob Hill', 'Russian Hill', 'Polk Gulch']
  },
  {
    zip: '94115',
    areaName: 'Pacific Heights & Marina',
    city: 'San Francisco',
    activeCleaners: 15,
    status: 'available',
    avgArrivalMinutes: 20,
    neighborhoods: ['Pacific Heights', 'Marina', 'Cow Hollow', 'Presidio Heights']
  },
  {
    zip: '94114',
    areaName: 'Castro & Noe Valley',
    city: 'San Francisco',
    activeCleaners: 10,
    status: 'available',
    avgArrivalMinutes: 25,
    neighborhoods: ['Noe Valley', 'Castro', 'Eureka Valley', 'Twin Peaks']
  },
  {
    zip: '94107',
    areaName: 'SoMa & Mission Bay',
    city: 'San Francisco',
    activeCleaners: 9,
    status: 'available',
    avgArrivalMinutes: 30,
    neighborhoods: ['South of Market', 'Mission Bay', 'Potrero Hill']
  },
  {
    zip: '94118',
    areaName: 'Richmond District & Laurel Heights',
    city: 'San Francisco',
    activeCleaners: 7,
    status: 'available',
    avgArrivalMinutes: 35,
    neighborhoods: ['Inner Richmond', 'Lake Street', 'Laurel Village']
  },
  {
    zip: '94110',
    areaName: 'Mission District & Bernal Heights',
    city: 'San Francisco',
    activeCleaners: 11,
    status: 'available',
    avgArrivalMinutes: 25,
    neighborhoods: ['Mission District', 'Bernal Heights', 'Valencia Corridor']
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'f1',
    category: 'pricing',
    question: 'How do you calculate your cleaning prices?',
    answer: 'Our pricing is 100% transparent and upfront. It is calculated based on the number of bedrooms, bathrooms, approximate square footage, and service tier selected (Standard vs. Deep Clean vs. Move-Out). Unlike other companies, there are no hidden supply fees or surprise upcharges on arrival.'
  },
  {
    id: 'f2',
    category: 'safety',
    question: 'Are your cleaners background-checked and insured?',
    answer: 'Yes! 100% of Flow Cleaning professionals undergo a comprehensive 4-tier screening process: federal & county criminal background checks, identity verification, reference verification, and intensive hands-on practical training. Furthermore, Flow Cleaning is fully bonded and insured with up to $2,000,000 in general liability coverage.'
  },
  {
    id: 'f3',
    category: 'service',
    question: 'What is the difference between a Regular Clean and a Deep Clean?',
    answer: 'A Regular Clean maintains already clean spaces, handling dusting, sanitizing counters, scrubbing sinks/toilets, vacuuming, and mopping. A Deep Clean adds intensive hand-washing of all baseboards, doors, door casings, window sills, high-grease kitchen degreasing, bathroom grout descaling, and high-reach fixtures.'
  },
  {
    id: 'f4',
    category: 'booking',
    question: 'What if I need to cancel or reschedule my appointment?',
    answer: 'We understand schedules change! You can reschedule or cancel directly through your Flow Customer Portal free of charge up to 48 hours before your booking time. For changes within 48 hours, a standard $50 rescheduling fee applies to protect our cleaners\' reserved wage slots.'
  },
  {
    id: 'f5',
    category: 'safety',
    question: 'Do you bring your own cleaning supplies and equipment?',
    answer: 'Yes, our teams arrive fully equipped with certified non-toxic, pet-safe plant-derived cleansers, hospital-grade microfiber cloths (color-coded to prevent cross-contamination), and commercial HEPA 13 vacuums. If you prefer us to use your own vacuum or specialty wood cleaner, simply let us know in your booking notes!'
  },
  {
    id: 'f6',
    category: 'service',
    question: 'What is your 200% Satisfaction Guarantee?',
    answer: 'If any room or item from our 54-point checklist was not cleaned to perfection, notify us within 24 hours. We will send a senior supervisor to re-clean the specific area within 48 hours for FREE. If you are still not 100% delighted, we will issue a full refund.'
  }
];

export const PROMO_CODES: Record<string, { percent: number; minTotal: number; description: string }> = {
  'FLOW20': { percent: 20, minTotal: 100, description: '20% off your booking' },
  'FRESHSTART': { percent: 15, minTotal: 120, description: '15% off seasonal clean' },
  'WELCOME10': { percent: 10, minTotal: 80, description: '10% off new customer clean' }
};
