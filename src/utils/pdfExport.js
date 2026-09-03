import confetti from 'canvas-confetti';

export function exportToPdf() {
  try {
    // Trigger celebration confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      disableForReducedMotion: true
    });

    // Cleanly trigger browser vector PDF print
    const handleAfterPrint = () => {
      window.focus();
      document.body.style.pointerEvents = 'auto';
      window.removeEventListener('afterprint', handleAfterPrint);
    };

    window.addEventListener('afterprint', handleAfterPrint, { once: true });

    // Slight timeout to let confetti start
    setTimeout(() => {
      window.print();
      // Safeguard for browsers that don't trigger afterprint on cancel
      setTimeout(() => {
        window.focus();
        document.body.style.pointerEvents = 'auto';
      }, 500);
    }, 150);

  } catch (err) {
    console.error('Export error:', err);
    window.print();
    window.focus();
  }
}
