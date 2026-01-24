'use client';

import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '@/lib/api-client';
import { Loader, Save, Plus, Trash2, Globe, User as UserIcon, ShieldCheck, Mail, Lock } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  location: z.string().min(1, 'Location is required'),
  email: z.string().email('Invalid email'),
  bio: z.array(z.object({ value: z.string() })).min(1, 'Bio is required'),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string().url('Invalid URL'),
    icon: z.string()
  })),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string())
  })
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface AccountFormValues {
  name: string;
  email: string;
  password?: string;
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  const {
    register: registerAccount,
    handleSubmit: handleSubmitAccount,
    reset: resetAccount,
    formState: { isSubmitting: accountSaving }
  } = useForm<AccountFormValues>({
    defaultValues: { name: '', email: '', password: '' }
  });

  const { fields: bioFields, append: appendBio, remove: removeBio } = useFieldArray({
    control,
    name: "bio"
  });

  const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({
    control,
    name: "socialLinks"
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile');
        const profileData = res.data.profile;
        reset({
          ...profileData,
          bio: profileData.bio.map((b: string) => ({ value: b }))
        });
        resetAccount({
          name: profileData.name,
          email: profileData.email,
          password: ''
        });
      } catch (err) {
        console.error('Failed to fetch profile', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [reset, resetAccount]);

  const onSubmit = async (data: ProfileFormValues) => {
    setSaving(true);
    setMessage(null);
    try {
      const formattedData = {
        ...data,
        bio: data.bio.map(b => b.value)
      };
      await api.put('/profile', formattedData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };

  const onAccountSubmit = async (data: AccountFormValues) => {
    setMessage(null);
    try {
      const payload: Partial<AccountFormValues> = { name: data.name, email: data.email };
      if (data.password) payload.password = data.password;

      await api.put('/auth/update-me', payload);
      setMessage({ type: 'success', text: 'Account settings updated!' });
      resetAccount({ ...data, password: '' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to update account.' });
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader className="animate-spin text-primary" size={32} />
    </div>
  );

  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white text-emerald-500">Profile Settings</h1>
          <p className="text-zinc-500 mt-1">Manage your personal information and biography.</p>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={saving}
          className="bg-primary text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50"
        >
          {saving ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
          Save Profile
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <UserIcon className="text-primary" size={20} />
            Display Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">Public Name</label>
              <input {...register('name')} className="input-admin" placeholder="MD. Shahadot Hossain" />
              {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">Public Title</label>
              <input {...register('title')} className="input-admin" placeholder="Software Engineer" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">Location</label>
              <input {...register('location')} className="input-admin" placeholder="Dhaka, Bangladesh" />
            </div>
            <div>
              <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">Contact Email</label>
              <input {...register('email')} className="input-admin" placeholder="hello@example.com" />
            </div>
          </div>

          {/* Social Links */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-zinc-400 text-xs font-medium uppercase tracking-wider">Social Links</label>
              <button
                type="button"
                onClick={() => appendSocial({ platform: '', url: '', icon: 'Globe' })}
                className="text-primary text-xs flex items-center gap-1 hover:underline"
              >
                <Plus size={14} /> Add Link
              </button>
            </div>
            <div className="space-y-3">
              {socialFields.map((field, index) => (
                <div key={field.id} className="flex gap-3">
                  <input {...register(`socialLinks.${index}.platform`)} className="input-admin w-1/4" placeholder="Platform" />
                  <input {...register(`socialLinks.${index}.url`)} className="input-admin flex-1" placeholder="URL" />
                  <button type="button" onClick={() => removeSocial(index)} className="text-zinc-600 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bio & SEO */}
        <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <Globe className="text-primary" size={20} />
            Biography
          </h2>

          <div className="space-y-4">
            {bioFields.map((field, index) => (
              <div key={field.id} className="relative group">
                <textarea
                  {...register(`bio.${index}.value` as const)}
                  rows={4}
                  className="input-admin resize-none"
                  placeholder={`Paragraph ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeBio(index)}
                  className="absolute top-2 right-2 text-zinc-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendBio({ value: '' })}
              className="w-full border border-dashed border-zinc-800 rounded-xl py-3 text-zinc-500 text-sm hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Paragraph
            </button>
          </div>

          <div className="pt-6 border-t border-zinc-800">
            <h3 className="text-lg font-bold text-white mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">Meta Title</label>
                <input {...register('seo.title')} className="input-admin" placeholder="SEO Title" />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">Meta Description</label>
                <textarea {...register('seo.description')} rows={2} className="input-admin resize-none" placeholder="SEO Description" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings Section */}
      <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl max-w-2xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
          <ShieldCheck className="text-primary" size={20} />
          Account Credentials
        </h2>

        <form onSubmit={handleSubmitAccount(onAccountSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Login Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <input {...registerAccount('name')} className="input-admin pl-10" placeholder="Admin Name" />
              </div>
            </div>
            <div>
              <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">Login Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <input {...registerAccount('email')} className="input-admin pl-10" placeholder="admin@example.com" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">New Password (Leave blank to keep current)</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
              <input {...registerAccount('password')} type="password" className="input-admin pl-10" placeholder="••••••••" />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={accountSaving}
              className="bg-white text-black font-bold py-2.5 px-8 rounded-xl flex items-center gap-2 hover:bg-zinc-200 transition-all disabled:opacity-50"
            >
              {accountSaving ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
              Update Credentials
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
