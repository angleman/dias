# dias [![NPM version](https://badge.fury.io/js/dias.png?branch=master)](https://npmjs.org/package/dias) [![Build Status](https://travis-ci.org/angleman/dias.png?branch=master)](https://travis-ci.org/angleman/dias) [![Dependency Status](https://gemnasium.com/angleman/dias.png?branch=master)](https://gemnasium.com/angleman/dias) [![License](http://badgr.co/use/MIT.png?bg=%2343d100)](http://opensource.org/licenses/MIT)

Detect PaaS details of your application instance


## Install

```
npm install dias
```

## Supported PaaS services

- Heroku
- AppFog
- Nodejitsu
- Strider
- Travis CI
- dotCloud
- your box

While Dias leverages [everypaas](https://github.com/niallo/everypaas/), as of version 0.0.7, everypaas appears to only have functional code: *Heroku, Strider, and dotCloud*.

## Usage

```
var dias = require('dias');
console.log(dias());
```

## AppFog example

```
{
  host: 'us01-useast1a-dea-53b8cf5f40',
  type: 'Linux',
  platform: 'linux',
  arch: 'x64',
  version: '3.2.0-23-virtual',
  gid: 117,
  uid: 22104,
  title: '/opt/cloudfoundry/runtimes/nodejs-v0.8.14/bin/node',
  node: '0.8.14',
  cpus: { model: 'Intel Xeon(R) CPU E5-2665 0', cores: 2, speed: 0 },
  paas: 'appfog',

  up: 21111457.15465144,
  load: [ 1.40087890625, 1.22607421875, 1.17138671875 ],
  mem: { total: 17909567488, free: 1730289664 } 
}
```

## Example Travis CI

```
{
  host: 'testing-worker-linux-4-2-32000-linux-19',
  type: 'Linux',
  platform: 'linux',
  arch: 'x64',
  release: '2.6.32-042stab061.2',
  cpus: { model: undefined, cores: 32, speed: 2299 },
  paas: 'travis',
  travis: undefined,
  up: 170.499075569,
  load: [ 0.1123046875, 0.076171875, 0.0263671875 ], // 1, 5, and 15 minute load averages
  mem: { total: 3221225472, free: 2876088320 }
}
```

## Example Macbook

```
{ 
  host: 'my-mac.local',
  type: 'Darwin',
  platform: 'darwin',
  arch: 'x64',
  release: '11.4.2',
  cpus: { model: 'Intel Core2 Duo CPU T9800', cores: 2, speed: 2930 },
  up: 90533,
  load: [ 0.83642578125, 0.9111328125, 0.8984375 ],
  mem: { total: 8589934592, free: 3425923072 } 
}
```



## License: MIT

Dependencies:

[![everypaas](http://badgr.co/bsd/everypaas.png?bg=%23339e00 "everypaas@0.0.7")](https://github.com/niallo/everypaas)
