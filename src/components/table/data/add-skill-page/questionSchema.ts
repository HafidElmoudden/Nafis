import { z } from "zod";

export const questionSchema = z.object({
    question: z.string(),
    picture: z.string().optional(),
    firstChoice: z.object({ content: z.string(), isCorrect: z.boolean() }),
    secondChoice: z.object({ content: z.string(), isCorrect: z.boolean() }),
    thirdChoice: z.object({ content: z.string(), isCorrect: z.boolean() }),
    fourthChoice: z.object({ content: z.string(), isCorrect: z.boolean() }),
});
export type Question = z.infer<typeof questionSchema>;
