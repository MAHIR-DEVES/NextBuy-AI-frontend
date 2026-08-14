'use client';

import { Download, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

const DownloadOrderButton = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const element = document.getElementById('order-receipt');

    if (!element) {
      console.error('Order receipt element not found');
      return;
    }

    try {
      setIsDownloading(true);

      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        cacheBust: true,
      });

      const image = new Image();

      image.onload = () => {
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [image.width, image.height],
        });

        pdf.addImage(dataUrl, 'PNG', 0, 0, image.width, image.height);

        pdf.save('order-receipt.pdf');

        setIsDownloading(false);
      };

      image.onerror = () => {
        throw new Error('Failed to load generated image');
      };

      image.src = dataUrl;
    } catch (error) {
      console.error('Failed to download order:', error);
      setIsDownloading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isDownloading}
      className="flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isDownloading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Downloading...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Download Order
        </>
      )}
    </button>
  );
};

export default DownloadOrderButton;
