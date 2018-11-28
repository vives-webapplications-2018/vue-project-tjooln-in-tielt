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

    this.subscribeTopic = function(topicName){
        self.client.subscribe(topicName, function (err){
            if(!err){
                self.client.publish(topicName, 'Scribble server is listening to ' + topicName);
            }
        });
    };
}

module.exports = Mqtt;