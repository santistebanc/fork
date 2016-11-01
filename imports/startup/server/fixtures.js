import { DishCategories, Dishes, Tables } from '../../../lib/collections.js'
import italianDishes from './italianDishes.js'

const italianFixture = ()=>{

  console.log('loading fixture');

  let tables = [{num: 1},{num: 2},{num: 3},{num: 4},{num: 5}];
  tables.forEach(table=>{Tables.insert(table)});

  let antipasti = DishCategories.insert({name: 'Antipasti'});
  let pizza = DishCategories.insert({name: 'Pizza'});
  let pastas = DishCategories.insert({name: 'Pastas'});
  let postres = DishCategories.insert({name: 'Postres'});

  let dishes = italianDishes(antipasti, pizza, pastas, postres);
  dishes.forEach(dish=>{Dishes.insert(dish)});
}

export { italianFixture };
