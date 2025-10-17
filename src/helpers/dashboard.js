export const countBags = (item) => {
  const bagIncludes = {
    ["pillow case"]: 6,
    ["sheets Green"]: 3,
    ["towel Big"]: 6,
    ["towel Small"]: 6,
  };

  let bagsNeeded = 0;

  item.linens.map((l) => {
    const neededBagsLinen = (l.minimum * 2 - l.available) / bagIncludes[l.name];

    bagsNeeded = bagsNeeded > neededBagsLinen ? bagsNeeded : neededBagsLinen;
  });

  return Math.round(bagsNeeded);
};

export const getAllColums = (data) => {
  const allLinens = Array.from(
    new Set(data.flatMap((item) => item.linens.map((l) => l.name)))
  );
  const allAddOns = Array.from(
    new Set(data.flatMap((item) => item.addOns.map((a) => a.name)))
  );
  const allColumns = [
    "id",
    "Address",
    "Next Checkout",
    "Pickup Needed",
    "Bags needed",
    ...allLinens,
    ...allAddOns,
  ];

  return { allColumns, allLinens, allAddOns };
};

export const getSortBy = (key) => {
  switch (key.toLowerCase()) {
    case "id":
      return (a, b) => Number(a.id) - Number(b.id);
    case "address":
      return (a, b) => a.address.localeCompare(b.address);
    case "next checkout":
      return (a, b) => a.nextCheckout[0] - b.nextCheckout[0];
    default:
      return (a, b) => Number(a.id) - Number(b.id);
  }
};
