Yeoman drpx Angular Code Generator
==================================

This is a yeoman code generator for Angular projects. 

It assumes that:

- you use bootstrap
- you use less
- you have a SPA (with one single index.html)

Note: now `yo drpx:app` it is not working, so you should not use it.


Cheat sheet
-----------

```bash
$ yo drpx com.my.MyApp               # now this is a stub that setups config file
$ yo drpx:module ma.sub
$ yo drpx:directive ma.sub.MyDirective
$ yo drpx:directive ma.sub.MyDirective --controller=MyController
$ yo drpx:directive ma.sub.MyDirective --scope=atr=,on\&,val@
```



Install
-------

```bash
$ sudo npm i -g yeoman
$ sudo npm i -g generator-drpx
```


