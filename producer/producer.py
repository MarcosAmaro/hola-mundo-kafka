from kafka import KafkaProducer
from kafka.errors import KafkaError
import schedule, json, random, string, time

#Instancia un productor
producer = KafkaProducer(	
						 bootstrap_servers="localhost:9092",
                         value_serializer=lambda m: json.dumps(m).encode('utf-8')
						)

def producirMensaje():
    mensaje = {"titulo" : getRandomString(10), "cuerpo" : getRandomString(50), "foto" : "https://picsum.photos/200/300?random=" + str(random.randint(0,100))}
    producer.send("mensajes", mensaje)

def getRandomString(length):
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str

schedule.every(10).seconds.do(producirMensaje)

while True:
    schedule.run_pending()
    time.sleep(1)