import { useEffect, useState } from "react";

import clsx from "clsx";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

import conf from "../../conf/conf";

// Rich text editor with automatic light/dark theme sync
function RTE({ name, control, label, error }) {
  const [isDark, setIsDark] = useState(false);

  // Observe document class changes to sync editor theme
  useEffect(() => {
    const checkTheme = () => {
      const lightMode = document.documentElement.classList.contains("light");
      setIsDark(!lightMode);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="mb-2 block text-sm font-medium text-[var(--color-text)]">{label}</label>
      )}

      {/* Editor Wrapper */}
      <div
        className={clsx(
          "overflow-hidden rounded-2xl border",
          "bg-[var(--color-card)]",
          "shadow-sm transition-colors duration-200",
          error ? "border-red-500" : "border-[var(--color-border)]",
        )}
      >
        <Controller
          name={name || "content"}
          control={control}
          rules={{
            validate: (value) => {
              const plainText = value?.replace(/<[^>]*>/g, "").trim();
              return plainText?.length > 0 || "Content is required";
            },
          }}
          render={({ field }) => (
            <Editor
              key={isDark ? "dark" : "light"}
              apiKey={conf.tinymceApiKey}
              value={field.value}
              onEditorChange={field.onChange}
              init={{
                // Editor Layout
                height: 520,
                menubar: true,
                branding: false,
                resize: true,
                focus_ring: false,

                // Editor Theme
                skin: isDark ? "oxide-dark" : "oxide",
                content_css: isDark ? "dark" : "default",

                // Enabled Plugins
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],

                // Toolbar Layout
                toolbar:
                  "undo redo | blocks | bold italic underline forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image media link | removeformat | code fullscreen help",

                // Editor Content Styles
                content_style: `
                  body {
                    background: ${isDark ? "#1e293b" : "#ffffff"};
                    color: ${isDark ? "#f8fafc" : "#0f172a"};
                    font-family: Inter, system-ui, sans-serif;
                    font-size: 16px;
                    line-height: 1.5;
                    padding: 18px;
                  }

                  h1, h2, h3, h4, h5, h6 {
                    color: ${isDark ? "#ffffff" : "#0f172a"};
                  }

                  p {
                    margin-bottom: 1rem;
                  }

                  img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 14px;
                  }

                  a {
                    color: #3b82f6;
                  }

                  blockquote {
                    margin-left: 0;
                    border-left: 4px solid #3b82f6;
                    padding-left: 16px;
                    color: ${isDark ? "#cbd5e1" : "#475569"};
                  }

                  code {
                    background: ${isDark ? "#0f172a" : "#f1f5f9"};
                    padding: 2px 6px;
                    border-radius: 6px;
                  }
                `,

                // Remove default TinyMCE border
                setup: (editor) => {
                  editor.on("init", () => {
                    const container = editor.getContainer();

                    if (container) {
                      container.style.border = "none";
                      container.style.borderRadius = "0";
                      container.style.overflow = "hidden";
                      container.style.background = isDark ? "#1e293b" : "#ffffff";
                    }
                  });
                },
              }}
            />
          )}
        />
      </div>

      {/* Error Message */}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default RTE;
