import React from 'react'
import {nanoid} from 'nanoid'
import {firebase} from '../firebase'
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
    const [error, setError]=React.useState(null)
    const [listaEstudiantes,setListaEstudiantes]=React.useState([])

    const db = firebase.firestore();

    React.useEffect(()=>{
        const obtenerdatos= async() =>{
            try{
                const db = firebase.firestore()
                const data = await db.collection('students').get()
                const arrayData=data.docs.map (item =>(
                    {
                        id: item.id, ... item.data()
                    }
                ))
                //console.log(arrayData)
                setListaEstudiantes(arrayData)
            }catch(error){
                console.log(error)
            }
        }
        obtenerdatos()
    },[])
    //@dvpinedo
    const guardarEstudiantes = async (e)=>{
        e.preventDefault()

        if(!nombre.trim()){
            alert("Digite el nombre")
            return
        }
        if(!apellido.trim()){
            alert("Digite el apellido")
            return
        }
        if(!correo.trim()){
            alert("Digite el correo")
            return
        }
        if(!direccion.trim()){
            alert("Digite la direccion")
            return
        }
        if(!telefono.trim()){
            alert("Digite el telefono")
            return
        }
        if(!ciudad.trim()){
            alert("Digite la ciudad")
            return
        }
        if(!programa.trim()){
            alert("Digite el programa")
            return
        }

        try{
            const db = firebase.firestore();
            const student = {
            nombreEstudiante: nombre,
            apellidoEstudiante: apellido,
            correoEstudiante: correo,
            direccionEstudiante: direccion,
            telefonoEstudiante: telefono,
            ciudadEstudiante: ciudad,
            programaEstudiante: programa
          }
          const data= await db.collection('students').add(student)
            setListaEstudiantes([
            ...listaEstudiantes,
            {id:nanoid(),nombreEstudiante: nombre, apellidoEstudiante: apellido, correoEstudiante: correo, direccionEstudiante: direccion, telefonoEstudiante: telefono, ciudadEstudiante: ciudad, programaEstudiante: programa}
        ])
        console.log(listaEstudiantes)
        e.target.reset()

        setNombre("")
        setApellido("")
        setCorreo("")
        setDireccion("")
        setTelefono("")
        setCiudad("")
        setPrograma("")
        setError(null)

        }catch(error){
            console.log(error)
        }
    
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
        setId(item.id)
    }
    const editarEstudiantes = async e=>{
        e.preventDefault()

        
        if(!nombre.trim()){
            alert("Digite el nombre")
            return
        }
        if(!apellido.trim()){
            alert("Digite el apellido")
            return
        }
        if(!correo.trim()){
            alert("Digite el correo")
            return
        }
        if(!direccion.trim()){
            alert("Digite la direccion")
            return
        }
        if(!telefono.trim()){
            alert("Digite el telefono")
            return
        }
        if(!ciudad.trim()){
            alert("Digite la ciudad")
            return
        }
        if(!programa.trim()){
            alert("Digite el programa")
            return
        }

        try{ console.log(id)
            const db = firebase.firestore()
            await db.collection('students').doc(id).update({
            nombreEstudiante: nombre,
            apellidoEstudiante: apellido,
            correoEstudiante: correo,
            direccionEstudiante: direccion,
            telefonoEstudiante: telefono,
            ciudadEstudiante: ciudad,
            programaEstudiante: programa
            })

            
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
                setError(null)
        }catch(error){
            console.log(error)
        }
    
    }
    const eliminar = async id =>{
        try{
            const db = firebase.firestore()
            await db.collection('students').doc(id).delete()
            const aux= listaEstudiantes.filter(item=> item.id !== id)
            setListaEstudiantes(aux)
        }catch(error){
            console.log(error)
        }
  
    }
    const cancelar = () =>{
        setEdicion(false)
        setNombre('')
        setApellido('')
        setCorreo('')
        setDireccion('')
        setTelefono('')
        setCiudad('')
        setPrograma('')
        setId('')
        setError(null)

    }

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
                <span className='lead'>{item.nombreEstudiante} {item.apellidoEstudiante}-{item.correoEstudiante}-{item.direccionEstudiante}-{item.telefonoEstudiante}-{item.ciudadEstudiante}-{item.programaEstudiante}</span>
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
                <form onSubmit={edicion? editarEstudiantes : guardarEstudiantes}>

                <input className='form-control mb-2' type="text" placeholder='Ingrese su nombre'onChange={(e)=>setNombre(e.target.value)}value={nombre}/>
                <input className='form-control mb-2'type="text" placeholder='Ingrese su apellido'onChange={(e)=>setApellido(e.target.value)}value={apellido}/>
                <input className='form-control mb-2' type="text" placeholder='Ingrese su correo' onChange={(e)=>setCorreo(e.target.value)}value={correo}/>
                <input className='form-control mb-2' type="text" placeholder='Ingrese su dirección' onChange={(e)=>setDireccion(e.target.value)}value={direccion}/>
                <input className='form-control mb-2' type="text" placeholder='Ingrese su telefono' onChange={(e)=>setTelefono(e.target.value)}value={telefono}/>
                <input className='form-control mb-2' type="text" placeholder='Ingrese su ciudad' onChange={(e)=>setCiudad(e.target.value)}value={ciudad}/>
                <input className='form-control mb-2' type="text" placeholder='Ingrese su programa' onChange={(e)=>setPrograma(e.target.value)}value={programa}/>
                <br />
                {
                    edicion ? (
                    <>
                    <button className='btn btn-warning btn-block' type='submit'>Editar</button>
                    <button className='btn btn-dark btn-block mx-2'onClick={()=>cancelar()}>Cancelar</button>
                    </>
                    )
                    :
                <button className='btn btn-primary btn-block' type='submit'>Crear estudiante</button>
                }
                </form>
            </div>
        </div>
    </div>
    )
}

export default Registro
export {firebase}