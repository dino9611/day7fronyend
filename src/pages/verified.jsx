import React from 'react';
import Axios from 'axios'
import queryString from 'query-string'
import { API_URL } from '../supports';


class Verified extends React.Component {
    state = {
        laoding:true,
        status:'Unverified',

      }
    componentDidMount(){
        var params=queryString.parse(this.props.location.search)
        console.log(params)
        var username=params.username
        var password=params.password
        Axios.put(`${API_URL}/user/verifikasiemail`,{
            username,password
        }).then((res)=>{
            console.log(res.data)
            this.setState({status:'berhasil'})
        }).catch((err)=>{
            console.log(err)
            this.setState({status:'gagal'})
        })
    }
    render() { 
        if(this.state.status==='berhasil'){
            return (
                <div>
                    <center>
                        <h1>email anda sukses terverifikasi</h1>
                        <h1>Selamat bergabung di instagrin</h1>
                        
                    </center>
                </div>
              );
        }else if(this.state.status==='gagal'){
            return(
                <div>
                    <center>
                        <h1>Gagal memferifikasi email anda</h1>
                        <h1>mohon refresh kembali</h1>
                    </center>
                </div>
            )
        }
        return(
        <div>
            <center>
                <h1>sedang memverifikasi</h1>
            </center>
        </div>
        )
    }
}
 
export default Verified;