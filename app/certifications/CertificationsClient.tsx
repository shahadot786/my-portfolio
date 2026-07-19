'use client';

import { useState } from 'react';
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
}

export default function CertificationsClient({
  initialCertificates,
  pageTitle,
  pageSubtitle,
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
      <div className="space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4edea3]/10 border border-[#4edea3]/30 text-[#4edea3] font-mono text-xs font-medium">
          <Award size={14} />
          Verified Credentials & Diplomas
        </span>
        <h1 className="text-4xl font-extrabold text-[#dde4dd] tracking-tight sm:text-5xl">
          {pageTitle || 'Certifications & Accreditations'}
        </h1>
        <p className="text-[#bbcabf] text-base max-w-2xl leading-relaxed">
          {pageSubtitle ||
            'Industry-recognized software architecture, mobile engineering, and cloud accreditations earned throughout my career.'}
        </p>
      </div>

      {/* Controls: Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[#3c4a42]/60 pb-6">
        {/* Issuers Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 pt-1 mb-1 scrollbar-thin">
          {issuers.map((issuer) => (
            <button
              key={issuer}
              onClick={() => setSelectedIssuer(issuer)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                selectedIssuer === issuer
                  ? 'bg-[#4edea3] text-[#0e1511] font-bold shadow-md shadow-[#4edea3]/20'
                  : 'bg-[#1a211d] text-[#bbcabf] border border-[#3c4a42] hover:border-[#4edea3] hover:text-[#4edea3]'
              }`}
            >
              {issuer}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search certifications..."
            className="w-full pl-9 pr-4 py-2 bg-[#1a211d] border border-[#3c4a42] rounded-xl text-xs text-[#dde4dd] placeholder-[#94A3B8] focus:outline-none focus:border-[#4edea3] transition-colors font-mono"
          />
        </div>
      </div>

      {/* Certifications Grid */}
      {filteredCertificates.length === 0 ? (
        <div className="text-center py-16 bg-[#10b981]/5 border border-[#3c4a42] rounded-3xl space-y-3">
          <Award size={36} className="mx-auto text-[#94A3B8]" />
          <h3 className="text-lg font-bold text-[#dde4dd]">No Certifications Found</h3>
          <p className="text-xs text-[#94A3B8] font-mono">Try adjusting your search query or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCertificates.map((cert) => (
            <div
              key={cert._id}
              className="glass-card p-6 sm:p-7 flex flex-col justify-between group hover:border-[#4edea3] transition-all duration-300 relative overflow-hidden"
            >
              {/* Header Info */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono text-[#4cd7f6] bg-[#03b5d3]/10 border border-[#4cd7f6]/30 px-3 py-1 rounded-lg">
                    {cert.issuer}
                  </span>
                  {cert.verified !== false && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#4edea3] bg-[#10b981]/10 border border-[#4edea3]/30 px-3 py-1 rounded-full shadow-[0_0_12px_rgba(78,222,163,0.15)]">
                      <ShieldCheck size={14} />
                      Verified
                    </span>
                  )}
                </div>

                <h2 className="text-[#dde4dd] font-bold text-xl leading-snug group-hover:text-[#4edea3] transition-colors mb-2">
                  {cert.name}
                </h2>
              </div>

              {/* Certificate Image Banner */}
              {cert.image && (
                <div className="my-4 relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#3c4a42] bg-[#09100c] group/img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover/img:scale-[1.02]"
                  />
                  <button
                    onClick={() => setActivePreviewImage(cert.image!)}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-mono font-bold backdrop-blur-xs"
                  >
                    <Eye size={18} /> View Full Image
                  </button>
                </div>
              )}

              {/* Footer Meta */}
              <div className="flex items-center justify-between pt-4 border-t border-[#3c4a42] mt-4 text-xs font-mono text-[#94A3B8]">
                <span>Issued: {cert.date}</span>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#4edea3] hover:text-[#6ffbbe] font-bold transition-all hover:scale-105"
                  >
                    Verify Credential <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Modal Preview */}
      {activePreviewImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center">
            <button
              onClick={() => setActivePreviewImage(null)}
              className="absolute -top-12 right-0 p-2 text-white bg-zinc-800/80 hover:bg-zinc-700 rounded-full transition-all"
            >
              <X size={24} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activePreviewImage}
              alt="Certificate Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-[#3c4a42] shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
