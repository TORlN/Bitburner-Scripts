/** @param {NS} ns */
var serverSet;

async function hack(ns, server, depth, verbose, hackVerbose) {
    if (depth == -1) {
        return;
    }
    await ns.print("scanning...");
    var neighbors = ns.scan(server).filter(neighbor => !serverSet.has(neighbor) && !neighbor.endsWith('-personal'));
    if (server != "home" && ns.serverExists(server)) {
        var pid = await ns.run("AutoHack.js", { preventDuplicates: true }, server, verbose, hackVerbose);
        while (ns.isRunning(pid)) {
            await ns.sleep(1)
        }
        var f = ns.ls("home", "contract")
        var files = ns.ls(server, "contract");
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                await ns.exec("solveContracts.js", "home", { preventDuplicates: true }, server, files[i], hackVerbose);
            }
        } //else if (f.length > 0) {
        //     await ns.exec("solveContracts.js", "home", { preventDuplicates: true }, "home", f[0], hackVerbose);
        // } else {
        //     ns.tprint("creating dummy contract");
        //     ns.codingcontract.createDummyContract("Total Ways to Sum II");
        // }
    }
    for (let i = 0; i < neighbors.length; i++) {
        if (serverSet.has(neighbors[i])) {
            continue;
        } else {
            serverSet.add(neighbors[i]);
            await hack(ns, neighbors[i], depth - 1, verbose, hackVerbose);
        }
    }
}
export async function main(ns) {
    var server = ns.args[0];
    var depth = ns.args[1];
    var verbose = ns.args[2];
    var hackVerbose = ns.args[3];
    serverSet = new Set();
    await hack(ns, server, depth + 1, verbose, hackVerbose); //+1 to account for current depth
}
