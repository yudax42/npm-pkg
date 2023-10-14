import { hello } from './index'

describe('hello', () => {
    it('should say hello', () => {
        expect(hello('world')).toBe('Hello, world!')
    })
})