var defSprite = cc.Sprite.extend({
    onEnter:function () {
        cc.log("onEnter");
        this._super();
        this.addTouchEventListenser();
    },
    _state: '0',
 
    onExit:function () {
        cc.log("onExit");
    },
    containsTouchLocation:function (touch) {
      
        var getPoint = touch.getLocation();
        var myRect = this.rect();

        myRect.x += this.x;
        myRect.y += this.y;
        return cc.rectContainsPoint(myRect, getPoint);//this.convertTouchToNodeSpaceAR(touch));
    },
    addTouchEventListenser:function(){
      var startX = 0;
      var startY = 0;
      this.touchListener = cc.EventListener.create({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
          swallowTouches: true,
          //onTouchBegan event callback function                      
          onTouchBegan: function (touch, event) { 
            var pos = touch.getLocation();
            var target = event.getCurrentTarget();  
            if ( cc.rectContainsPoint(target.getBoundingBox(),pos)) {
                target._state = '1';
                var touchPoint = touch.getLocation();
                startX = target.x;
                startX = touchPoint.x - target.x;

                startY = target.y;
                startY = touchPoint.y - target.y;
                return true;
            }
            return false;
          },
          onTouchMoved:function (touch, event) {
            
            var target = event.getCurrentTarget();
            // If it weren't for the TouchDispatcher, you would need to keep a reference
            // to the touch from touchBegan and check that the current touch is the same
            // as that one.
            // Actually, it would be even more complicated since in the Cocos dispatcher
            // you get Array instead of 1 cc.Touch, so you'd need to loop through the set
            // in each touchXXX method.
            cc.assert(target._state == "1", "Paddle - Unexpected state!");
            var touchPoint = touch.getLocation();
            //touchPoint = cc.director.convertToGL( touchPoint );

            target.x = touchPoint.x - startX;
            target.y = touchPoint.y - startY;
            //target.y = touchPoint.y;
        },
        onTouchEnded:function (touch, event) {
            var target = event.getCurrentTarget();
            cc.assert(target._state == "1", "Paddle - Unexpected state!");
            target._state = '0';
        }
      });
      cc.eventManager.addListener(this.touchListener,this);
    }
});