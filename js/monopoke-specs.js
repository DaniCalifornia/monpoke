describe('Monopoke', () => {
  let monopokeInstance;
  beforeEach(() => {
    monopokeInstance = new Monopoke('taco', 10, 2);
  });

  it('Monopoke is a class', () => {
    expect(monopokeInstance instanceof Monopoke).toBe(true);
  });

  it('an instance of the Monopoke class has the following properties: `id`, `hp`, `ap`', () => {
    expect(monopokeInstance.id).toBe('taco');
    expect(monopokeInstance.hp).toBe(10);
    expect(monopokeInstance.ap).toBe(2);
  });

  it('the `getId` method returns the monopoke id', () => {
    expect(monopokeInstance.getId()).toBe('taco');
  });
  it('the `getHp` method returns the monopoke hp', () => {
    expect(monopokeInstance.getHp()).toBe(10);
  });
  it('the `getAp` method returns the monopoke ap', () => {
    expect(monopokeInstance.getAp()).toBe(2);
  });
  it('the `isDefeated` method returns false if monopoke has hp > 0', () => {
    expect(monopokeInstance.isDefeated()).toBe(false);
  });
  it('the `takeHit` decreases hp by ap value passed in', () => {
    monopokeInstance.takeHit(3);
    expect(monopokeInstance.getHp()).toBe(7);
  });
  it('the `isDefeated` method returns true if monopoke has hp < 1', () => {
    monopokeInstance.takeHit(11);
    expect(monopokeInstance.getHp()).toBe(-1);
    expect(monopokeInstance.isDefeated()).toBe(true);
  });
});
