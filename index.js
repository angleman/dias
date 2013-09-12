var os        = require('os')        // http://nodejs.org/api/os.html
  , everypaas = require('everypaas') // niallo/everypaas
  , isInit    = false
  , result    = {}
  , env       = process.env
  , appfog    = env.VMC_APP_INSTANCE // detect appfog as everpaas doesn't support it
  , nodejitsu = env.SUBDOMAIN        // detect nodejitsu as everpaas doesn't actually do it
  , envjson   = JSON.stringify(env).toLowerCase()
  , paasList  = ['appfog', 'nodejitsu', 'heroku', 'travis', 'strider', 'dotcloud']
;


function init() {
	isInit = true;
	cpus   = os.cpus();
	model  = cpus[0].model;
	mhz    = model.indexOf('@');
	if (mhz) {
		model = model.substr(0,mhz);
	}
	model  = model.replace('(R)', '').replace('(TM)', '')
		.replace('    ', ' ').replace('   ', ' ').replace('  ', ' ').replace('  ', ' ').replace('  ', ' ')
	;
	if (model.length>1 && model.substr(model.length-1, 1) == ' ') {
		model = model.substr(0, model.length-1);
	}
	if (model.length == 0) {
		model = undefined;
	}
	result = {
		host:     os.hostname()
	  , type:     os.type()
	  , platform: os.platform()
	  , arch:     os.arch()
	  , version:  os.release()
	  , gid:  process.getgid()
	  , uid:  process.getuid()
	  , title: process.title
	  , node: process.version.replace('v', '')
	  , cpus: {
	  		model: model
	  	  , cores: cpus.length
	  	  , speed: cpus[0].speed
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
			: (paas == 'appfog') ? appfog 
			: undefined
		;
	}

	var json = JSON.stringify(result); // drop undefined variables
	result = JSON.parse(json);
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


function dias(options) {
	if (!isInit) {
		init();
	}
	update(options);
	return result;
}



module.exports = dias;