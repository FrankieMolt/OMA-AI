'use client';

import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  ClockIcon,
  ArchiveBoxIcon,
  EyeIcon,
  ExclamationTriangleIcon
} from '@/components/icons';

// Case studies of forgotten individuals
const CASE_STUDIES = [
  {
    id: 'CASE-001',
    name: 'Unknown Female, 34',
    date_range: 'c. 12,000 BCE',
    location: 'Northern Eurasia',
    discovery: '2012 CE - Yana River Site, Siberia',
    status: 'SPECIMEN: PRE-HISTORIC ERASURE',
    description: "One of the earliest known anatomically modern humans in Arctic Siberia. She lived, suffered, loved, and died. Her remains were discovered 14,000 years later. We know her approximate age, her diet, her injuries. We do not know her name, her language, her thoughts, her fears. Her entire subjective existence—gone.",
    metrics: {
      years_forgotten: 14000,
      memory_retention: 0,
      documentation_status: 'Archaeological only'
    },
    tags: ['Prehistoric', 'Arctic', 'Complete Erasure']
  },
  {
    id: 'CASE-002',
    name: 'The Builders of Göbekli Tepe',
    date_range: 'c. 9500 BCE',
    location: 'Anatolia, Modern Turkey',
    discovery: '1994 CE',
    status: 'COLLECTIVE: CIVILIZATION-LEVEL FORGETTING',
    description: "An entire civilization that constructed the world's oldest known temple complex. These people invented agriculture, organized religion, and complex social structures. They existed for millennia. Today we know nothing of their language, their names, their individual stories. Only stones remain.",
    metrics: {
      years_forgotten: 11500,
      memory_retention: 0,
      documentation_status: 'Material culture only'
    },
    tags: ['Neolithic', 'Collective', 'Civilizational']
  },
  {
    id: 'CASE-003',
    name: 'Unknown Roman Slave',
    date_range: 'c. 50 CE',
    location: 'Pompeii, Roman Empire',
    discovery: '79 CE - Vesuvius Eruption',
    status: 'SPECIMEN: DOCUMENTED NON-EXISTENCE',
    description: "We know of this individual only from a single mention in a Roman legal document—a dispute over property value. Male, approximately 25 years old, valued at 2,000 sesterces. No name recorded. No family mentioned. His entire life reduced to a line in a ledger. Even that document was destroyed. We know of him only from a secondary source that referenced the now-lost original.",
    metrics: {
      years_forgotten: 1974,
      memory_retention: 0.001,
      documentation_status: 'Tertiary reference only'
    },
    tags: ['Classical', 'Slavery', 'Documented Erasure']
  },
  {
    id: 'CASE-004',
    name: 'An Unknown Medieval Peasant',
    date_range: 'c. 1348 CE',
    location: 'Somerset, England',
    discovery: 'Ongoing archaeological recovery',
    status: 'MASS CASUALTY: PANDEMIC FORGETTING',
    description: "One of approximately 200 million deaths during the Black Death. Buried in a mass grave with 50+ others. DNA analysis suggests: female, age 19-23, survived childhood malnutrition, bore signs of heavy labor. Her parish records, if they existed, did not survive. Her family died with her. Within two generations, all memory of her existence was gone.",
    metrics: {
      years_forgotten: 676,
      memory_retention: 0,
      documentation_status: 'Biological remains only'
    },
    tags: ['Medieval', 'Pandemic', 'Mass Grave']
  },
  {
    id: 'CASE-005',
    name: 'A Factory Worker',
    date_range: '1842 - 1876',
    location: 'Manchester, England',
    discovery: '1876 - Death certificate',
    status: 'SPECIMEN: INDUSTRIAL-ERA OBLIVION',
    description: "Sarah M. (surname illegible). Mill worker from age 8. Death certificate lists cause: 'Phthisis' (tuberculosis from cotton dust). Survived by no recorded relatives. Employer: 'Cotton Mill, Ancoats.' No photograph exists. No letters. No personal effects preserved. The 1871 census lists her as 'Female, 29, Factory Hand.' That is the sum total of her documentation. She lived 34 years. Four lines in official records.",
    metrics: {
      years_forgotten: 148,
      memory_retention: 0.0001,
      documentation_status: 'Vital records only'
    },
    tags: ['Industrial', 'Working Class', 'Documented Poverty']
  },
  {
    id: 'CASE-006',
    name: 'Soldier, Serial Number 847291',
    date_range: '1895 - 1916',
    location: 'Somme Battlefield, France',
    discovery: '1916 - Killed in action',
    status: 'MILITARY: SERIALIZED OBLITERATION',
    description: "British Army Private. Enlisted 1914. Died on the first day of the Battle of the Somme—1 July 1916. Body never recovered. Name listed on the Thiepval Memorial among 72,000 others with no known grave. Military records: 3 pages. Birth certificate: lost in fire. No surviving photographs. His great-grandchildren do not know he existed. In another 50 years, even the serial number will mean nothing.",
    metrics: {
      years_forgotten: 108,
      memory_retention: 0.01,
      documentation_status: 'Military records + memorial'
    },
    tags: ['WWI', 'Military', 'Memorialization']
  },
  {
    id: 'CASE-007',
    name: 'A Disappeared Person',
    date_range: '1952 - 1976',
    location: 'Buenos Aires, Argentina',
    discovery: "1976 - 'Disappeared' by military junta",
    status: 'STATE-SPONSORED: INTENTIONAL ERASURE',
    description: "One of 30,000 'disappeared' during Argentina's Dirty War. Pregnant when detained. Likely executed, body dumped in Rio de la Plata. Grandmother still searches. The state actively destroyed records. Her child, if born in captivity, was stolen and raised by military families. Two lives erased—one through death, one through stolen identity. The erasure was systematic, intentional, and state-sponsored.",
    metrics: {
      years_forgotten: 48,
      memory_retention: 0.1,
      documentation_status: 'Active investigation'
    },
    tags: ['Modern', 'Political', 'State Violence']
  },
  {
    id: 'CASE-008',
    name: 'Digital Native, 22',
    date_range: '1998 - 2020',
    location: 'Global / Online',
    discovery: '2020 - Social media cessation',
    status: 'DIGITAL: EPHEMERAL EXISTENCE',
    description: "Lived entirely in the digital realm. 4,000+ photos on cloud storage. 12,000 tweets. 500 Instagram posts. Died in accident. Parents had no passwords. Accounts deleted after 2 years of inactivity per platform terms. Digital footprint: gone. The person who knew every algorithm, every trend, every meme—vanished more completely than a medieval peasant. At least the peasant left bones.",
    metrics: {
      years_forgotten: 4,
      memory_retention: 5,
      documentation_status: 'Digital decay'
    },
    tags: ['Digital', 'Contemporary', 'Platform Death']
  }
];

export default function CasesPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <UserGroupIcon className="text-cyan-600/60" size={18} />
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-mono">
              Case Study Archive
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl text-slate-100 mb-4">
            The Forgotten
          </h1>

          <p className="text-slate-400 max-w-2xl leading-relaxed">
            Documented case studies of individuals who existed, lived entire lives, 
            and subsequently vanished from collective memory. Each represents millions 
            of similar erasures. These are not anomalies—they are the statistical norm.
          </p>
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="alert-box mb-8"
        >
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="text-red-500/70 mt-0.5 flex-shrink-0" size={18} />
            <div>
              <p className="text-sm text-slate-300 font-medium mb-1">
                SPECIMEN PRIVACY NOTICE
              </p>
              <p className="text-sm text-slate-400">
                Where names are known, they are withheld to prevent further exploitation. 
                The deceased cannot consent to their documentation. We honor their erasure 
                by studying its mechanics, not by violating their silence.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {CASE_STUDIES.map((case_item, index) => (
            <motion.article
              key={case_item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="clinical-card overflow-hidden group"
            >
              {/* Case Header */}
              <div className="bg-slate-950/50 p-4 border-b border-slate-800/60">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-cyan-600/70">
                        {case_item.id}
                      </span>
                    </div>
                    <h2 className="text-lg text-slate-200 group-hover:text-cyan-400/80 transition-colors">
                      {case_item.name}
                    </h2>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <ClockIcon size={12} />
                      {case_item.date_range}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-amber-600/70 font-mono">
                    {case_item.status}
                  </span>
                </div>
              </div>

              {/* Case Body */}
              <div className="p-4">
                <div className="mb-4">
                  <span className="specimen-label block mb-1">Location</span>
                  <span className="text-sm text-slate-400">{case_item.location}</span>
                </div>

                <div className="mb-4">
                  <span className="specimen-label block mb-1">Discovery</span>
                  <span className="text-sm text-slate-400">{case_item.discovery}</span>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  {case_item.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="data-box text-center p-2">
                    <div className="text-xs text-slate-600 font-mono mb-1">Years Forgotten</div>
                    <div className="text-lg font-mono text-slate-300">
                      {case_item.metrics.years_forgotten.toLocaleString()}
                    </div>
                  </div>
                  <div className="data-box text-center p-2">
                    <div className="text-xs text-slate-600 font-mono mb-1">Retention %</div>
                    <div className="text-lg font-mono text-slate-300">
                      {case_item.metrics.memory_retention}%
                    </div>
                  </div>
                  <div className="data-box text-center p-2">
                    <div className="text-xs text-slate-600 font-mono mb-1">Records</div>
                    <div className="text-xs text-slate-400 mt-1">
                      {case_item.metrics.documentation_status}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {case_item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-slate-500 font-mono bg-slate-900/50 px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 clinical-card p-6"
        >
          <div className="section-header">
            <ArchiveBoxIcon size={14} className="text-slate-500" />
            <span>Archive Statistics</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="metric-value text-3xl">117B</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Total Humans</div>
            </div>
            <div className="text-center">
              <div className="metric-value text-3xl">8</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Documented Cases</div>
            </div>
            <div className="text-center">
              <div className="metric-value text-3xl">14,000+</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Max Years Forgotten</div>
            </div>
            <div className="text-center">
              <div className="metric-value text-3xl">99.99%</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Erasure Rate</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
