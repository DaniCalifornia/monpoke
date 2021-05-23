class Monopoke {
  constructor(id, hp, ap) {
    this.id = id;
    this.hp = hp;
    this.ap = ap;
    this.defeated = false;
  }

  getId() {
    return this.id;
  }

  getHp() {
    return this.hp;
  }

  getAp() {
    return this.ap;
  }

  isDefeated() {
    return this.defeated;
  }

  takeHit(ap) {
    this.hp -= ap;
    if (this.hp < 1) this.defeated = true;
  }
}
