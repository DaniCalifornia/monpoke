describe('Team', () => {
  let teamInstance;

  beforeEach(() => {
    teamInstance = new Team('hidden leaf');
  });

  it('Team is a class', () => {
    expect(teamInstance instanceof Team).toBe(true);
  });

  it('an instance of the Team class has the following properties: `id`', () => {
    expect(teamInstance.id).toBe('hidden leaf');
  });

  it('the `getId` method returns the team id', () => {
    expect(teamInstance.getId()).toBe('hidden leaf');
  });

  it('the `getActivePokeCount` method returns 0 when no monopoke have been added', () => {
    expect(teamInstance.getActivePokeCount()).toBe(0);
  });

  it('the `addMonopoke` creates new Monopoke instance and adds to team roster', () => {
    teamInstance.addMonopoke('sakura', 20, 5);
    expect(teamInstance.getActivePokeCount()).toBe(1);
    expect(teamInstance.getRoster()['sakura'].getId()).toBe('sakura');
  });

  it('the `setChosenPoke` sets chosen poke to monopoke with id passed in (if it exists)', () => {
    teamInstance.addMonopoke('sasuke', 15, 3);
    expect(teamInstance.setChosenPoke('sasuke')).toBe(true);
    expect(teamInstance.setChosenPoke('hinata')).toBe(false);
    expect(teamInstance.getChosenPoke().getId()).toBe('sasuke');
  });

  it('the `addMonopoke` creates new Monopoke instance and adds to team roster', () => {
    teamInstance.addMonopoke('sakura', 20, 5);
    expect(teamInstance.getActivePokeCount()).toBe(1);
    expect(teamInstance.getRoster()['sakura'].getId()).toBe('sakura');
  });

  it('the `getActivePokeCount` method returns the number of active poke on team', () => {
    teamInstance.addMonopoke('sakura', 20, 5);
    teamInstance.addMonopoke('sasuke', 15, 3);
    expect(teamInstance.getActivePokeCount()).toBe(2);
    teamInstance.roster['sasuke'].takeHit(20);
    expect(teamInstance.getActivePokeCount()).toBe(1);
  });
});
