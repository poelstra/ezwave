# Modular Typescript / Javascript Z-Wave driver

A Z-Wave driver written in Typescript for Node.JS with a focus on
ease-of-use, robustness and responsiveness.

Currently still in a very early proof-of-concept phase.

You'll need to be familiar with Z-Wave terminology to be able
to even read the rest of the Readme...

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

## Architecture

As mentioned, the system is composed of different building blocks:

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

## Status

It's in a very early stadium right now, but it's already used to
control all Z-Wave devices in my home (lights, dimmers, switches),
including Security S0, and does so _much_ faster than I was used
to in my old setup.

The low-level Serial API decoding/encoding is pretty much done,
and well-covered with unit tests including handling of all kinds
of corner cases, timeout scenario's, etc.
Not all serial commands are implemented, only the ones I currently
need.

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
const commandPacket = new MultiChannelAssociationV2.MultiChannelAssociationRemove(
	{
		groupingIdentifier: 0x12,
		nodeIds: [1, 2, 3],
		vg: [
			{
				multiChannelNodeId: 10,
				bitAddress: false,
				endPoint: 3,
			},
		],
	}
);
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
outside of just JavaScript / TypeScript.

Similarly, because the packet encoding/decoding is completely
'stand-alone', with no dependencies on any other part of my Z-Wave
drivers, it is / will be usable in other (JavaScript) projects.

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
kind of cases, but only a few of them are fixed for now (the ones
thay I need).

There are two proof-of-concept implementations of protocol layers:
multi-channel and security S0. These are functional in the sense
that they work in my home, but were created more as a playground to
get to a better understanding of their architectural challenges.

However, there's no generic Z-Wave daemon yet, inclusion and
interview of new devices isn't implemented, certain basic
functionality (like preventing responses to multi-cast requests)
is still lacking, and only a handful of commands from a handful
of command classes is implemented.

The code base is a single monolithic package for now, but will be
split in separate NPM packages (as mentioned above) as soon as
the network daemon starts to take shape.

## Development

-   Install NodeJS (tested on version 12)
-   Run `npm install`
-   Run `npm test` to run all tests

To start controlling your own home, take a look at `src/demo/*`
for inspiration, copy it to another folder and start hacking ;)

-   Run `npm run build` to build
-   Run `node dist/demo/index` to start it

Detailed debug information from the protocol layers can be obtained
by enabling the `zwave` debug namespace in the `DEBUG` environment
variable:

-   `DEBUG=zwave:* node dist/demo/index`

VSCode is the recommended IDE to hack on it.

In the future, the library will be split across separate NPM
packages, such that this process will become easier. Drop me a
note (in the issues) if you're already interested in this.

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
