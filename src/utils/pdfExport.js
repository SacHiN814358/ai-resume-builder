import confetti from 'canvas-confetti';

export async function exportToPdf({ elementId = 'resume-export-container', filename = 'Resume.pdf' }) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Export element not found:', elementId);
    window.print();
    return;
  }

  try {
    // Dynamic import to ensure browser compatibility
    const html2pdf = (await import('html2pdf.js')).default;

    const opt = {
      margin: [10, 10, 10, 10], // top, left, bottom, right in mm
      filename: filename.endsWith('.pdf') ? filename : `${filename}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        letterRendering: true,
        logging: false
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    await html2pdf().set(opt).from(element).save();

    // Trigger celebration confetti
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.7 }
    });
  } catch (error) {
    console.warn('html2pdf failed, falling back to window.print():', error);
    window.print();
  }
}
