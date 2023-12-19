/** @param {NS} ns */
export async function main(ns) {
    while (true) {
        programs = [
            "AutoLink.exe",
            "BruteSSH.exe",
            "FTPCrack.exe",
            "RelaySMTP.exe",
            "HTTPWorm.exe",
            "SQLInject.exe",
        ]
        for (let i = 0; i < programs.length; i++) {
            ns.createProgram(programs[i], false);
        }
        await ns.sleep(100000)
    }
}