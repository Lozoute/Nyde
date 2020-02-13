class GameEngine {
	constructor(gameWindow, gameCanvas) {
		this._$gameWindow = gameWindow;
		this._$gameCanvas = gameCanvas;
		this._$ctx = gameCanvas.getContext("2d");
		this._$objects = [];
		this._$stop = false;
		this._$framePerSeconds = 60;
	}

    // Public methods
	start() {
        this._loop();
	}

    addGameItem(item) {
        if (item instanceof GameObject) {
            this.objects.push(item);
        } else {
            console.warn(`${item} is not a GameObject`);
        }
    }

    // Getters
	get window() {
		return this._$gameWindow;
    }
    
	get canvas() {
		return this._$gameCanvas;
    }
    
    get ctx() {
		return this._$ctx;
	}

	get objects() {
		return this._$objects;
	}

    get stop() {
		return this._$stop;
	}

    get fps() {
        return this._$framePerSeconds;
    }

    // Private methods
    _loop() {
        this._executeFrameEvents();
        if (!this.stop) {
            this.window.requestAnimationFrame(this._loop.bind(this));
        }
    }

    _executeFrameEvents() {
        this._updateObjects();
        this._drawObjects();
    }

	_updateObjects() {
		this.objects.forEach(element => {
            element.update();
        });
	}

	_drawObjects() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.objects.forEach(element => {
            element.draw(this.ctx);
        })
    }
}
