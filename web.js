var express = require("express");
var sanitizer = require("sanitizer");
var fs = require("fs");
var app = express();
app.use(express.logger());

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});


app.get('/',function(req,res){
	res.render('index', {
		message: 'Carry On',
		image: '/img/crown.png'
	});
});

app.get('/custom/:msg',function(req,res){
	var msg = sanitizer.escape(req.params.msg);
	var img = "/img/crown.png";
	console.log(msg);
	if (msg.indexOf('prosper') !== -1 || msg.indexOf('live long') !== -1) {
		img = "/img/spock.png";
	} else if (msg.indexOf('fuck') !== -1) {
		img = "/img/fuck.png";
	} else if (msg.indexOf('cookie') !== -1) {
		img = "/img/cookie-monster.png";
	} else if (msg.indexOf('storm') !== -1 || msg.indexOf('wookie') !== -1) {
		img = "/img/storm_trooper.png";
	} else if (msg.indexOf('dark side') !== -1 || msg.indexOf('father') !== -1) {
		img = "/img/vader.png";
	} else if (msg.indexOf('maushi') !== -1 || msg.indexOf('aankh') !== -1) {
		img = "/img/jackie.png";
	} else if (msg.indexOf('droids') !== -1) {
		img = "/img/droids.jpg";
	}

	res.render('index', {
		message: msg,
		image: img
	});
});

app.get('/trending/:provider',function(req,res){
	var provider = sanitizer.escape(req.params.provider);
	var img = "/img/"+provider+".png";
	fs.readFile('./public/providers/'+provider+'.txt', function (err, data) {
	  console.log(data);
	  res.render('index', {
	  	message: data,
	  	image: img
	  });
	});


});

//stupid auth
function authentication_required(req, res, next){
    if(req.headers["x-secretkey"] === "insert-secret-here") {
      next();
    } else {
      res.send("Forbidden!");
    }
};

app.post('/providers/:provider',authentication_required,function(req,res) {
	var provider = req.params.provider;
	var trending = req.body.trending;
	fs.writeFile('./public/providers/'+provider+'.txt', trending, function (err) {
	  if (err) throw err;
	  console.log('Saved!');
	  res.send("Saved!");
	});

});



var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
