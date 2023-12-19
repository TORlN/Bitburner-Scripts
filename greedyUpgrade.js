/** @param {NS} ns */
function printSearching(ns, choice) {
    switch (choice) {
        case 0:
            ns.print("Searching for level...");
            break;
        case 1:
            ns.print("Searching for ram...");
            break;
        case 2:
            ns.print("Searching for core...");
            break;
        default:
            ns.print("weird choice: ", choice);
            break;
    }
}

function generatePermutation(n) {
    var list = [];
    for (let i = 0; i < n; i++) {
        list.push(i);
    }
    for (let i = 0; i < n; i++) {
        var randIndex = Math.floor(Math.random() * (n - i)) + i;
        var temp = list[i]
        list[i] = list[randIndex];
        list[randIndex] = temp;
    }
    return list;
}

export async function main(ns) {
    ns.disableLog("sleep");
    while (true) {
        var n = ns.hacknet.numNodes();
        if (n < ns.hacknet.maxNumNodes()) {
            if (ns.hacknet.purchaseNode() != -1) {
                ns.print("Bought new node");
            }
        }
        var bought = false;
        var choice = Math.floor(Math.random() * 3);
        var list = generatePermutation(n);
        for (let index = 0; index < list.length; index++) {
            var node = list[index];
            switch (choice) {
                case 0:
                    if (ns.hacknet.upgradeLevel(node) == true) {
                        bought = true;
                        ns.print("Bought level at node ", node);
                    }
                    break;
                case 1:
                    if (ns.hacknet.upgradeRam(node) == true) {
                        bought = true;
                        ns.print("Bought ram at node ", node);
                    }
                    break;
                case 2:
                    if (ns.hacknet.upgradeCore(node) == true) {
                        bought = true;
                        ns.print("Bought core at node ", node);
                    }
                    break;
                default:
                    ns.print("weird choice: ", choice);
                    break;
            }
            if (bought == true) {
                break;
            }
        }
        await ns.sleep(1000)
    }
}