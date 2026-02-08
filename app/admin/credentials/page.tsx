'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/api-client';
import { Loader, Plus, Trash2, Edit2, X, Check, GraduationCap, Award, ExternalLink } from 'lucide-react';

const educationSchema = z.object({
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  period: z.string().min(1, 'Period is required'),
  location: z.string().optional(),
  highlights: z.array(z.string()),
  order: z.number(),
});

const certificateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  date: z.string().min(1, 'Date is required'),
  url: z.string().optional(),
  image: z.string().optional(),
  verified: z.boolean(),
  order: z.number(),
});

type EducationFormValues = z.infer<typeof educationSchema>;
type CertificateFormValues = z.infer<typeof certificateSchema>;

interface IEducation extends EducationFormValues {
  _id: string;
}

interface ICertificate extends CertificateFormValues {
  _id: string;
}

export default function AdminCredentialsPage() {
  const [education, setEducation] = useState<IEducation[]>([]);
  const [certificates, setCertificates] = useState<ICertificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const eduForm = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: { highlights: [], order: 0 }
  });

  const certForm = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateSchema),
    defaultValues: { verified: false, order: 0 }
  });

  const fetchData = async () => {
    try {
      const [eduRes, certRes] = await Promise.all([
        api.get('/education'),
        api.get('/certificates')
      ]);
      setEducation(eduRes.data.education);
      setCertificates(certRes.data.certificates);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onEduSubmit = async (data: EducationFormValues) => {
    setSubmitting(true);
    try {
      if (editingId) {
        await api.put(`/education/${editingId}`, data);
      } else {
        await api.post('/education', data);
      }
      setIsEduModalOpen(false);
      fetchData();
      eduForm.reset();
      setEditingId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const onCertSubmit = async (data: CertificateFormValues) => {
    setSubmitting(true);
    try {
      if (editingId) {
        await api.put(`/certificates/${editingId}`, data);
      } else {
        await api.post('/certificates', data);
      }
      setIsCertModalOpen(false);
      fetchData();
      certForm.reset();
      setEditingId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (type: 'education' | 'certificates', id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.delete(`/${type}/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return null;

  return (
    <div className="space-y-12 pb-20">
      {/* Education Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <GraduationCap className="text-emerald-500" />
              Education
            </h1>
            <p className="text-zinc-500 mt-1">Your academic background and studies.</p>
          </div>
          <button
            onClick={() => {
              setEditingId(null);
              eduForm.reset({ highlights: [], order: 0 });
              setIsEduModalOpen(true);
            }}
            className="bg-zinc-900 text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-zinc-800 transition-all border border-zinc-800"
          >
            <Plus size={18} />
            Add Education
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {education.map((edu) => (
            <div key={edu._id} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl flex items-center justify-between group hover:border-zinc-700 transition-all">
              <div>
                <h3 className="text-white font-bold text-lg">{edu.degree}</h3>
                <p className="text-zinc-500 text-sm">{edu.institution} • {edu.period}</p>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button
                  onClick={() => {
                    setEditingId(edu._id);
                    eduForm.reset(edu);
                    setIsEduModalOpen(true);
                  }}
                  className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <Edit2 size={18} />
                </button>
                <button onClick={() => handleDelete('education', edu._id)} className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certificates Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Award className="text-amber-500" />
              Certificates
            </h1>
            <p className="text-zinc-500 mt-1">Professional certifications and verified credentials.</p>
          </div>
          <button
            onClick={() => {
              setEditingId(null);
              certForm.reset({ verified: false, order: 0 });
              setIsCertModalOpen(true);
            }}
            className="bg-zinc-900 text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-zinc-800 transition-all border border-zinc-800"
          >
            <Plus size={18} />
            Add Certificate
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div key={cert._id} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl group hover:border-zinc-700 transition-all space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-bold">{cert.name}</h3>
                    {cert.verified && <Check size={14} className="text-emerald-500" />}
                  </div>
                  <p className="text-zinc-500 text-sm">{cert.issuer} • {cert.date}</p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={() => {
                      setEditingId(cert._id);
                      certForm.reset(cert);
                      setIsCertModalOpen(true);
                    }}
                    className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete('certificates', cert._id)} className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {cert.url && (
                <a href={cert.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs text-primary hover:underline">
                  <ExternalLink size={12} />
                  Verify Credential
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Education Modal */}
      {isEduModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{editingId ? 'Edit Education' : 'Add Education'}</h2>
              <button onClick={() => setIsEduModalOpen(false)} className="text-zinc-500 hover:text-white"><X size={24} /></button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Institution</label>
                <input {...eduForm.register('institution')} className="input-admin" placeholder="University name" />
              </div>
              <div>
                <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Degree / Qualification</label>
                <input {...eduForm.register('degree')} className="input-admin" placeholder="B.Sc in Computer Science" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Period</label>
                  <input {...eduForm.register('period')} className="input-admin" placeholder="2017 - 2020" />
                </div>
                <div>
                  <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Location</label>
                  <input {...eduForm.register('location')} className="input-admin" placeholder="City, Country" />
                </div>
              </div>
            </div>
            <div className="p-6 bg-zinc-800/50 border-t border-zinc-800 flex justify-end gap-3">
              <button onClick={() => setIsEduModalOpen(false)} className="px-6 py-2.5 rounded-xl text-zinc-400 font-bold">Cancel</button>
              <button onClick={eduForm.handleSubmit(onEduSubmit)} disabled={submitting} className="bg-primary text-black font-bold py-2.5 px-8 rounded-xl flex items-center gap-2">
                {submitting ? <Loader className="animate-spin" size={18} /> : <Check size={18} />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{editingId ? 'Edit Certificate' : 'Add Certificate'}</h2>
              <button onClick={() => setIsCertModalOpen(false)} className="text-zinc-500 hover:text-white"><X size={24} /></button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Certificate Name</label>
                <input {...certForm.register('name')} className="input-admin" placeholder="Introduction to X" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Issuer</label>
                  <input {...certForm.register('issuer')} className="input-admin" placeholder="Coursera / Udemy" />
                </div>
                <div>
                  <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Date</label>
                  <input {...certForm.register('date')} className="input-admin" placeholder="Jan 2024" />
                </div>
              </div>
              <div>
                <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Image URL (Optional)</label>
                <input {...certForm.register('image')} className="input-admin" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Verification URL</label>
                <input {...certForm.register('url')} className="input-admin" placeholder="https://..." />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" {...certForm.register('verified')} id="cert-verified" className="w-5 h-5 rounded-lg border-zinc-800 bg-zinc-950 text-emerald-500" />
                <label htmlFor="cert-verified" className="text-sm text-zinc-400">Verified Credential</label>
              </div>
            </div>
            <div className="p-6 bg-zinc-800/50 border-t border-zinc-800 flex justify-end gap-3">
              <button onClick={() => setIsCertModalOpen(false)} className="px-6 py-2.5 rounded-xl text-zinc-400 font-bold">Cancel</button>
              <button onClick={certForm.handleSubmit(onCertSubmit)} disabled={submitting} className="bg-primary text-black font-bold py-2.5 px-8 rounded-xl flex items-center gap-2">
                {submitting ? <Loader className="animate-spin" size={18} /> : <Check size={18} />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
