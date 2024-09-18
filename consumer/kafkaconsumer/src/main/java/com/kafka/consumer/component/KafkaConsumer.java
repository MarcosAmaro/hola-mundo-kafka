package com.kafka.consumer.component;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
  
@Component
public class KafkaConsumer {

    @Autowired
    private SimpMessagingTemplate template;

    @KafkaListener(topics = "mensajes", groupId = "spring-boot")
    public void consume(String msg)
    {
        template.convertAndSend("/topic/mensaje", msg);
    }
}
