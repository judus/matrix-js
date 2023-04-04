const ColorTraining = [
	{
		input: [1, 0, 0], // Red
		output: [1, 0, 0],
	},
	{
		input: [0, 1, 0], // Green
		output: [0, 1, 0],
	},
	{
		input: [0, 0, 1], // Blue
		output: [0, 0, 1],
	},
];

// Training data for XOR
const XORTraining = [
	{
		input: [0, 0],
		output: [0],
	},
	{
		input: [0, 1],
		output: [1],
	},
	{
		input: [1, 0],
		output: [1],
	},
	{
		input: [1, 1],
		output: [0],
	},
];


const sigmoid = {
	function: x => 1 / (1 + Math.exp(-x)),
	derivative: y => y * (1 - y)
};

// Config for color recognition
const layerConfig = [
	{size: 3},   // Input layer with 3 neurons (for RGB values)
	{size: 4},   // Hidden layer with 4 neurons
	{size: 2}    // Output layer with 2 neurons (for two possible colors)
];

//import NeuralNetwork from './NeuralNetwork.js';
const NeuralNetwork = require('./NeuralNetwork.js');

class ActivationFunction {
	sigmoid(x) {
		return 1 / (1 + Math.exp(-x));
	}

	sigmoidDerivative(x) {
		const fx = this.sigmoid(x);
		return fx * (1 - fx);
	}
}

// Create a neural network with 3 layers and 2 neurons in each layer
const nn = new NeuralNetwork([
	{numNeurons: 2, activationFunction: sigmoid},
	{numNeurons: 2, activationFunction: sigmoid},
	{numNeurons: 2, activationFunction: sigmoid},
]);

// Define the training data and targets
const inputs = [[0, 0], [0, 1], [1, 0], [1, 1]];
const targets = [[0, 0], [1, 0], [1, 0], [0, 1]];

// Train the network for 10000 iterations
const numIterations = 10000;
const learningRate = 0.1;
for(let i = 0; i < numIterations; i++) {
	const index = Math.floor(Math.random() * inputs.length);
	const input = inputs[index];
	const target = targets[index];

	nn.train(input, target, learningRate);
}

// Test the network with some input data
const testInputs = [[0, 0], [0, 1], [1, 0], [1, 1]];
for(let i = 0; i < testInputs.length; i++) {
	const input = testInputs[i];
	const output = nn.feedforward(input);
	console.log('Input:', input, 'Output:', output);
}

// const nn = new NeuralNetwork(2, 1, 1, 2);
//
// const trainingData = [
// 	{input: [0, 0], output: [0]},
// 	{input: [0, 1], output: [1]},
// 	{input: [1, 0], output: [1]},
// 	{input: [1, 1], output: [0]}
// ];
//
// for(let i = 0; i < 10000; i++) {
// 	const data = trainingData[Math.floor(Math.random() * trainingData.length)];
// 	nn.train(data.input, data.output, 0.1);
// }
//
// console.log("Testing XOR function");
// console.log("0 XOR 0 = " + nn.feedforward([0, 0])); // Expected output: [0]
// console.log("0 XOR 1 = " + nn.feedforward([0, 1])); // Expected output: [1]
// console.log("1 XOR 0 = " + nn.feedforward([1, 0])); // Expected output: [1]
// console.log("1 XOR 1 = " + nn.feedforward([1, 1])); // Expected output: [0]