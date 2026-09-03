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

  // Create an isolated clean clone with exact A4 dimensions and NO borders/transforms
  const clone = sourceElement.cloneNode(true);
  clone.style.width = '794px'; // 210mm at 96 DPI
  clone.style.minHeight = '1120px';
  clone.style.margin = '0';
  clone.style.padding = '36px 44px';
  clone.style.border = 'none';
  clone.style.outline = 'none';
  clone.style.boxShadow = 'none';
  clone.style.transform = 'none';
  clone.style.background = '#ffffff';
  clone.style.color = '#111827';
  clone.style.position = 'fixed';
  clone.style.top = '-99999px';
  clone.style.left = '-99999px';
  clone.style.zIndex = '-99999';

  document.body.appendChild(clone);

  const opt = {
    margin: [8, 8, 8, 8],
    filename: cleanFilename,
    image: { type: 'jpeg', quality: 0.98 },
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
