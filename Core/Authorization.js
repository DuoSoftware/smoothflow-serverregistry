/**
 * Created by Kalana on 6/27/2017.
 */

var restMan = require('./RESTrequestManager');
var config = require('config');

function validate(tenantID, token, callback){


    var options;
    //console.log(config.host.auth)
    switch(config.host.auth) {

        case 'DuoAuth':
            if(token){


                options = {
                    headers: {},
                    host: config.services.duoAuthURL,
                    port: config.services.duoAuthPort,
                    path: '/GetSession/'+token+'/'+tenantID,
                    method: 'GET'
                };

                restMan.GETzilla(options,function (found) {


                    /**
                     * @param sessionData          Auth Session object
                     * @param result.Error         Error param of auth object, will only be present on error
                     */

                    var sessionData;

                    try {
                        console.log(found);
                        sessionData = JSON.parse(found);

                        if(sessionData.Error==undefined){
                            callback({"response":"succeeded","error":null});
                        }
                        else{
                            callback({"response":"failed","error":"Invalid Token"});
                        }
                    } catch (e) {
                        console.log('INVALID TOKEN');
                        response(console.error(e));
                        //isValid = false;
                    }

                });

            }
            else{
                callback({"response":"failed","error":"Invalid Inputs"});
            }
            break;


        case 'AzureActiveDirectory':



            options = {
                headers: {
                    securitytoken: token
                },
                host: config.services.azureAuthURL,
                //port: config.host.duoAuthPort,
                path: '/auth/GetSession',
                method: 'GET'
            };


            restMan.GETzilla(options,function (found) {

                /**
                 * @param sessionData          Auth Session object
                 * @param sessionData.Status         Status param of auth object false if invalid
                 * @param sessionData.Message         Status param of auth object false if invalid
                 */

                var sessionData;

                //console.log(found)
                if(found){

                    try {
                        sessionData = JSON.parse(found);

                        if(sessionData.Status==true){
                            callback({"response":"succeeded","error":null, "customMessage" : sessionData.Message});
                        }
                        else{
                            callback({"response":"failed","error":"Invalid Token", "customMessage" : sessionData.Message});
                        }
                    } catch (e) {
                        console.log(e);
                        response(e);
                    }
                }
                else {
                    console.log('Auth Service Error');
                    callback({"response":"failed","error":"Auth Service Error"});

                }


            });
            break;
        default:
            callback({"response":"failed","error":"Auth Module Invalid"})
    }



}

exports.validate = validate;
