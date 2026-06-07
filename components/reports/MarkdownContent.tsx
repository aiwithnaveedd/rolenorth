'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-semibold prose-ul:list-disc prose-ol:list-decimal">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content || "No detailed analysis available."}
      </ReactMarkdown>
    </div>
  );
}