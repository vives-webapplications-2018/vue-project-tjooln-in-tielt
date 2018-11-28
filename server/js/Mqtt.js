const mqtt = require('mqtt');

function Mqtt(broker, initialTopic, messageHandler){
    let self = this;
    this.client = mqtt.connect(broker);
    this.initialTopic = initialTopic;
    this.connected = false;
    this.messageHandler = messageHandler;
    
    this.end = function () {
        if (this.connected) {
            client.end();
        }
    };
}

module.exports = Mqtt;