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

    this.client.on('connect', function () {
        self.client.subscribe('Skribble.bert', function (err) {
            if (!err) {
                self.subscribeTopic(self.initialTopic);
            }
        });
    });

    this.client.on('message', (topic, message) => {
        // message is Buffer
        this.messageHandler(topic, message);
        console.log(message.toString());
    });
}

module.exports = Mqtt;