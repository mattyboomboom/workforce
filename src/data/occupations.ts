/**
 * UK occupations by sex.
 * Headcounts: Working Futures 2024 (Warwick Institute for Employment Research
 * for the Department for Education), built on the ONS Labour Force Survey.
 * `sourceLabel` is the occupation name exactly as it appears in that table.
 */

export interface Note {
  text: string;
  source: SourceId;
}

export interface OccupationInput {
  name: string;
  sourceLabel: string;
  women: number;
  men: number;
  description: string;
  notes?: Note[];
}

export type SourceId = "wf" | "ciphr" | "bcs" | "nmc";

export const sources: Record<
  SourceId,
  { title: string; publisher: string; url: string; summary: string; tag: string }
> = {
  wf: {
    title: "Working Futures 2024: occupations by gender",
    publisher: "Warwick IER for the Department for Education, via CareerSmart",
    url: "https://careersmart.org.uk/node/497",
    summary:
      "Female and male workforce counts for 318 UK occupations in 2024. Every headcount and percentage on this site comes from this table.",
    tag: "Main dataset",
  },
  ciphr: {
    title: "The UK's most popular jobs in 2026",
    publisher: "Ciphr analysis of ONS Nomis data, via FE News",
    url: "https://www.fenews.co.uk/fe-voices/study-reveals-the-uks-most-popular-jobs-in-2026/",
    summary:
      "The ten occupations with the most full-time employees in the year to March 2026.",
    tag: "Analysis",
  },
  bcs: {
    title: "BCS Women in Tech report 2026",
    publisher: "BCS, The Chartered Institute for IT, using the ONS Labour Force Survey",
    url: "https://www.bcs.org/policy-and-influence/equity-diversity-and-inclusion/bcs-women-in-tech-report-2026/gender-and-it-employment/",
    summary: "Women's share of UK IT specialist jobs, 2021 to 2025.",
    tag: "Report",
  },
  nmc: {
    title: "NMC register mid-year update, September 2024",
    publisher: "Nursing and Midwifery Council",
    url: "https://www.nmc.org.uk/globalassets/sitedocuments/data-reports/september-2024/easy-read-nmc-register-uk-mid-year-update-2024.pdf",
    summary: "Number of nurses, midwives and nursing associates on the UK register.",
    tag: "Register",
  },
};

export const moreResources: { title: string; publisher: string; url: string; summary: string; tag: string }[] = [
  {
    title: "Employment by occupation and sex",
    publisher: "ONS Nomis",
    url: "https://www.nomisweb.co.uk/",
    summary:
      "Official quarterly Annual Population Survey tables, down to four-digit occupation codes and by region.",
    tag: "Data",
  },
  {
    title: "UK STEM employment by occupation",
    publisher: "Department for Education",
    url: "https://explore-education-statistics.service.gov.uk/data-catalogue/data-set/664d7ad5-babe-4a1d-b719-39bb3750a426",
    summary:
      "Employment and women's share for every STEM occupation, from the Annual Population Survey, July 2022 to June 2023.",
    tag: "Data",
  },
  {
    title: "Gender pay gap in the UK: 2025",
    publisher: "Office for National Statistics",
    url: "https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/genderpaygapintheuk/2025",
    summary:
      "The official annual estimate. The full-time gender pay gap was 6.9% in April 2025, and 12.8% across all employees.",
    tag: "Report",
  },
  {
    title: "Gender pay gap service",
    publisher: "GOV.UK",
    url: "https://gender-pay-gap.service.gov.uk/",
    summary:
      "Search and compare the gender pay gap reported by individual UK employers, or download the full dataset.",
    tag: "Tool",
  },
  {
    title: "Labour market projections 2025 to 2035",
    publisher: "Warwick IER for Skills England",
    url: "https://warwick.ac.uk/fac/soc/ier/researchthemesoverview/researchprojects/labourmarketprojections2025to2035/",
    summary:
      "The next edition of the Working Futures series, projecting jobs by industry and occupation across the UK.",
    tag: "Projections",
  },
  {
    title: "Standard Occupational Classification",
    publisher: "Office for National Statistics",
    url: "https://www.ons.gov.uk/methodology/classificationsandstandards/standardoccupationalclassificationsoc",
    summary: "How the ONS defines, codes and groups every occupation in the UK.",
    tag: "Reference",
  },
];

/** Total people in work: sum of all 318 occupations in Working Futures 2024. */
export const UK_TOTAL = 33_658_430;
export const UK_WOMEN = 16_582_218;
export const SOURCE_OCCUPATIONS = 318;

const ciphr = (rank: number, count: string): Note => ({
  text: `The ${ordinal(rank)} most common full-time job in the UK, with about ${count} full-time employees in the year to March 2026.`,
  source: "ciphr",
});

function ordinal(n: number): string {
  const words = ["", "", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];
  return n === 1 ? "single" : words[n] ?? `${n}th`;
}

export const occupationInputs: OccupationInput[] = [
  {
    name: "Vehicle technicians & mechanics",
    sourceLabel: "Vehicle technicians, mechanics and electricians",
    women: 1501, men: 186605,
    description:
      "Diagnose faults in and repair, service and maintain cars, vans, lorries and other motor vehicles, including their electrical and electronic systems.",
  },
  {
    name: "Carpenters & joiners",
    sourceLabel: "Carpenters and joiners",
    women: 2603, men: 237794,
    description:
      "Cut, shape and fit timber for buildings and fittings, from roof structures and floors to doors, stairs, kitchens and shopfitting.",
  },
  {
    name: "Electricians",
    sourceLabel: "Electricians and electrical fitters",
    women: 3891, men: 225910,
    description:
      "Install, test and repair wiring, lighting and electrical equipment in homes, commercial buildings and industrial sites.",
  },
  {
    name: "Metalworking fitters",
    sourceLabel: "Metal working production and maintenance fitters",
    women: 3447, men: 174435,
    description:
      "Assemble, install and maintain machinery and metal components in factories, plants and workshops.",
  },
  {
    name: "Plumbers & heating engineers",
    sourceLabel: "Plumbers and heating and ventilating engineers",
    women: 3312, men: 165026,
    description:
      "Install and repair water, drainage, gas, heating and ventilation systems, including boilers and, increasingly, heat pumps.",
  },
  {
    name: "Fork-lift truck drivers",
    sourceLabel: "Fork-lift truck drivers",
    women: 2967, men: 110875,
    description:
      "Operate fork-lift trucks to load, unload, move and stack goods in warehouses, yards, factories and distribution centres.",
  },
  {
    name: "HGV drivers",
    sourceLabel: "Large goods vehicle drivers",
    women: 9219, men: 323864,
    description:
      "Drive heavy goods vehicles to move freight around the UK and abroad, and are responsible for loads, vehicle checks and driving-hours rules.",
    notes: [ciphr(10, "243,100")],
  },
  {
    name: "Construction labourers",
    sourceLabel: "Elementary construction occupations",
    women: 5677, men: 169971,
    description:
      "Carry out general manual work on building and civil engineering sites, such as moving materials, digging, mixing and site clearance.",
  },
  {
    name: "Taxi & cab drivers",
    sourceLabel: "Taxi and cab drivers and chauffeurs",
    women: 11477, men: 224911,
    description:
      "Drive licensed taxis, private hire vehicles and chauffeured cars, including app-based ride-hailing work.",
  },
  {
    name: "Painters & decorators",
    sourceLabel: "Painters and decorators",
    women: 6464, men: 118640,
    description:
      "Prepare surfaces and apply paint, wallpaper and other finishes to the inside and outside of buildings.",
  },
  {
    name: "Train & tram drivers",
    sourceLabel: "Train and tram drivers",
    women: 1455, men: 23774,
    description:
      "Drive passenger and freight trains, trams and underground trains, following signals, timetables and safety procedures.",
  },
  {
    name: "Metal machining setters",
    sourceLabel: "Metal machining setters and setter-operators",
    women: 2855, men: 46468,
    description:
      "Set up and operate lathes, milling machines and CNC equipment to cut and shape metal parts to precise specifications.",
  },
  {
    name: "Mechanical engineers",
    sourceLabel: "Mechanical engineers",
    women: 6600, men: 85795,
    description:
      "Design, develop and test machines, engines, tools and mechanical systems across manufacturing, energy, transport and construction.",
  },
  {
    name: "Van drivers",
    sourceLabel: "Van drivers",
    women: 17789, men: 219664,
    description:
      "Drive vans to collect and deliver goods and parcels, a role that has grown with online shopping.",
  },
  {
    name: "Bus & coach drivers",
    sourceLabel: "Bus and coach drivers",
    women: 11042, men: 118089,
    description:
      "Drive buses on local routes and coaches on longer journeys and tours, taking fares and helping passengers.",
  },
  {
    name: "Gardeners & landscapers",
    sourceLabel: "Gardeners and landscape gardeners",
    women: 13442, men: 134341,
    description:
      "Plant, maintain and design gardens, parks and grounds, and build landscaping features such as paths, walls and patios.",
  },
  {
    name: "Firefighters",
    sourceLabel: "Fire service officers (watch manager and below)",
    women: 3746, men: 36996,
    description:
      "Respond to fires, road traffic collisions, floods and other emergencies, and carry out fire safety and prevention work.",
  },
  {
    name: "Airline pilots",
    sourceLabel: "Aircraft pilots and flight engineers",
    women: 2351, men: 21770,
    description:
      "Fly commercial, cargo and private aircraft, and monitor aircraft systems before and during flights.",
  },
  {
    name: "Butchers",
    sourceLabel: "Butchers",
    women: 3552, men: 32427,
    description:
      "Cut, trim and prepare meat for sale in shops, supermarkets and meat processing plants.",
  },
  {
    name: "Armed forces (NCOs & other ranks)",
    sourceLabel: "NCOs and other ranks",
    women: 5810, men: 51598,
    description:
      "Serve in the Army, Royal Navy and Royal Air Force below commissioned officer rank, in combat, engineering, logistics and support roles.",
  },
  {
    name: "Civil engineers",
    sourceLabel: "Civil engineers",
    women: 9148, men: 80072,
    description:
      "Plan, design and oversee the building of roads, bridges, railways, water systems and other infrastructure.",
  },
  {
    name: "Warehouse & storage workers",
    sourceLabel: "Elementary storage occupations",
    women: 68700, men: 440934,
    description:
      "Receive, pick, pack, store and dispatch goods in warehouses and distribution centres.",
    notes: [
      {
        text: "Warehouse operatives were the seventh most common full-time job in the UK, with about 313,400 full-time employees in the year to March 2026.",
        source: "ciphr",
      },
    ],
  },
  {
    name: "Production managers in manufacturing",
    sourceLabel: "Production managers and directors in manufacturing",
    women: 55489, men: 324926,
    description:
      "Plan and run manufacturing operations, managing output, quality, staff, budgets and health and safety on the factory floor.",
  },
  {
    name: "Software developers",
    sourceLabel: "Programmers and software development professionals",
    women: 46926, men: 258522,
    description:
      "Design, write, test and maintain software, from websites and apps to business systems and embedded code.",
    notes: [
      ciphr(2, "492,000"),
      {
        text: "Across all UK IT specialist roles, women made up 22% of the workforce in 2025, about 433,000 people, compared with 49% of the workforce as a whole.",
        source: "bcs",
      },
    ],
  },
  {
    name: "Security guards",
    sourceLabel: "Security guards and related occupations",
    women: 33943, men: 179502,
    description:
      "Protect buildings, sites, events and people by patrolling, monitoring CCTV and controlling access.",
  },
  {
    name: "Farmers",
    sourceLabel: "Farmers",
    women: 25347, men: 117225,
    description:
      "Run farms raising crops or livestock, managing land, animals, machinery, staff and the business side of the farm.",
  },
  {
    name: "Chefs",
    sourceLabel: "Chefs",
    women: 51082, men: 184199,
    description:
      "Plan menus and prepare and cook food in restaurants, hotels, pubs and institutional kitchens, often leading a kitchen team.",
  },
  {
    name: "Chief executives & senior officials",
    sourceLabel: "Chief executives and senior officials",
    women: 19727, men: 67198,
    description:
      "Lead organisations in the private, public and voluntary sectors, setting strategy and taking overall responsibility for performance.",
  },
  {
    name: "Food & drink factory operatives",
    sourceLabel: "Food, drink and tobacco process operatives",
    women: 34651, men: 87444,
    description:
      "Operate machinery that processes, cooks, mixes and packages food and drink in factories.",
  },
  {
    name: "IT managers",
    sourceLabel: "IT specialist managers",
    women: 61746, men: 156284,
    description:
      "Manage IT services, infrastructure, projects and technical teams within organisations.",
    notes: [
      ciphr(9, "258,600"),
      {
        text: "Across all UK IT specialist roles, women made up 22% of the workforce in 2025.",
        source: "bcs",
      },
    ],
  },
  {
    name: "Postal workers & couriers",
    sourceLabel: "Postal workers, mail sorters, messengers and couriers",
    women: 61757, men: 154733,
    description:
      "Sort, collect and deliver letters and parcels for Royal Mail and private courier and delivery firms.",
  },
  {
    name: "Architects",
    sourceLabel: "Architects",
    women: 23356, men: 45943,
    description:
      "Design new buildings and the alteration of existing ones, and oversee projects from concept through to construction.",
  },
  {
    name: "Marketing & sales directors",
    sourceLabel: "Marketing and sales directors",
    women: 84583, men: 145919,
    description:
      "Lead an organisation's marketing and sales strategy, budgets and teams.",
  },
  {
    name: "Police officers",
    sourceLabel: "Police officers (sergeant and below)",
    women: 65401, men: 104575,
    description:
      "Patrol communities, respond to incidents, investigate crime and keep the peace, at the ranks of constable and sergeant.",
  },
  {
    name: "Factory packers",
    sourceLabel: "Packers, bottlers, canners and fillers",
    women: 59354, men: 90085,
    description:
      "Pack, bottle, can and fill products by hand or machine on production and packing lines.",
  },
  {
    name: "Sales & business development managers",
    sourceLabel: "Sales accounts and business development managers",
    women: 217646, men: 297944,
    description:
      "Win and manage business accounts, develop new markets and hit sales targets for their organisation.",
    notes: [ciphr(6, "321,300")],
  },
  {
    name: "Management consultants",
    sourceLabel: "Management consultants and business analysts",
    women: 95543, men: 125314,
    description:
      "Advise organisations on strategy, operations and change, and analyse business processes to improve performance.",
  },
  {
    name: "Financial managers & directors",
    sourceLabel: "Financial managers and directors",
    women: 136416, men: 164330,
    description:
      "Run the finance function of an organisation, overseeing budgets, reporting, investment and financial risk.",
    notes: [ciphr(4, "340,200")],
  },
  {
    name: "Journalists & editors",
    sourceLabel: "Journalists, newspaper and periodical editors",
    women: 44488, men: 47260,
    description:
      "Research, write and edit news and features for newspapers, magazines, broadcasters and online outlets.",
  },
  {
    name: "Barristers & judges",
    sourceLabel: "Barristers and judges",
    women: 17909, men: 18103,
    description:
      "Barristers argue cases in court and give specialist legal advice. Judges preside over court cases and tribunals.",
  },
  {
    name: "Catering & bar managers",
    sourceLabel: "Catering and bar managers",
    women: 33382, men: 33428,
    description:
      "Run restaurants, bars, cafés and catering operations, managing staff, stock, budgets and customer service.",
  },
  {
    name: "Customer service managers",
    sourceLabel: "Customer service managers and supervisors",
    women: 90568, men: 89311,
    description:
      "Lead customer service teams and contact centres, setting standards and handling escalated complaints.",
  },
  {
    name: "Bar staff",
    sourceLabel: "Bar staff",
    women: 121894, men: 118642,
    description:
      "Serve drinks and sometimes food in pubs, bars, clubs and hotels, and keep the bar clean and stocked.",
  },
  {
    name: "Accountants",
    sourceLabel: "Chartered and certified accountants",
    women: 125235, men: 120320,
    description:
      "Qualified accountants who prepare and audit accounts, advise on tax and finance, and ensure financial reporting is accurate.",
  },
  {
    name: "Further education lecturers",
    sourceLabel: "Further education teaching professionals",
    women: 70948, men: 66360,
    description:
      "Teach academic and vocational courses to students aged 16 and over in further education colleges and sixth forms.",
  },
  {
    name: "Doctors",
    sourceLabel: "Medical practitioners",
    women: 177231, men: 139448,
    description:
      "Diagnose and treat illness and injury as GPs, hospital doctors and specialists.",
  },
  {
    name: "Kitchen & catering assistants",
    sourceLabel: "Kitchen and catering assistants",
    women: 306476, men: 234168,
    description:
      "Prepare food, wash up, clean kitchens and serve meals in restaurants, schools, hospitals and canteens.",
  },
  {
    name: "Secondary school teachers",
    sourceLabel: "Secondary education teaching professionals",
    women: 303298, men: 203758,
    description:
      "Teach specialist subjects to pupils aged 11 to 18 and support their progress and wellbeing.",
    notes: [ciphr(3, "399,700")],
  },
  {
    name: "Solicitors",
    sourceLabel: "Solicitors",
    women: 89370, men: 57031,
    description:
      "Give legal advice and handle legal matters for clients, including contracts, property, family and criminal cases.",
  },
  {
    name: "Shop & retail assistants",
    sourceLabel: "Sales and retail assistants",
    women: 779099, men: 494467,
    description:
      "Serve customers, stock shelves and handle sales in shops, supermarkets and other retail outlets. The largest single occupation in the UK.",
  },
  {
    name: "Dentists",
    sourceLabel: "Dental practitioners",
    women: 37409, men: 23131,
    description:
      "Examine, diagnose and treat problems with teeth and gums, in NHS and private practice.",
  },
  {
    name: "Customer service staff",
    sourceLabel: "Customer service occupations n.e.c.",
    women: 222419, men: 125446,
    description:
      "Deal with customer enquiries, orders and complaints by phone, email, chat and in person.",
  },
  {
    name: "HR managers & directors",
    sourceLabel: "Human resource managers and directors",
    women: 115869, men: 60848,
    description:
      "Lead recruitment, employee relations, pay, training and people policy within organisations.",
  },
  {
    name: "Cooks",
    sourceLabel: "Cooks",
    women: 65042, men: 31229,
    description:
      "Prepare and cook meals, often in schools, care homes, hospitals, cafés and staff canteens.",
  },
  {
    name: "Book-keepers & payroll clerks",
    sourceLabel: "Book-keepers, payroll managers and wages clerks",
    women: 315111, men: 137607,
    description:
      "Keep financial records, process invoices and run payroll for businesses and organisations.",
  },
  {
    name: "Waiters & waitresses",
    sourceLabel: "Waiters and waitresses",
    women: 217030, men: 88190,
    description:
      "Take orders and serve food and drink to customers in restaurants, cafés and hotels.",
  },
  {
    name: "Hairdressers & barbers",
    sourceLabel: "Hairdressers and barbers",
    women: 162885, men: 63071,
    description:
      "Cut, colour and style hair in salons and barbershops, many as self-employed workers.",
  },
  {
    name: "Pharmacists",
    sourceLabel: "Pharmacists",
    women: 51809, men: 17527,
    description:
      "Dispense medicines and advise patients and doctors on their safe use, in community pharmacies and hospitals.",
  },
  {
    name: "Office administrators",
    sourceLabel: "Other administrative occupations n.e.c.",
    women: 502528, men: 165957,
    description:
      "Carry out general clerical and administrative work, such as data entry, filing, record-keeping and correspondence.",
    notes: [ciphr(5, "327,900")],
  },
  {
    name: "Cleaners",
    sourceLabel: "Cleaners and domestics",
    women: 569998, men: 145713,
    description:
      "Clean offices, homes, hospitals, schools and other buildings.",
  },
  {
    name: "Social workers",
    sourceLabel: "Social workers",
    women: 100258, men: 22875,
    description:
      "Support and safeguard children, families and vulnerable adults, assessing needs and arranging care and protection.",
  },
  {
    name: "Care workers & home carers",
    sourceLabel: "Care workers and home carers",
    women: 830991, men: 165020,
    description:
      "Provide personal care and support to older people and people with disabilities or illness, in care homes and in their own homes.",
    notes: [
      {
        text: "Care work was the single most common full-time job in the UK, with about 554,000 full-time employees in the year to March 2026, about 2.5% of all full-time employees.",
        source: "ciphr",
      },
    ],
  },
  {
    name: "Nurses",
    sourceLabel: "Nurses",
    women: 673266, men: 121146,
    description:
      "Assess, plan and deliver patient care in hospitals, GP surgeries, care homes and the community.",
    notes: [
      {
        text: "Just over 778,000 nurses were on the Nursing and Midwifery Council register in September 2024.",
        source: "nmc",
      },
    ],
  },
  {
    name: "Receptionists",
    sourceLabel: "Receptionists",
    women: 133741, men: 20989,
    description:
      "Greet visitors, answer calls and manage bookings in offices, surgeries, hotels and other organisations.",
  },
  {
    name: "Primary & nursery teachers",
    sourceLabel: "Primary and nursery education teaching professionals",
    women: 454563, men: 67674,
    description:
      "Teach children from nursery age to 11 across the curriculum and support their early development.",
    notes: [
      {
        text: "Primary school teachers were the eighth most common full-time job in the UK, with about 262,600 full-time employees in the year to March 2026.",
        source: "ciphr",
      },
    ],
  },
  {
    name: "Teaching assistants",
    sourceLabel: "Teaching assistants",
    women: 419971, men: 44783,
    description:
      "Support teachers in the classroom and help individual pupils and small groups with their learning.",
  },
  {
    name: "PAs & secretaries",
    sourceLabel: "Personal assistants and other secretaries",
    women: 137139, men: 9382,
    description:
      "Manage diaries, correspondence, travel and meetings for managers and teams.",
  },
  {
    name: "Childminders",
    sourceLabel: "Childminders and related occupations",
    women: 158498, men: 8948,
    description:
      "Look after children in their own or the children's homes, including registered childminders and nannies.",
  },
  {
    name: "Nursery nurses & assistants",
    sourceLabel: "Nursery nurses and assistants",
    women: 228271, men: 5117,
    description:
      "Care for and educate babies and young children in nurseries, pre-schools and children's centres. The most female-dominated occupation in the UK.",
  },
  {
    name: "Refuse collectors",
    sourceLabel: "Refuse and salvage occupations",
    women: 2822, men: 40434,
    description:
      "Collect household and commercial waste and recycling, and sort materials at recycling and salvage sites.",
  },
  {
    name: "Paramedics",
    sourceLabel: "Paramedics",
    women: 15471, men: 17834,
    description:
      "Respond to 999 calls, assess and treat patients at the scene and on the way to hospital.",
  },
  {
    name: "Bakers",
    sourceLabel: "Bakers and flour confectioners",
    women: 16836, men: 19119,
    description:
      "Make bread, cakes, pastries and other baked goods in bakeries, shops and factories.",
  },
  {
    name: "Actuaries, economists & statisticians",
    sourceLabel: "Actuaries, economists and statisticians",
    women: 20232, men: 22393,
    description:
      "Use mathematics, statistics and economic analysis to measure risk, forecast trends and inform decisions.",
  },
  {
    name: "Police community support officers",
    sourceLabel: "Police community support officers",
    women: 9293, men: 9852,
    description:
      "Uniformed police staff who patrol neighbourhoods, deal with antisocial behaviour and support police officers, without full arrest powers.",
  },
  {
    name: "Nursing assistants",
    sourceLabel: "Nursing auxiliaries and assistants",
    women: 337028, men: 75409,
    description:
      "Support nurses with patient care in hospitals and care settings, including healthcare assistants and support workers.",
  },
  {
    name: "Retail cashiers & checkout operators",
    sourceLabel: "Retail cashiers and check-out operators",
    women: 166348, men: 95731,
    description:
      "Scan goods, take payments and help customers at shop and supermarket checkouts.",
  },
  {
    name: "Other construction & building trades",
    sourceLabel: "Construction and building trades n.e.c.",
    women: 10721, men: 232061,
    description:
      "Skilled building trades not classified elsewhere, such as general builders, maintenance workers and specialist construction trades.",
  },
  {
    name: "Business & finance project managers",
    sourceLabel: "Business and financial project management professionals",
    women: 106753, men: 135436,
    description:
      "Plan and deliver business change, finance and IT projects, managing scope, budgets, timelines and teams.",
  },
  {
    name: "Other education professionals",
    sourceLabel: "Teaching and other educational professionals n.e.c.",
    women: 176384, men: 65688,
    description:
      "Education roles not classified elsewhere, such as private tutors, education advisers and specialist instructors.",
  },
];
