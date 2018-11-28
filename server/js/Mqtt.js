const mqtt = require('mqtt');

function Mqtt(broker, initialTopic, messageHandler){
    let self = this;
    this.client = mqtt.connect(broker);
    this.initialTopic = initialTopic;
    this.connected = false;
    this.messageHandler = messageHandler;
    
}

module.exports = Mqtt;