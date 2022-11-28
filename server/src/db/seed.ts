import DB from "./index";

async function main() {
  const unsortedCategory = await DB.category.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Unsorted",
      icon: "sparkles",
    },
  });
  console.log({ unsortedCategory });
}
main()
  .then(async () => {
    await DB.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await DB.$disconnect();
    process.exit(1);
  });
