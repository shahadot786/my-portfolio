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
} from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  avatar: z.string().optional(),
  availabilityBadge: z.string().optional(),
  isAvailable: z.boolean().default(true),
  location: z.string().min(1, "Location is required"),
  email: z.string().email("Invalid email"),
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
          bio: profileData.bio.map((b: string) => ({ value: b })),
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

  const onSubmit = async (data: ProfileFormValues) => {
    setSaving(true);
    setMessage(null);
    try {
      const formattedData = {
        ...data,
        bio: data.bio.map((b) => b.value),
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
        setMessage({ type: "success", text: "Avatar uploaded! Click Save Profile at the top to save changes." });
      }
    } catch (err) {
      console.error(err);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorResponse = err as any;
      setMessage({
        type: "error",
        text: errorResponse.response?.data?.error || "Failed to upload avatar image."
      });
    } finally {
      setUploadingAvatar(false);
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
          <h1 className="text-3xl font-bold text-white text-emerald-500">
            Profile Settings
          </h1>
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
              Accepts PNG, JPG, WEBP, or SVG (max 5MB). Set the profile avatar to match your branding. Pre-selects /avatar.png by default.
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
              <label htmlFor="isAvailable" className="text-sm font-semibold text-white cursor-pointer">
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
                Customize the pill badge displayed above your name on the landing page Hero section.
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
