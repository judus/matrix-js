const Layer = require('./Layer.js');

class NeuralNetwork {
	constructor(layerConfigs) {
		this.layers = [];

		// Create layers with neurons and connections
		for(let i = 0; i < layerConfigs.length; i++) {
			const layerConfig = layerConfigs[i];
			const layer = new Layer(layerConfig.numNeurons, layerConfig.activationFunction);

			// Connect to previous layer
			if(this.layers.length > 0) {
				layer.connectTo(this.layers[this.layers.length - 1]);
			}

			this.layers.push(layer);
		}
	}

	// Feedforward method
	feedforward(inputArray) {
		// Set inputs on input layer neurons
		const inputLayer = this.layers[0];
		for(let i = 0; i < inputArray.length; i++) {
			inputLayer.neurons[i].outputValue = inputArray[i];
		}

		// Propagate inputs through the layers
		for(let i = 0; i < this.layers.length; i++) {
			const layer = this.layers[i];
			layer.propagate();
		}

		// Get outputs from output layer neurons and return as array
		const outputLayer = this.layers[this.layers.length - 1];
		return outputLayer.neurons.map(neuron => neuron.outputValue);
	}

	// Train method
	train(inputArray, targetArray, learningRate) {
		// Feedforward inputs to get outputs
		const outputArray = this.feedforward(inputArray);

		// Set target values on output layer neurons
		const outputLayer = this.layers[this.layers.length - 1];
		for(let i = 0; i < outputLayer.neurons.length; i++) {
			outputLayer.neurons[i].targetValue = targetArray[i];
		}

		// Calculate error
		let error = 0;
		for(let i = 0; i < outputArray.length; i++) {
			error += (outputArray[i] - targetArray[i]) ** 2;
		}
		error /= outputArray.length;

		// Backpropagate errors and update weights
		for(let i = this.layers.length - 1; i >= 0; i--) {
			const layer = this.layers[i];
			layer.backpropagate(learningRate);
		}

		return error;
	}
}

module.exports = NeuralNetwork;