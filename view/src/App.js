import React, { useState } from 'react';
import SockJsClient from 'react-stomp';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBContainer
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

const SOCKET_URL = 'http://localhost:8080/mensajes';

const App = () => {
  const [mensajes, setMessage] = useState([]);

  let onConnected = () => {
    console.log("Conectado al websocket")
  }

  let onMessageReceived = (msg) => {
    setMessage(mensajes.concat(msg));
    console.log(mensajes);
  }

  return (
    <div>
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/mensaje']}
        onConnect={onConnected}
        onDisconnect={console.log("Desconectado!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />
      <div className='h-auto w-auto'>
      <MDBContainer>

        <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
        {mensajes.map((item, index) => {
          return (       
                <MDBCol>
                  <MDBCard>
                    <MDBCardImage src={item.foto} position='top' alt='...' className='img-thumbnail' 
                    style={{height:300, width:200, margin: '0 auto'}} />
                    <MDBCardBody>
                      <MDBCardTitle>{item.titulo}</MDBCardTitle>
                      <MDBCardText>
                        {item.cuerpo}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
              </MDBCol>
          )
        })}
        </MDBRow>
        </MDBContainer>
        </div>
    </div>
  );
}

export default App;
