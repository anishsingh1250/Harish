'use client'

import React, { useState } from 'react'
import { generateInvoicePDF, processExcelData, loadTemplateConfig, InvoiceData } from '@/lib/pdf-generator'

interface InvoiceGeneratorProps {
  excelData: string[][]
  templateName: string
}

export default function InvoiceGenerator({ excelData, templateName = 'friends_star' }: InvoiceGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedInvoices, setGeneratedInvoices] = useState<string[]>([])

  const generateInvoice = async (rowIndex: number) => {
    setIsGenerating(true)
    
    try {
      // Load template configuration
      const templateConfig = await loadTemplateConfig(templateName)
      
      // Process row data
      const row = excelData[rowIndex]
      if (!row || row.length === 0) {
        throw new Error('No data in selected row')
      }

      // Create invoice data from row
      const invoiceData: InvoiceData = {
        invoice_number: `INV-${Date.now()}`,
        date: new Date().toLocaleDateString('en-GB'),
        client_name: row[1] || 'Unknown Client', // Column B
        po_number: 'Job:# 02544',
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB'),
        items: [{
          date: row[0] || '', // Column A
          description: 'Transportation',
          container: row[2] || '', // Column C
          from_location: row[3] || '', // Column D
          to_location: row[4] || '', // Column E
          quantity: parseFloat(row[6]) || 1, // Column G
          rate: parseFloat(row[5]) || 0, // Column F
          amount: parseFloat(row[12]) || 0, // Column M
          token: row[7] || '', // Column H
          vgm: row[8] || '', // Column I
          washing_due: parseFloat(row[10]) || 0, // Column K
          other_charges: parseFloat(row[11]) || 0 // Column L
        }],
        subtotal: parseFloat(row[12]) || 0,
        vat: (parseFloat(row[12]) || 0) * 0.05,
        total: parseFloat(row[12]) || 0,
        company_info: "Friends Star Transport L.L.C.\nOffice no. S 18, Building I 15, Morocco Cluster\nInternational City\nDubai 78562\nUnited Arab Emirates",
        client_trn: "TRN# 100252885700003"
      }

      // Generate PDF
      const pdfBlob = await generateInvoicePDF(invoiceData, templateConfig, [row])
      
      // Create download URL
      const url = URL.createObjectURL(pdfBlob)
      const filename = `invoice-${invoiceData.invoice_number}-${invoiceData.client_name.replace(/\s+/g, '-')}.png`
      
      // Download the file
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setGeneratedInvoices(prev => [...prev, filename])
      
    } catch (error) {
      console.error('Error generating invoice:', error)
      alert('Error generating invoice: ' + (error as Error).message)
    } finally {
      setIsGenerating(false)
    }
  }

  const generateAllInvoices = async () => {
    setIsGenerating(true)
    
    try {
      for (let i = 1; i < excelData.length; i++) { // Skip header row
        const row = excelData[i]
        if (row && row.some(cell => cell.trim())) { // Only generate for rows with data
          await generateInvoice(i)
          await new Promise(resolve => setTimeout(resolve, 500)) // Small delay between generations
        }
      }
    } catch (error) {
      console.error('Error generating bulk invoices:', error)
      alert('Error generating invoices: ' + (error as Error).message)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="invoice-generator bg-white rounded-lg shadow-lg p-6 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Invoice Generator</h3>
        <div className="flex gap-2">
          <button
            onClick={generateAllInvoices}
            disabled={isGenerating || excelData.length <= 1}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            {isGenerating ? 'Generating...' : 'Generate All Invoices'}
          </button>
        </div>
      </div>

      {/* Template Info */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <div className="text-sm text-gray-600 mb-1">Template: Friends Star Transport</div>
        <div className="text-xs text-gray-500">
          Columns: A=Date, B=Client, C=Container, D=From, E=To, F=Rate, G=Qty, H=Token, I=VDM, J=MEODC, K=Washing, L=Other, M=Total
        </div>
      </div>

      {/* Data Preview */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Data Preview</h4>
        <div className="border rounded-lg overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-1 text-left">Row</th>
                <th className="px-2 py-1 text-left">Date</th>
                <th className="px-2 py-1 text-left">Client</th>
                <th className="px-2 py-1 text-left">From</th>
                <th className="px-2 py-1 text-left">To</th>
                <th className="px-2 py-1 text-left">Total</th>
                <th className="px-2 py-1 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {excelData.slice(1, 11).map((row, index) => {
                const hasData = row.some(cell => cell && cell.trim())
                return (
                  <tr key={index} className={hasData ? 'hover:bg-gray-50' : 'text-gray-400'}>
                    <td className="px-2 py-1">{index + 2}</td>
                    <td className="px-2 py-1">{row[0] || '-'}</td>
                    <td className="px-2 py-1">{row[1] || '-'}</td>
                    <td className="px-2 py-1">{row[3] || '-'}</td>
                    <td className="px-2 py-1">{row[4] || '-'}</td>
                    <td className="px-2 py-1">{row[12] || '-'}</td>
                    <td className="px-2 py-1">
                      <button
                        onClick={() => generateInvoice(index + 1)}
                        disabled={isGenerating || !hasData}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-2 py-1 rounded text-xs transition-colors"
                      >
                        Generate
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generated Invoices */}
      {generatedInvoices.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Generated Invoices ({generatedInvoices.length})</h4>
          <div className="space-y-1">
            {generatedInvoices.slice(-5).map((filename, index) => (
              <div key={index} className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                ✓ {filename}
              </div>
            ))}
            {generatedInvoices.length > 5 && (
              <div className="text-xs text-gray-500">... and {generatedInvoices.length - 5} more</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}