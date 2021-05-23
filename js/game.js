class Game {
  constructor() {
    this.teamOne = null;
    this.teamTwo = null;
    this.output = '';
    this.turn = 0;
    this.gameOver = false;
  }

  getTeam(role) {
    if (role === 'home')
      return this.turn % 2 !== 0 ? this.teamOne : this.teamTwo;
    if (role === 'away')
      return this.turn % 2 !== 0 ? this.teamTwo : this.teamOne;
  }

  getOutput() {
    return this.output;
  }

  findOrCreateTeam(teamId) {
    if (this.turn === 0) {
      if (this.teamOne && teamId === this.teamOne.getId()) {
        return this.teamOne;
      }
      if (this.teamTwo && teamId === this.teamTwo.getId()) {
        return this.teamTwo;
      }
      if (!this.teamOne) {
        this.teamOne = new Team(teamId);
        return this.teamOne;
      }
      if (!this.teamTwo) {
        this.teamTwo = new Team(teamId);
        return this.teamTwo;
      }
    }
    return false;
  }

  updateOutput(str) {
    this.output += str + '\n';
  }

  chooseMonpoke(id) {
    if (this.teamOne && this.teamTwo) {
      this.turn++;
      if (this.getTeam('home').setChosenPoke(id)) return true;
    }
    return false;
  }

  attackReady() {
    if (
      this.turn > 1 &&
      !this.teamOne.getChosenPoke().isDefeated() &&
      !this.teamTwo.getChosenPoke().isDefeated()
    ) {
      this.turn++;
      return true;
    }
    return false;
  }

  endGame() {
    this.gameOver = true;
  }
}
