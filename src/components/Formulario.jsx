import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

const Formulario = ({ cliente, cargando }) => {

  const navigate = useNavigate();

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es Obligatorio').min(3, 'Nombre muy Corto'),
    empresa: Yup.string().required('La empresa es Obligatorio').min(3, 'Nombre muy Corto'),
    email: Yup.string().email('Email no Valido').required('El Email es Obligatorio')
  })

  const handleSumbit = async values => {

    try {
      let response;
      if (cliente.id) {
        const url = `http://localhost:4000/clientes/${cliente.id}`

        response = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        })


      } else {
        const url = 'http://localhost:4000/clientes'

        response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        })


      }

      await response.json();

      navigate('/clientes')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
      {cargando ? (

        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>

      ) : (
        <>
          <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

          <Formik
            initialValues={{
              nombre: cliente?.nombre ?? '',
              empresa: cliente?.empresa ?? '',
              email: cliente?.email ?? '',
              telefono: cliente?.telefono ?? '',
              notas: cliente?.notas ?? ''
            }}
            enableReinitialize={true}
            onSubmit={async (values, { resetForm }) => {
              await handleSumbit(values)

              resetForm()
            }}
            validationSchema={nuevoClienteSchema}>

            {({ errors, touched }) => {

              return (
                <Form
                  className='mt-10' >
                  <div className='mb-4'>
                    <label
                      className='text-gray-800'
                      htmlFor='nombre' >Nombre:</label>
                    <Field
                      id='nombre'
                      type='text'
                      className='mt-2 block w-full p-3 bg-gray-50'
                      placeholder='Nombre del Cliente'
                      name='nombre'
                      autoComplete='off' />

                    {errors.nombre && touched.nombre ? (
                      <div className='text-center text-white uppercase my-4 bg-red-600 font-bold p-3'>
                        {errors.nombre}
                      </div>
                    ) : ''}


                  </div>

                  <div className='mb-4'>
                    <label
                      className='text-gray-800'
                      htmlFor='empresa' >Empresa:</label>
                    <Field
                      id='empresa'
                      type='text'
                      className='mt-2 block w-full p-3 bg-gray-50'
                      placeholder='Empresa del Cliente'
                      name='empresa' />

                    {errors.empresa && touched.empresa ? (
                      <div className='text-center text-white uppercase my-4 bg-red-600 font-bold p-3'>
                        {errors.empresa}
                      </div>
                    ) : ''}
                  </div>

                  <div className='mb-4'>
                    <label
                      className='text-gray-800'
                      htmlFor='email' >Email:</label>
                    <Field
                      id='email'
                      type='email'
                      className='mt-2 block w-full p-3 bg-gray-50'
                      placeholder='Email del Cliente'
                      name='email' />

                    {touched.email && errors.email ? (
                      <div className='text-center text-white uppercase my-4 bg-red-600 font-bold p-3'>
                        {errors.email}
                      </div>
                    ) : ''}
                  </div>

                  <div className='mb-4'>
                    <label
                      className='text-gray-800'
                      htmlFor='telefono' >Telefono:</label>
                    <Field
                      id='telefono'
                      type='tel'
                      className='mt-2 block w-full p-3 bg-gray-50'
                      placeholder='Telefono del Cliente'
                      name='telefono' />

                    {errors.telefono && touched.telefono ? (
                      <div className='text-center text-white uppercase my-4 bg-red-600 font-bold p-3'>
                        {errors.telefono}
                      </div>
                    ) : ''}
                  </div>

                  <div className='mb-4'>
                    <label
                      className='text-gray-800'
                      htmlFor='notas' >Notas:</label>
                    <Field
                      id='notas'
                      as='textarea'
                      type='text'
                      className='mt-2 block w-full p-3 bg-gray-50 h-30'
                      placeholder='Notas del Cliente'
                      name='notas' />

                    {errors.notas && touched.notas ? (
                      <div className='text-center text-white uppercase my-4 bg-red-600 font-bold p-3'>
                        {errors.notas}
                      </div>
                    ) : ''}
                  </div>

                  <input
                    type='submit'
                    value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                    className='mt-5 w-full text-white p-3 uppercase bg-blue-800 text-lg font-bold rounded-xl' />

                </Form>
              )
            }}

          </Formik>
        </>
      )}
    </div>
  )
}

Formulario.defaultProps = {
  cliente: {},
  cargando: false
}

export default Formulario