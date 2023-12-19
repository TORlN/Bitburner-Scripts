/** @param {NS} ns */
var serverSet;
async function hack(ns, server, depth, verbose) {
    if (depth == -1) {
        return;
    }
    await ns.print("scanning...");
    var neighbors = ns.scan(server).filter(neighbor => !serverSet.has(neighbor));
    if (server != "home") {
        var pid = await ns.run("AutoHack.js", 1, server, verbose);
        while (ns.isRunning(pid)) {
            await ns.sleep(1)
        }
    }
    for (let i = 0; i < neighbors.length; i++) {
        if (serverSet.has(neighbors[i])) {
            continue;
        } else {
            serverSet.add(neighbors[i]);
            await hack(ns, neighbors[i], depth - 1, verbose);
        }
    }
}
export async function main(ns) {
    var server = ns.args[0];
    var depth = ns.args[1];
    var verbose = ns.args[2];
    serverSet = new Set();
    await hack(ns, server, depth + 1, verbose); //+1 to account for current depth
}
