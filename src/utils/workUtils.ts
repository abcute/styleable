
import { saveWork } from "@/utils/supabaseUtils";

export const saveGeneratedContent = async (
  userId: string,
  title: string,
  keywords: string,
  originalText: string,
  mimicText: string,
  humanizedText: string = "",
  styleId?: string
) => {
  return await saveWork(
    userId,
    title,
    keywords,
    originalText,
    mimicText,
    humanizedText,
    styleId
  );
};
