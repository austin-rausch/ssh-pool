/* eslint-disable func-names */
import Connection from './Connection'

class ConnectionPool {
  /**
   * Initialize a new `ConnectionPool` with `connections`.
   * All Connection options are also supported.
   *
   * @param {Connection|string[]} connections Connections
   * @param {object} [options] Options
   */
  constructor(connections, options) {
    this.connections = connections.map(connection => {
      if (connection instanceof Connection) return connection
      return new Connection({ remote: connection, ...options })
    })
  }
  addConnections (input, options) {
    const connections = input.map(connection => {
      if (connection instanceof Connection) return connection
      return new Connection({ remote: connection, ...options })
    })
    this.connections = this.connections.concat(connections)
  }
  removeConnections (ids) {
    this.connections = this.connections.filter(connection => {
      return ids.indexOf(connection.id) !== -1
    })
  }
}

;[
  'run',
  'copy',
  'copyToRemote',
  'copyFromRemote',
  'scpCopyToRemote',
  'scpCopyFromRemote',
].forEach(method => {
  ConnectionPool.prototype[method] = function(...args) {
    return Promise.all(
      this.connections.map(connection => connection[method](...args)),
    )
  }
})

export default ConnectionPool
