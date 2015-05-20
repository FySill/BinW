var sys = require('util');
var  mysql=require('mysql');
console.log('正在连接MySQL...');
var http = require("http");
var server=http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/html;charset:utf-8"}); 
 	response.write("<!doctype html><html><meta charset='utf-8'/>");
 	 var client = mysql.createConnection({'host':'localhost','port':3306,'user':'root','password':''});
	clientConnectionReady = function(client)
	{
	    client.query('use test', function(error, results) {
	        if(error) {
	            console.log('ClientConnectionReady Error: ' + error.message);
	            client.end();
	            return;
	        }else{
	        	response.write("nodejs 服务器已经开始工作...<br/>");
	       	    response.write("已经连接上MySQL....<br/>");
	    }
	        clientReady(client);
	    });
	};
	 
	clientReady = function(client) {
	    var values = ['不错啊'];
	   client.query('insert into nodemysql set names = :1', values,
	        function(error, results) {
	            if(error) {
	                console.log("ClientReady Error: " + error.message);
	                client.end();
	                return;
	            }
	            console.log('Inserted: ' + results.affectedRows + ' row.');
	            console.log('Id inserted: ' + results.insertId);
	        }
	    );
	    getData(client);
	}
	 
	getData = function(client) {
	    client.query(
	        'select * from nodemysql',
	        function selectCb(error, results, fields) {
	           if (error) {
	                console.log('GetData Error: ' + error.message);
	                client.end();
	                return;
	           }
	      var data = '';
	       for(var i=0; i<results.length; i++){
	        var firstResult = results[i];
	             data += 'id: ' + firstResult['id']+'    name: ' + firstResult['names']+"<br/>";
	       }
	      	
	    	 response.write(data); 
	    	  response.write("关闭MySQL连接...");
	  		  response.write("</html>");
	  		response.end();
	        }
	    );
	    client.end();
	   
	};
	 
	clientConnectionReady(client);
});
server.listen(8033,"127.0.0.1");

var sys = require("util");
sys.puts("Server running at http://localhost:8033/"); 
