import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function downloadResumePdf(): Promise<void> {
  try {
    console.log('Starting PDF generation...')
    
    // Create a temporary print stylesheet
    const printStyles = document.createElement('style')
    printStyles.textContent = `
      @media print {
        body * { visibility: hidden; }
        #resume-preview, #resume-preview * { visibility: visible; }
        #resume-preview { position: absolute; left: 0; top: 0; width: 100%; }
        @page { size: A4; margin: 0; }
      }
    `
    document.head.appendChild(printStyles)
    
    // Trigger print dialog
    window.print()
    
    // Clean up after a delay
    setTimeout(() => {
      document.head.removeChild(printStyles)
    }, 1000)
    
    console.log('Print dialog opened')
    
  } catch (error) {
    console.error('PDF generation failed:', error)
    alert('Failed to generate PDF. Please try printing manually.')
  }
}


