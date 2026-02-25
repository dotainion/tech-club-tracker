import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { PageHeaderItem } from "../components/PageHeader";

const Context = createContext();

export const DownloadProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const pageRef = useRef();

  // Clone DOM and copy all computed styles
  const cloneWithInlineStyles = (source) => {
    const clone = source.cloneNode(true);

    const applyStyles = (src, target) => {
      const computed = window.getComputedStyle(src);
      for (let i = 0; i < computed.length; i++) {
        const prop = computed[i];
        target.style[prop] = computed.getPropertyValue(prop);
      }
      Array.from(src.children).forEach((child, idx) => {
        applyStyles(child, target.children[idx]);
      });
    };

    applyStyles(source, clone);
    return clone;
  };

  // Normalize rows/columns for Word export
  const normalizeForWord = (clone) => {
    const rows = clone.querySelectorAll(".row");
    rows.forEach(row => {
      // Set flex layout for row
      row.style.display = "flex";
      row.style.flexWrap = "wrap";
      row.style.marginLeft = "0";  // remove negative margins if present
      row.style.marginRight = "0";

      Array.from(row.children).forEach(child => {
        // Detect col-* classes
        const colClass = Array.from(child.classList).find(c => c.startsWith("col-"));
        if (colClass) {
          const parts = colClass.split("-");
          const colNum = parseInt(parts[1], 10);
          if (!isNaN(colNum)) {
            child.style.width = `${(colNum / 12) * 100}%`;
          }
          child.style.boxSizing = "border-box"; // include padding in width
        }
      });
    });

    return clone.outerHTML;
  };

  const handleDownload = () => {
    setLoading(true);

    setTimeout(() => {
      const cloned = cloneWithInlineStyles(pageRef.current);
      const normalizedHTML = normalizeForWord(cloned);

      const html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office'
            xmlns:w='urn:schemas-microsoft-com:office:word'
            xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <title>Styled Report</title>
          <style>
            body { margin:0; padding:0; box-sizing:border-box; }
            .page-wrapper {
              padding: 1in;
              margin: 0 auto;
              box-sizing: border-box;
              max-width: 624px; /* safe printable width for A4 */
              overflow-x: visible;
            }
            * { box-sizing: border-box; max-width: 100%; }
          </style>
        </head>
        <body>
          <div class="page-wrapper">
            ${normalizedHTML}
          </div>
        </body>
      </html>
      `;

      const blob = new Blob(["\ufeff", html], { type: "application/msword" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Report.doc";
      link.click();
      URL.revokeObjectURL(link.href);

      setTimeout(() => setLoading(false), 500);
    }, 0);
  };

  return (
    <Context.Provider
      value={{
        loading,
        setPageRef: (ref) => (pageRef.current = ref),
        onDownload: handleDownload,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// ----- Downloadable Container -----
export const Downloadable = ({ children }) => {
  const { setPageRef } = useContext(Context);
  const pageRef = useRef();

  useEffect(() => {
    setPageRef(pageRef.current);
  }, []);

  return (
    <div ref={pageRef} style={{ overflowX: "visible" }}>
      {children}
    </div>
  );
};

// ----- Download Button -----
export const DownloadButton = () => {
  const { loading, onDownload } = useContext(Context);
  return (
    <PageHeaderItem
      onClick={onDownload}
      loading={loading}
      icon="download"
      title="Download"
    />
  );
};

// ----- DownloadVisibility -----
export const DownloadVisibility = ({ showOnDownload, hideOnDownload, hidden, children }) => {
  const { loading } = useContext(Context);

  useEffect(() => {
    if (showOnDownload && hideOnDownload) {
      console.error("Use either showOnDownload or hideOnDownload, not both.");
    }
  }, [showOnDownload, hideOnDownload]);

  if (loading) {
    if (hideOnDownload) return null;
    if (showOnDownload) return children;
    return children;
  }

  return hidden ? null : children;
};