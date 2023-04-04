const Connection = require('./Connection.js');
const Neuron = require('./Neuron.js');

class Layer {
	constructor(numNeurons, activationFunction) {
		this.neurons = [];

		// Create neurons with given activation function
		for(let i = 0; i < numNeurons; i++) {
			const neuron = new Neuron(activationFunction);
			this.neurons.push(neuron);
		}
	}

	// Connect to a previous layer
	connectTo(previousLayer) {
		for(let i = 0; i < this.neurons.length; i++) {
			const neuron = this.neurons[i];

			// Connect to each neuron in previous layer
			for(let j = 0; j < previousLayer.neurons.length; j++) {
				const previousNeuron = previousLayer.neurons[j];
				const connection = new Connection(previousNeuron, neuron);
				neuron.addInputConnection(connection);
				previousNeuron.addOutputConnection(connection);
			}
		}
	}

	// Propagate inputs through the neurons in this layer
	propagate() {
		for(let i = 0; i < this.neurons.length; i++) {
			const neuron = this.neurons[i];
			neuron.propagate();
		}
	}

	// Backpropagate errors and update weights for the neurons in this layer
	backpropagate(learningRate) {
		for(let i = 0; i < this.neurons.length; i++) {
			const neuron = this.neurons[i];
			neuron.backpropagate(learningRate);
		}
	}
}

module.exports = Layer;