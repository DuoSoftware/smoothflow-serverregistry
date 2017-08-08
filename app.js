var config = require('config');
var restify = require('restify');
var sh = require('shelljs');
//console.log('SUPPRESS_NO_CONFIG_WARNING: ' + config.util.getEnv('SUPPRESS_NO_CONFIG_WARNING'));


var Authorization = require('./Core/Authorization');
var CEBconnctor = require('./Core/CEBconnctor');






process.on('uncaughtException', function (err) {
    //Any code you need to handle or not handle the error
    console.error(err);
    console.log("Node NOT Exiting...");
});

var server = restify.createServer({
    name: "SmoothFlow Payment Service",
    version : "1.0.0"
});




server.use(restify.CORS());

server.opts(/.*/, function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
    res.send(200);
    return next();
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
/*
 server.use(restify.authorizationParser());



 server.use(function (req, res, next) {
 /!**
 * @param req          request object.
 * @param req.headers   headers sent in request.
 * @param req.headers.tenantid   tenantId of user
 * @param req.headers.tenantId   tenantId of user
 * @param req.headers.securitytoken   securityToken of user
 * @param req.headers.securityToken   securityToken of user
 *!/


 if(req.url.substring(0,9)==='/webhook/'){
 next();
 }
 else{
 var token, tenantId;

 if(req.headers.securitytoken) token = req.headers.securitytoken;
 else if (req.headers.securityToken) token = req.headers.securityToken;

 if(req.headers.tenantid) tenantId = req.headers.tenantid;
 else if (req.headers.tenantId) tenantId = req.headers.tenantId;
 else tenantId = null;

 if(token)
 Authorization.validate(tenantId, token, function (found){
 if(found.response === 'succeeded'){
 next();
 }
 else{
 next(new restify.NotAuthorizedError("Invalid Security Token"));
 }
 });
 }


 });
 */



server.get('/test', function (req, res, next) {

    console.log("Test Received");

    res.send({"success": true});
    return next();


});

server.post('/webhook/publish', function (req, res, next) {

    console.log(req.body);


    /*
     echo "DockerName : ":$1
     echo "Tag : ":$2
     echo "FolderName : ":$3
     echo "ExecLocation : ":$4
     echo "Ports":$5:$6
     echo "ProcessName ":$7
     echo "RAM":$8
     echo "CPU":$9
     echo "SecurityToken ":${10}
     echo "Tenant":${11}
     */

    /*
     sudo cp $4 $path/PublishedDockers/$3/
     sudo cp /var/www/html/engine/DockerRelatedFiles/Dockerfile $path/PublishedDockers/$3/
     sudo docker build -t $1:$2 .
     echo "docker run -d --memory=$8 --cpus=$9 -p $5:$6 $1:$2 $7"
     sudo docker run -d --memory=$8 --cpus=$9 -p $5:$6 $1:$2 $7

     newport=$(($5 + 1))

     cd /var/www/html/engine/
     echo "./runner 10.240.0.6 $1 $newport $1_proxy ${10} ${11}"
     sudo ./runner 10.240.0.6 $1 $newport $1_proxy ${10} ${11}

     echo "Publishing to Docker is complete!"
    */

    var execloc = req.body.ExecLocation;
    execloc = execloc.replace('/var/www/html/engine/', '');

    console.log('wget  http://dev.smoothflow.io/engine/'+execloc +' -P /home/sflow/PublishedDockers/'+req.body.FolderName);

    var output = sh.exec('wget  http://dev.smoothflow.io/engine/'+execloc +' -P /home/sflow/PublishedDockers/'+req.body.FolderName ,{silent:true}).stdout;
    console.log(output);
    output = sh.exec('./home/sflow/smooth.sh '+ req.body.DockerName +' '+ req.body.Tag +' '+ req.body.FolderName +' '+'/home/sflow/PublishedDockers/'+ req.body.FolderName +' '+ req.body.PortA +' '+ req.body.PortB +' '+ req.body.ProcessName +' '+ req.body.RAM +' '+ req.body.CPU +' '+ req.body.SecurityToken +' '+ req.body.Tenant ,{silent:true}).stdout;




    console.log("trialend Request Received");
    res.send({"success": true});
    return next();


});


server.listen(config.host.port, function () {

    console.log("Server Registry is running on %d", config.host.port );

});



