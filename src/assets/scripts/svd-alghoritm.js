exports.SVDPP = class SVDPP {
	globalMean;

	constructor(numFactors, learningRate, regularization) {
		this.numFactors = numFactors;
		this.learningRate = learningRate;
		this.regularization = regularization;
	}

	train(ratings) {
		const numUsers = ratings.length;
		const numItems = ratings[0].length;

		// Initialize biases
		const globalMean = ratings.flat().reduce((acc, rating) => acc + rating, 0) / (numUsers * numItems);
		this.globalMean = globalMean;
		const userBiases = new Array(numUsers).fill(0);
		const itemBiases = new Array(numItems).fill(0);

		// Initialize latent factors
		const userFactors = Array.from({ length: numUsers }, () => new Array(this.numFactors).fill(Math.random()));
		const itemFactors = Array.from({ length: numItems }, () => new Array(this.numFactors).fill(Math.random()));

		let rmse = 1;
		let old_rmse = 0;
		let iter = 0;
		while (Math.abs(old_rmse - rmse) > 0.00001) {
			old_rmse = rmse;
			rmse = 0;
			for (let user = 0; user < numUsers; user++) {
				// Find rated items for the user
				const ratedItems = ratings[user].reduce((indices, rating, index) => {
					if (rating !== 0) {
						indices.push(index);
					}
					return indices;
				}, []);

				for (let item of ratedItems) {
					// Compute prediction
					let prediction =
						globalMean + userBiases[user] + itemBiases[item] + this.dotProduct(userFactors[user], itemFactors[item]);

					// Compute error
					const error = ratings[user][item] - prediction;
					rmse += error * error;

					// Update biases
					userBiases[user] += this.learningRate * (error - this.regularization * userBiases[user]);
					itemBiases[item] += this.learningRate * (error - this.regularization * itemBiases[item]);

					// Update latent factors
					for (let k = 0; k < this.numFactors; k++) {
						const userFactorGradient = error * itemFactors[item][k] - this.regularization * userFactors[user][k];
						userFactors[user][k] += this.learningRate * userFactorGradient;

						const itemFactorGradient = error * (userFactors[user][k]) - this.regularization * itemFactors[item][k];
						itemFactors[item][k] += this.learningRate * itemFactorGradient;

					}
				}
			}
			rmse = Math.sqrt(rmse / ratings.flat().reduce((a, b) => a + b))
			iter += 1
		}

		this.userBiases = userBiases;
		this.itemBiases = itemBiases;
		this.userFactors = userFactors;
		this.itemFactors = itemFactors;
	}

	predict(user, item) {
		let prediction = this.globalMean + this.userBiases[user] + this.itemBiases[item] + this.dotProduct(this.userFactors[user], this.itemFactors[item]);
		return prediction;
	}

	// Helper function to compute the dot product of two arrays
	dotProduct(arr1, arr2) {
		return arr1.reduce((sum, val, index) => sum + val * arr2[index], 0);
	}
}



// Example usage
// const ratings = [
// 	[1, 0, 10, 0, 0],
// 	[2, 1, 9, 1, 0],
// 	[1, 1, 9, 1, 0],
// 	[10, 1, 1, 1, 9],
// 	[10, 1, 2, 3, 10],
// ];

// const itemViews = [
// 	[1, 1, 4, 2, 1],
// 	[1, 10, 3, 1, 1],
// 	[1, 12, 3, 2, 3],
// 	[22, 19, 2, 3, 14],
// 	[41, 22, 2, 2, 9],
// ];

// const numFactors = 1;
// // const numIterations = 10000;
// const learningRate = 0.001;
// const regularization = 0.001;
//
// const svdpp = new SVDPP(numFactors, learningRate, regularization);
// svdpp.train(ratings);
//
// const user = 0;
// const item = 1;
// const prediction = svdpp.predict(user, item);
// console.log(`Prediction for user ${user} and item ${item}: ${prediction}`);
