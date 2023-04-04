function Matrix(rows, cols) {
	this.rows = rows;
	this.cols = cols;
	this.values = [];

	for (var i = 0; i < this.rows; i++) {
		this.values[i] = [];
		for (var j = 0; j < this.cols; j++) {
			this.values[i][j] = 0;
		}
	}
}

Matrix.prototype.randomize = function() {
	for(var i = 0; i < this.rows; i++) {
		for(var j = 0; j < this.cols; j++) {
			this.values[i][j] = Math.floor(Math.random() * 10);
		}
	}
};

Matrix.prototype.add = function(n) {
	if (n instanceof Matrix) {
		for(var i = 0; i < this.rows; i++) {
			for(var j = 0; j < this.cols; j++) {
				this.values[i][j] += n.values[i][j];
			}
		}
	} else {
		for(var i = 0; i < this.rows; i++) {
			for(var j = 0; j < this.cols; j++) {
				this.values[i][j] += n;
			}
		}
	}
};

Matrix.prototype.multiply = function(n) {
	if(n instanceof Matrix) {

		if (this.cols !== n.rows) {
			console.log("Dimensions don't match");
			return null;
		}

		var r = new Matrix(this.rows, n.cols);

		for(var i = 0; i < this.rows; i++) {
			for(var j = 0; j < n.cols; j++) {
				var sum = 0;
				for(var k = 0; k < n.rows; k++) {
					sum += this.values[i][k] * n.values[k][j];
				}
				r.values[i][j] = sum;
			}
		}

		return r;

	} else {
		for(var i = 0; i < this.rows; i++) {
			for(var j = 0; j < this.cols; j++) {
				this.values[i][j] *= n;
			}
		}
	}
};