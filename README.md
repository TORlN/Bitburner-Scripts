This is a repository for scripts that I wrote for the game "bitburner", an idle game that involves you writing javascript to automate various aspects of the game.

To use in your own game, input the following commands:

```run greedyUpgrade.js```

```run autoDepth.js {desired depth(positive integer)} {depth verbose(bool)} {hack verbose(bool)}```

Greedy upgrade automates hacknet purchases

Auto depth intiates a depth-first search of all servers up to the depth parameter. After finding a server, it copies localHack.js into that server's memory and runs it using the optimal amount of ram. localHack.js uses the smallest amount of ram possible to intitiate optimal growth, weaken, and hacking functions. If possible, this script will also purchase servers and upgrades at its own discretion to accelerate the growth, weaken, hack process. If the maximum amount of servers is reached, the server with the lowest maximum money will be replaced with a new server that has more money. This ensures that all money used on servers is not wasted.

Depth verbose will print information on each server touched by depth-first-search and hack verbose will show you real time information on each server's growth, weakens, and hacks.

autoDepth.js requires a server with at least 32GB of ram. This script will not function properly at a lower ram level.

Example of autoDepth.js:

```run autoDepth.js 10 false true```
