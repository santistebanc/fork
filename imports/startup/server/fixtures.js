import { DishCategories, Dishes, Tables } from '../../../lib/collections.js'

const italianFixture = ()=>{

  console.log('loading fixture');

  let tables = [{num: 1},{num: 2},{num: 3},{num: 4},{num: 5}];
  tables.forEach(table=>{Tables.insert(table)});

  let entradaId = DishCategories.insert({name: 'Entrada'});
  let pprincipalId = DishCategories.insert({name: 'Plato Principal'});

  let dishes = [
    {title: "Prosciutto", image: "prosciutto.jpg", brief: "clásicas rebanadas de jamón ibérico", price: 67, categories:[entradaId]},
    {title: "Pizza Mexicana", image: "pizza.jpg", brief: "peperoni, champiñones, pimiento, cebolla", price: 112, categories:[pprincipalId]}]
    dishes.forEach(dish=>{Dishes.insert(dish)});
}

export { italianFixture };
