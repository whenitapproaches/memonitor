import systemInformation from 'systeminformation';

export default async () => {
  let data = await systemInformation.memLayout()

  let result = data.map((ram) => {
    return {
      size: ram.size / (1024**3),
      clockSpeed: ram.clockSpeed,
      manufacturer: ram.manufacturer,
      serialNum: ram.serialNum
    }
  })

  return result
}