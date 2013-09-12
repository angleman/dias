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
```


## License: MIT

Dependencies:

[![everypaas](http://badgr.co/bsd/everypaas.png?bg=%23339e00 "everypaas@0.0.7")](https://github.com/niallo/everypaas)
