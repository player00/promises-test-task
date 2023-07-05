function resolvedWithRejectionNumCheck(promisesToHandle, maxRejectedNum) {
	return new Promise((resolve, reject) => {
		if (Array.isArray(promisesToHandle) === false || promisesToHandle.every(item => item instanceof Promise) === false) {
			reject('Input must be an array of Promises');
		}
		if (promisesToHandle.length == 0) {
			resolve('There was no promises');
		}
		Promise.allSettled(promisesToHandle)
			.then(results => results.filter(result => result.status === "rejected"))
			.then(rejected => {
				if (rejected.length <= maxRejectedNum) {
					resolve('Success');
				}
				else {
					reject('Amount of rejected promises from promisesToHandle exceeds the maxRejectedNum value');
				}
			})
	})
}

module.exports = resolvedWithRejectionNumCheck;