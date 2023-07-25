import React from 'react'
import axios from 'axios'
import{withRouter} from "react-router-dom" 

import {Container, Form, Button, Modal} from 'react-bootstrap'


class Login extends React.Component {

    constructor(props){
        super(props)
        this.state={
            id_number:'',
            pass:'',
            popup:'',
            show_popup:false
        }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange=(event)=> {
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    handleClose = () => {
        this.setState({show_popup:false});
      }

    handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            console.log("Algún campo esta vacío");
        }

        if (form.checkValidity()){
            console.log("documento", this.state.id_number)
            console.log("contraseña", this.state.pass)

            var body = new FormData();
            body.append("id_number",this.state.id_number)
            body.append("password",this.state.pass)
      
            const config = {
              headers: {
                'Content-Type': 'multipart/form-dat',
              }
            };
            axios.post(
              "http://minicurso-lb-225186985.us-east-1.elb.amazonaws.com/register_login/login",
              body,
              config).then(res => { 
                console.log(res.data)
                if(res.data === 'Ingreso exitoso'){
                    this.props.history.push({
                        pathname:'/recording',
                        state:{"id_number":this.state.id_number},
                      })
                  }
                  else{
                    console.log("Ingreso no exitoso")
                    this.setState({popup:"Usuario no existente o contraseña invalida", show_popup:true})
                }
            
              },(err)=>{
                console.log("Tenemos un error", err)
              })
        }
    }

    render() {
        return(
            <Container>
                <div className="cinta-superior">
                    <img
                        src={require("./static/logoudea.png")}
                        width="320"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </div>
                <center>
                    <h1><b>Verificación de edad y género (UdeA)</b></h1>
                </center>
                <hr />
                <br/>
                <br/>

                <div className="form">
                    <Form noValidate onSubmit={e => this.handleSubmit(e)}>
                        <Form.Group>
                            <Form.Control
                            required 
                            name="id_number"
                            type="text"
                            placeholder="Documento de identidad"
                            onChange={this.handleChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control
                            required 
                            name="pass"
                            type="password"
                            placeholder="Contraseña"
                            onChange={this.handleChange}
                            />
                        </Form.Group>

                        <Button
                            variant="success"
                            type='submit'
                        >
                            Ingresar
                        </Button>
                    </Form>
                    <p className="message">¿No estas registrado? <a href="/register">Regístrate</a></p>
                </div>


            {/* Mensaje final */}
            <Modal show={this.state.show_popup} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{this.state.popup}</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                <Button variant="primary" onClick={this.handleClose}>
                    Salir
                </Button>
                </Modal.Footer>
            </Modal>


            </Container>
        )
    }
}

export default withRouter(Login)