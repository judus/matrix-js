class Neuron {
	constructor(activationFunction) {
		this.activationFunction = activationFunction;
		this.inputConnections = [];
		this.outputConnections = [];
		this.inputSum = 0;
		this.outputValue = 0;
		this.gradient = 0;
		this.targetValue = 0; // added targetValue property
	}

	addInputConnection(connection) {
		this.inputConnections.push(connection);
	}

	addOutputConnection(connection) {
		this.outputConnections.push(connection);
	}

	calculateOutput() {
		this.inputSum = 0;
		for(let i = 0; i < this.inputConnections.length; i++) {
			const connection = this.inputConnections[i];
			this.inputSum += connection.fromNeuron.outputValue * connection.weight;
		}
		this.outputValue = this.activationFunction.function(this.inputSum);
	}

	calculateGradient() { // removed targetValue parameter from calculateGradient method
		const difference = this.targetValue - this.outputValue; // calculate difference using targetValue property
		this.gradient = difference * this.activationFunction.derivative(this.inputSum);
	}

	propagate() {
		this.calculateOutput();
		for(let i = 0; i < this.outputConnections.length; i++) {
			const connection = this.outputConnections[i];
			connection.propagate(this.outputValue);
		}
	}

	backpropagate() {
		let gradientSum = 0;
		for(let i = 0; i < this.outputConnections.length; i++) {
			const connection = this.outputConnections[i];
			gradientSum += connection.toNeuron.gradient * connection.weight;
		}
		this.gradient = gradientSum * this.activationFunction.derivative(this.inputSum);
		for(let i = 0; i < this.inputConnections.length; i++) {
			const connection = this.inputConnections[i];
			connection.backpropagate(this.gradient);
		}
	}
}


module.exports = Neuron;