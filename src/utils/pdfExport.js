import confetti from 'canvas-confetti';
import html2pdf from 'html2pdf.js';

export async function exportToPdf({ elementId = 'resume-export-container', filename = 'Resume.pdf' }) {
  const sourceElement = document.getElementById(elementId);
  if (!sourceElement) {
    console.error('Export element not found:', elementId);
    return;
  }

  // Create an off-screen clone with exact A4 dimensions and NO CSS transforms (scale)
  const clone = sourceElement.cloneNode(true);
  clone.style.width = '794px'; // Exact A4 width at 96 DPI
  clone.style.minHeight = '1123px';
  clone.style.margin = '0';
  clone.style.padding = '0';
  clone.style.transform = 'none';
  clone.style.boxShadow = 'none';
  clone.style.background = '#ffffff';
  clone.style.color = '#000000';
  clone.style.position = 'fixed';
  clone.style.top = '-99999px';
  clone.style.left = '-99999px';
  clone.style.zIndex = '-99999';

  document.body.appendChild(clone);

  const cleanFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;

  const opt = {
    margin: [6, 6, 6, 6], // Clean 6mm margins
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
    await html2pdf().set(opt).from(clone).save();

    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });
  } catch (error) {
    console.error('PDF Generation error:', error);
    // Fallback print only if html2pdf fails
    window.print();
  } finally {
    if (document.body.contains(clone)) {
      document.body.removeChild(clone);
    }
  }
}
