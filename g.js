'use strict';

/**
 * @author Connor Wiseman
 */
(function(exports) {


    (function(CanvasHandler) {
        var gameCanvas = document.createElement('canvas');


        // Acquire a 2D drawing context.
        CanvasHandler.drawSurface = gameCanvas.getContext('2d');


        /**
         * Sets the dimensions of the game's canvas.
         * @argument {Number} width - A value to set as the width.
         * @argument {Number} height - A value to set as the height.
         */
        CanvasHandler.setDimensions = function(width, height) {
            CanvasHandler.width = width;
            CanvasHandler.height = height;


            gameCanvas.setAttribute('width', CanvasHandler.width);
            gameCanvas.setAttribute('height', CanvasHandler.height);
        };


        /**
         * Converts a hexadecimal color string to an RGB color string.
         * @argument {String} hexValue - A hexadecimal color value.
         * @returns {String} The hexValue in rgb(r, g, b) format.
         * @author Tim Down
         * @url http://stackoverflow.com/a/5624139
         * @private
         */
        var hexToRGB = function(hexValue) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);
            if (result) {
                var r = parseInt(result[1], 16),
                    g = parseInt(result[2], 16),
                    b = parseInt(result[3], 16);
                return 'rgb(' + r + ', ' + g + ', ' + b + ')';
            }


            throw new SyntaxError('Argument 1 of drawRectangle must be a valid hexadecimal color string.');
        };


        /**
         * Draws a rectangle of the specified color, at the specified coordinates,
         * of the specified size, and with the specified alpha value.
         * @argument {String} color  - The color of the rectangle.
         * @argument {Number} x      - The x position of the rectangle.
         * @argument {Number} y      - The y position of the rectangle.
         * @argument {Number} width  - The width of the rectangle.
         * @argument {Number} height - The height of the rectangle.
         * @argument {Number} alpha  - The alpha value of the rectangle.
         */
        CanvasHandler.drawRectangle = function(color, x, y, width, height, alpha) {
            var alphaCheck = (typeof alpha !== undefined && (alpha >= 0 || alpha <= 1));
            if (alphaCheck) {
                this.drawSurface.globalAlpha = alpha;
            }


            this.drawSurface.fillStyle = hexToRGB(color);
            this.drawSurface.fillRect(x, y, width, height);


            if (alphaCheck) {
                this.drawSurface.globalAlpha = 1.0;
            }
        };


        /**
         * Clears the game's canvas.
         */
        CanvasHandler.clear = function() {
            this.drawSurface.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        }


        // Wait for the document to fully load, then append the game canvas.
        document.addEventListener('DOMContentLoaded', function() {
            document.body.appendChild(gameCanvas);
        });
    })(exports.Canvas = {});


    (function(KeyHandler) {
        /**
         * An object to be populated with pressed keys.
         * @namespace
         */
        var pressedKeys = {};


        // A map of keys to listen for.
        var keyMap = {
            16: 'SHIFT', 17: 'CONTROL', 18: 'ALT', 32: 'SPACE',
            37: 'LEFT', 38: 'UP', 39: 'RIGHT', 40: 'DOWN',

            48: '0', 49: '1', 50: '2', 51: '3', 52: '4',
            53: '5', 54: '6', 55: '7', 56: '8', 57: '9',

            65: 'A', 66: 'B', 67: 'C', 68: 'D', 69: 'E', 70: 'F', 71: 'G', 72: 'H', 73: 'I',
            74: 'J', 75: 'K', 76: 'L', 77: 'M', 78: 'N', 79: 'O', 80: 'P', 81: 'Q', 82: 'R',
            83: 'S', 84: 'T', 85: 'U', 86: 'V', 87: 'W', 88: 'X', 89: 'Y', 90: 'Z',

            96: 'NUMPAD0', 97: 'NUMPAD1', 98: 'NUMPAD2', 99: 'NUMPAD3', 100: 'NUMPAD4',
            101: 'NUMPAD5', 102: 'NUMPAD6', 103: 'NUMPAD7', 104: 'NUMPAD8', 105: 'NUMPAD9'
        };


        /**
         * Checks the current state of a specified key name.
         * @argument {String} keyName - The name of the key to check.
         * @returns {Boolean} Whether or not the specified key is pressed.
         */
        KeyHandler.isPressed = function(keyName) {
            if (pressedKeys.hasOwnProperty(keyName)) {
                return pressedKeys[keyName];
            }
            return false;
        };


        /**
         * Gets the name of a key associated with a specified keyboard event.
         * @argument {KeyboardEvent} e - A keyboard event.
         * @return {String} The name of the key.
         */
        KeyHandler.getKeyName = function(e) {
            e = e || window.event;
            var key = (typeof e.which !== 'undefined') ? e.which : e.keyCode;
            return keyMap[key];
        };


        /**
         * Retrieves the key name from a specified keyboard event and adds it
         * to the list of pressed keys.
         * @argument {KeyboardEvent} e - A keyboard event.
         */
        var pressKey = function(e) {
            if (e.defaultPrevented) {
                return;
            }


            var keyName = KeyHandler.getKeyName(e);
            if (!pressedKeys.hasOwnProperty(keyName)) {
                pressedKeys[keyName] = true;
            }
        };


        /**
         * Retrieves the key name from a specified keyboard event and removes
         * it from the list of pressed keys.
         * @argument {KeyboardEvent} e - A keyboard event.
         */
        var releaseKey = function(e) {
            if (e.defaultPrevented) {
                return;
            }


            var keyName = KeyHandler.getKeyName(e);
            if (pressedKeys.hasOwnProperty(keyName)) {
                delete pressedKeys[keyName];
            }
        };


        /**
         * Sets the specified key name in the list of pressed keys to false.
         * Used to manually interrupt a key press.
         * @argument {String} keyName - The name of a key to interrupt.
         */
        KeyHandler.interrupt = function(keyName) {
            if (pressedKeys.hasOwnProperty(keyName) && pressedKeys[keyName]) {
                pressedKeys[keyName] = false;
            }
        };


        // Listen for key presses and releases.
        document.addEventListener('keydown', pressKey);
        document.addEventListener('keyup', releaseKey);
    })(exports.Key = {});


    (function() {
        // Provide cross-browser support for requestAnimationFrame.
        var requestAnimationFrame = (function(){
            return  window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame    ||
                    function(callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
        })();


        /**
         * A list of objects to be populated manually.
         * @namespace
         */
        var objectList = [];


        /**
         * Updates and redraws all the objects in the game's object list
         * in sequence.
         * @private
         * @todo Needs some way to set an object's "depth"
         */
        var updateAndRedrawObjects = function() {
            exports.Canvas.clear();


            for (var i = 0, totalObjects = objectList.length; i < totalObjects; ++i) {
                if (typeof objectList[i] !== 'undefined') {
                    objectList[i].__updateFunction();
                    objectList[i].__redrawFunction();
                }
            }


            requestAnimationFrame(updateAndRedrawObjects);
        };


        // Begin the game's animation loop.
        document.addEventListener('DOMContentLoaded', function(e) {
            requestAnimationFrame(updateAndRedrawObjects);
        });


        /**
         * @class
         * @classdesc A generic game object container.
         * @property {Number}  __objectID
         * @property {Boolean} __isActive
         * @property {Boolean} __isVisible
         * @property {Object}  __keyPressEvents
         * @property {Object}  __keyReleaseEvents
         * @property {Object}  __initialProperties
         * @method destroy
         * @method instanceOf
         * @method onDestroy
         * @method onKeyPress
         * @method onKeyRelease
         * @method setProperties
         * @method __destroyFunction
         * @method __redrawFunction
         * @method __updateFunction
         */
        exports.Object = function() {
            var objectID = objectList.length;


            Object.defineProperty(this, '__objectID', {
                get: function() {
                    return objectID;
                }
            });


            objectList.push(this);


            var isActive = true,
                isVisible = true;


            Object.defineProperty(this, '__isActive', {
                get: function() {
                    return isActive;
                },
                set: function(bool) {
                    isActive = bool;
                }
            });


            Object.defineProperty(this, '__isVisible', {
                get: function() {
                    return isVisible;
                },
                set: function(bool) {
                    isVisible = bool;
                }
            });


            Object.defineProperty(this, '__keyPressEvents', {
                value: {}
            });


            Object.defineProperty(this, '__keyReleaseEvents', {
                value: {}
            });


            Object.defineProperty(this, '__initialProperties', {
                value: {}
            });
        };


        /**
         * Destroys a specific game object.
         */
        Object.defineProperty(exports.Object.prototype, 'destroy', {
            value: function() {
                if (!this.__isActive) {
                    return;
                }


                if (typeof objectList[this.__objectID] !== 'undefined' &&
                    objectList[this.__objectID].__objectID === this.__objectID) {
                    objectList[this.__objectID] = undefined;


                    this.__isActive = false;
                    this.__isVisible = false;


                    if (this.hasOwnProperty('__destroyFunction') && typeof this.__destroyFunction === 'function') {
                        this.__destroyFunction();
                    }
                }
            }
        });


        /**
         * Creates a new instance of a predefined game object.
         * @returns {g.Object} - A new game object.
         */
        Object.defineProperty(exports.Object.prototype, 'instanceOf', {
            value: function() {
                // Create a new instance of a game object.
                var newInstance = new this.constructor();


                /* If parent object is active, transpose the properties and methods into
                   the new object. */
                if (this.__isActive) {
                    for (var property in this.__initialProperties) {
                        newInstance[property] = this.__initialProperties[property];
                        newInstance.__initialProperties[property] = this.__initialProperties[property];
                    }


                    newInstance.update = this.update;
                    newInstance.redraw = this.redraw;
                }


                // Return the game object.
                return newInstance;
            }
        });


        /**
         * A callback to use when an object is destroyed.
         * @callback {OnDestroy}
         */


        /**
         * Attaches a callback function to a game object that listens for the
         * object's destruction.
         * @argument {OnDestroy} callback - A callback function.
         */
        Object.defineProperty(exports.Object.prototype, 'onDestroy', {
            value: function(callback) {
                if (typeof callback === 'undefined') {
                    throw new SyntaxError('Argument 1 of onDestroy cannot be undefined.');
                }
                else if (typeof callback !== 'function') {
                    throw new TypeError('Argument 1 of onDestroy in must be a function.');
                }


                /**
                 * Executes all attached key events, then executes any manually defined
                 * update logic. Run automatically by requestAnimationFrame.
                 * @private
                 */
                Object.defineProperty(this, '__destroyFunction', {
                    configurable: true,
                    value: callback
                });
            }
        });


        /**
         * A callback to use for keystate functions.
         * @callback {KeyState}
         */


        /**
         * Attaches a callback function to a game object that listens for the
         * specified key press.
         * @argument {String}    keyName - The name of a key.
         * @argument {KeyState} callback - A callback function.
         */
        Object.defineProperty(exports.Object.prototype, 'onKeyPress', {
            value: function(keyName, callback) {
                if (typeof callback === 'undefined') {
                    throw new SyntaxError('Argument 2 of onKeyPress cannot be undefined.');
                }
                else if (typeof callback !== 'function') {
                    throw new TypeError('Argument 2 of onKeyPress must be a function.');
                }


                /* If a key press event is already associated with the specified key name,
                   combine the previous event callback with the new one. */
                if (this.__keyPressEvents.hasOwnProperty(keyName)) {
                    var originalCallback = this.__keyPressEvents[keyName];
                    var combinedCallback = function() {
                        originalCallback.call(this);
                        callback();
                    };


                    this.__keyPressEvents[keyName] = combinedCallback;
                }
                else {
                    this.__keyPressEvents[keyName] = callback;
                }
            }
        });


        /**
         * Attaches a callback function to a game object that listens for the
         * specified key release.
         * @argument {String}    keyName - The name of a key.
         * @argument {KeyState} callback - A callback function.
         */
        Object.defineProperty(exports.Object.prototype, 'onKeyRelease', {
            value: function(keyName, callback) {
                if (typeof callback === 'undefined') {
                    throw new SyntaxError('Argument 2 of onKeyRelease cannot be undefined.');
                }
                else if (typeof callback !== 'function') {
                    throw new TypeError('Argument 2 of onKeyRelease must be a function.');
                }


                /* If an event listener for the specified keyname already exists, remove
                   it before re-attaching to prevent duplicate listeners. */
                if (this.__keyReleaseEvents.hasOwnProperty(keyName)) {
                    document.removeEventListener('keyup', this.__keyReleaseEvents[keyName]);
                }


                /* Create a wrapper function to execute the user-defined callback.
                   Bind it to the current object. */
                this.__keyReleaseEvents[keyName] = function(e) {
                    if (this.__isActive && exports.Key.getKeyName(e) === keyName) {
                        callback();
                    }
                }.bind(this);


                // Add a new event listener with the wrapper function.
                document.addEventListener('keyup', this.__keyReleaseEvents[keyName]);
            }
        });


        /**
         * Transposes a object of properties in key-value form onto a
         * specified game object.
         * @argument {Object} properties - A list of objects to transpose.
         * @returns {g.Object} this
         */
        Object.defineProperty(exports.Object.prototype, 'setProperties', {
            value: function(properties) {
                for (var property in properties) {
                    this[property] = properties[property];
                    this.__initialProperties[property] = properties[property];
                }
                return this;
            }
        });


        /**
         * Executes any manually defined redraw logic. Run automatically by
         * requestAnimationFrame.
         * @private
         */
        Object.defineProperty(exports.Object.prototype, '__redrawFunction', {
            value: function() {
                // If the object is either not active or not visible, don't redraw it.
                if (!this.__isActive || !this.__isVisible) {
                    return;
                }


                // Execute any manually defined redraw logic.
                if (this.hasOwnProperty('redraw') && typeof this.redraw === 'function') {
                    this.redraw();
                }
            }
        });


        /**
         * Executes all attached key events, then executes any manually defined
         * update logic. Run automatically by requestAnimationFrame.
         * @private
         */
        Object.defineProperty(exports.Object.prototype, '__updateFunction', {
            value: function() {
                // If the object is not active, don't bother with the rest.
                if (!this.__isActive) {
                    return;
                }


                // Execute all attached key events.
                for (var keyEvent in this.__keyPressEvents) {
                    if (exports.Key.isPressed(keyEvent)) {
                        this.__keyPressEvents[keyEvent].call(this);
                    }
                }


                // Execute any manually defined update logic.
                if (this.hasOwnProperty('update') && typeof this.update === 'function') {
                    this.update();
                }
            }
        });
    })();


})(this.g = this.g || {});