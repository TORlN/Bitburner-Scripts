/** @param {NS} ns */
export async function main(ns) {
    var info = ns.ps("home");
    for (let i = 0; i < info.length; i++) {
        if (info[i].filename == "autoDepth.js") {
            var args = info[i].args;
            if (args[2] == true) {
                args[2] = false;
            } else {
                args[2] = true;
            }
            ns.kill(info[i].pid);
            await ns.ui.clearTerminal();
            ns.run("autoDepth.js", 1, args[0], args[1], args[2]);
            return;
        }
    }
    ns.tprint("not running");
}