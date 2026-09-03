import confetti from 'canvas-confetti';
import html2pdfModule from 'html2pdf.js';

export async function exportToPdf({ elementId = 'resume-export-container', filename = 'Resume.pdf' }) {
  const sourceElement = document.getElementById(elementId);
  if (!sourceElement) {
    console.error('Export element not found:', elementId);
    window.print();
    return;
  }

  const cleanFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;

  // Create an isolated clean clone with exact A4 dimensions and NO borders/shadows
  const clone = sourceElement.cloneNode(true);
  clone.style.width = '794px'; // Exactly 210mm at 96 DPI
  clone.style.margin = '0';
  clone.style.padding = '0';
  clone.style.border = 'none';
  clone.style.outline = 'none';
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  clone.style.transform = 'none';
  clone.style.backgroundColor = '#ffffff';
  clone.style.color = '#111827';
  clone.style.position = 'fixed';
  clone.style.top = '-99999px';
  clone.style.left = '-99999px';
  clone.style.zIndex = '-99999';

  // Strip all shadows, outlines, and border artifacts from children
  clone.querySelectorAll('*').forEach(el => {
    el.style.boxShadow = 'none';
    el.style.textShadow = 'none';
    el.style.outline = 'none';
    if (el.classList.contains('print-page')) {
      el.style.border = 'none';
      el.style.boxShadow = 'none';
      el.style.padding = '24px 32px';
      el.style.margin = '0';
    }
  });

  document.body.appendChild(clone);

  const opt = {
    margin: 0,
    filename: cleanFilename,
    image: { type: 'jpeg', quality: 0.99 },
    html2canvas: { 
      scale: 2, 
      useCORS: true, 
      letterRendering: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy'] }
  };

  try {
    const fn = typeof html2pdfModule === 'function' ? html2pdfModule : (html2pdfModule?.default || window.html2pdf);
    if (!fn) {
      throw new Error('html2pdf library could not be resolved');
    }
    await fn().set(opt).from(clone).save();

    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });
  } catch (error) {
    console.warn('Direct PDF export error, opening clean print dialog:', error);
    window.print();
  } finally {
    if (document.body.contains(clone)) {
      document.body.removeChild(clone);
    }
  }
}
