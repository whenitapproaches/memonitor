import wincmd from 'node-windows'

function killProcessByPID(pid) {
  return new Promise(resolve => {
    wincmd.kill(pid, true, resolve)
  })
}

export default killProcessByPID