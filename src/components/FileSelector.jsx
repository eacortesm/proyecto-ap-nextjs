'use client'

import React, { useState } from 'react';

function FileSelector() {
  const [fileName, setFileName] = useState('Ningun archivo seleccionado');

  const handleFileChange = (event) => {
    setFileName(event.target.files[0]?.name || 'Ningun archivo seleccionado')
  }

  return (
    <div className="flex flex-col">
      <label htmlFor="file" className="text-gray-600">Certificado o Referencia (Opcional)</label>
      <label htmlFor="file" className="cursor-pointer bg-white border border-gray-300 rounded-2xl p-2 text-center text-gray-500 hover:bg-gray-200 transition">Seleccionar Archivo</label>
      <input type="file" id="file" placeholder="Certificado o Referencia" className="hidden" />
    </div>
  )
}

export default FileSelector;