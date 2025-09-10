"use client";

import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 1 }, // görünür kalsın, sadece çocukları animasyonlansın
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ActivityCountries() {
  return (
    <section
      id="activity-countries"
      className="relative h-[100vh] w-full font-roboto text-white"
      style={{
        backgroundImage: "url('/assets/map.png')", // kendi görsel yolunu buraya koy
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* içerik sol-orta ama biraz sağa kaydırıldı */}
      <div className="absolute top-1/2 -translate-y-1/2 left-[8%] md:left-[12%] lg:left-[15%] max-w-2xl">
        {/* Başlık */}
        <motion.p
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.45 }} // scroll ile göründüğünde tetikler
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-xl md:text-2xl font-bold leading-snug mb-12"
        >
          IGG expands its global presence with production centers in Turkey,
          Serbia and Poland, and its head office in Belgium. Partnering with
          over 250 leading brands across Europe, IGG continues to grow through
          R&D, innovation, and its ability to adapt swiftly to diverse sectors.
        </motion.p>

        {/* İstatistikler */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.35 }}
          className="flex gap-12 text-lg items-center"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-2 pr-8 border-r border-white">
            <em className="text-4xl font-semibold not-italic">20</em>
            <span>Sectors</span>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-2 pr-8 border-r border-white">
            <em className="text-4xl font-semibold not-italic">50</em>
            <span>Countries</span>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <em className="text-4xl font-semibold not-italic">60K</em>
            <span> + Oppurtunities</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
