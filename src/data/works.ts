
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

export const addWork = (workData: {
  userId: string;
  title: string;
  keywords?: string;
  originalText: string;
  mimicText?: string;
  humanizedText?: string;
}) => {
  const newWork: Work = {
    id: Date.now().toString(), // Generate a simple string ID
    userId: workData.userId,
    title: workData.title,
    keywords: workData.keywords || '',
    originalText: workData.originalText,
    mimicText: workData.mimicText || '',
    humanizedText: workData.humanizedText || '',
    favorite: false,
    date: new Date().toISOString()
  };
  
  works.push(newWork);
  return newWork;
};
