import React, {useEffect,Fragment,useState, useRef} from 'react';
import Axios from 'axios'
import {APIURL, APIURLimage} from '../helper/apiurl'
import { Table,CustomInput } from 'reactstrap';
import Modal from '../components/modal'

// let didupdatejalan=0
function ManageAdmin() {
  
  const [datausers,setdatausers]=useState([])
  const [datausersedit,setdatausersedit]=useState([])
  const [roles,setroles]=useState([])
  const [modal, setModal] = useState(false);
  const [modaldelete, setModaldelete] = useState(false);
  const [modaladd, setmodaladd] = useState(false);
  const [addimagefile,setimageadd]=useState({
    addImageFileName:'Select Image....',
    addImageFile:undefined,
  })
  const [editimagefile,setimageedit]=useState({
    editimagefilename:'Select Image....',
    editImageFile:undefined,
  })
  const [dataadd]=useState({
    username:useRef(),
    email:useRef(),
    usia:useRef(),
    roleid:useRef()
  })
  const toggle = () =>{
    setModal(!modal)
  };
  const opentogel = (index) =>{
    setdatausersedit(datausers[index])
    setModal(true)
  };
  // const openmodaladd = (index) =>{
  //   setdatausersedit(datausers[index])
  //   setModal(true)
  // };
  const toggledelete=()=>setModaldelete(!modaldelete)
  const toggleadd=()=>setmodaladd(!modaladd)


  useEffect(()=>{
    console.log('didmount')
    Axios.get(`${APIURL}user/users?`)
    .then(res=>{
      console.log(res.data)
      setdatausers(res.data.datauser)
      setroles(res.data.datarole)      
    }).catch(err=>{
      console.log(err)
    })
  },[])
  


  const renderusers=()=>{
   return datausers.map((val,index)=>{
      return(
      <tr key={index}>
        <th scope="row">{index+1}</th>
        <td>{val.username}</td>
        <td><img src={`${APIURLimage+val.image}`} alt={index} width='100px' height='100px'/></td>
        <td>{val.email}</td>
        <td>{val.phone}</td>
        <td>{val.usia}</td>
        {
          val.rolename?
          <td>{val.rolename}</td>
          :
          <td>user tidak ada peran tolong diisi</td>
        }
        <td>
          <button onClick={()=>opentogel(index)}>Edit</button>
          <button onClick={toggledelete}>Delete</button>
        </td>
      </tr>
      )
    })
  }


  
  const Updatedata=()=>{
    // console.log(datausersedit)
    var formdata=new FormData()
    var data={
      username:datausersedit.username,
      email:datausersedit.email,
      usia:datausersedit.usia,
      roleid:datausersedit.roleid,
    }
    var Headers={
      headers:
      {
        'Content-Type':'multipart/form-data',
      }
    }
    formdata.append('image',editimagefile.editImageFile)
    formdata.append('data',JSON.stringify(data))
    Axios.put(`${APIURL}user/users/${datausersedit.id}`,formdata,Headers)
    .then((res)=>{
      setdatausers(res.data.datauser)
      setroles(res.data.datarole)
      setModal(!modal)
    }).catch((err)=>{
      console.log(err)
    })
  }
  const onAddImageFileChange=(event)=>{
    // console.log(document.getElementById('addImagePost').files[0])
    console.log(event.target.files[0])
    var file=event.target.files[0]
    if(file){
        setimageadd({...addimagefile,addImageFileName:file.name,addImageFile:event.target.files[0]})
    }else{
        setimageadd({...addimagefile,addImageFileName:'Select Image...',addImageFile:undefined})
    }
  }
  const oneditImageFileChange=(event)=>{
    // console.log(document.getElementById('addImagePost').files[0])
    console.log(event.target.files[0])
    var file=event.target.files[0]
    if(file){
        setimageedit({...editimagefile,editimagefilename:file.name,editImageFile:event.target.files[0]})
    }else{
        setimageedit({...editimagefile,editimagefilename:'Select Image...',editImageFile:undefined})
    }
  }
  const adddata=()=>{
    var formdata=new FormData()
    const {username,roleid,usia,email}=dataadd
    const data={
      username:username.current.value,
      roleid:roleid.current.value,
      usia:usia.current.value,
      password:'rahasia',
      email:email.current.value,
    }
    var Headers={
      headers:
      {
          'Content-Type':'multipart/form-data',
      }
    }
    formdata.append('image',addimagefile.addImageFile)
    formdata.append('data',JSON.stringify(data))
    Axios.post(`${APIURL}user/postusers`,formdata,Headers)
    .then((res)=>{
      setdatausers(res.data.datauser)
      setroles(res.data.datarole) 
      setmodaladd(!modaladd)
    }).catch((err)=>{
      console.log(err)
    })
  }
  if(datausers.length===0){
    return <div>loading</div>
  }
  return (
    <Fragment>
      <button onClick={toggleadd}>add data</button>
      <Modal title={`edit data ${datausersedit.username}`} toggle={toggle} modal={modal} actionfunc={Updatedata}>
        <input type='text' className='form-control' value={datausersedit.username} onChange={e=>setdatausersedit({...datausersedit,username:e.target.value})}/>
        <input type='text' className='form-control' value={datausersedit.email} onChange={e=>setdatausersedit({...datausersedit,email:e.target.value})}/>
        <input type='number' className='form-control' value={datausersedit.usia} onChange={e=>setdatausersedit({...datausersedit,usia:e.target.value})}/>
        <CustomInput type='file' label={editimagefile.editimagefilename} id='editmodal' className='form-control' onChange={oneditImageFileChange} />
        <select className='form-control' value={datausersedit.roleid} onChange={e=>setdatausersedit({...datausersedit,roleid:e.target.value})}>
          <option hidden>piliih category</option>
          {
            roles.map((val,index)=>{
              return(
              <option key={index} value={val.id}>
                {val.nama}
              </option>
              )
            })
          }
        </select>
      </Modal>
      <Modal title='add data' toggle={toggleadd} modal={modaladd} actionfunc={adddata} >
        <input type='text' placeholder='username' className='form-control' ref={dataadd.username} />
        <input type='text' placeholder='email' className='form-control' ref={dataadd.email}/>
        <input type='number' placeholder='usia' className='form-control' ref={dataadd.usia} />
        <CustomInput type='file' label={addimagefile.addImageFileName} id='addImagePost' className='form-control' onChange={onAddImageFileChange} />
        <select className='form-control' ref={dataadd.roleid}>
          <option hidden>piliih category</option>
          {
            roles.map((val,index)=>{
              return(
              <option key={index} value={val.id}>
                {val.nama}
              </option>
              )
            })
          }
        </select>
      </Modal>
      <Modal title='delete data' toggle={toggledelete} modal={modaldelete}>
        fsdasd delete
      </Modal>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>username</th>
            <th>image</th>
            <th>email</th>
            <th>phone</th>
            <th>usia</th>
            <th>role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {renderusers()}
        </tbody>
    </Table>
    </Fragment>
  );
}

export default ManageAdmin;
