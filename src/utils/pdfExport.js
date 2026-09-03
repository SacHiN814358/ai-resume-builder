import confetti from 'canvas-confetti';

export function exportToPdf() {
  try {
    const handleAfterPrint = () => {
      window.focus();
      document.body.style.pointerEvents = 'auto';
      window.removeEventListener('afterprint', handleAfterPrint);

      // Celebrate with confetti AFTER print dialog closes
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          disableForReducedMotion: true
        });
      }, 100);
    };

    window.addEventListener('afterprint', handleAfterPrint, { once: true });

    // Directly open clean browser print
    window.print();

    // Fallback focus restore
    setTimeout(() => {
      window.focus();
      document.body.style.pointerEvents = 'auto';
    }, 1000);

  } catch (err) {
    console.error('Export error:', err);
    window.print();
    window.focus();
  }
}
