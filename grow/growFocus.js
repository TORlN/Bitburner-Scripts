/** @param {NS} ns */
export async function main(ns) {
    var server = ns.args[0];
    var verbose = ns.args[1];
    await ns.scp("growFocus.js", server.hostname, "home");
    while (true) {
        var growValue = await ns.grow(server) - 1;
        if (verbose == true) {
            ns.tprint("INFO Grew ", server, " by %", growValue);
        }
    }
}