# Driving-Training-Center

this project include front-end react application project that's located in ClientApp folder and asp.net core project that's located in Driving Training Center folder.

## Client App
for environments using [Node](https://nodejs.org/), the easiest way to handle this would be to install [serve](https://github.com/zeit/serve) and let it handle the rest:
> cd ClientApp

> npm install -g serve

> serve -s build

The last command shown above will serve your static site on the port  **5000**. Like many of  [serve](https://github.com/zeit/serve)’s internal settings, the port can be adjusted using the  `-l`  or  `--listen`  flags:

>serve -s build -l 4000

Run this command to get a full list of the options available:

>serve -h

