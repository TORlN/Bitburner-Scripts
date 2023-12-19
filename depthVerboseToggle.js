/** @param {NS} ns */
export async function main(ns) {
    var info = ns.ps("home");
    for (let i = 0; i < info.length; i++) {
        if (info[i].filename == "autoDepth.js") {
            var args = info[i].args;
            if (args[1] == true) {
                args[1] = false;
            } else {
                args[1] = true;
            }
            ns.kill(info[i].pid);
            await ns.ui.clearTerminal();
            ns.run("autoDepth.js", 1, args[0], args[1]);
            return;
        }
    }
    ns.tprint("not running");
}