# Noticias en tiempo real con Kafka, Spring Boot, Python, y React

Este proyecto es un sistema de transmisión en tiempo real de noticias utilizando Kafka como broker de mensajes. El sistema incluye:

- Un **Producer** en Python que genera y envía mensajes (noticias) a Kafka.
- Un **Consumer** en Java con Spring Boot que consume los mensajes de Kafka y los transmite en tiempo real a la vista mediante un WebSocket.
- Una **View** en React que recibe los mensajes a través del WebSocket y muestra las noticias en forma de tarjetas.

## Arquitectura

1. **Producer**: El productor de Kafka está hecho en Python y publica mensajes que representan noticias. Cada mensaje contiene un JSON con el título de la noticia, el cuerpo, y un enlace a una imagen.
   
2. **Consumer**: El consumidor de Kafka está implementado en Java usando Spring Boot. Consume los mensajes en tiempo real de un tópico de Kafka y los envía a la aplicación frontend (hecha en React) a través de un WebSocket.

3. **View**: La aplicación frontend está desarrollada con React y se conecta al WebSocket (**SockJsClient**) del consumidor para recibir las noticias en tiempo real. Cada noticia recibida se renderiza en una tarjeta (card) con el título, el cuerpo y la imagen.

## Requisitos

### Producer (Python)
- Python 3.x
- Kafka Python (`pip install kafka-python`)

### Consumer (Java Spring Boot)
- Java 11
- Spring Boot
- Kafka Client for Spring (`spring-kafka`)

### View (React)
- Node.js 8.x

## Configuración del entorno

### 1. Kafka
Para ejecutar el proyecto es necesario tener Kafka corriendo en local o en un entorno de red accesible. Si no tienes Kafka instalado, sigue estas instrucciones:

#### Con docker
1. Ejecutar el docker-compose-kafka.yml
   ```bash
   docker compose -f docker-compose-kafka.yml up -d
   ```
#### Para una instalación sin docker 
1. Descargar e instalar [Kafka](https://kafka.apache.org/quickstart).
2. Iniciar el servidor de Kafka:
   ```bash
   # Inicia Zookeeper (si es necesario, las nuevas versinoes de Kafka no lo requieren)
   bin/zookeeper-server-start.sh config/zookeeper.properties
   
   # Inicia Kafka
   bin/kafka-server-start.sh config/server.properties
   ```

### 2. Producer (Python)
1. Instala las dependencias necesarias:
   ```bash
   pip install kafka-python
   ```
   ```bash
   pip install schedule
   ```
2. Ejecuta el productor que enviará las noticias:
   ```bash
   python producer.py
   ```

El script `producer.py` generará y enviará noticias en formato JSON con la siguiente estructura:
```json
{
   "titulo": "Título de la noticia (string generado al azar)",
   "cuerpo": "Cuerpo de la noticia (string generado al azar)",
   "foto": "https://picsum.photos/200/300?random=(entero al azar)"
}
```

### 3. Consumer (Spring Boot)
1. El consumidor está configurado en el application.properties para un kafka corriendo en docker. 

2. Compila y ejecuta el proyecto:
   ```bash
   mvn spring-boot:run
   ```

El consumidor se conectará a Kafka, recibirá los mensajes y los enviará a la vista React mediante un WebSocket.

### 4. View (React)
1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Inicia la aplicación React:
   ```bash
   npm run start
   ```

La aplicación React se conectará automáticamente al WebSocket proporcionado por el consumidor de Kafka y mostrará las noticias en tiempo real en tarjetas con el título, cuerpo y la imagen.

## Cómo funciona

1. El productor de Python genera y envía mensajes de noticias a un tópico de Kafka.
2. El consumidor de Java con Spring Boot consume los mensajes en tiempo real y utiliza un WebSocket para enviarlos a la aplicación React.
3. La aplicación React recibe los mensajes y los renderiza como tarjetas en su interfaz.

## Kafbat UI

Si se levanta con el docker-compose-kafka.yml, se puede acceder a la UI de Kafka en http://localhost:9090