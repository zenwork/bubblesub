import { Selector } from 'testcafe';

fixture `My fixture`
  .page `http://localhost:8080/src/example/di/index.html`;

test('MyTest', async t => {
  await t
    .click(".b")
    .click('.b')
      .expect(Selector('.value').textContent).eql('2');
});
