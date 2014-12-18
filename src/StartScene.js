var StartLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
 
        var size = cc.winSize;
        
        //add bg
        this.bgSprite = new cc.Sprite(res.spbg);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
        });
        this.addChild(this.bgSprite, 0);
 
        //add start menu
        var helloLabel = new cc.LabelTTF("开始游戏", "微软雅黑", 38);

        var startItem = new cc.MenuItemLabel(
          helloLabel,
          function () {
            cc.log("Menu is clicked!");
            cc.director.runScene( new PlayScene() );
          }, this);

        startItem.attr({
          x: size.width/2,
          y: size.height/2,
          anchorX: 0.5,
          anchorY: 0.5
        });
         
        var menu = new cc.Menu(startItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        return true;
    }
});
 
var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});