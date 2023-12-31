const resolvedWithRejectionNumCheck = require('../src/task.js')
const messageText = require('../constants.js');

describe('resolvedWithRejectionNumCheck', () => {
	it('should resolve when all promises are resolved', () => {
		const resolvedPromise = Promise.resolve('success')
		const promises = [resolvedPromise, resolvedPromise, resolvedPromise]
		const maxRejectedNum = 2
		const expectedOutput = messageText.SUCCESS

		const output = resolvedWithRejectionNumCheck(promises, maxRejectedNum)

		expect(output).resolves.toEqual(expectedOutput)
	})

	it('should resolve when amount of rejected promises is lower than maxRejectedNum', () => {
		const resolvedPromise = Promise.resolve('success')
		const rejectedPromise = Promise.reject('fail')
		const promises = [resolvedPromise, resolvedPromise, rejectedPromise]
		const maxRejectedNum = 2
		const expectedOutput = messageText.SUCCESS

		const output = resolvedWithRejectionNumCheck(promises, maxRejectedNum)

		expect(output).resolves.toEqual(expectedOutput)
	})

	it('should resolve when amount of rejected promises equals maxRejectedNum', () => {
		const resolvedPromise = Promise.resolve('success')
		const rejectedPromise = Promise.reject('fail')
		const promises = [resolvedPromise, resolvedPromise, rejectedPromise]
		const maxRejectedNum = 1
		const expectedOutput = messageText.SUCCESS

		const output = resolvedWithRejectionNumCheck(promises, maxRejectedNum)

		expect(output).resolves.toEqual(expectedOutput)
	})

	it('should reject when amount of rejected promises exceeds maxRejectedNum', () => {
		const resolvedPromise = Promise.resolve('success')
		const rejectedPromise = Promise.reject('fail')
		const promises = [resolvedPromise, rejectedPromise, rejectedPromise]
		const maxRejectedNum = 1
		const expectedOutput = messageText.EXCEEDS_MAX_REJECTED_NUM

		const output = resolvedWithRejectionNumCheck(promises, maxRejectedNum)

		expect(output).rejects.toEqual(expectedOutput)
	})

	it('should reject for empty array of promises', () => {
		const promises = []
		const maxRejectedNum = 1
		const expectedOutput = messageText.NO_PROMISES

		const output = resolvedWithRejectionNumCheck(promises, maxRejectedNum)

		expect(output).rejects.toEqual(expectedOutput)
	})

	it('should reject when promisesToHandle contains invalid type', () => {
		const promises = ['resolvedPromise', 'rejectedPromise']
		const maxRejectedNum = 1
		const expectedOutput = messageText.INPUT_MUST_BE_ARRAY_OF_PROMISES

		const output = resolvedWithRejectionNumCheck(promises, maxRejectedNum)

		expect(output).rejects.toEqual(expectedOutput)
	})

	it('should reject when maxRejectedNum is not a number', () => {
		const resolvedPromise = Promise.resolve('success')
		const promises = [resolvedPromise, resolvedPromise]
		const maxRejectedNum = '1'
		const expectedOutput = messageText.MAX_REJECTED_NUM_MUST_BE_NUMBER

		const output = resolvedWithRejectionNumCheck(promises, maxRejectedNum)

		expect(output).rejects.toEqual(expectedOutput)
	})
})