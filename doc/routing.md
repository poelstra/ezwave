# Z-Wave routing

Based on https://drzwave.blog/2021/07/13/z-wave-mesh-priority-routes-explained/

## Summary

-   ZW_AssignReturnRoute() (0x46) - Return Route

    -   Assigns 4 controller computed routes between 2 nodes.
    -   Should be used during inclusion if PC is not SUC.
    -   Should be used when setting up new association between two nodes.

-   ZW_AssignPriorityRoute() (0x4F) - Priority Return Route

    -   Assigns an Application Priority Route between 2 nodes
    -   Should not be used, too easy to get wrong. Rely on normals routes (LWR) instead.
    -   Should never be automatically used by application, only on explicit user request.

-   ZW_SetPriorityRoute() (0x93) - Set Priority Route

    -   Assigns an Application Priority Route from the controller to a node (i.e. not between other nodes).
    -   Should not be used, only to force nodes close to controller to always try
        direct contact first.

-   ZW_AssignSUCReturnRoute() (0x51) - SUC Return Route

    -   Shorthand for ZW_AssignReturnRoute, but using SUC's node id as destination.
    -   Blog post indicates that you could just use ZW_AssignReturnRoute, but spec says you should
        use SUC variant explicitly.

-   ZW_AssignPrioritySUCReturnRoute() (0x58) - Priority SUC Return Route
    -   Shorthand for ZW_AssignPriorityRoute, but using SUC's node id as destination.

If the source fails, it can still use Explorer Frames, but that should be last resort.
If topology changes, return routes need to be reassigned on all nodes (for all of their associations).
During inclusion, the PC should always assign a return route back to itself for any unsollicited messages.

## Priority routing

This is also called Application Priority Routing. It assigns an explicit route from one node to another,
set by the Application (i.e. not the protocol). It will always be used first.
So, if it's wrong (and it's easy to get wrong), you'll get long latencies.
Generally only recommended to tell a node in direct range of controller to always try the direct route first.
In that case, set the route to all zeroes (no hops).
Should never be set automatically by app, only when user explicitly requests it.
