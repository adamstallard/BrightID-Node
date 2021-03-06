// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var config = require("./config/config");
var bodyParser = require('body-parser');
const NodeCache = require( "node-cache" );
const dataCache = new NodeCache(config.node_cache);

// BodyParser Middleware
app.use(bodyParser.json({limit: "100kb"}));
app.use(bodyParser.urlencoded({extended: false}));

if(config.is_dev){
    app.use(express.static(__dirname + '/node_modules'));
    app.get('/test', function(req, res,next){
        res.sendFile(__dirname + '/index.html');
    });
}

app.get('/', function(req, res,next){
    console.log("test");
    res.send("BrightID socket server");
});

app.post('/upload', function(req, res, next){
    var data = req.body.data;
    // save data in cache
    var id = req.body.uuid;

    dataCache.set(id, data, function(err, success){
        if(err){
            console.log(err);
        }
        var signal = JSON.stringify({
            signal: 'new_upload',
            uuid: id
        });
        io.to(id).emit("signals", signal);
        res.send({success:1});
    });
});

app.get("/download/:uuid", function(req, res, next){
    var data = dataCache.get(req.params.uuid);
    res.send({
        data: data || null
    });
});

io.on('connection', function(client){
    console.log('Client connected...');

    client.on('join', function(uuid){
        client.join(uuid);
    });
});

var port = config.port || 3000;
console.log("Listening on port: ", port);
server.listen(port, "localhost");
