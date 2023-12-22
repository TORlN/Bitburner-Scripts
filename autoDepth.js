/** @param {NS} ns */
export async function main(ns) {
    var depth = ns.args[0];
    var verbose = ns.args[1];
    var hackVerbose = ns.args[2];
    while (true) {
        if (verbose == true) {
            await ns.ui.clearTerminal();
        }
        await ns.exec("depthHack.js", "home", 1, "home", depth, verbose, hackVerbose);
        await ns.sleep(1000)
    }
}