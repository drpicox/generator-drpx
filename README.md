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
$ yo drpx com.my.MyApp
$ yo drpx:module ma.sub
$ yo drpx:controller ma.sub.MyController
$ yo drpx:controller ma.sub.MyController --injects=page,PageService
$ yo drpx:controller ma.sub.MyController --methods=save,reload
$ yo drpx:directive ma.sub.MyDirective
$ yo drpx:directive ma.sub.MyDirective --controller=MyController
$ yo drpx:directive ma.sub.MyDirective --scope=atr=,on\&,val@
$ yo drpx:module ma.pages.root
$ yo drpx:route /
```



Install
-------

```bash
$ sudo npm i -g yeoman
$ sudo npm i -g generator-drpx
```

