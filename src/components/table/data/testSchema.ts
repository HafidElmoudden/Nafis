import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const testSchema = z.object({
  id: z.string(),
  subject: z.string(),
  class: z.string(),
  skills: z.array(z.string()),
  type: z.string(),
  status: z.string(),
});

export type Test = z.infer<typeof testSchema>;
