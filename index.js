var os        = require('os')            // http://nodejs.org/api/os.html
  , everypaas = require('everypaas')     // niallo/everypaas
  , serialNum = require('serial-number') // es128/serial-number
  , http      = require('http')
  , isInit    = false
  , result    = {}
  , env       = process.env
  , appfog    = env.VMC_APP_INSTANCE // detect appfog as everpaas doesn't support it
  , nodejitsu = env.SUBDOMAIN        // detect nodejitsu as everpaas doesn't actually do it
  , envjson   = JSON.stringify(env).toLowerCase()
  , paasList  = ['appfog', 'nodejitsu', 'heroku', 'travis', 'strider', 'dotcloud']
;


if (appfog && appfog.length) {
	appfog    = JSON.parse(appfog);

	if (appfog && appfog.uris && appfog.uris.length) {
		var uris = appfog.uris;
		for (var i=0; i<uris.length; i++)
		{
			var uri = uris[i];
			if (uri.indexOf('.af.cm') > -1) {
				parts = uri.split('.');
				var len = parts.length;
				delete parts[len-1];
				delete parts[len-2];			
				delete parts[0];
				var datacenter = parts.join('.').replace('..', '.').replace('.aws.', '.aws');
				if (datacenter.substr(0,1) == '.') {
					datacenter = datacenter.substr(1, datacenter.length-1);
				}
				appfog.datacenter = datacenter;
			}
		}
	}
}


function init() {
	isInit = true;
	cpus   = os.cpus();
	model  = cpus[0].model;
	mhz    = model.indexOf('@');
	if (mhz) {
		model = model.substr(0,mhz);
	}
	model  = model
		.replace('(R)', '').replace('(R)', '').replace('(R)', '').replace('(TM)', '').replace('(TM)', '').replace('(TM)', '')
		.replace('(r)', '').replace('(r)', '').replace('(r)', '').replace('(tm)', '').replace('(tm)', '').replace('(tm)', '')
		.replace('    ', ' ').replace('   ', ' ').replace('   ', ' ').replace('  ', ' ').replace('  ', ' ').replace('  ', ' ').replace('  ', ' ').replace('  ', ' ').replace('  ', ' ')
	;
	if (model.length>1 && model.substr(model.length-1, 1) == ' ') {
		model = model.substr(0, model.length-1);
	}
	if (model.length>2 && model.substr(model.length-2, 2) == ' 0') {
		model = model.substr(0, model.length-2);
	}
	if (model.length == 0) {
		model = undefined;
	}
	result = {
		host:     os.hostname()
	  , os:       os.type()
//	  , platform: os.platform()
	  , version:  os.release()
	  , arch:     os.arch()
	  , gid:      process.getgid()
	  , uid:      process.getuid()
//	  , title:    (process.title && process.title.length) ? process.title : undefined
	  , node:     process.version.replace('v', '')
	  , cpus:     {
	  		model: model
	  	  , cores: cpus.length
	  	  , speed: (cpus[0].speed) ? cpus[0].speed : undefined
	  }
	}


	var paas = process.env.paas || (nodejitsu) ? 'nodejitsu' 
		: (appfog)                             ? 'appfog' 
		: (everypaas.paas != 'none')           ? everypaas.paas 
		: undefined
	;

	if (!paas) {
		for (var i=0; i<paasList.length; i++) {
			var key = paasList[i];
			if (envjson.indexOf(key) > -1) { // look for PaaS specific variables like: http://about.travis-ci.org/docs/user/ci-environment/
				paas = key;
				break;
			}
		}
	}

	if (paas) {
		result.paas  = paas;
		result[paas] = (paas == 'nodejitsu') ? nodejitsu 
			: (paas == 'appfog' && appfog) ? {
				id:     appfog.instance_id
			  , index:  appfog.instance_index
			  , center: appfog.datacenter 
			}
			: undefined
		;
	}

	var json = JSON.stringify(result); // drop undefined variables
	result   = JSON.parse(json);
}



function update(options) {
	options = options || {};
	result.up   = os.uptime();
	result.load = os.loadavg();
	result.mem  = {
		total: os.totalmem()
	  , free:  os.freemem()
	}
	if (options.round) {
		for (var i=0; i<result.load.length; i++) {
			result.load[i] = Math.round(result.load[i]);
		}
		result.mem.total = Math.round(result.mem.total / 1000000);
		result.mem.free = Math.round(result.mem.free / 1000000);
	}
}



function getAwsUrl(url, cb) {
	url           = 'http://169.254.169.254/latest/meta-data/' + url
	var data      = ''
	var request   = http.get(url, function(res) {
		res.on('data', function (chunk) {
			data += chunk;
		}).on('end', function () {
			if (data.length > 2) {
				data = data.trim()
			}
			cb(null, data)
		})
	})
	request.on('error', function(err) {
		cb(err, result)
	}).setTimeout(1000, function() {
		cb(new Error(url + ' timeout'), result)
	})
}



function getAwsZone(cb) {
	getAwsUrl('placement/availability-zone', function(err, data) {
		if (!err) {
			result.aws.zone   = data
 			result.useragent += 'awsZone/' + data
		}
		cb(result)
	})
}



function getAwsAmi(cb) {
	getAwsUrl('ami-id', function(err, data) {
		if (!err) {
			result.aws.ami    = data
			result.useragent += 'awsAmi/' + data
		}
		getAwsZone(cb)
	})
}



function getAwsType(cb) {
	getAwsUrl('instance-type', function(err, data) {
		if (!err) {
			result.aws.type   = data
			result.useragent += 'awsType/' + data
		}
		getAwsAmi(cb)
	})
}



function dias(options, callback) {
	if (typeof(options) == 'function') {
		callback = options
		options  = {}
	}
	if (!isInit) {
		init()
	}
	update(options)
	if (callback) {
		serialNum(function (err, value) {
			if (err) {
				callback(result)
			} else {
				result.serial    = value
				result.useragent = result.os + '/' + result.serial
				if (value.substr(0,2) == 'i-' || (result.appfog && result.appfog.center == 'aws')) { // AWS Instance
					result.aws = {}
					getAwsType(callback)
				} else {
					callback(result)
				}
			}
		})
	} else {
		return result
	}
}



module.exports = dias