
import { supabase } from "@/integrations/supabase/client";

// Style-related functions
export const saveStyleAnalysis = async (
  userId: string,
  styleName: string,
  styleData: any
) => {
  const { data, error } = await supabase
    .from('user_styles')
    .insert({
      user_id: userId,
      style_name: styleName,
      style_data: styleData
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserStyles = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_styles')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const deleteUserStyle = async (styleId: string) => {
  const { error } = await supabase
    .from('user_styles')
    .delete()
    .eq('id', styleId);

  if (error) throw error;
};

// Work-related functions
export const saveWork = async (
  userId: string,
  title: string,
  keywords: string,
  originalText: string,
  mimicText: string,
  humanizedText: string = "",
  styleId?: string
) => {
  const { data, error } = await supabase
    .from('works')
    .insert({
      user_id: userId,
      title,
      keywords,
      original_text: originalText,
      mimic_text: mimicText,
      humanized_text: humanizedText,
      style_id: styleId
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserWorks = async (userId: string) => {
  const { data, error } = await supabase
    .from('works')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const toggleWorkFavorite = async (workId: string, favorite: boolean) => {
  const { data, error } = await supabase
    .from('works')
    .update({ favorite })
    .eq('id', workId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getWorkById = async (workId: string) => {
  const { data, error } = await supabase
    .from('works')
    .select('*')
    .eq('id', workId)
    .single();

  if (error) throw error;
  return data;
};
