# Bubble Sub

***NOTE: This library is experimental!***

Bubblesub is a simple library to create observables. It leverages the DOM and browser events to reduce coupling and making things simple. 

You can easily implement:
* dependency injection
* state management
* streaming of data

Bubblesub comes out of an urge to free JS/TS development from big frameworks. It is not meant as a silver bullet or a universal solution.

This approach is inspired from a talk by Justin Fagnani (@justinfugnani) who heads work on Polymer lit-element and lit-html. A recording can be found on youtube: [Polymer - Dependency Injection](https://youtu.be/6o5zaKHedTE)

## It's Easy

Here is an example on StackBlitz:
[StackBlitz Example](https://stackblitz.com/edit/bubblesub-demo)
See more examples [here](src/example/README.md)

### Publishing

Here is an example of a higher-level component that publishes a calculator as a service. 

```typescript
import { LitElement, customElement, html } from 'lit-element'
import { pub } from 'bubblesub'
import { Calculator } from 'calculator'

//Parent calculator component
@customElement('demo-calculator')
class App extends LitElement {

  @pub()
  calc: Calculator = new Calculator()

  render() {
    return html`<h1>Calculator</h1><slot></slot>`;
  }
}

```

### Subscribing

Here is a child element that can be repeated as many times as is needed.

```typescript
import { LitElement, customElement, html } from 'lit-element'
import { sub } from 'bubblesub'
import { Calculator } from 'calculator'

@customElement('demo-val')
class Value extends LitElement {

  @sub()
  calc: Calculator

  render() {
    return html`
    <input 
      type="number" 
      @change="${(e) => { this.calc.set(parseInt(this.id), parseInt(e.target.value)) }}" >
    </input>`
  }
}

```

Here is a child element that displays the total of the calculation

```typescript
import { LitElement, customElement, html } from 'lit-element'
import { sub } from 'bubblesub'
import { Calculator } from 'calculator'
  
@customElement('demo-total')
class Total extends LitElement {

  @sub({ update: function (calc: Calculator) { calc.onChange(() => { this.requestUpdate() }) } })
  calc: Calculator

  render() {
    return html`
    <input 
      type="number" 
      value="${this.calc.total()}" 
      readonly>
    </input>`
  }
}
```

### HTML

Here the components are combined. The `demo-val` elements find the calculator service because they have an ancestor, demo-calculator that provides the service.

```html
  <demo-calculator>
    <demo-val id="1"></demo-val>
    +
    <demo-val id="2"></demo-val>
    +
    <demo-val id="3"></demo-val>
    =
    <demo-total></demo-total>
  </demo-calculator>
```

## Leveraging the DOM and events

Bubblesub uses DOM events for discovery and binding of publishers and subscribers. A subscription fires an event up the DOM tree. If a matching publication exists up the DOM tree then a binding is established. Any time the Publication's value changes the the subscribers are called. 

So...
* Bubblesub uses bubbling events in the DOM to link subscribers and publishers
* Bubblesub requires that the publisher of a Publication be an ancestor of the subscriber
* Bubblesub relies on the hierarchical nature of the DOM to bind publisher and subscriber. A subscriber is bound to the closest ancestor that publishes the wanted Publication. 
* There is no central registry of Publications. This means that your Bubblesub bindings can be encapsulated within a parent component, leak nothing, require nothing from outside.
 

## Usage

The only required coupling is on the name of the dependency. Bubblesub is implemented in Typescript. So we have the support of typing to make it easier to manage the decoupled implementation.

### Run Examples

A set of examples devised for demonstrating and testing is available if you checkout the project and build it. For the sake of clarity the examples are implemented using vanilla JS web components.

```shell script
yarn build.example
yarn serve
## open browser at http://localhost:8080
```

[Docs on Examples](src/example/README.md)

