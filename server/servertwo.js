var http = require("http");
var url = require("url");
var mysql = require("mysql2");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "practise"
});

con.connect(function (err) {
    if (err) throw err;

});

http.createServer(function (req, res)
{
    const headers = {
        'Access-Control-Allow-Origin': '', 
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, 
        "Content-Type": "application/json"
      };

    res.writeHead(200, headers);
    var base = 'http://localhost:8081';
    var query = "";
    var q= url.parse(req.url,true);
    if(q.pathname==="/show")
    {
        //base + '/show'
        query="SELECT * FROM tab2";
        con.query(query,function(err,result,fields){
            if(err) throw err;
            console.log("DATA---->", JSON.stringify(result));
            
            res.write(JSON.stringify(result));
            res.end();

        });
    }
    else if(q.pathname==="/insert")
    {
        //base + '/insert?name=abc&city=cty&state=stt'
        var body = '';
        req.on('data', function(data) {
            body += data
            console.log('Partial body: ' + body)
        });
        
        req.on('end', function() {
            body = JSON.parse(body);
            console.log('Body: ' + typeof body)
            var name = body.name;
            var city = body.city;
            var state = body.state;
            console.log("query", name, body);
            if(name && city && state)
            {
                query = "select id from tab2 where name= '" + name + "' limit 1;";
                con.query(query,function(err,result,fields){
                    if(err) throw err;
                    result = result[0];
                    console.log("result----->", result);
                    if(result && result.id)
                        query="update tab2 set city='" + city + "', state='" + state + "' where id=" + result.id+ " ;";
                    else
                        query="INSERT INTO tab2(name, city, state) VALUES ('" + name + "','" + city + "','" + state + "');";

                    console.log("query", query);
                    con.query(query,function(err,result,fields){
                        if(err) throw err;
                        console.log("DATA---->", JSON.stringify(result));
                        res.write(JSON.stringify(result));
                        res.end();
                    });
                });
            }
        });
    }
    else{
        res.write(JSON.stringify("Not Available"));
        res.end();
    }
}).listen(8081);