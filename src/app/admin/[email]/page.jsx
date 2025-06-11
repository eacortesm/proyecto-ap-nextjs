import Navbar from "@/components/Navbar";

export default function AdminPage() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gray-100">
        <h2 className="text-2xl mb-4 text-center">Panel de administradores</h2>
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
          <p className="text-gray-600">Esta sección está en construcción.</p>
        </div>
      </main>
    </div>
  )
}