import React from 'react'
import {nanoid} from 'nanoid'
import { firebase } from '../firebase'
const Registro = () => {
    const [nombre,setNombre]=React.useState('')
    const [apellido,setApellido]=React.useState('')
    const [correo,setCorreo]=React.useState('')
    const [direccion,setDireccion]=React.useState('')
    const [telefono,setTelefono]=React.useState('')
    const [ciudad,setCiudad]=React.useState('')
    const [programa,setPrograma]=React.useState('')
    const [id, setId]=React.useState('')

    const [edicion, setEdicion]=React.useState(false)
    const [listaEstudiantes,setListaEstudiantes]=React.useState([])

    const db = firebase.firestore();

    const guardarEstudiantes = (e)=>{
        e.preventDefault()

        if(!nombre.trim()){
            alert("Digite el estudiante")
            return
        }
        if(!apellido.trim()){
            alert("Digite el estudiante")
            return
        }
        if(!correo.trim()){
            alert("Digite el estudiante")
            return
        }
        if(!direccion.trim()){
            alert("Digite el estudiante")
            return
        }
        if(!telefono.trim()){
            alert("Digite el estudiante")
            return
        }
        if(!ciudad.trim()){
            alert("Digite el estudiante")
            return
        }
        if(!programa.trim()){
            alert("Digite el estudiante")
            return
        }

        setListaEstudiantes([
            ... listaEstudiantes,
            {id:nanoid(),nombreEstudiante: nombre, apellidoEstudiante: apellido, correoEstudiante: correo, direccionEstudiante: direccion, telefonoEstudiante: telefono, ciudadEstudiante: ciudad, programaEstudiante: programa}
        ])

        e.target.reset()

        setNombre("")
        setApellido("")
        setCorreo("")
        setDireccion("")
        setTelefono("")
        setCiudad("")
        setPrograma("")
    }
    
    const editar= item =>{
        setNombre(item.nombreEstudiante)
        setApellido(item.apellidoEstudiante)
        setCorreo(item.correoEstudiante)
        setDireccion(item.direccionEstudiante)
        setTelefono(item.telefonoEstudiante)
        setCiudad(item.ciudadEstudiante)
        setPrograma(item.programaEstudiante)
        setEdicion(true)
    }
    const editarEstudiantes = e=>{
        e.preventDefault()
        const arrayEditado = listaEstudiantes.map(
        item => item.id===id ? {id:id, nombreEstudiante: nombre, apellidoEstudiante: apellido, correoEstudiante:correo, direccionEstudiante: direccion, telefonoEstudiante:telefono, ciudadEstudiante: ciudad, programaEstudiante: programa} : item
)
        setListaEstudiantes(arrayEditado)
        setNombre('')
        setApellido('')
        setCorreo('')
        setDireccion('')
        setTelefono('')
        setCiudad('')
        setPrograma('')
        setId('')
        setEdicion(false)
    }
    const eliminar = id =>{
        const aux= listaEstudiantes.filter(item=> item.id != id)
        setListaEstudiantes(aux)
    }

    const student = {
        name: "Bart Simpson",
        age: 18,
      };
    
      const addStudent = async (student) => {
        const data = await db.collection("students").add(student);
        console.log(data)
      };
    

  return (
    <div className='container mt-5'>
        <h1 className='text-center'>Registro de estudiantes</h1>
        <hr />
        <div className='row'>
            <div className='col-8'>
                <h4 className='text-center'>Lista de estudiantes</h4>
            <ul className='list-group'>
                    {
                listaEstudiantes.map((item)=>(
                <li className="list-group-item" key={item.id}>
                <span className='lead'>{item.nombreEstudiante}-{item.apellidoEstudiante}-{item.correoEstudiante}-{item.direccionEstudiante}-{item.telefonoEstudiante}-{item.ciudadEstudiante}-{item.programaEstudiante}</span>
                <button className='btn btn-danger btn-sm float-end mx-2'onClick={()=>eliminar(item.id)}>Eliminar</button>
                <button className='btn btn-warning btn-sm float-end' onClick={()=>editar(item)}>Editar</button>
                </li>
            ))
            }
            </ul>
        </div>
        <div className='col-4'>
                <h4 className='text-center'>Datos del estudiante</h4>
                <br />
                {   
                    edicion ? 'Editarndo datos' : 'Ingresando datos'
                }
                <br />
                <form onSubmit={edicion? editarEstudiantes :guardarEstudiantes}>

                <input className='form-control mb-2' type="text" placeholder='Ingrese su nombre'onChange={(e)=>setNombre(e.target.value)}value={nombre}/>
                <input className='form-control mb-2'type="text" placeholder='Ingrese su apellido'onChange={(e)=>setApellido(e.target.value)}value={apellido}/>
                <input className='form-control mb-2' type="text" placeholder='Ingrese su correo' onChange={(e)=>setCorreo(e.target.value)}value={correo}/>
                <input className='form-control mb-2' type="text" placeholder='Ingrese su dirección' onChange={(e)=>setDireccion(e.target.value)}value={direccion}/>
                <input className='form-control mb-2' type="text" placeholder='Ingrese su telefono' onChange={(e)=>setTelefono(e.target.value)}value={telefono}/>
                <input className='form-control mb-2' type="text" placeholder='Ingrese su ciudad' onChange={(e)=>setCiudad(e.target.value)}value={ciudad}/>
                <input className='form-control mb-2' type="text" placeholder='Ingrese su programa' onChange={(e)=>setPrograma(e.target.value)}value={programa}/>
                <br />
                <button className='btn btn-primary btn-block'>Crear estudiante</button>
            

                </form>
                <button onClick={() => addStudent(student)}>Add person</button>
            </div>
        </div>
    </div>
    )
}

export default Registro