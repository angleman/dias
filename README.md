# dias [![NPM version](https://badge.fury.io/js/dias.png?branch=master)](https://npmjs.org/package/dias) [![Build Status](https://travis-ci.org/angleman/dias.png?branch=master)](https://travis-ci.org/angleman/dias) [![Dependency Status](https://gemnasium.com/angleman/dias.png?branch=master)](https://gemnasium.com/angleman/dias) [![License](http://badgr.co/use/MIT.png?bg=%2343d100)](http://opensource.org/licenses/MIT)

Detect PaaS details of your application instance


## Install

```
npm install dias
```

## Supported PaaS services

- AppFog
- Nodejitsu
- Travis CI
- Heroku
- Strider
- dotCloud
- your box

While Dias leverages [everypaas](https://github.com/niallo/everypaas/), as of version 0.0.7, everypaas appears to only have functional code for: *Heroku, Strider, and dotCloud*.

## Usage

```
var dias = require('dias');
console.log(dias());
```

## AppFog example

```
{
  host: 'us01-dea-f8e454e6d5',
  os: 'Linux',
  version: '3.2.0-23-virtual',
  arch: 'x64',
  gid: 114,
  uid: 22212,
  title: '/opt/cloudfoundry/runtimes/nodejs-v0.8.14/bin/node',
  node: '0.8.14',
  cpus: { model: 'Intel Xeon CPU E5-2665', cores: 2 },
  paas: 'appfog',
  appfog: { 
     id: '28af8427780e30d77d1715e64880445f',
     index: 0,
     center: 'aws'
  },
  up: 10212921.312263723,
  load: [ 0.5444335935, 0.40966796875, 0.35546875 ], // 1, 5, & 15 minute load averages
  mem: { total: 17909567488, free: 352100352 } 
}
```

## Nodejitsu example

```
{ 
   host: 'da7a889b-06ce-488b-a3b7-516648ac6868.local',
   os: 'SunOS',
   version: '5.11',
   arch: 'x64',
   gid: 65534,
   uid: 103,
   node: '0.10.17',
   cpus: 
   { 
     model: 'Intel Xeon CPU E5645',
     cores: 24,
     speed: 2400 
   },
   paas: 'nodejitsu',
   nodejitsu: 'account-subdomain',
   up: 1350401,
   load: [ 0.03125, 0.00390625, 0 ],
   mem: { total: 268435456, free: 217288704 } 
}
```

## Travis CI example

```
{
  host: 'testing-worker-linux-5-1-11238-linux-10',
  os: 'Linux',
  version: '2.6.32-042stab061.2',
  arch: 'x64',
  gid: 1000,
  uid: 1000,
  title: 'node',
  node: '0.8.25',
  cpus: { cores: 32, speed: 2299 },
  paas: 'travis',
  up: 21.76509598,
  load: [ 0.208984375, 0.04736328125, 0.0146484375 ],
  mem: { total: 3221225472, free: 2842660864 }
}
```

## Macbook example

```
{ 
  host: 'my-mac.local',
  os: 'Darwin',
  version: '11.4.2',
  arch: 'x64',
  gid: 20,
  uid: 501,
  title: 'node',
  node: '0.10.17',
  cpus: { model: 'Intel Core2 Duo CPU T9800', cores: 2, speed: 2930 },
  up: 94816,
  load: [ 1.03369140625, 1.0888671875, 1.01220703125 ],
  mem: { total: 8589934592, free: 3252342784 }
}
```



## License: MIT

Dependencies:

[![everypaas](http://badgr.co/bsd/everypaas.png?bg=%23339e00 "everypaas@0.0.7")](https://github.com/niallo/everypaas)
