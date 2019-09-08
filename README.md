# Bubble Sub

***NOTE: This library is experimental!***

This is a simple library that provides a light weight alternative to dependency injection libraries based on DOM events.

Bubblesub provides the common benefit of sharing services, factories, and data without having to tightly couple component construction. It can also be used to stream data. It is not meant as a silver bullet or a universal tool.

Bubblesub uses the DOM event for discovery and binding of dependencies. A subscription fires an event up the DOM tree. If a matching publication exists up the DOM tree then a binding is established. Any time the Publication;s value changes the the subscriber is called  

## Usage

The only required coupling is on the name of the dependency. Bubblesub is implemented in Typescript. So we have the support of typing to make it easier to manage the decoupled implementation.

### Publishing

A high-level component responsible for making a backend request fetches and publishes the result. 

```typescript
import {Publication, publisher } from "./publisher"; 

let pub:Publication<number> = publisher(this.root).createPublication('percent', 0)

fetch('http://example.com/progress/status')
  .then((response) =>response.json())
  .then((progress) => pub.updateValue(progress.status));

```

### Subscribing

In some component we consume and display the percentage value.

```typescript
import { subscriber } from "./subscriber";

subscriber(this)
.request( 'percent', (percent: number) => this.innerHTML = `<span>${percent}</span>` )
```
