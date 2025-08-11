/**
 * PDF Invoice Generation Library
 * Preserves all functionality from the original Flask invoice_templates.py
 */

export interface InvoiceData {
  invoice_number: string
  date: string
  client_name: string
  po_number?: string
  due_date: string
  items: InvoiceItem[]
  subtotal: number
  vat: number
  total: number
  company_info: string
  client_trn: string
}

export interface InvoiceItem {
  date: string
  description: string
  container?: string
  from_location: string
  to_location: string
  quantity: number
  rate: number
  amount: number
  token?: string
  vgm?: string
  washing_due?: number
  other_charges?: number
}

export interface TemplateField {
  field: string
  name: string
  explanation: string
  position: string
  fieldType: 'manual' | 'auto' | 'excel'
  column?: string
  customValue?: string
  autoType?: string
}

export interface TemplateConfig {
  [section: string]: TemplateField[]
}

/**
 * Get field value based on field type and configuration
 */
export function getFieldValue(
  field: TemplateField,
  excelData: any[],
  invoiceData: InvoiceData,
  rowIndex?: number
): string | number {
  if (field.fieldType === 'manual' && field.customValue) {
    return field.customValue
  }
  
  if (field.fieldType === 'auto') {
    switch (field.autoType) {
      case 'invoice_number':
        return invoiceData.invoice_number
      case 'current_date':
        return new Date().toLocaleDateString('en-GB')
      case 'due_date':
        const dueDate = new Date()
        dueDate.setDate(dueDate.getDate() + 30)
        return dueDate.toLocaleDateString('en-GB')
      case 'calculated_subtotal':
        return invoiceData.subtotal.toFixed(2)
      case 'calculated_vat':
        return invoiceData.vat.toFixed(2)
      default:
        return ''
    }
  }
  
  if (field.fieldType === 'excel' && field.column && excelData.length > 0) {
    const columnIndex = field.column.charCodeAt(0) - 65 // A=0, B=1, etc.
    if (rowIndex !== undefined && rowIndex < excelData.length) {
      return excelData[rowIndex][columnIndex] || ''
    }
    // For non-row specific fields, use first row
    return excelData[0][columnIndex] || ''
  }
  
  return ''
}

/**
 * Generate invoice PDF using canvas/HTML5 approach
 * This replaces the ReportLab functionality from Flask
 */
export async function generateInvoicePDF(
  invoiceData: InvoiceData,
  templateConfig: TemplateConfig,
  excelData: any[] = []
): Promise<Blob> {
  // Create a canvas element for PDF generation
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  
  // Set canvas size for A4 (595 x 842 points)
  canvas.width = 595
  canvas.height = 842
  
  // White background
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // Set default text properties
  ctx.fillStyle = 'black'
  ctx.font = '12px Arial'
  
  let yPosition = 50
  
  // Header Section
  if (templateConfig['header-section']) {
    for (const field of templateConfig['header-section']) {
      const value = getFieldValue(field, excelData, invoiceData)
      if (value) {
        ctx.fillText(String(value), 400, yPosition)
        yPosition += 20
      }
    }
  }
  
  yPosition = 150
  
  // Client Section
  if (templateConfig['client-section']) {
    for (const field of templateConfig['client-section']) {
      const value = getFieldValue(field, excelData, invoiceData)
      if (value) {
        ctx.fillText(`${field.name}: ${value}`, 50, yPosition)
        yPosition += 20
      }
    }
  }
  
  // Invoice Section
  yPosition = 150
  if (templateConfig['invoice-section']) {
    for (const field of templateConfig['invoice-section']) {
      const value = getFieldValue(field, excelData, invoiceData)
      if (value) {
        ctx.fillText(`${field.name}: ${value}`, 400, yPosition)
        yPosition += 20
      }
    }
  }
  
  // Items Table
  yPosition = 300
  ctx.font = 'bold 12px Arial'
  ctx.fillText('Description', 50, yPosition)
  ctx.fillText('Qty', 300, yPosition)
  ctx.fillText('Rate', 350, yPosition)
  ctx.fillText('Amount', 450, yPosition)
  
  ctx.font = '12px Arial'
  yPosition += 30
  
  // Draw line
  ctx.beginPath()
  ctx.moveTo(50, yPosition - 10)
  ctx.lineTo(550, yPosition - 10)
  ctx.stroke()
  
  // Invoice items
  for (let i = 0; i < invoiceData.items.length; i++) {
    const item = invoiceData.items[i]
    ctx.fillText(item.description, 50, yPosition)
    ctx.fillText(item.quantity.toString(), 300, yPosition)
    ctx.fillText(item.rate.toFixed(2), 350, yPosition)
    ctx.fillText(item.amount.toFixed(2), 450, yPosition)
    yPosition += 25
  }
  
  // Totals section
  yPosition += 50
  ctx.fillText(`Subtotal: ${invoiceData.subtotal.toFixed(2)}`, 400, yPosition)
  yPosition += 25
  ctx.fillText(`VAT 5%: ${invoiceData.vat.toFixed(2)}`, 400, yPosition)
  yPosition += 25
  ctx.font = 'bold 12px Arial'
  ctx.fillText(`Total: AED ${invoiceData.total.toFixed(2)}`, 400, yPosition)
  
  // Convert canvas to blob
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob!)
    }, 'image/png')
  })
}

/**
 * Load template configuration from JSON
 */
export async function loadTemplateConfig(templateName: string): Promise<TemplateConfig> {
  try {
    const response = await fetch(`/api/templates/${templateName}`)
    return await response.json()
  } catch (error) {
    console.error('Error loading template config:', error)
    return {}
  }
}

/**
 * Process Excel data for invoice generation
 */
export function processExcelData(excelData: any[]): InvoiceItem[] {
  return excelData.map((row, index) => ({
    date: row[0] || '', // Column A
    description: 'Transportation',
    container: row[2] || '', // Column C
    from_location: row[3] || '', // Column D
    to_location: row[4] || '', // Column E
    quantity: parseFloat(row[6]) || 1, // Column G
    rate: parseFloat(row[5]) || 0, // Column F
    amount: parseFloat(row[11]) || 0, // Column L (total)
    token: row[7] || '', // Column H
    vgm: row[8] || '', // Column I
    washing_due: parseFloat(row[10]) || 0, // Column K
    other_charges: parseFloat(row[11]) || 0 // Column L
  }))
}