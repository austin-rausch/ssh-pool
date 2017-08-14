/* eslint-disable no-console */
import { ConnectionPool } from '../src'

const pool = new ConnectionPool(['neoziro@localhost', 'neoziro@localhost'])

pool
  .run('hostname', { stdout: process.stdout, stderr: process.stderr })
  .then(() => {
    console.log('Success!')
  })
