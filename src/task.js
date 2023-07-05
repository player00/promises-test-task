const {
	INPUT_MUST_BE_ARRAY_OF_PROMISES,
	NO_PROMISES,
	EXCEEDS_MAX_REJECTED_NUM,
	SUCCESS
} = require('../constants.js');

function resolvedWithRejectionNumCheck(promisesToHandle, maxRejectedNum) {
	return new Promise((resolve, reject) => {
		if (promisesToHandle.length == 0) {
			reject(NO_PROMISES);
		}
		if (Array.isArray(promisesToHandle) === false || promisesToHandle.every(item => item instanceof Promise) === false) {
			reject(INPUT_MUST_BE_ARRAY_OF_PROMISES);
		}
		Promise.allSettled(promisesToHandle)
			.then(results => results.filter(result => result.status === "rejected"))
			.then(rejected => {
				if (rejected.length <= maxRejectedNum) {
					resolve(SUCCESS);
				}
				else {
					reject(EXCEEDS_MAX_REJECTED_NUM);
				}
			})
	})
}

module.exports = resolvedWithRejectionNumCheck;