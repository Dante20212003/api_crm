import { useNavigate } from "react-router-dom"

const Cliente = ({ cliente, handleDelete }) => {

  const navigate = useNavigate()

  return (

    <tr className='border hover:bg-gray-50'>
      <td className='text-center'>{cliente.id}</td>
      <td className='text-center'>{cliente.nombre}</td>
      <td>
        <p><span className='text-gray-800 uppercase font-bold'>Email:</span>{cliente.email}
        </p>
        <p><span className='text-gray-800 uppercase font-bold'>Tel:</span>{cliente.telefono}
        </p>
      </td>
      <td>{cliente.empresa}</td>
      <td>
        <button
          type='button'
          className='bg-yellow-500 mt-3 hover:bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-xs'
          onClick={() => navigate(`/clientes/${cliente.id}`)} >
          Ver
        </button>

        <button
          type='button'
          className='bg-blue-600 mt-3 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs'
          onClick={() => navigate(`/clientes/editar/${cliente.id}`)} >
          Editar
        </button>

        <button
          type='button'
          className='bg-red-600 mt-3 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs'
          onClick={()=> handleDelete(cliente.id)} >
          Eliminar
        </button>
      </td>
    </tr>

  )
}

export default Cliente