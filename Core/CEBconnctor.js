/**
 * Created by Kalana on 9/19/2016.
 */

var restMan = require ('./RESTrequestManager');
var configuration = require ('config');
//var host = "developer.duoworld.com";
//var port = 4000;
var socket = require('socket.io-client')("http://" + configuration.services.cebUrl  + ":" + configuration.services.cebPort);
var regJson = {"userName":"PaymentManager","securityToken":configuration.host.token,"resourceClass":"server"};

socket.emit ("register", regJson, function(){
    console.log ("Registered!!");
});





function message(data){

    //console.log(data)
    var options = {
        headers: {
            securityToken:data.securityToken
        },
        host: data.origin,
        //port: 80,
        path: '/apis/usercommon/getSharableObjects/',
        method: 'GET'
    };

    console.log(options);
    restMan.GETzilla(options, function(found){
        //console.log(found)
        var user= JSON.parse(found);
        for (var index in user){


            console.log(user[index]);
            console.log('message sent');
            var obj={
                "type":"command",
                "name":"notification",
                "data":{
                    "type": "shell",
                    "from": "RatingEngine",
                    "to": user[index].Id,
                    "message": data.message,
                    "origin":data.origin
                }

            };

            socket.emit("command",obj);

        }

    });



}

//exports.connect=connect;
exports.warningMessage=message;


