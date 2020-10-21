import systemInformation from "systeminformation";

async function memoryUsageExec() {
  let memory = await systemInformation.mem();
  let totalMemoryInGB = Math.ceil(memory.total / 1024 ** 3);
  let memoryUsageInPercent = Math.round((memory.used / memory.total)*100);
  return {
    totalMemoryInGB,
    memoryUsageInPercent
  };
}

export default memoryUsageExec;
