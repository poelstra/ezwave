# Modular Typescript / Javascript Z-Wave driver

A Z-Wave driver written in Typescript for Node.JS with a focus on
robustness and responsiveness.

Currently still in an early phase of development, although some
layers of the implementation are already usable.

## Architecture

The system is composed of different building blocks/layers:

-   Serial API
-   Auto-generated command class encoding/decoding
-   Host driver including Z-Wave transport layers
-   (Future) Network daemon exposing the Host driver to other
    programs using HTTP, MQTT, etc.

The Serial API driver is handling the low-level communication to
the Z-Wave controller (USB-stick) that enables a PC to talk to the
Z-Wave network. It handles packetization of the serial bytestream,
and handles timeouts, checksumming, low-level request/response
collisions, etc. It provides methods to other components to actually
allow sending/receiving packets to/from Z-Wave devices on the network,
and emits events whenever new messages arrive from the network.

Command classes are used to actually tell Z-Wave devices what to
do (switch on a light) or get feedback from them (window opened,
button pressed, certain amount of energy used). In contrast to
many (all?) other Z-Wave implementations, the decoding and encoding
of Z-Wave command classes is handled independent of a specific
Z-Wave driver, which means it can also be used to talk to Z-Wave
devices over any other Z-Wave bridge-like driver, or to e.g.
create your own program that's specifically created to one peculiar
Z-Wave device you own, while letting all other Z-Wave devices be
handled by some off-the-shelf software.

The Host driver uses a Serial API driver and command classes to
implement Z-Wave controller functionality: inclusion/exclusion of
new devices, device interviews, network health checks/repair, etc.
It also provides common Z-Wave transport layers such as security,
multi-channel, which are application-independent and are typically
transparent to end-users of command classes.

The network daemon houses a Host driver (of which there can be only
one connected to a single USB-stick), and exposes functionality to
send/receive Z-Wave command class packets to/from Z-Wave devices on
the network, automatically e.g. encrypting commands as necessary for
that specific device, and embedding it into multi-channel
encapsulation to address a specific sub-device (channel) of a device.

Perhaps, it will also provide some easy-to-use API (e.g. REST) to
interact with certain well-known command classes such as to control
ligths, change settings on devices, etc. But more likely, that
functionality will be provided by a standalone program, that merely
connects to the network daemon like any other.

The intention is to also provide an easy-to-use Web UI to monitor,
control and configure your Z-Wave network, again as a standalone
service.

## Why

I was using Domoticz with its embedded OpenZwave (C++) driver, but
unsatisfied with its performance: very slow (sometimes around ten
seconds) to respond to switch commands, very long initialization
time (tens of seconds). No ability to just unplug and re-plug the
Aeon labs Z-Stick (which is specifically made to be moved around
to include new devices).

Also, experimenting with the network was nearly impossible due to
the domotica software (Domoticz in this case) taking full control
of the Z-Wave driver.

Thinking "How hard can it be?" I started digging in the (by then
recently) published Z-Wave standards. Ok, hard, but not impossible :)

It's always fun to learn something new, so I started coding a Z-Wave
driver with the following goals in mind:

-   Allow multiple programs to interface to the same Z-Wave controller,
    by running the main process as a daemon.
-   Make Z-Wave command class functionality independent of a specific
    Z-Wave driver.
-   Be auto-configuring and self-repairing by default where possible.

This philosophy ensures that the system is robust in a distributed
domotica system, encouraging the use of independent, task-oriented
processes working together to build a larger system.

It allows people to interact with Z-Wave devices on the network
by directly sending/receiving Z-Wave command classes, even if that
functionality is not directly provided by the current version of
the software, or perhaps it's written in another language.

Also, having the Z-Wave command class encoders/decoders separate
allows them to be used to send command to/from other similar Z-Wave
daemons (e.g. for use with a third party Z-Wave-to-IP gateway), and
for creating diagnostic tooling (e.g. packet decoding in a web app).

## Status

It's in a very early stadium right now, but it's already used to
control all Z-Wave devices in my home (lights, dimmers, switches),
including Security S0, and does so _much_ faster than I was used
to in my old setup.

The low-level Serial API decoding/encoding is pretty much done,
and well-covered with unit tests including handling of all kinds
of corner cases, timeout scenario's, etc.
Not all serial commands are implemented, only the ones I currently
need. Due to the design, you can easily implement any missing
commands yourself, without even modifying any of the packages I
wrote.

I've also created a converter which parses the official Z-Wave
command class specification (in XML) and converts it into another
format that's easier to use for generating command class decoders
and encoders. It fixes all kinds of inconsistencies etc in the
original XML, and saves it as a convenient JSON file.

A code generator then takes this JSON format and generates classes,
interfaces and enums for _all_ Z-Wave command classes. These in turn
use the provided packet encoder/decoder functions to convert between
nice human-readable TypeScript interfaces and raw packets. For example:

```ts
// Encode a Z-Wave packet
const commandPacket =
	new MultiChannelAssociationV2.MultiChannelAssociationRemove({
		groupingIdentifier: 0x12,
		nodeIds: [1, 2, 3],
		vg: [
			{
				multiChannelNodeId: 10,
				bitAddress: false,
				endPoint: 3,
			},
		],
	});
const buffer = command.serialize(); // <Buffer 8e 04 12 01 02 03 00 0a 03>

// Decode a Z-Wave packet
const packet = new Packet(buffer);
console.log(packet.is(MultiChannelAssociationV2.MultiChannelAssociationRemove)); // true

const decodedPacket = packet.as(
	MultiChannelAssociationV2.MultiChannelAssociationRemove
);
console.log(decodedPacket.data); // same as the object passed in, above
```

You can combine the .is() and .as() into one call with .tryAs(), and
can check whether a packet is of a certain command class, like e.g.:

```ts
console.log(packet.is(MultiChannelAssociationV2)); // true
```

The JSON Z-Wave spec is set up to be easy for code generators and
packet encoders/decoders to work with, and is intended to be useful
outside of just JavaScript / TypeScript too.

Similarly, because the Z-Wave packet encoding/decoding is completely
'stand-alone', with no dependencies on any other part of 'my' Z-Wave
drivers, it is usable in other NodeJS projects (or e.g. a browser
based Z-Wave packet debugging tool).

All command-classes are supported right now, including 'weird' ones
(such as Transport, which re-uses a few of the command bytes as
data, etc.). However, for some of them, the generated output is not
as user-friendly as it should be, or in some cases actually still
slightly incorrect. For example, in the original XML spec, certain
encapsulated packages are split into individual commandclass, command,
and payload fields, but if that class also supports splitting the
encapsulated data into multiple packets, that's obviously incorrect
for any packet except the first. Or certain classes support variable-
length signed integers, but the XML spec doesn't support them and
instead classifies them as blobs, so they will be decoded as Buffer.

Provisions are in place in the XML-to-JSON converter to fix these
kind of cases, but there are probably a few remaining.

Multi-channel and Security S0 layers are implemented.
Other transport layers (Multi-command, Supervision, Transport,
Security S2) are still on the todo.

There's no generic Z-Wave daemon yet. Inclusion of devices is
implemented (as a method call), but interviewing of new devices
isn't implemented, nor are things like support for battery class
devices.

The codebase was split into multiple packages in a monorepo,
and is in the process of publishing individual NPM packages.

## Development

### Initial setup

This repository is a monorepo set up using [Rush](https://rushjs.io/).
It uses [pnpm](https://pnpm.io/) as the package manager.

In order to build all packages, you'll need to run the following:

-   Install NodeJS (tested on version 16)
-   Install `rush` build tool: `npm install -g @microsoft/rush`
-   Install all (NPM) dependencies: `rush update`
-   Build and test all packages: `rush build`

Whenever you make a change to any of the `package.json` files (e.g.
when pulling in new changes), be sure to run `rush update` again.

WARNING: Do NOT run any of the 'normal' `npm` commands, nor directly
run `pnpm`, for installing or modifying the list of installed packages!
This will mess up the workspace-shared dependencies. Only use `rush add`.

`rush build` will smartly rebuild only packages that changed or its
dependents, but if you only want to (re-)build a specific package and
its dependencies, you can also just run e.g. `rush build --to .` (from
the folder you want to build to).

To (re-)build just a single package, just run `rushx build` in that folder
(it's the rush equivalent to `npm run build`).

In order to run all packages in watch mode, you can use e.g. `@telia/rush-select`.
Run it as `pnpx -y @telia/rush-select`, select the `watch` target for each package,
and press `Enter` to start to build them all. The target selection only needs to
be performed once.

### Setting up VSCode

It's highly recommended to use VSCode for development.

-   Ensure you install the [Workspace Recommended Extensions](https://code.visualstudio.com/docs/editor/extension-marketplace#_workspace-recommended-extensions)
    -   It should ask you whether to install these when you first open the repo, click Yes.
-   Make sure you use the [workspace's version of TypeScript](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript)

### Developing your own customization

To start controlling your own home, take a look at `app/demo`
for inspiration. It's the app that controls the devices in my
home, connected through the MHub message broker.

It supports connecting multiple Z-Wave USB sticks, Security S0,
dynamically plugging and unplugging the stick(s) and a (hardcoded)
list of Z-Wave devices. It does this without a glitch for years
already.

It does not yet have a (convenient) way of e.g. onboarding new devices,
has no support for battery class devices (yet), etc.

You can run the app with your existing Z-Wave stick, it won't modify any
configuration on it, so it's safe and easy to experiment.

Anyway, in order to get started:

-   Set up a config file `app/demo/config.json` (see app/demo/src/index for its format).

    -   You can configure the serial port id of the devices, and add the home+node ID of
        a stick you own (just leave it empty initially, it will print the IDs it found).

    -   Example:

        ```json
        {
        	"serial": {
        		"ports": ["/dev/serial/by-id/usb-0658_0200-if00"]
        	},
        	"hosts": [
        		{
        			"homeId": 1234567,
        			"nodeId": 1,
        			"type": "StaticController",
        			"networkKey": "abcdefabcdefabcdefabcdefabcdefab"
        		}
        	],
        	"mhub": {
        		"url": "192.168.1.1",
        		"user": "zwave",
        		"pass": "somepassword"
        	}
        }
        ```

-   Run `node apps/demo/lib/index` to start it

Detailed debug information from the protocol layers can be obtained
by enabling the `zwave` debug namespace in the `DEBUG` environment
variable:

-   `DEBUG=zwave:* node apps/demo/lib/index`

Or to run the demo app in watch mode using `nodemon`:

-   `DEBUG=zwave:* pnpx -y nodemon -w apps/demo/lib apps/demo/lib/index`
    -   Note: Add any other folders you're developing on as additional `-w`
        flags, nodemon doesn't support globs for watching folders.

### Running in Docker

A barebones Dockerfile is provided as an example to run the demo app.
Set up a config file (in `apps/demo/config.json`) as mentioned above,
then run:

-   `cd ~/src/ezwave` # Assuming this is where you cloned this repo
-   `./common/scripts/prepare-docker-cache.sh`
-   `docker build -t ezwave .`
-   `docker run -v ~/src/ezwave/apps/demo:/config ezwave`

## Support

I'd really appreciate a star on GitHub if you like my work.

## License

MIT

Copyright 2018 (C) Martin Poelstra <martin@beryllium.net>

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
