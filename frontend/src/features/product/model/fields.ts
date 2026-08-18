export const fields = {
  title: "title",
  description: "description",
  specifications: {
    root: "specifications",

    getNamePath: (index: number) => `specifications[${index}].name`,
    getValuePath: (index: number) => `specifications[${index}].value`,
  },
  benefits: {
    root: "benefits",

    getValuePath: (index: number) => `benefits[${index}]`,
  },
  originalPrice: "originalPrice",
  discountPercent: "discountPercent",
  images: {
    root: "images",

    // getPositionPath: (index: number) => `images[${index}].position`,
    getFilePath: (index: number) => `images[${index}].file`,
  },
  categoryIds: "categoryIds",
} as const;
