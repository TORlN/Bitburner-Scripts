This is a repository for scripts that I wrote for the game "bitburner", an idle game that involves you writing javascript to automate various aspects of the game.

To use in your own game, input the following commands:

```run greedyUpgrade.js```
```run autoDepth.js {desired depth(positive integer)} {depth verbose(bool)} {hack verbose(bool)}```

Depth verbose will print information on each server touched by depth-first-search and hack verbose will show you real time information on each server's growth, weakens, and hacks.

Example of autoDepth.js:
```run autoDepth.js 10 false true```
