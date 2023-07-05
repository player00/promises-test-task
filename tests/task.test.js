const resolvedWithRejectionNumCheck = require('../src/task.js')

describe('resolvedWithRejectionNumCheck', () => {
	it('should give proper message for empty array', () => {
		const promises = []
		const maxRejectedNum = 1
		const expectedOutput = 'There was no promises'

		const output = resolvedWithRejectionNumCheck(promises, maxRejectedNum)

		expect(output).resolves.toEqual(expectedOutput)
	})

	it('should resolve when amount of rejected promises equals maxRejectedNum', () => {
		const resolvedPromise = Promise.resolve('success')
		const rejectedPromise = Promise.reject('fail')
		const promises = [resolvedPromise, resolvedPromise, rejectedPromise]
		const maxRejectedNum = 1
		const expectedOutput = 'Success'

		const output = resolvedWithRejectionNumCheck(promises, maxRejectedNum)

		expect(output).resolves.toEqual(expectedOutput)
	})

	it('should resolve when amount of rejected promises is lower than maxRejectedNum', () => {
		const resolvedPromise = Promise.resolve('success')
		const rejectedPromise = Promise.reject('fail')
		const promises = [resolvedPromise, resolvedPromise, rejectedPromise]
		const maxRejectedNum = 2
		const expectedOutput = 'Success'

		const output = resolvedWithRejectionNumCheck(promises, maxRejectedNum)

		expect(output).resolves.toEqual(expectedOutput)
	})

	it('should reject when amount of rejected promises exceeds maxRejectedNum', () => {
		const resolvedPromise = Promise.resolve('success')
		const rejectedPromise = Promise.reject('fail')
		const promises = [resolvedPromise, rejectedPromise, rejectedPromise]
		const maxRejectedNum = 1
		const expectedOutput = 'Amount of rejected promises from promisesToHandle exceeds the maxRejectedNum value'

		const output = resolvedWithRejectionNumCheck(promises, maxRejectedNum)

		expect(output).rejects.toEqual(expectedOutput)
	})

	it('should reject when promisesToHandle contains invalid type', () => {
		const promises = ['resolvedPromise', 'rejectedPromise']
		const maxRejectedNum = 1
		const expectedOutput = 'Input must be an array of Promises'

		const output = resolvedWithRejectionNumCheck(promises, maxRejectedNum)

		expect(output).rejects.toEqual(expectedOutput)
	})
})