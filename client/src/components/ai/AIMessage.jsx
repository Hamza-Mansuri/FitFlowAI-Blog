import { motion } from "framer-motion";

function AIMessage({ message }) {
  const isUser = message.sender === "user";

  // Light-weight regex Markdown parser
  const renderMarkdown = (text) => {
    if (!text) return "";
    
    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Headings (e.g. ### Heading)
    html = html.replace(/^### (.*?)$/gm, '<h4 class="text-sm font-extrabold text-white tracking-tight mt-3 mb-1.5">$1</h4>');
    html = html.replace(/^## (.*?)$/gm, '<h3 class="text-base font-extrabold text-white tracking-tight mt-4 mb-2">$1</h3>');

    // Bold text (e.g. **bold**)
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');

    // Bullet lists (e.g. * Item)
    html = html.replace(/^\* (.*?)$/gm, '<li class="ml-4 list-disc text-xs sm:text-sm text-slate-300">$1</li>');
    html = html.replace(/^- (.*?)$/gm, '<li class="ml-4 list-disc text-xs sm:text-sm text-slate-300">$1</li>');
    
    // Wrap lists in ul
    html = html.replace(/(<li.*?>.*?<\/li>)/gs, '<ul class="space-y-1 my-2">$1</ul>');
    // Fix duplicate nested uls created by regex
    html = html.replace(/<\/ul>\s*<ul.*?>/g, "");

    // Inline code (e.g. `code`)
    html = html.replace(/`(.*?)`/g, '<code class="bg-slate-800 dark:bg-slate-900 text-emerald-400 px-1.5 py-0.5 rounded font-mono text-xs">$1</code>');

    // Links (e.g. [text](url))
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-emerald-400 hover:underline">$1</a>');

    // Newlines to br
    html = html.replace(/\n/g, "<br />");

    return <div dangerouslySetInnerHTML={{ __html: html }} className="space-y-2 text-xs sm:text-sm leading-relaxed" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[82%] px-4 py-3 rounded-2xl border text-slate-200 ${
          isUser
            ? "bg-gradient-to-r from-emerald-500 to-green-600 text-slate-950 border-emerald-400/20 rounded-tr-none font-medium"
            : "bg-slate-900/60 dark:bg-slate-900 border-slate-200/10 rounded-tl-none font-light"
        }`}
      >
        {isUser ? (
          <p className="text-slate-950 font-semibold break-words whitespace-pre-line text-xs sm:text-sm">
            {message.text}
          </p>
        ) : (
          renderMarkdown(message.text)
        )}
      </div>
    </motion.div>
  );
}

export default AIMessage;
