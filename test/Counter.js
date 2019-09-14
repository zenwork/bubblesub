import { Selector } from 'testcafe';

fixture `Counter`
  .page `http://localhost:8080/src/example/di/index.html`;

test('Increment counter', async t => {
  await t
    .click(".b")
    .click('.b')
      .expect(Selector('.value').textContent).eql('2');
});
