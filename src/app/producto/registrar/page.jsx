'use client';
import mensajes from '../../menu/Mensajes';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { get, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Link from "next/link";
import { save_producto } from '@/src/hooks/service_producto';
import Menu from '../../menu/menu';


export default function Page() {
  const router = useRouter();

  const validationShema = Yup.object().shape({
    precio: Yup.number().required('ingrese la nombre para la mota ingresada'),
    nombre: Yup.string().required('ingrese el precio de la mota')
  });

  const formOptions = { resolver: yupResolver(validationShema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const sendData = (data) => {
    console.log('Datos a enviar al backend:', data);

    var datos = {
      'nombre': data.nombre,
      'precio': data.precio,
    };

    save_producto(datos).then((info) => {
      console.log(info);
      if (info.code !== 200) {
        mensajes("Producto no se pudo guardar", "Error", "error")
      } else {
        mensajes("Producto guardado correctamente", "Informacion", "success")
        router.push("/producto");
      }
    });
  };

  return (
    <div
      className="row justify-content-center"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Asegura que el contenedor ocupe el 100% de la altura de la pantalla
      }}
    >
      <div className="d-flex flex-column">
        <Menu></Menu>
        <h1 style={{ color: '#005c00', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          Registrar Producto
        </h1>
        <div
          className="container-fluid"
          style={{
            border: '4px solid #ccc',
            padding: '20px',
            borderRadius: '10px',
            width: '1000px',
            background: 'white', // Asegura que el fondo sea blanco para mejorar la legibilidad
          }}
        >
          <br />
          <form className="mota" onSubmit={handleSubmit(sendData)}>
            <div className="row mb-4">
              <div className="col">
                <input
                  {...register('nombre')}
                  name="nombre"
                  id="nombre"
                  className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                  placeholder="Ingrese una nombre para el producto"
                  autoComplete="off"
                  style={{ fontSize: '25px' }}
                />
                <label className="form-label" style={{ color: '#889859' }}>
                  nombre
                </label>
                <div className="alert alert-danger invalid-feedback">
                  {errors.nombre?.message}
                </div>
              </div>
            </div>
            <div className="col">
              <input
                {...register('precio')}
                name="precio"
                id="precio"
                className={`form-control ${errors.precio ? 'is-invalid' : ''}`}
                placeholder="Ingrese el precio a tener el producto"
                autoComplete="off"
                style={{ fontSize: '25px' }}
              />
              <label className="form-label" style={{ color: '#889859' }}>
                precio
              </label>
              <div className="alert alert-danger invalid-feedback">
                {errors.precio?.message}
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Link
                href="/mota"
                className="btn btn-danger mr-3"
                style={{ background: 'red', fontSize: '25px' }}
              >
                CANCELAR
              </Link>
              <button
                type="submit"
                className="btn btn-success ml-3"
                style={{
                  background: '#728C69',
                  marginLeft: '20px',
                  fontSize: '25px',
                }}
              >
                GUARDAR
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
};