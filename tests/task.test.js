const resolvedWithRejectionNumCheck = require('../src/task.js')
const {
	INPUT_MUST_BE_ARRAY_OF_PROMISES,
	NO_PROMISES,
	EXCEEDS_MAX_REJECTED_NUM,
	SUCCESS
} = require('../constants.js');

describe('resolvedWithRejectionNumCheck', () => {
	it('should give proper message for empty array', () => {
		const promises = []
		const maxRejectedNum = 1
		const expectedOutput = NO_PROMISES

		const output = resolvedWithRejectionNumCheck(promises, maxRejectedNum)

		expect(output).rejects.toEqual(expectedOutput)
	})

	it('should resolve when amount of rejected promises equals maxRejectedNum', () => {
		const resolvedPromise = Promise.resolve('success')
		const rejectedPromise = Promise.reject('fail')
		const promises = [resolvedPromise, resolvedPromise, rejectedPromise]
		const maxRejectedNum = 1
		const expectedOutput = SUCCESS

		const output = resolvedWithRejectionNumCheck(promises, maxRejectedNum)

		expect(output).resolves.toEqual(expectedOutput)
	})

	it('should resolve when amount of rejected promises is lower than maxRejectedNum', () => {
		const resolvedPromise = Promise.resolve('success')
		const rejectedPromise = Promise.reject('fail')
		const promises = [resolvedPromise, resolvedPromise, rejectedPromise]
		const maxRejectedNum = 2
		const expectedOutput = SUCCESS

		const output = resolvedWithRejectionNumCheck(promises, maxRejectedNum)

		expect(output).resolves.toEqual(expectedOutput)
	})

	it('should reject when amount of rejected promises exceeds maxRejectedNum', () => {
		const resolvedPromise = Promise.resolve('success')
		const rejectedPromise = Promise.reject('fail')
		const promises = [resolvedPromise, rejectedPromise, rejectedPromise]
		const maxRejectedNum = 1
		const expectedOutput = EXCEEDS_MAX_REJECTED_NUM

		const output = resolvedWithRejectionNumCheck(promises, maxRejectedNum)

		expect(output).rejects.toEqual(expectedOutput)
	})

	it('should reject when promisesToHandle contains invalid type', () => {
		const promises = ['resolvedPromise', 'rejectedPromise']
		const maxRejectedNum = 1
		const expectedOutput = INPUT_MUST_BE_ARRAY_OF_PROMISES

		const output = resolvedWithRejectionNumCheck(promises, maxRejectedNum)

		expect(output).rejects.toEqual(expectedOutput)
	})
})