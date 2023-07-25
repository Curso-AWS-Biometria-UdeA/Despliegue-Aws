import React from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {Form, Button, Row, Col, Container, Modal} from 'react-bootstrap'


class Register extends React.Component{

    constructor(props){
        super(props)
        this.state = {
          id_number:"",
          type_id:"",
          first_name: "",
          last_name: "",
          email: "",
          email2: "",
          password: "",
          password2: "",
          validated: false,
          show_popup:false,
          show: false,
          popup:"",
          next:false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
      }


    handleChange=(event)=> {
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    handleClosePopup = () => {
        if(this.state.next){
            this.props.history.push({
                pathname:'/'
            }) 
        }
        else{
            this.setState({show_popup:false});
        }
      }

    handleShow = () => {
        this.setState({ show: true });
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleSubmit = (event) => {


        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            console.log("invalid form");
        }
        this.setState({validated: true})
        
        if((form.checkValidity()) && (this.state.email===this.state.email2) && (this.state.password===this.state.password2)){     
            
            var body = new FormData();
            body.append("id_number",this.state.id_number)
            body.append("type_id",this.state.type_id)
            body.append("name",this.state.first_name)
            body.append("last_name",this.state.last_name)
            body.append("email",this.state.email)
            body.append("password",this.state.password)

            console.log("id_number: ",this.state.id_number)
            console.log("type_id: ",this.state.type_id)
            console.log("name: ",this.state.first_name)
            console.log("lastName: ",this.state.last_name)
            console.log("email: ",this.state.email)
            console.log("password: ",this.state.password)
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-dat',
                }
            };

            axios.post(
                "http://minicurso-lb-225186985.us-east-1.elb.amazonaws.com/register_login/register",
                body,
                config)
                .then(res => { 
                  console.log(res.data)
                    if(res.data==="Usuario guardado exitosamente"){
                        this.setState({popup:"Usuario creado", show_popup:true, next:true})
                    }
                    else if (res.data==="Usuario ya existente"){
                        this.setState({popup:"Este usuario ya existe", show_popup:true,next:false})
                    }     
                },(err)=>{
                  console.log("Tenemos un error", err)
                })
        }
        else{
            if (this.state.email!==this.state.email2)
            this.setState({popup:"No coinciden los correos electrónicos", show_popup:true})

            if (this.state.password!==this.state.password2)
            this.setState({popup:"No coinciden las contraseña", show_popup:true})
        }

      };

    render() {
        return (
            <Container>
                <div className="cinta-superior">
                    <img
                        src={require("./static/logoudea.png")}
                        width="320"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </div>
                <div className="text-center pt-3">
                  <h2><b>Usuario nuevo</b></h2>
                </div>
                <hr />

                
                <Form noValidate validated={this.state.validated} onSubmit={e => this.handleSubmit(e)}>


                    <Row>
                        <Col md="5">
                            <Form.Group as={Row}>
                                <Form.Label column md="3">
                                    Apellido:
                                </Form.Label>
                                <Col md="8">
                                    <Form.Control
                                        required
                                        name="last_name"
                                        type="text"
                                        value={this.state.last_name} 
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </Form.Group>
                        </Col>

                        <Col md="7">
                            <Form.Group as={Row}>
                                <Form.Label column md="2">
                                    Nombre:
                                </Form.Label>
                                <Col md="6">
                                    <Form.Control
                                        required
                                        name="first_name"
                                        type="text"
                                        value={this.state.first_name} 
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="5">
                        <Form.Group as={Row}>
                            <Form.Label column md="3">
                                Tipo de documento:
                            </Form.Label>
                            <Col md="8">
                            <Form.Control 
                                required
                                as="select"  
                                name="type_id" 
                                value={this.state.type_id} 
                                onChange={this.handleChange}
                            >
                                <option value="" disabled>Elija...</option>
                                <option value="CC">Cédula de ciudadanía</option>
                                <option value="TI">Tarjeta de identidad</option>
                                <option value="TP">Tarjeta pasaporte</option>
                                <option value="CE">Cédula de extranjería</option>
                            </Form.Control>
                            </Col>
                        </Form.Group>
                        </Col>

                        <Col md="7">
                            <Form.Group as={Row}>
                                <Form.Label column md="2">
                                    Documento:
                                </Form.Label>
                                <Col md="6">
                                    <Form.Control
                                        required
                                        name="id_number" 
                                        type="text"
                                        pattern="[0-9]*"
                                        value={this.state.id_number} 
                                        onChange={this.handleChange}
                                    />
                                <Form.Control.Feedback type="invalid">Solo se permiten números (no agregue puntos)</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="5">
                            <Form.Group as={Row}>
                                <Form.Label column md="3">
                                    Email:
                                </Form.Label>
                                <Col md="8">
                                    <Form.Control
                                        required
                                        name="email"
                                        type="email"
                                        value={this.state.email} 
                                        onChange={this.handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">Ingrese un correo valido</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                        </Col>

                        <Col md="7">
                            <Form.Group as={Row}>
                                <Form.Label column md="2">
                                    Confirme email:
                                </Form.Label>
                                <Col md="6">
                                    <Form.Control
                                        required
                                        name="email2"
                                        type="email"
                                        value={this.state.email2} 
                                        onChange={this.handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid">Ingrese un correo valido</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row>
                        <Col md="5">
                            <Form.Group as={Row}>
                                <Form.Label column md="3">
                                    Contraseña:
                                </Form.Label>
                                <Col md="8">
                                    <Form.Control
                                        required
                                        name="password"
                                        type="password"
                                        pattern="[A-Za-z0-9]{6}"
                                        value={this.state.password} 
                                        onChange={this.handleChange}
                                    />
                                <Form.Control.Feedback type="invalid">Debe contener 6 caracteres</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                        </Col>

                        <Col md="7">
                            <Form.Group as={Row}>
                                <Form.Label column md="2">
                                    Confirme contraseña:
                                </Form.Label>
                                <Col md="6">
                                    <Form.Control
                                        required
                                        name="password2"
                                        type="password"
                                        pattern="[A-Za-z0-9]{6}"
                                        value={this.state.password2} 
                                        onChange={this.handleChange}
                                    />
                                <Form.Control.Feedback type="invalid">Debe contener 6 caracteres</Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>

                    <center>
                        <Button
                            variant="success mr-1"
                            type="submit">
                            Enviar
                        </Button>
                    </center>
                    <br />
                    <br />
                </Form>

                {/* Mensaje final */}
                <Modal show={this.state.show_popup} onHide={this.handleClosePopup}>
                    <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">{this.state.popup}</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                    <Button variant="primary" onClick={this.handleClosePopup}>
                        Salir
                    </Button>
                    </Modal.Footer>
                </Modal>



            </Container>
        )
    }
}

export default withRouter(Register)