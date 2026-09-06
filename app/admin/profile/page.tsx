"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "@/lib/api-client";
import {
  Loader,
  Save,
  Plus,
  Trash2,
  Globe,
  User as UserIcon,
  ShieldCheck,
  Mail,
  Lock,
  FileText,
  BarChart2,
  Bot,
  Rss,
  Building2,
} from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  avatar: z.string().optional(),
  resumeUrl: z.string().optional(),
  availabilityBadge: z.string().optional(),
  yearsOfExperience: z.string().optional().default("5+"),
  heroBadge: z.string().optional().default("Offline-First Architect"),
  isAvailable: z.boolean().default(true),
  location: z.string().min(1, "Location is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  // Hero stats
  statsTransactions: z.string().optional().default("100K+"),
  statsUsers: z.string().optional().default("10K+"),
  statsClients: z.string().optional().default("Fortune 500"),
  statsClientsDetail: z.string().optional().default("Unilever, BAT, Nestlé, Nagad"),
  // Integrations
  mediumUsername: z.string().optional().default("shrhossain786"),
  // Organization
  currentCompany: z.string().optional().default(""),
  // AI Assistant
  isAiAssistantEnabled: z.boolean().default(true),
  aiWelcomeMessage: z.string().optional().default(""),
  aiStarterPrompts: z.array(z.object({ value: z.string() })).optional().default([]),
  bio: z.array(z.object({ value: z.string() })).min(1, "Bio is required"),
  socialLinks: z.array(
    z.object({
      platform: z.string(),
      url: z.string().url("Invalid URL"),
      icon: z.string(),
    }),
  ),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()),
  }),
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
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(profileSchema) as any,
  });

  const {
    register: registerAccount,
    handleSubmit: handleSubmitAccount,
    reset: resetAccount,
    formState: { isSubmitting: accountSaving },
  } = useForm<AccountFormValues>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const {
    fields: bioFields,
    append: appendBio,
    remove: removeBio,
  } = useFieldArray({
    control,
    name: "bio",
  });

  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const {
    fields: starterPromptFields,
    append: appendStarterPrompt,
    remove: removeStarterPrompt,
  } = useFieldArray({
    control,
    name: "aiStarterPrompts",
  });

  useEffect(() => {
    const fetchProfileAndUser = async () => {
      try {
        const [profileRes, userRes] = await Promise.all([
          api.get("/profile"),
          api.get("/auth/me"),
        ]);

        const profileData = profileRes.data.profile;
        const userData = userRes.data.user;

        reset({
          ...profileData,
          yearsOfExperience: profileData.yearsOfExperience || "5+",
          heroBadge: profileData.heroBadge || "Offline-First Architect",
          statsTransactions: profileData.statsTransactions || "100K+",
          statsUsers: profileData.statsUsers || "10K+",
          statsClients: profileData.statsClients || "Fortune 500",
          statsClientsDetail: profileData.statsClientsDetail || "Unilever, BAT, Nestlé, Nagad",
          mediumUsername: profileData.mediumUsername || "shrhossain786",
          currentCompany: profileData.currentCompany || "",
          isAiAssistantEnabled: profileData.isAiAssistantEnabled !== false,
          aiWelcomeMessage: profileData.aiWelcomeMessage || "",
          aiStarterPrompts: (profileData.aiStarterPrompts || []).map((p: string) => ({ value: p })),
          bio: (profileData.bio || []).map((b: string) => ({ value: b })),
        });

        resetAccount({
          name: userData.name,
          email: userData.email,
          password: "",
        });
      } catch (err) {
        console.error("Failed to fetch profile or user", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileAndUser();
  }, [reset, resetAccount]);

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const onSubmit = async (data: ProfileFormValues) => {
    setSaving(true);
    setMessage(null);
    try {
      const formattedData = {
        ...data,
        bio: data.bio.map((b) => b.value),
        aiStarterPrompts: (data.aiStarterPrompts || []).map((p) => p.value),
      };
      await api.put("/profile", formattedData);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch {
      setMessage({ type: "error", text: "Failed to update profile." });
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success && res.data.url) {
        setValue("avatar", res.data.url);
        setMessage({
          type: "success",
          text: "Avatar uploaded! Click Save Profile at the top to save changes.",
        });
      }
    } catch (err) {
      console.error(err);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorResponse = err as any;
      setMessage({
        type: "error",
        text:
          errorResponse.response?.data?.error ||
          "Failed to upload avatar image.",
      });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingResume(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success && res.data.url) {
        setValue("resumeUrl", res.data.url);
        setMessage({
          type: "success",
          text: "Resume uploaded! Click Save Profile at the top to save changes.",
        });
      }
    } catch (err) {
      console.error(err);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorResponse = err as any;
      setMessage({
        type: "error",
        text:
          errorResponse.response?.data?.error || "Failed to upload resume PDF.",
      });
    } finally {
      setUploadingResume(false);
    }
  };

  const onAccountSubmit = async (data: AccountFormValues) => {
    setMessage(null);
    try {
      const payload: Partial<AccountFormValues> = {
        name: data.name,
        email: data.email,
      };
      if (data.password) payload.password = data.password;

      await api.put("/auth/update-me", payload);
      setMessage({ type: "success", text: "Account settings updated!" });
      resetAccount({ ...data, password: "" });
    } catch {
      setMessage({ type: "error", text: "Failed to update account." });
    }
  };

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader className="animate-spin text-primary" size={32} />
      </div>
    );

  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
          <p className="text-zinc-500 mt-1">
            Manage your personal information and biography.
          </p>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={saving}
          className="bg-primary text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50"
        >
          {saving ? (
            <Loader className="animate-spin" size={18} />
          ) : (
            <Save size={18} />
          )}
          Save Profile
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-sm ${message.type === "success" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}
        >
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
              <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
                Public Name
              </label>
              <input
                {...register("name")}
                className="input-admin"
                placeholder="MD. Shahadot Hossain"
              />
              {errors.name && (
                <p className="text-red-500 text-[10px] mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
                Public Title
              </label>
              <input
                {...register("title")}
                className="input-admin"
                placeholder="Software Engineer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
                Location
              </label>
              <input
                {...register("location")}
                className="input-admin"
                placeholder="Dhaka, Bangladesh"
              />
            </div>
            <div>
              <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
                Contact Email
              </label>
              <input
                {...register("email")}
                className="input-admin"
                placeholder="hello@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
                Contact Phone
              </label>
              <input
                {...register("phone")}
                className="input-admin"
                placeholder="+880-1234-567890"
              />
            </div>
            <div>
              <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
                Years of Experience
              </label>
              <input
                {...register("yearsOfExperience")}
                className="input-admin"
                placeholder="5+"
              />
              <p className="text-[10px] text-zinc-500 mt-1">Controls stats strip, career timeline, and AI responses.</p>
            </div>
          </div>

          {/* Profile Avatar Image & Upload */}
          <div className="p-5 rounded-2xl bg-[#09100c] border border-[#3c4a42] space-y-4">
            <label className="block text-zinc-400 text-xs font-medium uppercase tracking-wider">
              Profile Avatar Image
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Circular Avatar Preview */}
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#4edea3] bg-[#0e1511] flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={watch("avatar") || "/avatar.png"}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                />
                {uploadingAvatar && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Loader className="animate-spin text-[#4edea3]" size={20} />
                  </div>
                )}
              </div>

              {/* URL & Upload Inputs */}
              <div className="flex-1 w-full space-y-3">
                <div>
                  <span className="block text-[11px] font-mono text-zinc-500 mb-1">
                    Image URL
                  </span>
                  <input
                    {...register("avatar")}
                    className="input-admin py-2 text-xs"
                    placeholder="/avatar.png or https://example.com/avatar.jpg"
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#10b981]/15 text-[#4edea3] border border-[#4edea3]/30 rounded-xl font-mono text-xs hover:bg-[#4edea3] hover:text-[#0e1511] transition-all cursor-pointer select-none active:scale-95">
                    <Plus size={14} />
                    Upload Local File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </label>

                  {watch("avatar") !== "/avatar.png" && (
                    <button
                      type="button"
                      onClick={() => setValue("avatar", "/avatar.png")}
                      className="text-zinc-500 hover:text-red-400 text-xs font-mono transition-colors"
                    >
                      Reset to Default
                    </button>
                  )}
                </div>
              </div>
            </div>
            <p className="text-[10px] text-[#94A3B8] leading-normal">
              Accepts PNG, JPG, WEBP, or SVG (max 5MB). Set the profile avatar
              to match your branding. Pre-selects /avatar.png by default.
            </p>
          </div>

          {/* Resume / CV PDF Upload */}
          <div className="p-5 rounded-2xl bg-[#09100c] border border-[#3c4a42] space-y-4">
            <label className="flex items-center gap-2 text-zinc-400 text-xs font-medium uppercase tracking-wider">
              <FileText size={14} className="text-primary" />
              Resume / CV (PDF)
            </label>

            <div className="space-y-3">
              <div>
                <span className="block text-[11px] font-mono text-zinc-500 mb-1">
                  Resume PDF URL
                </span>
                <input
                  {...register("resumeUrl")}
                  className="input-admin py-2 text-xs"
                  placeholder="https://example.com/resume.pdf"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#10b981]/15 text-[#4edea3] border border-[#4edea3]/30 rounded-xl font-mono text-xs hover:bg-[#4edea3] hover:text-[#0e1511] transition-all cursor-pointer select-none active:scale-95">
                  {uploadingResume ? (
                    <Loader className="animate-spin" size={14} />
                  ) : (
                    <Plus size={14} />
                  )}
                  Upload PDF
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleResumeUpload}
                    disabled={uploadingResume}
                    className="hidden"
                  />
                </label>

                {watch("resumeUrl") && (
                  <div className="flex items-center gap-3">
                    <a
                      href={watch("resumeUrl")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4edea3] hover:underline text-xs font-mono"
                    >
                      Preview
                    </a>
                    <button
                      type="button"
                      onClick={() => setValue("resumeUrl", "")}
                      className="text-zinc-500 hover:text-red-400 text-xs font-mono transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
            <p className="text-[10px] text-[#94A3B8] leading-normal">
              Upload a PDF (max 4MB) or paste a hosted PDF URL. This is shown to
              visitors via the &quot;Resume&quot; button on your Hero section.
            </p>
          </div>

          {/* Availability Status Badge Controls */}
          <div className="p-4 rounded-2xl bg-[#09100c] border border-[#3c4a42] space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("isAvailable")}
                id="isAvailable"
                className="w-5 h-5 rounded-lg border-zinc-800 bg-zinc-950 text-emerald-500"
              />
              <label
                htmlFor="isAvailable"
                className="text-sm font-semibold text-white cursor-pointer"
              >
                Display Availability Status Badge on Hero Section
              </label>
            </div>
            <div>
              <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
                Availability Badge Text
              </label>
              <input
                {...register("availabilityBadge")}
                className="input-admin"
                placeholder="Available for new opportunities"
              />
              <p className="text-[11px] text-[#94A3B8] mt-1">
                Customize the pill badge displayed above your name on the
                landing page Hero section.
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-zinc-400 text-xs font-medium uppercase tracking-wider">
                Social Links
              </label>
              <button
                type="button"
                onClick={() =>
                  appendSocial({ platform: "", url: "", icon: "Globe" })
                }
                className="text-primary text-xs flex items-center gap-1 hover:underline"
              >
                <Plus size={14} /> Add Link
              </button>
            </div>
            <div className="space-y-3">
              {socialFields.map((field, index) => (
                <div key={field.id} className="flex gap-3">
                  <input
                    {...register(`socialLinks.${index}.platform`)}
                    className="input-admin w-1/4"
                    placeholder="Platform"
                  />
                  <input
                    {...register(`socialLinks.${index}.url`)}
                    className="input-admin flex-1"
                    placeholder="URL"
                  />
                  <button
                    type="button"
                    onClick={() => removeSocial(index)}
                    className="text-zinc-600 hover:text-red-500 transition-colors"
                  >
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
              onClick={() => appendBio({ value: "" })}
              className="w-full border border-dashed border-zinc-800 rounded-xl py-3 text-zinc-500 text-sm hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Paragraph
            </button>
          </div>

          <div className="pt-6 border-t border-zinc-800">
            <h3 className="text-lg font-bold text-white mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
                  Meta Title
                </label>
                <input
                  {...register("seo.title")}
                  className="input-admin"
                  placeholder="SEO Title"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
                  Meta Description
                </label>
                <textarea
                  {...register("seo.description")}
                  rows={2}
                  className="input-admin resize-none"
                  placeholder="SEO Description"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Stats & Branding Section */}
      <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
          <BarChart2 className="text-primary" size={20} />
          Hero Section & Branding
        </h2>
        <p className="text-zinc-500 text-sm mb-6">Control all values displayed in the homepage stats strip and hero badge.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">Avatar Floating Badge</label>
            <input {...register("heroBadge")} className="input-admin" placeholder="Offline-First Architect" />
            <p className="text-[10px] text-zinc-500 mt-1">Small text floating next to your avatar photo.</p>
          </div>
          <div>
            <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">Daily Transactions Stat</label>
            <input {...register("statsTransactions")} className="input-admin" placeholder="100K+" />
            <p className="text-[10px] text-zinc-500 mt-1">e.g. &quot;100K+&quot; — shown in stats strip on homepage.</p>
          </div>
          <div>
            <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">Active Users Stat</label>
            <input {...register("statsUsers")} className="input-admin" placeholder="10K+" />
            <p className="text-[10px] text-zinc-500 mt-1">e.g. &quot;10K+&quot; — shown in stats strip on homepage.</p>
          </div>
          <div>
            <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">Clients Value</label>
            <input {...register("statsClients")} className="input-admin" placeholder="Fortune 500" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">Clients Detail</label>
            <input {...register("statsClientsDetail")} className="input-admin" placeholder="Unilever, BAT, Nestlé, Nagad" />
            <p className="text-[10px] text-zinc-500 mt-1">Comma-separated client names shown as subtitle under Clients stat.</p>
          </div>
        </div>
      </div>

      {/* AI Assistant Section */}
      <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
          <Bot className="text-primary" size={20} />
          AI Assistant
        </h2>
        <p className="text-zinc-500 text-sm mb-6">Customize your portfolio AI chat widget.</p>

        <div className="space-y-6">
          <div className="flex items-center gap-3 p-4 bg-zinc-950/60 rounded-xl border border-zinc-800">
            <input
              type="checkbox"
              {...register("isAiAssistantEnabled")}
              id="isAiAssistantEnabled"
              className="w-5 h-5 rounded-lg border-zinc-800 bg-zinc-950 text-emerald-500"
            />
            <label htmlFor="isAiAssistantEnabled" className="text-sm font-semibold text-white cursor-pointer">
              Enable AI Assistant Widget sitewide
            </label>
          </div>

          <div>
            <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">Welcome Message</label>
            <textarea
              {...register("aiWelcomeMessage")}
              rows={3}
              className="input-admin resize-none"
              placeholder="Hi! I&apos;m Shahadot&apos;s AI assistant. Ask me anything about his experience, projects, or skills!"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-zinc-400 text-xs font-medium uppercase tracking-wider">Starter Prompt Chips</label>
              <button
                type="button"
                onClick={() => appendStarterPrompt({ value: "" })}
                className="text-primary text-xs flex items-center gap-1 hover:underline"
              >
                <Plus size={14} /> Add Prompt
              </button>
            </div>
            <div className="space-y-2">
              {starterPromptFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <input
                    {...register(`aiStarterPrompts.${index}.value`)}
                    className="input-admin flex-1"
                    placeholder={`e.g. What projects has Shahadot built?`}
                  />
                  <button
                    type="button"
                    onClick={() => removeStarterPrompt(index)}
                    className="text-zinc-600 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-zinc-500 mt-2">Quick-pick buttons shown in the chat widget for common questions.</p>
          </div>
        </div>
      </div>

      {/* Integrations & Organization Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <Rss className="text-primary" size={20} />
            Integrations
          </h2>
          <div>
            <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">Medium Username</label>
            <input {...register("mediumUsername")} className="input-admin" placeholder="shrhossain786" />
            <p className="text-[10px] text-zinc-500 mt-1">Your Medium handle (without @). Controls the Articles RSS feed.</p>
          </div>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <Building2 className="text-primary" size={20} />
            Organization
          </h2>
          <div>
            <label className="block text-zinc-400 text-xs font-medium mb-1.5 uppercase tracking-wider">Current Company</label>
            <input {...register("currentCompany")} className="input-admin" placeholder="HawkEyes Digital Monitoring" />
            <p className="text-[10px] text-zinc-500 mt-1">Used in Google structured data (JSON-LD) for SEO rich results.</p>
          </div>
        </div>
      </div>

      {/* Account Settings Section */}
      <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl max-w-2xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
          <ShieldCheck className="text-primary" size={20} />
          Account Credentials
        </h2>

        <form
          onSubmit={handleSubmitAccount(onAccountSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">
                Login Name
              </label>
              <div className="relative">
                <UserIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                  size={16}
                />
                <input
                  {...registerAccount("name")}
                  className="input-admin pl-10"
                  placeholder="Admin Name"
                />
              </div>
            </div>
            <div>
              <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">
                Login Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                  size={16}
                />
                <input
                  {...registerAccount("email")}
                  className="input-admin pl-10"
                  placeholder="admin@example.com"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-zinc-500 text-[10px] font-bold uppercase mb-2">
              New Password (Leave blank to keep current)
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                size={16}
              />
              <input
                {...registerAccount("password")}
                type="password"
                className="input-admin pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={accountSaving}
              className="bg-white text-black font-bold py-2.5 px-8 rounded-xl flex items-center gap-2 hover:bg-zinc-200 transition-all disabled:opacity-50"
            >
              {accountSaving ? (
                <Loader className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}
              Update Credentials
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
