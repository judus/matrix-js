class Matrix {
	constructor(rows, cols) {
		this.rows = rows;
		this.cols = cols;
		this.values = [];

		for(let i = 0; i < this.rows; i++) {
			this.values[i] = [];
			for(let j = 0; j < this.cols; j++) {
				this.values[i][j] = 0;
			}
		}
	}

	static fromArray(arr) {
		let m = new Matrix(arr.length, 1);
		for(let i = 0; i < arr.length; i++) {
			m.values[i][0] = arr[i];
		}
		return m;
	}

	static subtract(a, b) {
		// Return a new Matrix a-b
		let result = new Matrix(a.rows, a.cols);
		for(let i = 0; i < result.rows; i++) {
			for(let j = 0; j < result.cols; j++) {
				result.values[i][j] = a.values[i][j] - b.values[i][j];
			}
		}
		return result;
	}

	toArray() {
		let arr = [];
		for(let i = 0; i < this.rows; i++) {
			for(let j = 0; j < this.cols; j++) {
				arr.push(this.values[i][j]);
			}
		}
		return arr;
	}

	randomize() {
		for(let i = 0; i < this.rows; i++) {
			for(let j = 0; j < this.cols; j++) {
				this.values[i][j] = Math.random() * 2 - 1;
			}
		}
	}

	add(n) {
		if(n instanceof Matrix) {
			for(let i = 0; i < this.rows; i++) {
				for(let j = 0; j < this.cols; j++) {
					this.values[i][j] += n.values[i][j];
				}
			}
		} else {
			for(let i = 0; i < this.rows; i++) {
				for(let j = 0; j < this.cols; j++) {
					this.values[i][j] += n;
				}
			}
		}
	}

	static transpose(matrix) {
		let result = new Matrix(matrix.cols, matrix.rows);
		for(let i = 0; i < matrix.rows; i++) {
			for(let j = 0; j < matrix.cols; j++) {
				result.values[j][i] = matrix.values[i][j];
			}
		}
		return result;
	}

	static multiply(a, b) {
		// Matrix product
		if(a.cols !== b.rows) {
			console.log('Columns of A must match rows of B.')
			return undefined;
		}
		let result = new Matrix(a.rows, b.cols);
		for(let i = 0; i < result.rows; i++) {
			for(let j = 0; j < result.cols; j++) {
				// Dot product of values in col
				let sum = 0;
				for(let k = 0; k < a.cols; k++) {
					sum += a.values[i][k] * b.values[k][j];
				}
				result.values[i][j] = sum;
			}
		}
		return result;
	}

	multiply(n) {
		if(n instanceof Matrix) {
			// hadamard product
			for(let i = 0; i < this.rows; i++) {
				for(let j = 0; j < this.cols; j++) {
					this.values[i][j] *= n.values[i][j];
				}
			}
		} else {
			// Scalar product
			for(let i = 0; i < this.rows; i++) {
				for(let j = 0; j < this.cols; j++) {
					this.values[i][j] *= n;
				}
			}
		}
	}

	map(func) {
		// Apply a function to every element of matrix
		for(let i = 0; i < this.rows; i++) {
			for(let j = 0; j < this.cols; j++) {
				let val = this.values[i][j];
				this.values[i][j] = func(val);
			}
		}
	}

	static map(matrix, func) {
		let result = new Matrix(matrix.rows, matrix.cols);
		// Apply a function to every element of matrix
		for(let i = 0; i < matrix.rows; i++) {
			for(let j = 0; j < matrix.cols; j++) {
				let val = matrix.values[i][j];
				result.values[i][j] = func(val);
			}
		}
		return result;
	}

	print() {
		console.table(this.values);
	}
}
