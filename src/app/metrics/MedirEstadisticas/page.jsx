'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useUsuario } from "@/app/context/UsuarioContext";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import ApexCharts
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function MetricsPage() {
  const { usuario } = useUsuario();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const router = useRouter();
  
  // Define colors for chart
  const colors = ['#008FFB', '#FF4560', '#775DD0', '#FEB019', '#546E7A'];
  
  // Check user authorization and fetch data
  useEffect(() => {
    // Redirect non-admin users
    if (usuario && usuario.tipoUsuario !== 'ADMINISTRADOR') {
      router.push('/');
      return;
    }
    
    // Fetch data if user is authenticated
    if (usuario) {
      fetchMetrics();
    } else {
      setLoading(false);
    }
  }, [usuario, router]);
  
  const fetchMetrics = async () => {
    try {
      setLoading(true);
      
      // Fetch metrics from your Next.js API route
      const response = await fetch('/api/metrics/ofertas');
      
      if (!response.ok) {
        throw new Error('Error al obtener estadísticas');
      }
      
      const result = await response.json();
      
      if (result.success) {
        setMetrics(result.data);
      } else {
        throw new Error(result.message || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error fetching metrics:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data when metrics are available
  const getChartData = () => {
    if (!metrics) return null;
    
    const estatusData = metrics.estatusOfertas;
    
    return {
      series: [{
        data: [
          estatusData.abiertas,
          estatusData.cerradas,
          estatusData.enRevision,
          estatusData.canceladas,
          estatusData.bloqueadas
        ]
      }],
      options: {
        chart: {
          height: 350,
          type: 'bar',
          events: {
            click: function(chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        colors: colors,
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: [
            'Abiertas',
            'Cerradas',
            'En Revisión',
            'Canceladas',
            'Bloqueadas'
          ],
          labels: {
            style: {
              colors: colors,
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          title: {
            text: 'Cantidad de Ofertas'
          }
        },
        title: {
          text: 'Distribución de Ofertas por Estado',
          align: 'center',
          style: {
            fontSize: '18px'
          }
        }
      }
    };
  };

  // Show loading state
  if (loading) {
    return (
      <div>
        <Navbar tipoUsuario={usuario?.tipoUsuario} />
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }
  
  // Show not authenticated state
  if (!usuario) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <h2 className="text-xl">No has iniciado sesión.</h2>
        </div>
      </div>
    );
  }

  // Get chart data
  const chartData = getChartData();

  return (
    <div>
      <Navbar tipoUsuario={usuario.tipoUsuario} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Estadísticas del Sistema</h1>
        
        {error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
            Error: {error}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Numeric metrics cards */}
            {metrics && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg text-center shadow-md">
                  <p className="text-lg text-blue-800 font-medium mb-2">Total de Ofertas</p>
                  <p className="text-3xl font-bold text-blue-600">{metrics.total}</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg text-center shadow-md">
                  <p className="text-lg text-green-800 font-medium mb-2">Estudiantes Interesados</p>
                  <p className="text-3xl font-bold text-green-600">{metrics.estudiantes.interesados}</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg text-center shadow-md">
                  <p className="text-lg text-purple-800 font-medium mb-2">Estudiantes Aceptados</p>
                  <p className="text-3xl font-bold text-purple-600">{metrics.estudiantes.aceptados}</p>
                </div>
              </div>
            )}
            
            {/* Bar chart */}
            {chartData && (
              <div className="bg-white shadow-md rounded-lg p-6">
                <div id="chart">
                  <ReactApexChart 
                    options={chartData.options} 
                    series={chartData.series} 
                    type="bar" 
                    height={350} 
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
