'use client'

import React, { useState, useEffect, useCallback } from 'react'

interface ExcelCell {
  value: string
  formula?: string
}

interface ExcelSpreadsheetProps {
  onDataChange?: (data: string[][]) => void
  initialData?: string[][]
}

export default function ExcelSpreadsheet({ onDataChange, initialData }: ExcelSpreadsheetProps) {
  const [data, setData] = useState<ExcelCell[][]>(() => {
    // Initialize with 100 rows and 26 columns (A-Z)
    const rows = 100
    const cols = 26
    const initialGrid: ExcelCell[][] = []
    
    for (let row = 0; row < rows; row++) {
      initialGrid[row] = []
      for (let col = 0; col < cols; col++) {
        const value = initialData?.[row]?.[col] || ''
        initialGrid[row][col] = { value }
      }
    }
    
    return initialGrid
  })
  
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 })
  const [editingCell, setEditingCell] = useState<{ row: number, col: number } | null>(null)
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 })
  const [clipboard, setClipboard] = useState<ExcelCell[][]>([])

  // Convert column index to letter (0 = A, 1 = B, etc.)
  const getColumnLabel = (col: number) => String.fromCharCode(65 + col)
  
  // Handle cell value changes
  const updateCell = useCallback((row: number, col: number, value: string) => {
    setData(prevData => {
      const newData = [...prevData]
      newData[row] = [...newData[row]]
      newData[row][col] = { value }
      
      // Notify parent component of data changes
      if (onDataChange) {
        const stringData = newData.map(row => row.map(cell => cell.value))
        onDataChange(stringData)
      }
      
      return newData
    })
  }, [onDataChange])

  // Copy functionality
  const copySelection = useCallback(() => {
    const { row, col } = selectedCell
    setClipboard([[data[row][col]]])
  }, [selectedCell, data])

  // Cut functionality
  const cutSelection = useCallback(() => {
    const { row, col } = selectedCell
    setClipboard([[data[row][col]]])
    updateCell(row, col, '')
  }, [selectedCell, data, updateCell])

  // Paste functionality
  const pasteSelection = useCallback(() => {
    if (clipboard.length === 0) return
    
    const { row, col } = selectedCell
    const cellValue = clipboard[0][0]?.value || ''
    updateCell(row, col, cellValue)
  }, [selectedCell, clipboard, updateCell])

  // Insert row
  const insertRow = useCallback(() => {
    const { row } = selectedCell
    setData(prevData => {
      const newData = [...prevData]
      const newRow = Array(26).fill(null).map(() => ({ value: '' }))
      newData.splice(row, 0, newRow)
      return newData
    })
  }, [selectedCell])

  // Delete row
  const deleteRow = useCallback(() => {
    const { row } = selectedCell
    if (data.length > 1) {
      setData(prevData => {
        const newData = [...prevData]
        newData.splice(row, 1)
        return newData
      })
    }
  }, [selectedCell, data.length])

  // Insert column
  const insertColumn = useCallback(() => {
    const { col } = selectedCell
    setData(prevData => {
      return prevData.map(row => {
        const newRow = [...row]
        newRow.splice(col, 0, { value: '' })
        return newRow
      })
    })
  }, [selectedCell])

  // Delete column
  const deleteColumn = useCallback(() => {
    const { col } = selectedCell
    if (data[0]?.length > 1) {
      setData(prevData => {
        return prevData.map(row => {
          const newRow = [...row]
          newRow.splice(col, 1)
          return newRow
        })
      })
    }
  }, [selectedCell, data])

  // Setup invoice columns with predefined data structure
  const setupInvoiceColumns = useCallback(() => {
    const { col } = selectedCell
    const invoiceHeaders = [
      'Date', 'Client Name', 'Container', 'From Location', 'To Location',
      'Rate', 'Quantity', 'Token', 'VDM', 'MEODC', 'Washing Due', 'Other Charges', 'Total'
    ]
    
    setData(prevData => {
      const newData = [...prevData]
      // Insert headers in the first row
      invoiceHeaders.forEach((header, index) => {
        if (newData[0] && newData[0][col + index]) {
          newData[0][col + index] = { value: header }
        }
      })
      return newData
    })
  }, [selectedCell])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'c':
            e.preventDefault()
            copySelection()
            break
          case 'x':
            e.preventDefault()
            cutSelection()
            break
          case 'v':
            e.preventDefault()
            pasteSelection()
            break
        }
      }
      
      // Arrow key navigation
      if (!editingCell) {
        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault()
            setSelectedCell(prev => ({ ...prev, row: Math.max(0, prev.row - 1) }))
            break
          case 'ArrowDown':
            e.preventDefault()
            setSelectedCell(prev => ({ ...prev, row: Math.min(99, prev.row + 1) }))
            break
          case 'ArrowLeft':
            e.preventDefault()
            setSelectedCell(prev => ({ ...prev, col: Math.max(0, prev.col - 1) }))
            break
          case 'ArrowRight':
            e.preventDefault()
            setSelectedCell(prev => ({ ...prev, col: Math.min(25, prev.col + 1) }))
            break
          case 'Enter':
            e.preventDefault()
            setEditingCell(selectedCell)
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedCell, editingCell, copySelection, cutSelection, pasteSelection])

  return (
    <div className="excel-container bg-white border border-gray-300 rounded-lg shadow-lg">
      {/* Excel Ribbon */}
      <div className="ribbon bg-gray-100 border-b border-gray-300 p-2">
        <div className="flex gap-4">
          {/* Clipboard Group */}
          <div className="ribbon-group border-r border-gray-300 pr-4">
            <div className="text-xs text-gray-600 mb-1">Clipboard</div>
            <div className="flex gap-1">
              <button
                onClick={pasteSelection}
                className="ribbon-btn-large bg-blue-50 hover:bg-blue-100 px-3 py-2 text-sm border rounded"
              >
                Paste
              </button>
              <div className="flex flex-col gap-1">
                <button
                  onClick={cutSelection}
                  className="ribbon-btn-small bg-gray-50 hover:bg-gray-100 px-2 py-1 text-xs border rounded"
                >
                  Cut
                </button>
                <button
                  onClick={copySelection}
                  className="ribbon-btn-small bg-gray-50 hover:bg-gray-100 px-2 py-1 text-xs border rounded"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          {/* Font Group */}
          <div className="ribbon-group border-r border-gray-300 pr-4">
            <div className="text-xs text-gray-600 mb-1">Font</div>
            <div className="flex gap-1 items-center">
              <select className="text-xs border rounded px-1">
                <option>Arial</option>
                <option>Calibri</option>
              </select>
              <select className="text-xs border rounded px-1">
                <option>11</option>
                <option>12</option>
              </select>
              <button className="font-bold px-2 py-1 border rounded hover:bg-gray-100">B</button>
              <button className="italic px-2 py-1 border rounded hover:bg-gray-100">I</button>
              <button className="underline px-2 py-1 border rounded hover:bg-gray-100">U</button>
            </div>
          </div>

          {/* Insert/Delete Group */}
          <div className="ribbon-group border-r border-gray-300 pr-4">
            <div className="text-xs text-gray-600 mb-1">Insert/Delete</div>
            <div className="flex gap-1">
              <button
                onClick={insertRow}
                className="ribbon-btn-small bg-gray-50 hover:bg-gray-100 px-2 py-1 text-xs border rounded"
              >
                Insert Row
              </button>
              <button
                onClick={deleteRow}
                className="ribbon-btn-small bg-gray-50 hover:bg-gray-100 px-2 py-1 text-xs border rounded"
              >
                Delete Row
              </button>
              <button
                onClick={insertColumn}
                className="ribbon-btn-small bg-gray-50 hover:bg-gray-100 px-2 py-1 text-xs border rounded"
              >
                Insert Col
              </button>
              <button
                onClick={setupInvoiceColumns}
                className="ribbon-btn-small bg-green-50 hover:bg-green-100 px-2 py-1 text-xs border rounded"
              >
                Invoice Cols
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Spreadsheet Grid */}
      <div className="relative overflow-auto" style={{ height: '400px', width: '100%' }}>
        <table className="excel-table border-collapse">
          <thead>
            <tr>
              <th className="excel-header bg-gray-200 border border-gray-400 w-12 h-6"></th>
              {Array.from({ length: 26 }, (_, col) => (
                <th key={col} className="excel-header bg-gray-200 border border-gray-400 min-w-20 h-6 text-xs">
                  {getColumnLabel(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 50).map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="excel-header bg-gray-200 border border-gray-400 w-12 h-6 text-center text-xs">
                  {rowIndex + 1}
                </td>
                {row.slice(0, 26).map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className={`excel-cell border border-gray-300 min-w-20 h-6 p-1 text-xs cursor-cell ${
                      selectedCell.row === rowIndex && selectedCell.col === colIndex
                        ? 'bg-blue-200 border-blue-500'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}
                    onDoubleClick={() => setEditingCell({ row: rowIndex, col: colIndex })}
                  >
                    {editingCell?.row === rowIndex && editingCell?.col === colIndex ? (
                      <input
                        type="text"
                        value={cell.value}
                        onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                        onBlur={() => setEditingCell(null)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setEditingCell(null)
                          }
                        }}
                        className="w-full h-full border-none outline-none bg-transparent"
                        autoFocus
                      />
                    ) : (
                      cell.value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Bar */}
      <div className="status-bar bg-gray-100 border-t border-gray-300 px-4 py-1 text-xs text-gray-600">
        Cell: {getColumnLabel(selectedCell.col)}{selectedCell.row + 1}
        {clipboard.length > 0 && ' | Copied: 1 cell'}
      </div>
    </div>
  )
}