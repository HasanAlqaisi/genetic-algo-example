import Chromosome from "./chromosome";
import Population from "./population";

let generationCount: number = 0;

const population: Population = new Population();
console.log(`Population for generation ${generationCount}:`);
population.calcFitnesses();
population.displayPopulation();
population.selection();

while (population.fittest!.fitness < 6 && generationCount < 10000 ) {
  console.log(`Population for generation ${++generationCount}:`);
  population.displayPopulation();
  population.selection(); 
  population.crossover();
  if (Math.floor(Math.random()) % 7 < 5) {
    population.mutation();
  }
  population.addFittestOffSpring();
}
