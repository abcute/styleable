
import { addWork } from "@/data/works";

export const saveGeneratedContent = (
  userId: number,
  title: string,
  keywords: string,
  originalText: string,
  mimicText: string,
  humanizedText: string = ""
) => {
  return addWork({
    userId,
    title,
    keywords,
    originalText,
    mimicText,
    humanizedText
  });
};
