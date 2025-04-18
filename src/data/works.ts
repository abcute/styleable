export interface Work {
  id: string;
  userId: string;
  title: string;
  keywords?: string;
  originalText: string;
  mimicText?: string;
  humanizedText?: string;
  favorite: boolean;
  date: string;
}

// Initial works for demonstration
let works: Work[] = [];

export const getWorks = () => works;

export const getWorksByUserId = (userId: string) => {
  return works.filter(work => work.userId === userId);
};

export const toggleFavorite = (workId: string) => {
  const workIndex = works.findIndex(work => work.id === workId);
  if (workIndex !== -1) {
    works[workIndex] = {
      ...works[workIndex],
      favorite: !works[workIndex].favorite
    };
    return works[workIndex];
  }
  return null;
};
