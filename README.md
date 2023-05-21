## Common Data Structures for JavaScript
Although often used by a logically point of view JavaScript is one of the few programming languages which lacks standard implementation for the most common data structures, as for example Queues.

In many project there is a custom implementation of these structures, which means replicating code and effort many times or it is completely delegated to the developer doing the proper use of the arrays, which may squeeze maximum performance but it is also a common source of unexpected bugs, not always easy to track.

The target of this package is providing a common implementation for these common data structures with the main goal of reliability. Also performance is keeped in mind, by encapsulating array buffering, resizing, etc, etc but again, the first goal is reliability and standardization.

The data structure which are provided are
1. List, with indexable direct access. Not much different than an array but with sizing and indexing control.
2. ConcatenatedList unidirectional and bidirectional. No direct index access but much faster for add/remove items.
3. Queue
4. Stack
5. Set
6. HashMap
Maybe more

In addition the package comes with a set of unit test for ensuring proper functioning of it.

## Author
Bruno Fratini

## Note
This is an ongoing work in beta phase, not still ready for a production project.

