import { Selector } from 'testcafe'

fixture`Streams`.page`http://localhost:8888/src/example/streaming/index.html`

test('all 5 prices are received', async t => {

    let apples = await Selector('.apples')
    let oranges = await Selector('.oranges')
    let bananas = await Selector('.bananas')
    let grapes = await Selector('.grapes')
    let kiwis = await Selector('.kiwis')

    await t.expect(apples)
      .ok()
      .expect(apples.textContent)
      .contains('apples:')
      .expect(oranges)
      .ok()
      .expect(oranges.textContent)
      .contains('oranges:')
      .expect(bananas)
      .ok()
      .expect(bananas.textContent)
      .contains('bananas:')
      .expect(grapes)
      .ok()
      .expect(grapes.textContent)
      .contains('grapes:')
      .expect(kiwis)
      .ok()
      .expect(kiwis.textContent)
      .contains('kiwis:')
  },
)
test('prices change', async t => {
    await t.wait(1500)
    let apples = await Selector('.apples')
    let applePrice = await apples.textContent

    let kiwis = await Selector('.kiwis')
    let kiwiPrice = await kiwis.textContent

    let change = await Selector('.change')
    let priceChange = await change.textContent

    await t.wait(1500)
    let p = await Selector('.apples').textContent

    await t.expect(applePrice)
      .notEql(p)
      .expect((kiwiPrice))
      .notEql(Selector('.kiwis').textContent)
      .expect((priceChange))
      .notEql(Selector('.change').textContent)

    priceChange = await change.textContent

    await t.wait(1500)
      .expect((priceChange))
      .notEql(Selector('.change').textContent)
  },
)
