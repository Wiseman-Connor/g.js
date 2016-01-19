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
            53: '5', 54: '6', 55: '7', 56: '8', 57: '9',

            65: 'A', 66: 'B', 67: 'C', 68: 'D', 69: 'E', 70: 'F', 71: 'G', 72: 'H', 73: 'I',
            74: 'J', 75: 'K', 76: 'L', 77: 'M', 78: 'N', 79: 'O', 80: 'P', 81: 'Q', 82: 'R',
            83: 'S', 84: 'T', 85: 'U', 86: 'V', 87: 'W', 88: 'X', 89: 'Y', 90: 'Z',

            96: 'NUMPAD0', 97: 'NUMPAD1', 98: 'NUMPAD2', 99: 'NUMPAD3', 100: 'NUMPAD4',
            101: 'NUMPAD5', 102: 'NUMPAD6', 103: 'NUMPAD7', 104: 'NUMPAD8', 105: 'NUMPAD9'
        };


        KeyHandler.isPressed = function(keyName) {

        };

        var getKeyName = function(e) {
            e = e || window.event;
            var key = (which in e) ? e.which : e.keyCode;
            return keyMap[key];
        };

        var pressKey = function(e) {
            if (e.defaultPrevented) {
                return;
            }


            var keyName = getKeyName(e);
            if (!pressedKeys.hasOwnProperty(keyName)) {
                pressedKeys[keyName] = true;
                console.log(pressedKeys);
            }
        };

        var releaseKey = function(e) {
            console.log(e);
        };

        document.addEventListener('keydown', pressKey);
        document.addEventListener('keyup', releaseKey);
        
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