var os        = require('os')        // http://nodejs.org/api/os.html
  , everypaas = require('everypaas') // niallo/everypaas
  , isInit    = false
  , result    = {}
  , env       = process.env
  , appfog    = env.VMC_APP_INSTANCE // detect appfog as everpaas doesn't support it
  , nodejitsu = env.SUBDOMAIN        // detect nodejitsu as everpaas doesn't actually do it
  , isHeroku  = (JSON.stringify(env).toLowerCase().indexOf('heroku') > -1); // best guess at this time is to look for HEROKU services
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
	if (model.substr(model.length-1, 1) == ' ') {
		model = model.substr(0, model.length-1);
	}
	result = {
		os:       os.hostname()
	  , type:     os.type()
	  , platform: os.platform()
	  , arch:     os.arch()
	  , release:  os.release()
	  , platform: os.platform()
	  , cpus: {
	  		model: model
	  	  , cores: cpus.length
	  	  , speed: cpus[0].speed
	  }
	}


	var paas = process.env.paas || (nodejitsu) ? 'nodejitsu' 
		: (appfog) ? 'appfog' 
		: (isHeroku) ? 'heroku' 
		: (everypaas.paas != 'none') ? everypaas.paas 
		: undefined
	;
	if (paas) {
		result.paas  = paas;
		result[paas] = (paas == 'nodejitsu') ? nodejitsu 
			: (paas == 'appfog') ? appfog 
			: undefined
		;
	}
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