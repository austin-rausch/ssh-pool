import { formatRawCommand } from './raw'

describe('raw', () => {
  describe('#formatRawCommand', () => {
    it('should support command', () => {
      expect(formatRawCommand({ command: 'echo "ok"' })).toBe('echo "ok"')
    })

    it('should support asUser', () => {
      expect(formatRawCommand({ asUser: 'foo', command: 'echo "ok"' })).toBe(
        'sudo -u foo echo "ok"',
      )

      expect(
        formatRawCommand({ asUser: 'foo', command: 'sudo echo "ok"' }),
      ).toBe('sudo -u foo echo "ok"')
    })
  })
})
