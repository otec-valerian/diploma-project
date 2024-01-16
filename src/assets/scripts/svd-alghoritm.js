exports.SVDPP = class SVDPP {
	globalMean;

	constructor(numFactors, learningRate, regularization) {
		this.numFactors = numFactors;
		this.learningRate = learningRate;
		this.regularization = regularization;
		// this.implicitFeedback = implicitFeedback;
	}

	train(ratings) {
		const numUsers = ratings.length;
		const numItems = ratings[0].length;

		// Initialize biases
		const globalMean = ratings.flat().reduce((acc, rating) => acc + rating, 0) / (numUsers * numItems);
		this.globalMean = globalMean;
		const userBiases = new Array(numUsers).fill(0);
		const itemBiases = new Array(numItems).fill(0);

		// const implicitFeedback = JSON.parse(JSON.stringify(this.implicitFeedback));

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

				// Compute user's implicit feedback
				// const implicitFeedback = ratedItems.reduce((sum, item) => sum.map((val, i) => val + itemFactors[item][i]), new Array(this.numFactors).fill(0));
				// implicitFeedback.forEach((val) => (val / Math.sqrt(ratedItems.length)));
				// console.log(iter, ratedItems, implicitFeedback)
				for (let item of ratedItems) {
					// Compute prediction
					let prediction =
						globalMean + userBiases[user] + itemBiases[item] + this.dotProduct(userFactors[user], itemFactors[item]);

					// Compute error
					const error = ratings[user][item] - prediction;
					rmse += error * error;
					// console.log(error)
					// Update biases
					userBiases[user] += this.learningRate * (error - this.regularization * userBiases[user]);
					itemBiases[item] += this.learningRate * (error - this.regularization * itemBiases[item]);

					// implicitFeedback[item][user] += this.learningRate * (error - this.regularization * implicitFeedback[item][user]);
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
		// console.log(iter)

		this.userBiases = userBiases;
		this.itemBiases = itemBiases;
		this.userFactors = userFactors;
		this.itemFactors = itemFactors;
		// this.implicitFeedback = implicitFeedback;
		// console.log(this.userFactors)
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


//
// class SVDpp {
// 	constructor(num_factors, num_epochs, lr, reg) {
// 		this.num_factors = num_factors;
// 		this.num_epochs = num_epochs;
// 		this.lr = lr;
// 		this.reg = reg;
// 	}
//
// 	fit(train) {
// 		this.num_users = train.length;
// 		this.num_items = train[0].length;
//
// 		// Initialize user, item, and global biases
// 		this.global_bias = train.flat().filter(x => x > 0).reduce((a,b) => a + b) / train.flat().length;
// 		this.user_bias = new Array(this.num_users).fill(0);
// 		this.item_bias = new Array(this.num_items).fill(0);
//
// 		// Initialize user and item factors
// 		this.user_factors = Array.from({ length: this.num_users }, () => Array.from({ length: this.num_factors }, () => Math.random()));
// 		this.item_factors = Array.from({ length: this.num_items }, () => Array.from({ length: this.num_factors }, () => Math.random()));
//
// 		// Perform stochastic gradient descent
// 		let e = 1;
// 		while (e > 0.00001) {
// 			for (let u = 0; u < this.num_users; u++) {
// 				for (let i = 0; i < this.num_items; i++) {
// 					if (train[u][i] > 0) {
// 						const prediction = this.predict(u, i);
// 						e = (train[u][i] - prediction);
//
// 						this.user_bias[u] += this.lr * (e - this.reg * this.user_bias[u]);
// 						this.item_bias[i] += this.lr * (e - this.reg * this.item_bias[i]);
//
// 						for (let f = 0; f < this.num_factors; f++) {
// 							this.user_factors[u][f] += this.lr * (e * this.item_factors[i][f] - this.reg * this.user_factors[u][f]);
// 							this.item_factors[i][f] += this.lr * (e * this.user_factors[u][f] - this.reg * this.item_factors[i][f]);
// 						}
// 					}
// 				}
// 			}
// 		}
// 	}
//
// 	predict(u, i) {
// 		let prediction = this.global_bias + this.user_bias[u] + this.item_bias[i] + this.dotProduct(this.user_factors[u], this.item_factors[i]);
// 		return prediction;
// 	}
//
// 	dotProduct(arr1, arr2) {
// 		return arr1.reduce((sum, val, index) => sum + val * arr2[index], 0);
// 	}
// }
//
//
// const ratings = [
// 	[10, 1, 0, 3, 9],
// 	[10, 10, 10, 10, 10],
// 	[4, 5, 5, 8, 9],
// 	[6, 7, 4, 10, 0],
// 	[1, 1, 1, 1, 1],
// ];
//
// const numFactors = 3;
// const numIterations = 100000;
// const learningRate = 0.01;
// const regularization = 0.01;
//
// const svdpp = new SVDpp(numFactors, numIterations, learningRate, regularization);
// svdpp.fit(ratings);
//
// const user = 0;
// const item = 2;
// const prediction = svdpp.predict(user, item);
// console.log(`Prediction for user ${user} and item ${item}: ${prediction}`);
