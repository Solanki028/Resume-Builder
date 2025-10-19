// src/ui/components/pdf.ts

import jsPDF from 'jspdf'

export async function downloadResumePdf(): Promise<void> {
  try {
    console.log('Starting PDF generation with jsPDF...')
    
    // 1. Get the HTML element to print
    const element = document.getElementById('resume-preview')
    if (!element) {
      throw new Error('Resume preview element not found')
    }

    // 2. Create a new jsPDF instance (A4 size)
    // A4 dimensions in mm: 210 x 297
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    // 3. Use the .html() method to render the element.
    // This method is far better at preserving links than window.print()
    // or html2canvas.
    await doc.html(element, {
      callback: function (doc) {
        // 4. Save the PDF
        doc.save('resume.pdf')
        console.log('PDF generation complete.')
      },
      x: 0,
      y: 0,
      width: 210, // A4 width in mm
      windowWidth: element.scrollWidth, // Use the element's full rendered width
      autoPaging: 'text', // Handle content that flows past one page
    })

  } catch (error) {
    console.error('PDF generation failed:', error)
    alert('Failed to generate PDF. Please try again.')
  }
}