'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, Search, Eye, X } from 'lucide-react';

export interface CertificateItem {
  _id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  image?: string;
  verified?: boolean;
  order?: number;
}

interface CertificationsClientProps {
  initialCertificates: CertificateItem[];
  pageTitle?: string;
  pageSubtitle?: string;
  pageBadge?: string;
}

export default function CertificationsClient({
  initialCertificates,
  pageTitle,
  pageSubtitle,
  pageBadge,
}: CertificationsClientProps) {
  const [selectedIssuer, setSelectedIssuer] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePreviewImage, setActivePreviewImage] = useState<string | null>(null);

  // Extract unique issuers
  const issuers = ['All', ...Array.from(new Set(initialCertificates.map((c) => c.issuer))).filter(Boolean)];

  const filteredCertificates = initialCertificates.filter((cert) => {
    const matchesIssuer = selectedIssuer === 'All' || cert.issuer === selectedIssuer;
    const matchesSearch =
      cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIssuer && matchesSearch;
  });

  return (
    <div className="container-custom py-8 space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-3"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-medium backdrop-blur-md">
          <Award size={14} />
          {pageBadge || 'Verified Credentials & Diplomas'}
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          {pageTitle || 'Certifications & Accreditations'}
        </h1>
        <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
          {pageSubtitle ||
            'Industry-recognized software architecture, mobile engineering, and cloud accreditations earned throughout my career.'}
        </p>
      </motion.div>

      {/* Controls: Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-border pb-6">
        {/* Issuers Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {issuers.map((issuer) => (
            <button
              key={issuer}
              onClick={() => setSelectedIssuer(issuer)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                selectedIssuer === issuer
                  ? 'bg-primary text-primary-foreground font-bold shadow-sm shadow-primary/20'
                  : 'bg-card text-muted-foreground border border-border hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {issuer}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search certifications..."
            className="w-full pl-9 pr-4 py-2 bg-card/60 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-mono"
          />
        </div>
      </div>

      {/* Certifications Grid */}
      {filteredCertificates.length === 0 ? (
        <div className="text-center py-16 bg-card/40 border border-border rounded-3xl space-y-3">
          <Award size={36} className="mx-auto text-muted-foreground" />
          <h3 className="text-lg font-bold text-foreground">No Certifications Found</h3>
          <p className="text-xs text-muted-foreground font-mono">Try adjusting your search query or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCertificates.map((cert) => (
              <motion.div
                key={cert._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono text-secondary bg-secondary/10 border border-secondary/30 px-3 py-1 rounded-xl">
                      {cert.issuer}
                    </span>
                    {cert.verified !== false && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-primary bg-primary/10 border border-primary/30 px-3 py-1 rounded-full">
                        <ShieldCheck size={14} />
                        Verified
                      </span>
                    )}
                  </div>

                  <h2 className="text-foreground font-bold text-lg sm:text-xl leading-snug group-hover:text-primary transition-colors mb-3">
                    {cert.name}
                  </h2>
                </div>

                {/* Certificate Image Banner */}
                {cert.image && (
                  <div className="my-4 relative w-full h-56 sm:h-64 rounded-xl overflow-hidden border border-border bg-card group/img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover/img:scale-[1.02]"
                    />
                    <button
                      onClick={() => setActivePreviewImage(cert.image!)}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-mono font-bold backdrop-blur-xs"
                    >
                      <Eye size={16} /> View Full Image
                    </button>
                  </div>
                )}

                {/* Footer Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-border mt-3 text-xs font-mono text-muted-foreground">
                  <span>Issued: {cert.date}</span>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline font-semibold transition-all"
                    >
                      Verify Credential <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Image Modal Preview */}
      {activePreviewImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center">
            <button
              onClick={() => setActivePreviewImage(null)}
              className="absolute -top-12 right-0 p-2 text-white bg-card/80 hover:bg-card rounded-full border border-border transition-all"
            >
              <X size={20} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activePreviewImage}
              alt="Certificate Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-border shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
