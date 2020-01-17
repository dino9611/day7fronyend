import React, {useEffect,Fragment,useState} from 'react';
import './App.css';
import Axios from 'axios'
import {APIURL} from './helper/apiurl'
import { Table } from 'reactstrap';
import Modal from './components/modal'

// let didupdatejalan=0
function App() {
  
  const [datausers,setdatausers]=useState([])
  const [datausersedit,setdatausersedit]=useState([])
  const [roles,setroles]=useState([])
  const [modal, setModal] = useState(false);
  const [modaldelete, setModaldelete] = useState(false);

  const toggle = () =>{
    setModal(!modal)
  };
  const opentogel = (index) =>{
    setdatausersedit(datausers[index])
    setModal(true)
  };
  const toggledelete=()=>setModaldelete(!modaldelete)


  useEffect(()=>{
    console.log('didmount')
    Axios.get(`${APIURL}users`)
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
  console.log(datausersedit)
  
  const Updatedata=()=>{
    console.log(datausersedit)
    var data={
      username:datausersedit.username,
      email:datausersedit.email,
      usia:datausersedit.usia,
      roleid:datausersedit.roleid,
    }
    Axios.put(`${APIURL}users/${datausersedit.id}`,data)
    .then((res)=>{
      setdatausers(res.data.datauser)
      setroles(res.data.datarole)
      setModal(!modal)
    }).catch((err)=>{
      console.log(err)
    })
  }

  if(datausers.length===0){
    return <div>loading</div>
  }
  return (
    <Fragment>
      <button>add data</button>
      <Modal title='edit data' toggle={toggle} modal={modal} actionfunc={Updatedata}>
        <input type='text' className='form-control' value={datausersedit.username} onChange={e=>setdatausersedit({...datausersedit,username:e.target.value})}/>
        <input type='text' className='form-control' value={datausersedit.email} onChange={e=>setdatausersedit({...datausersedit,email:e.target.value})}/>
        <input type='number' className='form-control' value={datausersedit.usia} onChange={e=>setdatausersedit({...datausersedit,usia:e.target.value})}/>
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
      <Modal title='delete data' toggle={toggledelete} modal={modaldelete}>
        fsdasd delete
      </Modal>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>username</th>
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

export default App;
