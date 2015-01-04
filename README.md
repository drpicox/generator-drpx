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
$ yo drpx:controller ma.sub.MyController --injects=Page,pageService
$ yo drpx:controller ma.sub.MyController --methods=save,reload
$ yo drpx:directive ma.sub.MyDirective
$ yo drpx:directive ma.sub.MyDirective --controller=MyController
$ yo drpx:directive ma.sub.MyDirective --scope=atr=,on\&,val@
$ yo drpx:model ma.sub.MyModel 
$ yo drpx:model ma.sub.MyModel --injects=Page,pageService
$ yo drpx:model ma.sub.MyModel --methods=partial,total
$ yo drpx:model ma.sub.MyModel --inherits=Other
$ yo drpx:handler ma.sub.myHandler 
$ yo drpx:handler ma.sub.myHandler --injects=Page,pageService
$ yo drpx:handler ma.sub.myHandler --on-change=pages,partials
$ yo drpx:service ma.sub.myService 
$ yo drpx:service ma.sub.myService --injects=Page,pageService,\$q
$ yo drpx:service ma.sub.myService --methods=save,reload
$ yo drpx:service ma.sub.myService --configs=url,time
$ yo drpx:state ma.sub.myState 
$ yo drpx:state ma.sub.myState --injects=Page,pageService
$ yo drpx:state ma.sub.myState --methods=save,reload
$ yo drpx:state ma.sub.myState --methods=save,reload --notify-action
$ yo drpx:state ma.sub.myState --methods=save,reload --notify-changed
$ yo drpx:module ma.pages.root
$ yo drpx:route /
$ yo drpx:route / --controller=MyController
$ yo drpx:route / --view=MyView
$ yo drpx:route --lists
$ yo drpx:route --gets=currentPage
```



Install
-------

```bash
$ sudo npm i -g yeoman
$ sudo npm i -g generator-drpx
```


