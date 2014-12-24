Yeoman drpx Angular Code Generator
==================================

This is a yeoman code generator for Angular projects. 

It assumes that:

- you use bootstrap
- you use less
- you have a SPA (with one single index.html)



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
$ yo drpx:model ma.sub.MyModel 
$ yo drpx:model ma.sub.MyModel --injects=page,PageService
$ yo drpx:model ma.sub.MyModel --methods=partial,total
$ yo drpx:model ma.sub.MyModel --inherits=Other
$ yo drpx:handler ma.sub.myHandler 
$ yo drpx:handler ma.sub.myHandler --injects=page,PageService
$ yo drpx:service ma.sub.myService 
$ yo drpx:service ma.sub.myService --injects=page,PageService
$ yo drpx:service ma.sub.myService --methods=save,reload
$ yo drpx:state ma.sub.myState 
$ yo drpx:state ma.sub.myState --injects=page,PageService
$ yo drpx:state ma.sub.myState --methods=save,reload
$ yo drpx:state ma.sub.myState --methods=save,reload --notify-action
$ yo drpx:state ma.sub.myState --methods=save,reload --notify-changed
$ yo drpx:module ma.pages.root
$ yo drpx:route /
$ yo drpx:route / --controller=MyController
$ yo drpx:route / --view=MyView
```



Install
-------

```bash
$ sudo npm i -g yeoman
$ sudo npm i -g generator-drpx
```


