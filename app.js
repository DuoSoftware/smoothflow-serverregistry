var config = require('config');
var restify = require('restify');
var sh = require('shelljs');

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
//server.use(restify.authorizationParser());



/*
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




server.post('/webhook/publishDocker/', function (req, res, next) {

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

    /*var output = sh.exec('wget http://dev.smoothflow.io/engine/'+req.body.ExecLocation,{silent:true}).stdout;
    console.log(output);
    console.log("trialend Request Received");*/
    res.send({"success": true});
    return next();

});


server.listen(config.host.port, function () {
    console.log("Server Registry Client is running on %d", config.host.port );

});