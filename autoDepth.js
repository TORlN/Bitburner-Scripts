/** @param {NS} ns */
export async function main(ns) {
    var depth = ns.args[0];
    var verbose = ns.args[1];
    while (true) {
        if (verbose == true) {
            await ns.ui.clearTerminal();
        }
        await ns.exec("depthHack.js", "home", 1, "home", depth, verbose);
        await ns.sleep(1000)
    }
}