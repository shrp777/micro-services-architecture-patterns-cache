import { AppDataSource } from "@config/data-source";
import { Product } from "@entities/Product";

await AppDataSource.initialize();

const repo = AppDataSource.getRepository(Product);

await repo.createQueryBuilder().delete().execute();

await repo.save([
  {
    id: "a1b2c3d4-0001-4000-8000-000000000001",
    name: "Super Mario World",
    description: "16-bit platformer bundled with the SNES. Mario and Yoshi explore Dinosaur Land.",
    price: 12.99,
  },
  {
    id: "a1b2c3d4-0001-4000-8000-000000000002",
    name: "Sonic the Hedgehog 2",
    description: "16-bit Mega Drive classic. Sonic and Tails race through Chemical Plant and beyond.",
    price: 9.99,
  },
  {
    id: "a1b2c3d4-0001-4000-8000-000000000003",
    name: "The Legend of Zelda: A Link to the Past",
    description: "16-bit SNES masterpiece. Link travels between the Light and Dark World to defeat Ganon.",
    price: 14.99,
  },
  {
    id: "a1b2c3d4-0001-4000-8000-000000000004",
    name: "Street Fighter II Turbo",
    description: "16-bit SNES port of the legendary arcade fighter with 8 world warriors.",
    price: 11.99,
  },
  {
    id: "a1b2c3d4-0001-4000-8000-000000000005",
    name: "Mortal Kombat II",
    description: "16-bit brutal fighting game with fatalities, friendships and the Outworld tournament.",
    price: 11.99,
  },
  {
    id: "a1b2c3d4-0001-4000-8000-000000000006",
    name: "Donkey Kong Country",
    description: "16-bit SNES platformer with pre-rendered 3D graphics. Donkey and Diddy Kong reclaim their bananas.",
    price: 12.99,
  },
  {
    id: "a1b2c3d4-0001-4000-8000-000000000007",
    name: "Mega Man X",
    description: "16-bit SNES action-platformer. X and Zero battle Sigma and his Maverick army.",
    price: 13.99,
  },
  {
    id: "a1b2c3d4-0001-4000-8000-000000000008",
    name: "Castlevania: Symphony of the Night",
    description: "16-bit masterpiece blending RPG and platformer. Alucard explores Dracula's inverted castle.",
    price: 9.99,
  },
]);

console.log("Catalog seeded successfully");

await AppDataSource.destroy();
