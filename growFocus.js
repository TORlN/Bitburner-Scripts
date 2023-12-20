/** @param {NS} ns */
export async function main(ns) {
    var server = ns.args[0];
    var verbose = ns.args[1];
    var growValue = await ns.grow(server) - 1;
    if (verbose == true) {
        ns.tprint("\u001b[36m", "Grew ", server, " by %", growValue, "\u001b[0m");
    }
}