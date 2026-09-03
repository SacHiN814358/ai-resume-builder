import confetti from 'canvas-confetti';

export async function exportToPdf({ elementId = 'resume-export-container', filename = 'Resume.pdf' }) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Export element not found:', elementId);
    window.print();
    return;
  }

  try {
    // Import html2pdf
    const html2pdfModule = await import('html2pdf.js');
    const html2pdf = html2pdfModule.default || html2pdfModule;

    const opt = {
      margin: 0,
      filename: filename.endsWith('.pdf') ? filename : `${filename}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2.5, 
        useCORS: true, 
        letterRendering: true,
        logging: false,
        backgroundColor: '#ffffff'
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    await html2pdf().set(opt).from(element).save();

    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });
  } catch (error) {
    console.warn('html2pdf direct export failed, triggering clean print:', error);
    window.print();
  }
}
