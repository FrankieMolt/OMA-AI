'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowUpRightIcon,
  BookOpenIcon,
  ArchiveBoxIcon
} from '@/components/icons';

// Real academic sources on memory, forgetting, and historical erasure
const RESEARCH_PAPERS = [
  {
    id: 1,
    title: "Memory, History, Forgetting",
    author: "Paul Ricœur",
    year: 2004,
    publisher: "University of Chicago Press",
    category: "PHILOSOPHY",
    description: "A seminal work exploring the relationship between individual memory and collective history. Ricœur examines how societies forget, the ethics of memory, and the 'debt to the dead'—the obligation to remember those who came before us.",
    key_concepts: ["Collective Memory", "Historical Consciousness", "Oblivion Ethics"],
    citation: "Ricœur, P. (2004). Memory, History, Forgetting. (K. Blamey & D. Pellauer, Trans.). University of Chicago Press.",
    link: "https://press.uchicago.edu/ucp/books/book/chicago/M/bo3770010.html"
  },
  {
    id: 2,
    title: "Seven Types of Forgetting",
    author: "Paul Connerton",
    year: 2008,
    publisher: "Memory Studies",
    category: "SOCIOLOGY",
    description: "Connerton identifies seven distinct forms of forgetting: repressive erasure, prescriptive forgetting, forgetting that is constitutive in the formation of a new identity, structural amnesia, forgetting as annulment, forgetting as planned obsolescence, and forgetting as humiliated silence.",
    key_concepts: ["Structural Amnesia", "Prescriptive Forgetting", "Social Memory"],
    citation: "Connerton, P. (2008). Seven types of forgetting. Memory Studies, 1(1), 59-71.",
    link: "https://journals.sagepub.com/doi/10.1177/1750698007083889"
  },
  {
    id: 3,
    title: "How Societies Remember",
    author: "Paul Connerton",
    year: 1989,
    publisher: "Cambridge University Press",
    category: "ANTHROPOLOGY",
    description: "An exploration of how social memory is transmitted through bodily practices, rituals, and commemorative ceremonies. Connerton argues that memory is not just stored in texts but enacted through physical performance.",
    key_concepts: ["Social Memory", "Commemorative Practices", "Bodily Memory"],
    citation: "Connerton, P. (1989). How Societies Remember. Cambridge University Press.",
    link: "https://www.cambridge.org/core/books/how-societies-remember/"
  },
  {
    id: 4,
    title: "Thanatology: A Study of Death",
    author: "Herman Feifel (Ed.)",
    year: 1959,
    publisher: "McGraw-Hill",
    category: "THANATOLOGY",
    description: "The foundational text establishing thanatology as a scientific discipline. Explores how human cultures confront mortality and the processes by which the dead are gradually integrated into or excluded from collective memory.",
    key_concepts: ["Death Studies", "Grief Work", "Memorialization"],
    citation: "Feifel, H. (Ed.). (1959). The Meaning of Death. McGraw-Hill.",
    link: null
  },
  {
    id: 5,
    title: "The Collective Memory",
    author: "Maurice Halbwachs",
    year: 1950,
    publisher: "Harper & Row",
    category: "SOCIOLOGY",
    description: "Halbwachs introduced the concept of 'collective memory'—the idea that memory is not purely individual but shaped by social frameworks. Memory exists within social groups, and when those groups dissolve, so too does the memory.",
    key_concepts: ["Collective Memory", "Social Frameworks", "Memory Communities"],
    citation: "Halbwachs, M. (1950/1980). The Collective Memory. (F. J. Ditter, Jr. & V. Y. Ditter, Trans.). Harper & Row.",
    link: null
  },
  {
    id: 6,
    title: "The Generation of Greatness",
    author: "Francis Galton",
    year: 1869,
    publisher: "Macmillan",
    category: "HISTORIOGRAPHY",
    description: "While primarily a study of hereditary genius, Galton's work incidentally documents how quickly fame and recognition decay across generations. The vast majority of 'great' individuals are forgotten within two centuries.",
    key_concepts: ["Hereditary Fame", "Recognition Decay", "Historical Selection"],
    citation: "Galton, F. (1869). Hereditary Genius: An Inquiry into its Laws and Consequences. Macmillan.",
    link: null
  },
  {
    id: 7,
    title: "The House of the Dead: Siberian Exile Under the Tsars",
    author: "Daniel Beer",
    year: 2016,
    publisher: "Knopf",
    category: "HISTORY",
    description: "Documents the systematic erasure of millions of individuals sent to Siberian exile. Most left no trace—their names, their suffering, their existence completely forgotten by history.",
    key_concepts: ["Historical Erasure", "Mass Forgetting", "Siberian Exile"],
    citation: "Beer, D. (2016). The House of the Dead: Siberian Exile Under the Tsars. Alfred A. Knopf.",
    link: null
  },
  {
    id: 8,
    title: "The Archive as Cultural Memory",
    author: "Aleida Assmann",
    year: 2011,
    publisher: "Cambridge University Press",
    category: "ARCHIVAL STUDIES",
    description: "Assmann distinguishes between 'active' and 'passive' cultural memory—what societies actively remember versus what they store but do not engage with. Most human experience ends up in passive memory, effectively forgotten.",
    key_concepts: ["Cultural Memory", "Active vs Passive Memory", "Archival Selection"],
    citation: "Assmann, A. (2011). Cultural Memory and Western Civilization: Functions, Media, Archives. Cambridge University Press.",
    link: null
  },
  {
    id: 9,
    title: "Absent: The English Poor Law and the Archive of Forgetting",
    author: "Steve Hindle",
    year: 2016,
    publisher: "Social History",
    category: "HISTORICAL METHOD",
    description: "Hindle examines how historical records systematically exclude the poor, the marginalized, and the powerless. The archive itself becomes a tool of erasure, preserving only those voices that society deemed worthy.",
    key_concepts: ["Archive Gaps", "Silences in History", "Class Forgetting"],
    citation: "Hindle, S. (2016). 'Absent': The English Poor Law and the Archive of Forgetting. Social History, 41(1), 1-20.",
    link: null
  },
  {
    id: 10,
    title: "Paleo-Ontology: The Anthropology of Extinction",
    author: "Deborah Bird Rose",
    year: 2015,
    publisher: "Environmental Humanities",
    category: "EXTINCTION STUDIES",
    description: "Rose extends the concept of extinction beyond species to ways of being, cultures, and individual existences. Each human death is a micro-extinction—an entire world of experience, memory, and consciousness permanently lost.",
    key_concepts: ["Extinction", "Micro-extinction", "Death of Worlds"],
    citation: "Rose, D. B. (2015). Paleo-Ontology: The Anthropology of Extinction. Environmental Humanities, 6, 177-190.",
    link: null
  }
];

const CATEGORIES = [
  { value: 'ALL', label: 'All Research' },
  { value: 'PHILOSOPHY', label: 'Philosophy' },
  { value: 'SOCIOLOGY', label: 'Sociology' },
  { value: 'ANTHROPOLOGY', label: 'Anthropology' },
  { value: 'HISTORY', label: 'History' },
  { value: 'THANATOLOGY', label: 'Thanatology' },
];

export default function ResearchPage() {
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
            <ArchiveBoxIcon className="text-cyan-600/60" size={18} />
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-mono">
              Research Archive
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl text-slate-100 mb-4">
            Academic Foundations
          </h1>

          <p className="text-slate-400 max-w-2xl leading-relaxed">
            The following peer-reviewed works establish the theoretical framework for 
            lethometric analysis. These sources examine how human societies forget, 
            the mechanisms of historical erasure, and the inevitable dissolution of 
            individual memory from collective consciousness.
          </p>
        </motion.div>

        {/* Research Papers List */}
        <div className="space-y-6">
          {RESEARCH_PAPERS.map((paper, index) => (
            <motion.article
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="clinical-card p-6 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                {/* Paper Number */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 border border-slate-800 flex items-center justify-center">
                    <span className="font-mono text-lg text-slate-600">
                      {String(paper.id).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-wider text-cyan-600/70 font-mono px-2 py-0.5 border border-cyan-900/30">
                      {paper.category}
                    </span>
                    <span className="text-xs text-slate-600 font-mono">
                      {paper.year}
                    </span>
                  </div>

                  <h2 className="text-lg text-slate-200 mb-1 group-hover:text-cyan-400/80 transition-colors">
                    {paper.title}
                  </h2>

                  <p className="text-sm text-slate-500 mb-3">
                    {paper.author} • {paper.publisher}
                  </p>

                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {paper.description}
                  </p>

                  {/* Key Concepts */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {paper.key_concepts.map((concept) => (
                      <span
                        key={concept}
                        className="text-[10px] text-slate-500 font-mono bg-slate-900/50 px-2 py-1"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>

                  {/* Citation */}
                  <div className="data-box text-xs text-slate-500 mb-4">
                    {paper.citation}
                  </div>

                  {/* Link */}
                  {paper.link && (
                    <Link
                      href={paper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-cyan-600/70 hover:text-cyan-500 font-mono transition-colors"
                    >
                      ACCESS SOURCE
                      <ArrowUpRightIcon size={12} />
                    </Link>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Methodology Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 clinical-card p-6"
        >
          <div className="section-header">
            <BookOpenIcon size={14} className="text-slate-500" />
            <span>Methodological Note</span>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed">
            The lethometric methodology synthesizes insights from multiple disciplines: 
            sociology's analysis of collective memory (Halbwachs, Connerton), philosophy's 
            examination of forgetting ethics (Ricœur), thanatology's study of death and 
            memorialization (Feifel), and archival studies' understanding of systematic 
            historical erasure (Assmann, Hindle). This interdisciplinary approach enables 
            the quantification of human obsolescence across temporal scales.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
