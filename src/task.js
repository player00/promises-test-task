const messageText = require('../constants.js');

function resolvedWithRejectionNumCheck(promisesToHandle, maxRejectedNum) {
	return new Promise((resolve, reject) => {
		if (typeof maxRejectedNum !== 'number') {
			reject(messageText.MAX_REJECTED_NUM_MUST_BE_NUMBER);
		}
		if (promisesToHandle.length == 0) {
			reject(messageText.NO_PROMISES);
		}
		const isArray = Array.isArray(promisesToHandle)
		const isArrayOfPromises = promisesToHandle.every(item => item instanceof Promise)
		if (!isArray || !isArrayOfPromises) {
			reject(messageText.INPUT_MUST_BE_ARRAY_OF_PROMISES);
		}
		Promise.allSettled(promisesToHandle)
			.then(results => results.filter(result => result.status === "rejected"))
			.then(rejected => {
				if (rejected.length <= maxRejectedNum) {
					resolve(messageText.SUCCESS);
				}
				else {
					reject(messageText.EXCEEDS_MAX_REJECTED_NUM);
				}
			})
	})
}

module.exports = resolvedWithRejectionNumCheck;