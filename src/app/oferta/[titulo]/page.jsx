'use client';

import { useUsuario } from "@/app/context/UsuarioContext";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";


export default function OfertaInfo() {

    const { usuario } = useUsuario();
    const { titulo } = useParams();
    const [oferta, setOferta] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        async function getOferta() {
            try {
                const res = await fetch(`/api/oferta/${titulo}`);
                const json = await res.json();
                setOferta(json.data.data)
            } catch(err) {
                console.error(err);
            } finally {
                setCargando(false);
            }
        }
    
        getOferta();
    }, [])

    function CampoOferta({ etiqueta, valor }) {
      return (
        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium">{etiqueta}</label>
          <div className="text-gray-900 bg-gray-50 p-2 rounded">
            {valor || "No especificado"}
          </div>
        </div>
      );
    }

    return (
        <div>
            <div>
                <Navbar tipoUsuario={usuario.tipoUsuario} />
            </div>
            <div>
                <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                    { cargando ? (
                        <label className="block text-gray-700 mb-2">Cargando oferta...</label>
                    ) : (
                        <div>
                        <CampoOferta etiqueta={"Titulo"} valor={oferta.titulo} />
                        <CampoOferta etiqueta={"Descripción"} valor={oferta.descripcion} />
                        <CampoOferta etiqueta={"Profesor"} valor={oferta.profesor} />
                        <CampoOferta etiqueta={"Departamento"} valor={oferta.departamento} />
                        <CampoOferta etiqueta={"Objetivos"} valor={oferta.objetivos} />
                        <CampoOferta etiqueta={"Vacantes"} valor={oferta.cantidadVacantes} />
                        <CampoOferta etiqueta={"Duracion"} valor={oferta.duracion} />
                        <CampoOferta etiqueta={"Requisitos"} valor={
                          <ul className="list-disc pl-5 space-y-1">
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>
                                <strong>Promedio mínimo:</strong>{" "}
                                {oferta.requisitos.promedioMin || "No aplica"}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>
                                <strong>Requisitos adicionales:</strong>{" "}
                                {oferta.requisitos.reqAdicional ? (
                                  <span className="inline-flex items-center text-green-600">
                                    <CheckIcon className="w-4 h-4 mr-1" /> Sí (Entrevista + prueba)
                                  </span>
                                ) : (
                                  <span className="text-gray-500">No requeridos</span>
                                )}
                              </span>
                            </li>
                          </ul>
                        }/>
                        <CampoOferta etiqueta={"Estado de la oferta"} valor={oferta.estadoOferta} />
                        </div>
                    ) }
                </div>
            </div>
        </div>
    )
}