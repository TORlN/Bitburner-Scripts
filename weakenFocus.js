/** @param {NS} ns */
export async function main(ns) {
    var server = ns.args[0];
    var verbose = ns.args[1];
    var weakenValue = await ns.weaken(server);
    if (verbose == true) {
        ns.tprint("\u001b[33m", "Weakened ", server, " by ", weakenValue, "\u001b[0m");
    }
}