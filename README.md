# dias [![NPM version](https://img.shields.io/github/tag/angleman/dias.svg)](https://npmjs.org/package/dias) [![Build Status](https://img.shields.io/travis/angleman/dias.svg?branch=master)](https://travis-ci.org/angleman/dias) [![Dependency Status](https://img.shields.io/gemnasium/angleman/dias.svg?branch=master)](https://gemnasium.com/angleman/dias) [![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Detect PaaS details of your application instance


## Install

```
npm install dias
```

## Supported PaaS services

- AWS
- AppFog
- Nodejitsu
- Travis CI
- Heroku
- Strider
- dotCloud
- your mac/windows/linux/freebsd box

Based on [everypaas](https://github.com/niallo/everypaas/), but as of version 0.0.7, everypaas iis only functional for: *Heroku, Strider, and dotCloud*.

## Usage

```js
var dias = require('dias')
console.log(dias())

// additional details via callback

dias(function(data) {
  console.log(data)
})
```

Details available with use of callback:

- AWS support
- ```serial``` number
- ```useragent``` as a collection of details in the form of a useragent

## AWS example

```js
{
  host: 'us01-dea-f8e454e6d5',
  os: 'Linux',
  serial: 'i-a5001be8',
  useragent: 'Linux/i-a5001be8 AWS/us-east-1 node/0.8.14'
  version: '3.2.0-23-virtual',
  arch: 'x64',
  gid: 114,
  uid: 22212,
  title: '/opt/cloudfoundry/runtimes/nodejs-v0.8.14/bin/node',
  node: '0.8.14',
  cpus: { model: 'Intel Xeon CPU E5-2665', cores: 2 },
  up: 10212921.312263723,
  load: [ 0.5444335935, 0.40966796875, 0.35546875 ], // 1, 5, & 15 minute load averages
  mem: { total: 17909567488, free: 352100352 }
}
```

## AppFog example

```js
{
  host: 'us01-dea-f8e454e6d5',
  os: 'Linux',
  serial: 'SYS-1234567890',
  useragent: 'Linux/SYS-1234567890 PaaS/AppFog node/0.8.14'
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

```js
{
   host: 'da7a889b-06ce-488b-a3b7-516648ac6868.local',
   os: 'SunOS',
   serial: 'SYS-1234567890',
   useragent: 'SunOS/SYS-1234567890 PaaS/Nodejitsu'
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

```js
{
   host: 'testing-worker-linux-5-1-11238-linux-10',
   os: 'Linux',
   serial: 'SYS-1234567890',
   useragent: 'Linux/SYS-1234567890 PaaS/Travis node/0.10.17'
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

```js
{
  host: 'my-mac.local',
  os: 'Darwin',
  serial: 'W980000A0BM',
  useragent: 'OSX/10.8.5 SN/W980000A0BM node/0.10.33'
  version: '11.4.2',
  arch: 'x64',
  gid: 20,
  uid: 501,
  title: 'node',
  node: '0.10.33',
  cpus: { model: 'Intel Core2 Duo CPU T9800', cores: 2, speed: 2930 },
  up: 94816,
  load: [ 1.03369140625, 1.0888671875, 1.01220703125 ],
  mem: { total: 8589934592, free: 3252342784 }
}
```

## CLI example

```js
var dias  = require('dias')
var argv  = require('minimist')(process.argv.slice(2))

dias({uanode: argv.n}, function(platform) {
  var result = (argv.u) ? platform.useragent : JSON.stringify(platform)
  console.log(result)
})
```

## License: MIT

Dependencies:

[![everypaas](https://img.shields.io/badge/BSD-everypaas-lightgrey.svg "everypaas@0.0.7")](https://github.com/niallo/everypaas)
