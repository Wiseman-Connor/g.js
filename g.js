'use strict';


(function(exports) {


    (function(CanvasHandler) {
        var gameCanvas = document.createElement('canvas');


        CanvasHandler.drawSurface = gameCanvas.getContext('2d');


        CanvasHandler.setDimensions = function(width, height) {
            gameCanvas.setAttribute('width', width);
            gameCanvas.setAttribute('height', height);
        };


        CanvasHandler.clear = function() {
            this.drawSurface.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        }


        document.addEventListener('DOMContentLoaded', function() {
            document.body.appendChild(gameCanvas);
        });
    })(exports.Canvas = {});


    (function(KeyHandler) {
        var pressedKeys = {};


        var keyMap = {
            16: 'SHIFT', 17: 'CONTROL', 18: 'ALT', 32: 'SPACE',
            37: 'LEFT', 38: 'UP', 39: 'RIGHT', 39: 'DOWN',

            48: '0', 49: '1', 50: '2', 51: '3', 52: '4',
            53: '5', 54: '6', 55: '7', 56: '8', 57: '9'
            //65-90 = letters
            //96-105 = numpad digits
        };


        KeyHandler.isPressed = function(keyName) {
            
        };
        
    })(exports.Key = {});


    (function() {
        var objectList = {};


        var GameObject = function(name) {
            Object.defineProperty(this, 'name', {
                value: name
            });
        }


        /**
         * @private
         */
        GameObject.prototype.__updateFunction = function() {
            if (this.hasOwnProperty('update') && typeof this.update === 'function') {
                this.update();
            }
        };


        exports.Object = function() {
            
        };
    })();


})(this.g = this.g || {});


console.log(g);
g.Canvas.setDimensions(320, 240);