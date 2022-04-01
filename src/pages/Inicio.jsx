import { useEffect, useState } from 'react'
import Cliente from '../components/Cliente'

const Inicio = () => {

  const [clientes, setClientes] = useState([])
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    const getClientes = async () => {
      setCargando(true)
      try {
        const url = 'http://localhost:4000/clientes'
        const response = await fetch(url);

        const result = await response.json()

        setClientes(result)
        setCargando(false)
      } catch (error) {
        console.log(error);
      }
    }
    getClientes()
  }, [])

  const handleDelete = async id => {
    if (confirm("ELIMINAR??")) {
      try {
        const url = `http://localhost:4000/clientes/${id}`
        const response = await fetch(url, {
          method: 'DELETE'
        })

        await response.json()

        const arrayCli = clientes.filter(cliente => (
          cliente.id !== id
        ))
        setClientes(arrayCli)
      } catch (error) {

      }
    }
  }

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
      <p className='mt-3'>Administra tus clientes</p>

      {cargando ? (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md w-full mx-auto'>
          <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
          </div>
        </div>
      ) : (
        <table className='w-full mt-5 table-auto shadow-md bg-white'>
          <thead className='bg-blue-800 text-white'>
            <tr>
              <th className='py-2'>ID</th>
              <th className='py-2'>Nombre</th>
              <th className='py-2'>Contacto</th>
              <th className='py-2'>Empresa</th>
              <th className='py-2'>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map(cliente => (
              <Cliente
                key={cliente.id}
                cliente={cliente}
                handleDelete={handleDelete} />
            ))}

          </tbody>

        </table>
      )
      }
    </>
  )
}

export default Inicio