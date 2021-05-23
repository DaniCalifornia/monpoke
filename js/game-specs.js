describe('Game', () => {
  let gameInstance;

  beforeAll(() => {
    gameInstance = new Game();
  });

  it('Game is a class', () => {
    expect(gameInstance instanceof Game).toBe(true);
  });

  it('an instance of the Game class has the following properties: `teamOne`, `teamTwo`, `output`, `turn`, `gameOver`', () => {
    expect(gameInstance.teamOne).toBe(null);
    expect(gameInstance.teamTwo).toBe(null);
    expect(gameInstance.output).toBe('');
    expect(gameInstance.turn).toBe(0);
    expect(gameInstance.gameOver).toBe(false);
  });

  it('the `chooseMonpoke` method returns false if teams have not been created', () => {
    const chosen = gameInstance.chooseMonpoke('kakashi');
    expect(chosen).toBe(false);
  });

  it('the `findOrCreateTeam` method creates teamOne before teamTwo', () => {
    const teamOne = gameInstance.findOrCreateTeam('hidden leaf');
    const teamTwo = gameInstance.findOrCreateTeam('hidden sand');

    teamOne.addMonopoke('naruto', 10, 3);
    teamOne.addMonopoke('kakashi', 8, 4);

    teamTwo.addMonopoke('gaara', 10, 2);
    teamTwo.addMonopoke('temari', 8, 3);

    expect(gameInstance.teamOne.getId()).toBe('hidden leaf');
    expect(gameInstance.teamTwo.getId()).toBe('hidden sand');
  });

  it('the `findOrCreateTeam` method returns false if new team is passed in after teamOne and teamTwo have been defined', () => {
    const createTeam = gameInstance.findOrCreateTeam('village hidden by rain');
    expect(createTeam).toBe(false);
  });

  it('the `attackReady()` method returns false if both teams do not have chosen monpoke set', () => {
    const attackReady = gameInstance.attackReady();
    expect(attackReady).toBe(false);
  });

  it('the `chooseMonpoke` method sets chosen poke (by id) for teamOne (turn 1) before teamTwo (turn 2)', () => {
    gameInstance.chooseMonpoke('kakashi');
    gameInstance.chooseMonpoke('temari');

    expect(gameInstance.teamOne.getChosenPoke().getId()).toBe('kakashi');
    expect(gameInstance.teamTwo.getChosenPoke().getId()).toBe('temari');
    expect(gameInstance.turn).toBe(2);
  });

  it('the `attackReady()` method returns true and increments turn if both teams have monpoke chosen', () => {
    const attackReady = gameInstance.attackReady();
    expect(attackReady).toBe(true);
    expect(gameInstance.turn).toBe(3);
  });

  it('the `getTeam()` method returns team based on role and current turn', () => {
    const homeTeam = gameInstance.getTeam('home');
    const awayTeam = gameInstance.getTeam('away');

    expect(homeTeam.getId()).toBe('hidden leaf');
    expect(awayTeam.getId()).toBe('hidden sand');
  });

  it('the `chooseMonpoke()` method returns false if monpoke chosen has been defeated', () => {
    gameInstance.teamTwo.getRoster()['gaara'].defeated = true;
    const chosen = gameInstance.chooseMonpoke('gaara');
    expect(chosen).toBe(false);
  });

  it('the `endGame()` method sets gameOver to true', () => {
    gameInstance.endGame();
    expect(gameInstance.gameOver).toBe(true);
  });
});
