import {z} from "zod";

const panelSchema = z.object({
  width: z.number(),
  length: z.number(),
  unitPrice: z.number(),
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, body => panelSchema.safeParse(body));

  if (!result.success) {
    throw result.error.issues;
  }

  const {width, length, unitPrice} = result.data;
  const mWidth = width / 1000;
  const mLength = length / 1000;

  return {
    calcPrice: mWidth * mLength * unitPrice * 1.2,
  };
});
