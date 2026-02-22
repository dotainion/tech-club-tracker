import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const Context = createContext();

export const DownloadProvider = ({children}) => {
    const [loading, setLoading] = useState(false);

    const pageRef = useRef();

    const copyComputedStyles = (source) => {
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
        return clone.outerHTML;
    };

    const handleDownload = () =>{
        setLoading(true);
        const styledHTML = copyComputedStyles(pageRef.current);

        const html = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office'
                xmlns:w='urn:schemas-microsoft-com:office:word'
                xmlns='http://www.w3.org/TR/REC-html40'>
            <head><title>Styled Report</title></head>
            <body>${styledHTML}</body>
        </html>
        `;

        const blob = new Blob(["\ufeff", html], { type: "application/msword" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Report.doc";
        link.click();

        URL.revokeObjectURL(link.href);
        setLoading(false);
    };

    const values = {
        loading,
        setPageRef: (ref) => pageRef.current = ref,
        onDownload: () => handleDownload(),
    }

    return (
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
}

export const Downloadable = ({children}) =>{
    const { setPageRef } = useContext(Context);

    const pageRef = useRef();

    useEffect(()=>{
        setPageRef(pageRef.current);
    }, []);

    return(
        <div ref={pageRef}>
            {children}
        </div>
    )
}

export const DownloadButton = ({className, outline, children}) =>{
    const { onDownload } = useContext(Context);

    return(
        <button onClick={onDownload} className={`btn btn-sm btn-${outline ? 'outline-' : ''}dark text-nowrap ${className || ''}`}>
            {children}
        </button>
    )
}

export const DownloadVisibility = ({showOnDownload, hideOnDownload, hidden, children}) =>{
    const { loading } = useContext(Context);

    useEffect(()=>{
        if(showOnDownload && hideOnDownload){
            console.error('Can use one of showOnDownload or hideOnDownload but not both.');
        }
    }, [showOnDownload, hideOnDownload]);
    
    if(loading && hideOnDownload) return null;
    if(loading && showOnDownload && !hidden) return children;
    if(hidden) return null;
    return children;
}
