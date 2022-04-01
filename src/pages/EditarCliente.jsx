import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Formulario from '../components/Formulario'

const EditarCliente = () => {

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
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p className='mt-3'>Actualize los datos del cliente</p>
      <Formulario
        cliente={cliente}
        cargando={cargando} />
    </>
  )
}

export default EditarCliente