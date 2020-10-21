import systemInformation from "systeminformation";
import { map, filter } from "lodash";

async function runningProcessesExec() {
  let systemInformationProcesses = await systemInformation.processes();
  let runningProcesses = systemInformationProcesses.list;
  let runningProcessesExceptSystemIdle = filter(runningProcesses, (o) => o.pid !== 0)
  let runningProcessesData = map(runningProcessesExceptSystemIdle, o => ({
    name: o.name,
    pid: o.pid,
    rss: o.mem_rss,
    cpu: o.pcpu
  }));
  return runningProcessesData
}

export default runningProcessesExec;
