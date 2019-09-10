import { subscriber } from '../../subscriber'

export class ProgressBar extends HTMLElement {
  factor = Math.random() * 2
  f = (this.factor > 2) ? 1 : this.factor

  connectedCallback(): void {
    subscriber(this)
      .request(
        'percent',
        (percent: number) => {
          let calc = percent * this.f

          if (this.f !== 1) {
            if (calc >= 70) calc = calc + ((percent - 70) * this.f / 2)
            if (percent >= 95 && calc <= 95) calc = percent
            if (calc > 100) calc = 100
          }

          this.innerHTML = `
            <h2>${'*'.repeat(calc)}</h2>
            `
        })
  }
}

customElements.define('progress-bar', ProgressBar)
