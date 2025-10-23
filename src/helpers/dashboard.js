export const countBags = (item) => {
  const bagIncludes = {
    ["Bettbezüge"]: 6,
    ["Kissenbezüge"]: 6,
    ["Laken grün"]: 3,
    ["Laken orange"]: 3,
    ["Duschtücher"]: 6,
    ["Handtücher"]: 6,
    ["Badvorleger"]: 2,
    ["Geschirrtücher"]: 5,
  };

  let bagsNeeded = 0;

  item.linens.map((l) => {
    const neededBagsLinen = (l.minimum - l.available) / bagIncludes[l.name];

    bagsNeeded = bagsNeeded > neededBagsLinen ? bagsNeeded : neededBagsLinen;
  });

  return Math.ceil(bagsNeeded);
};

export const getAllColums = (data) => {
  const allLinens = Array.from(
    new Set(data.flatMap((item) => item.linens.map((l) => l.name)))
  );
  const allEssentials = Array.from(
    new Set(data.flatMap((item) => item.essentials.map((a) => a.name)))
  );
  const allColumns = [
    "id",
    "Adresse",
    "Nächste Checkout",
    "Abholung",
    "Taschen benötigt",
    ...allLinens,
    ...allEssentials,
  ];

  return { allColumns, allLinens, allEssentials };
};

export const getSortBy = (key) => {
  switch (key.toLowerCase()) {
    case "id":
      return (a, b) => Number(a.id) - Number(b.id);
    case "adresse":
      return (a, b) => a.address.localeCompare(b.address);
    case "nächste checkout":
      return (a, b) => {
        const aDate = a.nextCheckout[0];
        const bDate = b.nextCheckout[0];

        if (aDate && bDate) {
          return aDate - bDate;
        }

        if (aDate && !bDate) {
          return -1;
        }

        if (!aDate && bDate) {
          return 1;
        }

        return 0;
      };

    default:
      return (a, b) => Number(a.id) - Number(b.id);
  }
};
