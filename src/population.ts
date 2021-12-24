import Chromosome from "./chromosome";
import { CHROMOSOME_SIZE, POPULATION_SIZE } from "./utils/constants";

export default class Population {
  chromosomes: Chromosome[] = [];
  fittest?: Chromosome;
  secondFittest?: Chromosome;

  constructor() {
    for (let i = 0; i < POPULATION_SIZE; i++) {
      this.chromosomes[i] = new Chromosome();
    }
  }

  displayPopulation() {
    for (let i = 0; i < POPULATION_SIZE; i++) {
      console.log(this.chromosomes[i]);
    }
  }

  calcFitnesses(): void {
    for (let i = 0; i < POPULATION_SIZE; i++) {
      let fitness = this.chromosomes[i].calcFitness();
    }
  }

  private getLeastFittestIndex(): number {
    let minFit: Chromosome = this.chromosomes[0];
    let minFitIndex: number = 0;
    for (let i = 0; i < CHROMOSOME_SIZE; i++) {
      if (minFit.fitness > this.chromosomes[i].fitness) {
        minFit = this.chromosomes[i];
        minFitIndex = i;
      }
    }
    return minFitIndex;
  }

  private getFittest(): Chromosome {
    let maxFit: number = 0;
    let maxFitIndex: number = 0;
    for (let i: number = 0; i < POPULATION_SIZE; i++) {
      if (maxFit < this.chromosomes[i].fitness) {
        maxFit = this.chromosomes[i].fitness;
        maxFitIndex = i;
      }
    }
    return this.chromosomes[maxFitIndex];
  }

  private getSecondFittest(): Chromosome | undefined {
    let maxFit: Chromosome = this.getFittest();
    let secondMaxFit: Chromosome = new Chromosome();

    for (let i: number = 0; i < POPULATION_SIZE; i++) {
      if (
        secondMaxFit.fitness < this.chromosomes[i].fitness &&
        this.chromosomes[i].fitness < maxFit.fitness
      ) {
        secondMaxFit = this.chromosomes[i];
      }
    }
    return secondMaxFit!;
  }

  selection(): void {
    this.fittest = this.getFittest();
    this.secondFittest = this.getSecondFittest();
  }

  crossover(): void {
    let crossPoint: number = Math.floor(Math.random() * (CHROMOSOME_SIZE + 1));

    console.log("before crossover");
    console.log("fittest " + JSON.stringify(this.fittest));
    console.log("second fittest " + JSON.stringify(this.secondFittest));

    for (let i = 0; i < crossPoint; i++) {
      let temp: Chromosome = new Chromosome();
      temp.genes[i] = this.fittest!.genes[i];
      this.fittest!.genes[i] = this.secondFittest!.genes[i];
      this.secondFittest!.genes[i] = temp.genes[i];
    }
    this.fittest!.calcFitness();
    this.secondFittest!.calcFitness();
    console.log("after crossover");
    console.log("fittest " + JSON.stringify(this.fittest));
    console.log("second fittest " + JSON.stringify(this.secondFittest));
  }

  mutation(): void {
    let randomIndex: number = Math.floor(Math.random() * CHROMOSOME_SIZE);
    console.log(randomIndex);

    if (this.fittest!.genes[randomIndex] == 0) {
      this.fittest!.genes[randomIndex] = 1;
    } else {
      this.fittest!.genes[randomIndex] = 0;
    }

    if (this.secondFittest!.genes[randomIndex] == 0) {
      this.secondFittest!.genes[randomIndex] = 1;
    } else {
      this.secondFittest!.genes[randomIndex] = 0;
    }

    this.fittest!.calcFitness();
    this.secondFittest!.calcFitness();
    console.log("after mutation");
    console.log("fittest " + JSON.stringify(this.fittest));
    console.log("second fittest " + JSON.stringify(this.secondFittest));
  }

  addFittestOffSpring(): void {
    let minFitIndex: number = this.getLeastFittestIndex();
    if (this.fittest!.fitness > this.secondFittest!.fitness) {
      this.chromosomes[minFitIndex] = this.fittest!;
    } else {
      this.chromosomes[minFitIndex] = this.secondFittest!;
    }
  }
}
