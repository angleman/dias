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

## Example Travis CI

```
{
  host: 'testing-worker-linux-3-1-9587-linux-18',
  type: 'Linux',
  platform: 'linux',
  arch: 'x64',
  release: '2.6.32-042stab061.2',
  cpus: { model: '', cores: 32, speed: 2300 },
  paas: 'travis',
  travis: undefined,
  up: 174.273731544,
  load: [ 0, 0, 0 ],
  mem: { total: 3221, free: 2947 }
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
  load: [ 0.83642578125, 0.9111328125, 0.8984375 ], // 1, 5, and 15 minute load averages
  mem: { total: 8589934592, free: 3425923072 } 
}
```



## License: MIT

Dependencies:

[![everypaas](http://badgr.co/bsd/everypaas.png?bg=%23339e00 "everypaas@0.0.7")](https://github.com/niallo/everypaas)
