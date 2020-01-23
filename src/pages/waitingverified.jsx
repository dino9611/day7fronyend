import React, { Component } from 'react';
import Axios from 'axios'
import {connect} from 'react-redux'
import { APIURL } from '../helper/apiurl';

class WaitingVerification extends Component {
    onBtnResendEmailClick=()=>{
        Axios.post(`${APIURL}/user/resendemailver`,{
            username:this.props.username,
            email:this.props.email
        }).then((res)=>{
            console.log(res.data)
            alert('email berhasil')
        }).catch((err)=>{
            console.log(err)
        })
    }
    render() {
        return (
            <div>
                <h2>Tolong Diperhatikan</h2>
                <p>Silahkan mengecheck email anda untuk verifikasi account anda</p>
                <p>
                    Bila anda tidak mendapatkan email dari Penguasa Club Hokage
                    harap cemas, dan click button dibawah untuk Resend
                </p>
                <input type="button" value="Resend Email" onClick={this.onBtnResendEmailClick} />
            </div>
        )
    }
}
const mapStateToProps = ({auth}) => {
    return {
        email:auth.email,
        username: auth.username 
    }
}
export default connect(mapStateToProps) (WaitingVerification);