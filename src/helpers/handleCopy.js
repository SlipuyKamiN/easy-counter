export const handleCopy = async (text, setCopied) => {
  try {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  } catch (err) {
    console.error("Copy failed:", err);
  }
};
