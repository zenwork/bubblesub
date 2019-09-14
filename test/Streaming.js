import { Selector } from 'testcafe';

fixture`Streams`.page`http://localhost:8080/src/example/streaming/index.html`

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
    let apples = await Selector('.apples')
    let price = await apples.textContent
    await t.wait(6000)
      .expect(price)
      .notEql(Selector('.apples').textContent)
  },
)
