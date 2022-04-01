import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const VerCliente = () => {

  const [cliente, setCliente] = useState({})

  const [cargando, setCargando] = useState(false)

  const id = useParams()

  useEffect(() => {
    setCargando(true)
    const getCliente = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id.id}`
        const response = await fetch(url)
        const result = await response.json()

        setCliente(result)

      } catch (error) {
        console.log(error);
      }
      setCargando(false)
    }

    getCliente()
  }, [])


  return (

    <div className="bg-white shadow-md rounded-lg p-6">
      {cargando ? (

        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>

      ) : Object.keys(cliente).length === 0 ? 'No hay resultados' : (
        (
          <>
            <h1 className='font-black text-4xl text-blue-900'>Ver Cliente: {cliente.nombre}</h1>
            <p className='mt-3'>Informacion del Cliente</p>


            <p className="text-2xl text-gray-600">
              <span className="uppercase font-bold">Email: </span>
              {cliente.email}
            </p>

            <p className="text-2xl text-gray-600">
              <span className="uppercase font-bold">Telefono: </span>
              {cliente.telefono}
            </p>

            <p className="text-2xl text-gray-600">
              <span className="uppercase font-bold">Empresa: </span>
              {cliente.empresa}
            </p>

            <p className="text-2xl text-gray-600">
              <span className="uppercase font-bold">Cliente: </span>
              {cliente.id}
            </p>

          </>
        )
      )}
    </div>
    /* Object.keys(cliente).length === 0 ? <p>NO hay resuldadso</p> : ( */

  )

}

export default VerCliente