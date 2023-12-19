/** @param {NS} ns */
export async function main(ns) {
    var server = ns.args[0];
    while (true) {
        var chance = ns.hackAnalyzeChance(server);
        ns.print("Chance to hack: ", chance);
        if (ns.getServerMoneyAvailable(server) < 10000000) {
            await ns.grow(server);
        } if (chance < .5) {
            await ns.weaken(server);
        } else {
            await ns.hack(server);
        }
    }
}