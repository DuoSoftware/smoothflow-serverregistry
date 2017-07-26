/**
 * Created by Kalana on 7/12/2017.
 */

var amqp = require('amqplib/callback_api');

function Extension() {

    var channel;
    var ex = 'rating_engine';

    function start (settings){

        var Duos = settings.exchange;
        console.log("Initializing RabbitMQ...");

        amqp.connect("amqp://" + settings.userName + ":" + settings.password +  "@" + settings.host, function(err, conn) {

            conn.createChannel(function(err, ch) {

                if(err){
                    console.log(err);
                }
                else{
                    console.log("Connected to RabbitMQ");
                    ch.assertExchange(Duos, 'fanout', {durable: false});
                    channel = ch;
                }
            });
        });

    }

    function saveContent (content, key){
        var jsonString = JSON.stringify(content);
        channel.publish(ex, key, new Buffer(jsonString));
    }


    return {
        start: function(parameters){
            start(parameters)
        },
        saveContent: function(content, key){
            console.log("Sending to RabbitMQ");
            saveContent (content, key)
        }
    }
}




exports.newInstance = function(){
    return  new Extension();
};
