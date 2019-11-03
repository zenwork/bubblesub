# Experimental Decorators

Bubblesub comes with experimental `@pub` and `@sub` decorators. The interop with LitElement is not great. It is not clear if they are a good idea in the end

## Example Usage

Here is an example on StackBlitz that integrates with [lit-element](https://lit-element.polymer-project.org/) :
[StackBlitz Example](https://stackblitz.com/edit/bubblesub-demo) 

## Publishing

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

## Subscribing

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

## HTML

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
