/**
 * Created by Kalana on 3/9/2016.
 */

//var https = require('https');
var http = require('http');
//TO GET everything
function GETzilla(options, onres) {

    var result;
    http.request(options, function(response) {
        //console.log('STATUS: ' + response.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(response.headers));
        response.setEncoding('utf8');

        response.on('data', function (chunk) {
            //console.log('BODY: ' + chunk);
            result += chunk.toString();
            result = result.replace('undefined','');
            //result = result.replace(/\\/g,'');
            //result=JSON.stringify(chunk);

            //console.log(result);
            //console.log(str);


        });

        response.on('end', function () {
            //console.log(result);
            //var obj=result;
            //console.log(obj);
            onres(result);
        });
        response.on('error', function (error) {
            console.log('Error Occured error code: ' + error);
        });



    }).end();
    //console.log(data);

}

//TO POST everything
function POSTmaster(post_data, options, onres) {


    var result;
    // Set up the request
    var post_req=http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            result += chunk.toString();
            result = result.replace('undefined','');
            //console.log('Response: ' + chunk);
        });
        res.on('end', function () {
            //console.log(result);
            //var obj=result;
            //console.log(obj);
            onres(result);

        });
        res.on('error', function (error) {
            console.log('Error Occurred error code: ' + error);
        });


    });

    post_req.write(post_data);
    post_req.end();

    // post the data


}

exports.GETzilla =GETzilla;
exports.POSTmaster =POSTmaster;

