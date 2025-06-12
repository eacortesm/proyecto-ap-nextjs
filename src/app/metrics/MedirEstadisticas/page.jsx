'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useUsuario } from "@/app/context/UsuarioContext";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import ApexCharts with no SSR to avoid window is not defined errors
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function MetricsPage() {
  const { usuario } = useUsuario();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  
  // Chart state
  const [chartData, setChartData] = useState({
    series: [{
      name: "Ingresos",
      data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
    },
    {
      name: "Cantidad de postulaciones",
      data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
    },
    {
      name: 'Usuarios activos',
      data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [5, 7, 5],
        curve: 'straight',
        dashArray: [0, 8, 5]
      },
      title: {
        text: 'Page Statistics',
        align: 'left'
      },
      legend: {
        tooltipHoverFormatter: function(val, opts) {
          return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>'
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        categories: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6', 'Semana 7', 'Semana 8', 'Semana 9',
          'Semana 10', 'Semana 11', 'Semana 12'
        ],
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val;
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val;
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: '#f1f1f1',
      }
    }
  });

  // Check user authorization
  useEffect(() => {
    // Redirect non-admin users
    if (usuario && usuario.tipoUsuario !== 'ADMINISTRADOR') {
      router.push('/');
    }
    
    // Fetch metrics data - add your actual data fetching here
    const fetchData = async () => {
      try {
        // Example: const response = await fetch('/api/metrics');
        // const data = await response.json();
        // Process data here
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [usuario, router]);

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

  return (
    <div>
      {usuario ? (
        <div>
          <Navbar tipoUsuario={usuario.tipoUsuario} />
          <main className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Estadísticas del Sistema</h1>
            
            {error ? (
              <div className="bg-red-50 text-red-600 p-4 rounded-md">
                Error: {error}
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-6">
                <div id="chart">
                  <ReactApexChart 
                    options={chartData.options} 
                    series={chartData.series} 
                    type="line" 
                    height={350} 
                  />
                </div>
              </div>
            )}
          </main>
        </div>
      ) : (
        <div>
          <Navbar />
          <div className="flex justify-center items-center h-screen">
            <h2 className="text-xl">No has iniciado sesión.</h2>
          </div>
        </div>
      )}
    </div>
  );
}
