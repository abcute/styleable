
import { addWork } from "@/data/works";

export const saveGeneratedContent = (
  title: string,
  keywords: string,
  originalText: string,
  mimicText: string,
  humanizedText: string = ""
) => {
  return addWork({
    title,
    keywords,
    originalText,
    mimicText,
    humanizedText
  });
};
