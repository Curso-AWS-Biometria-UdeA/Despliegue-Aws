import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {Button, Container, Row, Col, ProgressBar, Modal} from 'react-bootstrap'


class Recording extends React.Component {
    constructor(props) {
        super(props);
        this.videoTag = React.createRef()

        this.state = {
          id_number:"",
          time_duration: 5000, //5seg
          uploadPercentage: 0,
          recording: false,
          recorded: false,
          url_video: null,
          videoSrc:null,
          minutes:0,
          seconds:0,
          blob_video:null,
          flag_send:false,
          show_popup:false,
          info_send:"Enviando video",
          age: '',
          gender: '',
          response:false,
        };
    }

    componentDidMount() {
      // getting access to webcam
       console.log("Estado anterior",this.props.location.state)
      
       this.setState({id_number:this.props.location.state["id_number"]})

       navigator.mediaDevices.getUserMedia({video: {width: 640, height: 480}})
            .then(stream => {
                var options = {
                  videoBitsPerSecond: 2500000,
                  mimeType: 'video/webm;codecs=vp8,opus', 
                }
                this.videoTag.current.srcObject = stream;
                this.mediaRecorder = new MediaRecorder(stream,options);
                // init data storage for video chunks
                
                this.chunks = [];
                // listen for data from media recorder
                this.mediaRecorder.ondataavailable = e => {
                  if (e.data && e.data.size > 0) {
                    this.chunks.push(e.data);                    
                  }
                };
            }
            )
            .catch(function (err) {
              console.log("error : " + err)
              alert('No se pudo acceder a la cámara o el micrófono, por favor brinde los permisos para continuar.')
            });
    }

    handleClosePopup = () => {
      this.setState({ show_popup: false , response:false, age:'', gender:''});
      this.restartAudio()
    }


    handleClose = () => {
      console.log("hola mundo")
    }

    timer_duration(){
      console.log("Guardar y enviar video")
      this.stopRecording()
      clearInterval(this.clock_duration)
      clearInterval(this.chronometer)
  }

    timer_chronometer(){
        this.setState(({ seconds }) => ({
            seconds: seconds + 1
        }))
    }

    startRecording(e) {
        e.preventDefault();
        // wipe old data chunks
        this.chunks = [];
        // start recorder with 10ms buffer
        this.mediaRecorder.start(10);
        // say that we're recording
        this.setState({recording: true});
        this.clock_duration = setInterval(this.timer_duration.bind(this), this.state.time_duration);
        this.chronometer = setInterval(this.timer_chronometer.bind(this), 1000); // cada seg

    }

    stopRecording() {
        //e.preventDefault();
        // stop the recorder
        this.mediaRecorder.stop();
        // say that we're not recording
        this.setState({recording: false});
        // save the video to memory
        this.saveAudio();
    }

    saveAudio() {
        // convert saved chunks to blob
        const blob = new Blob(this.chunks, {type : "video/webm"});
        //const blob = new Blob(this.chunks);
        console.log("Blob",blob)
        // generate video url from blob
        const audioURL = URL.createObjectURL(blob);
        // append videoURL to list of saved videos for rendering
        this.setState({url_video:audioURL,blob_video:blob, recorded:true});
    }

    restartAudio() {
      // filter out current videoURL from the list of saved videos
      this.setState({recording: false, recorded: false, url_video: null, videoSrc:null,
         blob_video:null, uploadPercentage:0, flag_send: false, info_send:"Enviando video",seconds:0,minutes:0});
    }

    sendRecording(e) {
      this.setState({flag_send: true})
      let formdata = new FormData()
      formdata.append("id_number",this.state.id_number)
      formdata.append("file",this.state.blob_video,'task.webm')
      const config = {
        timeout:200000, //200 segundos
        headers: {
          'Content-Type': 'multipart/form-dat',
        },
        onUploadProgress: (progressEvent) => {
          const {loaded, total} = progressEvent
          let percent = Math.floor( (loaded * 100) / total)
          console.log(`${loaded}kb of ${total}kb | ${percent}%`)
          if( percent < 100 ){
            this.setState({ uploadPercentage: percent})
          }
          if(percent === 100){
            this.setState({ show_popup: true , uploadPercentage: 100, info_send: "Video enviado"})
          }
        }        
      };


      axios.post(
        "http://minicurso-lb-225186985.us-east-1.elb.amazonaws.com/upload_video",
        formdata,
        config).then(res => { 
          console.log(res)
          this.setState({flag_send: false, age:res.data['age'], gender:res.data['gender'],response:true })
        },(err)=>{
          console.log("Tenemos un error", err)
        })
    
    }



    render() {
        const {recording, url_video, recorded, uploadPercentage, info_send, flag_send} = this.state;

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
                  <h1><b>Predicción de edad y género</b></h1>
                </div>
              <hr />
              <div>
                <div>
                  <h3><b>Instrucciones:</b></h3>
                  <ol>
                  <li>Cuando este listo presione el botón GRABAR</li>
                      <li>La grabación se dentendra sola en los 5 segundos </li>
                      <li>Presione luego ENVIAR</li>
                      <li>Espere la predicción de su edad y género</li>
                  </ol> 
                </div>
                <br/>
              </div>
                <Row>
                  <Col center-block="true">
                    <div className="embed-responsive embed-responsive-16by9">
                      <video
                        muted
                        id={this.props.id}
                        ref={this.videoTag}
                        audio="false"
                        width="200"
                        height="200"
                        autoPlay
                        title={this.props.title}>
                        controls muted
                      </video> 
                    </div>  
                  </Col>

                <Col center-block="true">
                  <div className="embed-responsive embed-responsive-16by9">
                      {recorded && <video 
                          controls="controls"
                          width={200}
                          height={200}
                          src={url_video}
                      >
                      </video>}
                  </div>  
                </Col>
                </Row>

                <br />
                {uploadPercentage > 0 && 
                <p className="text-center"><b>{info_send}</b></p>}
                {uploadPercentage > 0 && <ProgressBar now={uploadPercentage} active="true" label={`${uploadPercentage}%`} /> }
                {uploadPercentage > 0 && <br />}
                <Row>
                  {<Button variant="primary mr-1" disabled={recording || recorded} onClick={e => this.startRecording(e)}>GRABAR</Button>}
                  {recorded && <Button variant="primary mr-1" onClick={e => this.restartAudio(e)}>REINICIAR</Button>}
                {(recording || recorded) && <p className="chronometer">{this.state.minutes}:{this.state.seconds<10?"0"+this.state.seconds:this.state.seconds}</p>
                }
                </Row>
                <br />
                <Row>
                  {<Button
                    variant="success mr-1"
                    disabled={!recorded || flag_send || uploadPercentage===100}
                    onClick={e => this.sendRecording(e)}>
                    ENVIAR
                  </Button>}
                </Row>



                {/* Mensaje final */}
                <Modal show={this.state.show_popup} onHide={this.handleClose}>
                    <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">Predicción de edad y género</Modal.Title>
                    </Modal.Header>
                    <br/>
                    <center>
                      {!this.state.response && <p>Su video esta siendo analizado, por favor espere ...</p>}

                      {this.state.response && <p>Edad estimada: {this.state.age} años </p>}
                      {this.state.response && <p>Género estimado: {this.state.gender==='F'?'Femenino':'Masculino'}</p>}

                    </center>
                    <Modal.Footer>
                    <Button variant="primary" disabled={!this.state.response} onClick={this.handleClosePopup}>
                        Salir
                    </Button>
                    </Modal.Footer>
                </Modal>


            </Container> 
        )}
}


export default withRouter(Recording)