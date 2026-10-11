import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { MermaidDiagram } from "./MermaidDiagram";
import styles from "./guide-markdown.module.css";

interface HastNode {
  tagName?: string;
  value?: string;
  properties?: { className?: string[] };
  children?: HastNode[];
}

const nodeText = (node: HastNode): string =>
  node.value ?? (node.children ?? []).map(nodeText).join("");

// Same component serves the public page (server) and the admin live preview (client)
const components: Components = {
  pre({ node, children }) {
    const code = (node as HastNode | undefined)?.children?.[0];
    if (code?.tagName === "code" && code.properties?.className?.includes("language-mermaid")) {
      return <MermaidDiagram chart={nodeText(code)} />;
    }
    return <pre>{children}</pre>;
  },
  a({ href, children }) {
    const external = !!href && /^https?:\/\//.test(href);
    return (
      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  },
  table({ children }) {
    return (
      <div className={styles.tableWrap}>
        <table>{children}</table>
      </div>
    );
  },
  img({ src, alt }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} loading="lazy" />;
  },
};

export function GuideMarkdown({ content }: { content: string }) {
  return (
    <div className={styles.prose}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeHighlight, { detect: false, ignoreMissing: true }]]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
