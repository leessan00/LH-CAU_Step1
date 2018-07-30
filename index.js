var request = require("request");
var express = require("express");

var router = express.Router();

// DEFINE MODEL
var Room = require('../models/room');
var Room2 = require('../models/room2');


// H207_205-1 Start
///////////////////////////////////



    // GET ALL Datas : MongoBD 내 모든 데이터 불러오기 
    router.get('/api/H207_205-1', function(req, res){


    Room.find(function(err, docs){
        if(err) return res.status(500).send({error: 'Database failure'});

        var array = {"data": docs}

        res.json(array);

    })


    });


    // GET Data by _id
    router.get('/api/H207_205-1/:room_id', function(req, res){

        Room.findOne({_id: req.params.room_id}, function(err, room){
            if(err) return res.status(500).json({error: err});
            if(!room) return res.status(404).json({error: 'Data not founded'});

            var array = {"data": room}

            res.json(array);
        })

    });

        // GET Data by num
    router.get('/api/H207_205-1/num/:num', function(req, res){

        Room.find({num: req.params.num}, {_id:0, date:1, time: 1, temperature:1, humidity:1, memo:1}, function(err, docs){
            if(err) return res.status(500).json({error: err});
            if(docs.length === 0) return res.status(404).json({error: 'Data not founded'});

            var array = {"data": docs}
            res.json(array);
        })

    });

    // GET Datas by Date
    router.get('/api/H207_205-1/date/:date', function(req, res){

        Room.find({date: req.params.date}, {_id:0, time: 1, temperature:1, humidity:1, num:1, memo:1}, function(err, docs){
            if(err) return res.status(500).json({error: err});
            if(docs.length === 0) return res.status(404).json({error: 'Data not founded'});

            var array = {"data": docs}
            res.json(array);
        })

    });


    // GET Datas by Date and num
    router.get('/api/H207_205-1/num/date/:num/:date', function(req, res){

        Room.find({$and:[{date: req.params.date}, {num: req.params.num}]}, {_id:0, time: 1, temperature:1, humidity:1, memo:1}, function(err, docs){
            if(err) return res.status(500).json({error: err});
            if(docs.length === 0) return res.status(404).json({error: 'Data not founded'});

            var array = {"data": docs}
            res.json(array);
        })

    });

    // GET Datas by Time
    router.get('/api/H207_205-1/time/:time', function(req, res){

        Room.find({time: req.params.time}, {_id:0, date: 1, temperature:1, humidity:1, num:1, memo:1}, function(err, docs){
            if(err) return res.status(500).json({error: err});
            if(docs.length === 0) return res.status(404).json({error: 'Data not founded'});

            var array = {"data": docs}
            res.json(array);
        })

    });

    // GET Datas by Temp
    router.get('/api/H207_205-1/temp/:temperature', function(req, res){

        Room.find({temperature: req.params.temperature}, {_id:0, date: 1, time:1, num:1,}, function(err, docs){
            if(err) return res.status(500).json({error: err});
            if(docs.length === 0) return res.status(404).json({error: 'Data not founded'});

            var array = {"data": docs}
            res.json(array);
        })

    });

    // GET Datas by Humi
    router.get('/api/H207_205-1/humi/:humidity', function(req, res){

        Room.find({humidity: req.params.humidity}, {_id:0, date: 1, time:1, num:1,}, function(err, docs){
            if(err) return res.status(500).json({error: err});
            if(docs.length === 0) return res.status(404).json({error: 'Data not founded'});

            var array = {"data": docs}
            res.json(array);
        })

    });


    // Save Data H207_205-1 MongoDB
    router.post('/api/H207_205-1', function(req, res){

    var room = new Room();
    room.date = req.body.date;
    room.time = req.body.time;
    room.temperature = req.body.temperature;
    room.humidity = req.body.humidity; 
    room.num = req.body.no;
    room.memo = req.body.memo;
    // room.published_date = new Date(req.body.published_date);

    room.save(function(err){
        if(err){
            console.error(err);
            res.json({result: "Failed"});
            return;
        }

        res.json({result: "Success"});

    });


    });

    // UPDATE H207_205-1 Data
    router.put('/api/H207_205-1/:room_id', function(req, res){


        Room.update({ _id: req.params.room_id }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'Database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'Data not founded' });
            res.json( { message: 'Data updated' } );
        })


    });

    // DELETE H207_205-1 Data by _id
    router.delete('/api/H207_205-1/:room_id', function(req, res){


        Room.remove({ _id: req.params.room_id }, function(err, output){

            if(err) return res.status(500).json({ error: "Data failure" });
            if(!output.n) return res.status(404).json({ error: "Data not founded" });
            res.json({ message: "Data deleted" });
            
            // res.status(204).end();
    })


    });

    // DELETE H207_205-1 All Data
    router.delete('/api/H207_205-1/', function(req, res){


        Room.remove(function(err, output){

            if(err) return res.status(500).json({ error: "Data failure" });
            if(!output.n) return res.status(404).json({ error: "Data not founded" });
            res.json({ message: "Data deleted" });
            
            // res.status(204).end();
    })


    });




/////// 주기적으로 url 에 요청하여 응답 받은 json 데이터를 저장하는 것 
var cnt = 0;
var id_cnt;

function displayValues()
{
    console.log("cnt = %d", cnt);
}


function updatecnt()
{
    cnt +=1;
    displayValues();

     request('http://165.194.85.199:53147/lhcau/room/H207_205_1', { json: true }, (err, res, body) => {
     if (err) { return console.log(err); }

    var Array = body;

    for (var i = 0; i < Array.length; i++) {
        var room = new Room();

        room.date = Array[i].date;
        room.time = Array[i].time;
        room.temperature = Array[i].temperature;
        room.humidity = Array[i].humidity; 
        room.num = Array[i].no;
        // room.memo = Array[0].memo;
        // room.published_date = new Date(req.body.published_date);

        console.log(Array.length);
        console.log(Array[i].date);
        console.log(Array[i].time);
        console.log(Array[i].humidity);
        console.log(Array[i].temperature);
        console.log(Array[i].no);
        // console.log(Array[0].memo);

        room.save(function(err){
        if(err){
            console.error(err);
            return;
        }


        });

    }

        console.log("Successfully H207_205-1 Datas Saved");

    });
}



///////////////////////////////////
// H207_205-1 end

 


// H310_720 Start
/////////////////////////////



   // GET ALL Datas : MongoBD 내 모든 데이터 불러오기 
    router.get('/api/H310_720', function(req, res){


    Room2.find(function(err, docs){
        if(err) return res.status(500).send({error: 'Database failure'});

        var array = {"data": docs}

        res.json(array);

    })


    });


        // GET Data by _id
    router.get('/api/H310_720/:room_id', function(req, res){

        Room2.findOne({_id: req.params.room_id}, function(err, room){
            if(err) return res.status(500).json({error: err});
            if(!room) return res.status(404).json({error: 'Data not founded'});

            var array = {"data": room}
            res.json(room);
        })

    });

        // GET Data by num
    router.get('/api/H310_720/num/:num', function(req, res){

        Room2.find({num: req.params.num}, {_id:0, date:1, time: 1, temperature:1, humidity:1, memo:1}, function(err, docs){
            if(err) return res.status(500).json({error: err});
            if(docs.length === 0) return res.status(404).json({error: 'Data not founded'});

            var array = {"data": docs}
            res.json(array);
        })

    });

    // GET Datas by Date
    router.get('/api/H310_720/date/:date', function(req, res){

        Room2.find({date: req.params.date}, {_id:0, time: 1, temperature:1, humidity:1, num:1, memo:1}, function(err, docs){
            if(err) return res.status(500).json({error: err});
            if(docs.length === 0) return res.status(404).json({error: 'Data not founded'});

            var array = {"data": docs}
            res.json(array);
        })

    });

    // GET Datas by Date and num
    router.get('/api/H310_720/num/date/:num/:date', function(req, res){

        Room2.find({$and:[{date: req.params.date}, {num: req.params.num}]}, {_id:0, time: 1, temperature:1, humidity:1, memo:1}, function(err, docs){
            if(err) return res.status(500).json({error: err});
            if(docs.length === 0) return res.status(404).json({error: 'Data not founded'});

            var array = {"data": docs}
            res.json(array);
        })

    });

    // GET Datas by Time
    router.get('/api/H310_720/time/:time', function(req, res){

        Room2.find({time: req.params.time}, {_id:0, date: 1, temperature:1, humidity:1, num:1, memo:1}, function(err, docs){
            if(err) return res.status(500).json({error: err});
            if(docs.length === 0) return res.status(404).json({error: 'Data not founded'});

            var array = {"data": docs}
            res.json(array);
        })

    });

    // GET Datas by Temp
    router.get('/api/H310_720/temp/:temperature', function(req, res){

        Room2.find({temperature: req.params.temperature}, {_id:0, date: 1, time:1, num:1,}, function(err, docs){
            if(err) return res.status(500).json({error: err});
            if(docs.length === 0) return res.status(404).json({error: 'Data not founded'});

            var array = {"data": docs}
            res.json(array);
        })

    });

    // GET Datas by Humi
    router.get('/api/H310_720/humi/:humidity', function(req, res){

        Room2.find({humidity: req.params.humidity}, {_id:0, date: 1, time:1, num:1,}, function(err, docs){
            if(err) return res.status(500).json({error: err});
            if(docs.length === 0) return res.status(404).json({error: 'Data not founded'});

            var array = {"data": docs}
            res.json(array);
        })

    });


    // Save Data H207_205-1 MongoDB
    router.post('/api/H310_720', function(req, res){

    var room = new Room2();
    room.date = req.body.date;
    room.time = req.body.time;
    room.temperature = req.body.temperature;
    room.humidity = req.body.humidity; 
    room.num = req.body.no;
    room.memo = req.body.memo;
    // room.published_date = new Date(req.body.published_date);

    room.save(function(err){
        if(err){
            console.error(err);
            res.json({result: "Failed"});
            return;
        }

        res.json({result: "Success"});

    });


    });


    // UPDATE H207_205-1 Data
    router.put('/api/H310_720/:room_id', function(req, res){


        Room2.update({ _id: req.params.room_id }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'Database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'Data not founded' });
            res.json( { message: 'Data updated' } );
        })


    });
    

    // DELETE H207_205-1 Data by _id
    router.delete('/api/H310_720/:room_id', function(req, res){


        Room2.remove({ _id: req.params.room_id }, function(err, output){

            if(err) return res.status(500).json({ error: "Data failure" });
            if(!output.n) return res.status(404).json({ error: "Data not founded" });
            res.json({ message: "Data deleted" });
            
            // res.status(204).end();
    })


    });

        // DELETE H207_205-1 All Data
    router.delete('/api/H310_720/', function(req, res){


        Room2.remove(function(err, output){

            if(err) return res.status(500).json({ error: "Data failure" });
            if(!output.n) return res.status(404).json({ error: "Data not founded" });
            res.json({ message: "Data deleted" });
            
            // res.status(204).end();
    })


    });




/////// 주기적으로 url 에 요청하여 응답 받은 json 데이터를 저장하는 것 
var cnt2 = 0;
var id_cnt2;

function displayValues()
{
    console.log("cnt2 = %d", cnt);
}


function updatecnt2()
{
    cnt2 +=1;
    displayValues();

     request('http://165.194.46.64:53147/lhcau/room/H310_720', { json: true }, (err, res, body) => {
     if (err) { return console.log(err); }

    var Array = body;

    for (var i = 0; i < Array.length; i++) {
        var room = new Room2();

        room.date = Array[i].date;
        room.time = Array[i].time;
        room.temperature = Array[i].temperature;
        room.humidity = Array[i].humidity; 
        room.num = Array[i].no;
        // room.memo = Array[0].memo;
        // room.published_date = new Date(req.body.published_date);

        console.log(Array.length);
        console.log(Array[i].date);
        console.log(Array[i].time);
        console.log(Array[i].humidity);
        console.log(Array[i].temperature);
        console.log(Array[i].no);
        // console.log(Array[0].memo);

        room.save(function(err){
        if(err){
            console.error(err);
            return;
        }


        });

    }

            console.log("Successfully H310_720 Saved");

    });
}




/////////////////////////////
// H310_720 end


id_cnt = setInterval(updatecnt, 900000); // H207_205-1 저장, 단위 ms, 1초 = 1000ms, 900초 마다 저장 
id_cnt2 = setInterval(updatecnt2, 900000); // H310_720 저장, 단위 ms, 1초 = 1000ms, 900초 마다 저장 


module.exports = router;


