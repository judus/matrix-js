class Connection {
	constructor(fromNeuron, toNeuron, weight = Math.random()) {
		this.fromNeuron = fromNeuron;
		this.toNeuron = toNeuron;
		this.weight = weight;
		this.deltaWeight = 0;
		this.targetValue = 0; // new property
	}

	// Update weight based on delta and learning rate
	updateWeight(learningRate) {
		this.weight += this.deltaWeight * learningRate;
		this.deltaWeight = 0;
	}

	// Propagate input through connection
	propagate() {
		this.toNeuron.inputSum += this.fromNeuron.outputValue * this.weight;
	}

	// Backpropagate error through connection
	backpropagate() {
		const gradient = this.toNeuron.gradient * this.fromNeuron.outputValue;
		this.deltaWeight += gradient;
		this.fromNeuron.gradient += this.toNeuron.gradient * this.weight;
		this.toNeuron.calculateGradient(this.targetValue); // new line
	}
}

module.exports = Connection;