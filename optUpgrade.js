/** @param {NS} ns */
function calcOptimalNode(ns, n) {
    var opt = 0;
    var max = 0;
    for (let i = 0; i < n; i++) {
        var stats = ns.hacknet.getNodeStats(i);
        var multiplier = ns.getHacknetMultipliers();
        var gain = ns.formulas.hacknetNodes.moneyGainRate(stats.level, stats.ram, stats.cores, multiplier.production)
        if (gain > max) {
            max = gain;
            opt = i;
        }
    }
    return i;
}

export async function main(ns) {
    while (true) {
        var n = ns.hacknet.numNodes();
        if (n < ns.hacknet.maxNumNodes()) {
            ns.hacknet.purchaseNode();
        }
        optNode = calcOptimalNode(ns, n);
        var bought = false;
        while (bought == false) {
            if (ns.hacknet.upgradeLevel(optNode) == true) {
                bought = true;
            }
            if (ns.hacknet.upgradeRam(optNode) == true) {
                bought = true;
            }
            if (ns.hacknet.upgradeCore(optNode) == true) {
                bought = true;
            }
        }
        await ns.sleep(100)
    }
}