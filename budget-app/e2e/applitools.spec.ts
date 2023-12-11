// applitools.spec.ts

import { browser } from 'protractor';
import { Eyes, ClassicRunner, Target } from '@applitools/eyes-protractor';

describe('Visual Regression Test', () => {
  let eyes: Eyes;
  const runner = new ClassicRunner();

  beforeAll(async () => {
    eyes = new Eyes(runner);
    eyes.setApiKey('YOUR_APPLITOOLS_API_KEY');
  });

  it('should match the visual state of the dashboard', async () => {
    await browser.get('/dashboard');
    await eyes.open(browser, 'Budget App', 'Dashboard Test');
    await eyes.check('Dashboard', Target.window());
    await eyes.close();
  });

  afterAll(async () => {
    await runner.getAllTestResults();
  });
});
