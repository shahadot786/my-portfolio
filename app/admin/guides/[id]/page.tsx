'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  ArrowLeft,
  Bold,
  Code2,
  Eye,
  Heading2,
  Image as ImageIcon,
  Link as LinkIcon,
  Loader,
  PenTool,
  Save,
  Send,
  Table2,
  Workflow,
} from 'lucide-react';
import { GuideMarkdown } from '@/components/guides/GuideMarkdown';
import { guidesClient } from '@/lib/guides/client';
import { estimateReadingTime, slugify } from '@/lib/guides/toc';
import { GuideConflictError, SLUG_PATTERN, type GuideInput } from '@/lib/guides/types';

const guideSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(150),
  slug: z.string().trim().min(1, 'Slug is required').regex(SLUG_PATTERN, 'Use lowercase letters, numbers and dashes'),
  summary: z.string().trim().max(300, 'Keep the summary under 300 characters').default(''),
  tags: z.string().default(''),
  coverImage: z.string().trim().refine((v) => !v || /^https?:\/\//.test(v), 'Use a full http(s) URL').default(''),
  content: z.string().default(''),
});

type GuideFormValues = z.infer<typeof guideSchema>;

const SNIPPETS: { label: string; icon: typeof Bold; before: string; after?: string; placeholder: string }[] = [
  { label: 'Heading', icon: Heading2, before: '\n## ', placeholder: 'Section title' },
  { label: 'Bold', icon: Bold, before: '**', after: '**', placeholder: 'bold text' },
  { label: 'Link', icon: LinkIcon, before: '[', after: '](https://)', placeholder: 'link text' },
  { label: 'Image by URL', icon: ImageIcon, before: '![', after: '](https://)', placeholder: 'alt text' },
  { label: 'Code block', icon: Code2, before: '\n```ts\n', after: '\n```\n', placeholder: 'code' },
  {
    label: 'Table',
    icon: Table2,
    before: '\n| Column | Column |\n|---|---|\n| ',
    after: ' | Value |\n',
    placeholder: 'Value',
  },
  {
    label: 'Mermaid diagram',
    icon: Workflow,
    before: '\n```mermaid\nflowchart LR\n  ',
    after: ' --> B[Next step]\n```\n',
    placeholder: 'A[Start]',
  },
];

export default function GuideEditorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState<'draft' | 'publish' | null>(null);
  const [published, setPublished] = useState(false);
  const [pane, setPane] = useState<'write' | 'preview'>('write');
  const [error, setError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors, isDirty },
  } = useForm<GuideFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(guideSchema) as any,
    defaultValues: { title: '', slug: '', summary: '', tags: '', coverImage: '', content: '' },
  });

  const title = watch('title');
  const content = watch('content');
  const { ref: contentRef, ...contentField } = register('content');
  const readingTime = useMemo(() => estimateReadingTime(content || ''), [content]);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const guide = await guidesClient.get(id);
      if (!guide) {
        router.replace('/admin/guides');
        return;
      }
      setPublished(guide.published);
      reset({
        title: guide.title,
        slug: guide.slug,
        summary: guide.summary,
        tags: guide.tags.join(', '),
        coverImage: guide.coverImage,
        content: guide.content,
      });
      setLoading(false);
    })();
  }, [id, isNew, reset, router]);

  useEffect(() => {
    if (!slugTouched) setValue('slug', slugify(title || ''), { shouldValidate: !!title });
  }, [title, slugTouched, setValue]);

  useEffect(() => {
    if (!isDirty) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [isDirty]);

  const insertSnippet = (snippet: (typeof SNIPPETS)[number]) => {
    const el = textareaRef.current;
    if (!el) return;
    const { selectionStart, selectionEnd } = el;
    const value = getValues('content');
    const selected = value.slice(selectionStart, selectionEnd) || snippet.placeholder;
    const next = value.slice(0, selectionStart) + snippet.before + selected + (snippet.after ?? '') + value.slice(selectionEnd);
    setValue('content', next, { shouldDirty: true });
    requestAnimationFrame(() => {
      el.focus();
      const start = selectionStart + snippet.before.length;
      el.setSelectionRange(start, start + selected.length);
    });
  };

  const save = (publish: boolean) =>
    handleSubmit(async (values) => {
      setSaving(publish ? 'publish' : 'draft');
      setError(null);
      const input: GuideInput = {
        title: values.title,
        slug: values.slug,
        summary: values.summary,
        content: values.content,
        coverImage: values.coverImage,
        tags: values.tags.split(',').map((t) => t.trim()).filter(Boolean),
        published: publish,
      };
      try {
        const guide = isNew ? await guidesClient.create(input) : await guidesClient.update(id, input);
        setPublished(guide.published);
        reset(values);
        if (isNew) router.replace(`/admin/guides/${guide._id}`);
      } catch (err) {
        setError(err instanceof GuideConflictError ? err.message : 'Could not save the guide. Please try again.');
      } finally {
        setSaving(null);
      }
    })();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  const field = 'input-admin';
  const label = 'block text-zinc-400 text-xs font-medium mb-2 uppercase tracking-wider';

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/guides" aria-label="Back to guides" className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">{isNew ? 'New guide' : 'Edit guide'}</h1>
            <p className="text-xs text-zinc-500 mt-0.5 flex items-center gap-2">
              <span
                className={`font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  published ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                {published ? 'Published' : 'Draft'}
              </span>
              {isDirty && <span className="text-amber-500">Unsaved changes</span>}
              <span>{readingTime} min read</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => save(published)}
            disabled={saving !== null}
            className="px-5 py-2.5 rounded-xl border border-zinc-700 text-zinc-200 font-semibold flex items-center gap-2 hover:border-zinc-500 transition-all disabled:opacity-50"
          >
            {saving === 'draft' ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
            {published ? 'Save changes' : 'Save draft'}
          </button>
          <button
            type="button"
            onClick={() => save(!published)}
            disabled={saving !== null}
            className="bg-primary text-black font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {saving === 'publish' ? <Loader size={16} className="animate-spin" /> : <Send size={16} />}
            {published ? 'Unpublish' : 'Publish'}
          </button>
        </div>
      </div>

      {error && (
        <div role="alert" className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 md:grid-cols-2">
        <div>
          <label htmlFor="guide-title" className={label}>Title</label>
          <input id="guide-title" {...register('title')} className={field} placeholder="e.g. Hotel PMS from scratch" />
          {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="guide-slug" className={label}>Slug</label>
          <input
            id="guide-slug"
            {...register('slug', { onChange: () => setSlugTouched(true) })}
            className={`${field} font-mono`}
            placeholder="hotel-pms-from-scratch"
          />
          {errors.slug && <p className="mt-1 text-xs text-red-400">{errors.slug.message}</p>}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="guide-summary" className={label}>Summary</label>
          <textarea id="guide-summary" {...register('summary')} rows={2} className={`${field} resize-none`} placeholder="One or two sentences shown on the card and in search results" />
          {errors.summary && <p className="mt-1 text-xs text-red-400">{errors.summary.message}</p>}
        </div>
        <div>
          <label htmlFor="guide-tags" className={label}>Tags (comma separated)</label>
          <input id="guide-tags" {...register('tags')} className={field} placeholder="architecture, hotel, backend" />
        </div>
        <div>
          <label htmlFor="guide-cover" className={label}>Cover image URL (optional)</label>
          <input id="guide-cover" {...register('coverImage')} className={field} placeholder="https://..." />
          {errors.coverImage && <p className="mt-1 text-xs text-red-400">{errors.coverImage.message}</p>}
        </div>
      </div>

      <div className="flex gap-1 rounded-xl border border-zinc-800 bg-zinc-900/60 p-1 lg:hidden" role="tablist" aria-label="Editor view">
        {(['write', 'preview'] as const).map((p) => (
          <button
            key={p}
            type="button"
            role="tab"
            aria-selected={pane === p}
            onClick={() => setPane(p)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition-all ${
              pane === p ? 'bg-primary text-black' : 'text-zinc-400'
            }`}
          >
            {p === 'write' ? <PenTool size={14} /> : <Eye size={14} />}
            {p === 'write' ? 'Write' : 'Preview'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className={`${pane === 'write' ? 'block' : 'hidden'} lg:block rounded-3xl border border-zinc-800 bg-zinc-900/40`} aria-label="Markdown editor">
          <div className="flex flex-wrap items-center gap-1 border-b border-zinc-800 p-2">
            {SNIPPETS.map((snippet) => (
              <button
                key={snippet.label}
                type="button"
                onClick={() => insertSnippet(snippet)}
                title={snippet.label}
                aria-label={snippet.label}
                className="rounded-lg p-2 text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white"
              >
                <snippet.icon size={16} />
              </button>
            ))}
          </div>
          <textarea
            {...contentField}
            ref={(el) => {
              contentRef(el);
              textareaRef.current = el;
            }}
            spellCheck={false}
            aria-label="Markdown content"
            placeholder="Write your guide in markdown..."
            className="block h-[70vh] w-full resize-y rounded-b-3xl bg-transparent p-5 font-mono text-sm leading-6 text-zinc-200 placeholder:text-zinc-600 focus:outline-none"
          />
        </section>

        <section
          className={`${pane === 'preview' ? 'block' : 'hidden'} lg:block min-w-0 rounded-3xl border border-zinc-800 bg-background`}
          aria-label="Live preview"
        >
          <div className="flex items-center gap-2 border-b border-border px-5 py-3 text-xs font-mono text-muted-foreground">
            <Eye size={14} className="text-primary" /> Live preview
          </div>
          <div className="max-h-[70vh] overflow-y-auto p-5 sm:p-6">
            {content.trim() ? (
              <GuideMarkdown content={content} />
            ) : (
              <p className="text-sm text-muted-foreground">Start typing on the left and the guide renders here.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
