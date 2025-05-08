function RegistroLayout({ children }) {
  return (
    <div className="bg-gray-800 text-white">
      {children}
    </div>
  )
}

export const metadata = {
  title: 'Registro',
  desctription: 'Registro de un usuario',
};

export default RegistroLayout;