// PDF generation utility using HTML to PDF conversion
export async function generatePDF(
  elementId: string,
  filename: string = 'resume.pdf'
) {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Get HTML2PDF library dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';

    return new Promise((resolve, reject) => {
      script.onload = () => {
        try {
          const opt = {
            margin: 10,
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
          };

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).html2pdf().set(opt).from(element).save();
          resolve(true);
        } catch (error) {
          reject(error);
        }
      };

      script.onerror = () => {
        reject(new Error('Failed to load PDF library'));
      };

      document.head.appendChild(script);
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  }
}

// Alternative: Using jsPDF + html2canvas (simpler, more reliable)
export async function generatePDFSimple(
  elementId: string,
  filename: string = 'resume.pdf'
) {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Dynamically load jsPDF
    const { jsPDF } = await import('jspdf');
    const html2canvas = (await import('html2canvas')).default;

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10;

    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight - 20;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight + 10;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  }
}
