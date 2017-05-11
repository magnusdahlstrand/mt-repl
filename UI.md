UI.md


```ascii
Stacks:
a: [stack]    b: [stack]    c: [stack]    d: [stack]

Info:
length 4m32s
title

Stack:
1: [stack-item] |filename?|
2: [stack-item]
3: [stack-item]
4: [stack-item]

mt [input]
```

`_` instead of space indicates it's selected

The `filename?` would be inverted in colour, indicating it's an input field waiting for focus. When tabbing it gets focus and you can insert the filename

Info is only visible when a stack item is selected and has info.

## Commands

Commands are highlighted with colour, and come in different flavours:

- Communication
- Editing
- Managing
- Meta / scripting

Commands, when added to the stack, act on the stack. If the stack is empty when a command is added to it, it will act on each new item added after it.

### Implied commands

Some commands are implied, for example torrent magnet links and youtube links. There are registered handlers matching these inputs already, turning the data into something which changes over time - the same way a command can change state over time.

### Flow

Commands are only executed on data after the data they act on have reached their "final state", i.e. have downloaded or processed.

When a command has reached its final state the next command in the stack is executed.

### Stack control

When a command is running it can control the stack, meaning it can replace items with new ones. Say a stack full of youtube urls becomes a collection of video files which further commands can then act on.


## Data

"Data" is faded slightly, but can become brighter when information has loaded.

When more data is available, the simple view (link) is replaced with name, size, length and/or type.

magnet:345893745jherfetrie => [The name of the file | 14MB]


### Time

30s, 2m, 3m4s


## Procedures

A stack can be saved as a procedure, in which case it can be reused.


## Stacks

The stack is simply an array of stack items, which each wrap their own data or command, and execute and run transformations on it, respectively.

The UI supports multiple stacks and switching between them is done through keycommands.

### Specific item

A specific item on the stack can be accessed using the number infront of the item, prefixed with a dollar sign.

## Sketches of input

magnet:...
magnet:...
get
segment 30s

find train*
detect cuts
segment
