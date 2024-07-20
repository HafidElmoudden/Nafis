import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const skillSchema = z.object({
    name: z.string(),
    subject: z.string(),
    classes: z.array(z.string()),
    numberOfQuestions: z.number(),
    numberOfTests: z.number(),
});
export type Skill = z.infer<typeof skillSchema>;
