import getRandomBinray from "./utils/get-random-binray";
import { CHROMOSOME_SIZE } from "./utils/constants";

export default class Chromosome {
  genes: number[] = [];
  fitness: number = 0;

  constructor() {
    for (let i: number = 0; i < CHROMOSOME_SIZE; i++) {
      let randomNumber: number = getRandomBinray();
      this.genes[i] = randomNumber;
    }
  }

  calcFitness(): number {
    this.fitness = 0;
    for (let i: number = 0; i < CHROMOSOME_SIZE; i++) {
      if (this.genes[i] == 1) {
        this.fitness += 1;
      }
    }
    return this.fitness;
  }
}
