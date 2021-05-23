class Team {
  constructor(id) {
    this.id = id;
    this.roster = {};
    this.chosenPoke = null;
  }

  getId() {
    return this.id;
  }

  getRoster() {
    return this.roster;
  }

  getActivePokeCount() {
    let counter = 0;
    for (let poke in this.roster) {
      if (!this.roster[poke].isDefeated()) {
        counter++;
      }
    }
    return counter;
  }

  getChosenPoke() {
    return this.chosenPoke;
  }

  addMonopoke(pokeId, hp, ap) {
    const newPoke = new Monopoke(pokeId, hp, ap);
    this.roster[pokeId] = newPoke;
  }

  setChosenPoke(pokeId) {
    if (this.roster[pokeId] && !this.roster[pokeId].isDefeated()) {
      this.chosenPoke = this.roster[pokeId];
      return true;
    } else {
      return false;
    }
  }
}
