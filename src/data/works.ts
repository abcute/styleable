
export interface Work {
  id: number;
  userId: number;
  title: string;
  keywords: string;
  originalText: string;
  mimicText: string;
  humanizedText: string;
  date: string;
  favorite: boolean;
}

// Initial data for demonstration
export const initialWorks: Work[] = [
  {
    id: 1,
    userId: 1,
    title: "春日田野",
    keywords: "田野,春天,农耕",
    originalText: "春风拂过田野，麦苗随风摇曳...",
    mimicText: "在这片广袤的田野上，春天悄然而至...",
    humanizedText: "今天去田野走了一圈，腿有点酸...春风吹得脸痒痒的...",
    date: "2025-04-12",
    favorite: true
  },
  {
    id: 2,
    userId: 1,
    title: "城市夜景",
    keywords: "城市,夜景,灯光",
    originalText: "华灯初上，城市开始了它的不眠之夜...",
    mimicText: "当夜幕降临，城市的另一面徐徐展开...",
    humanizedText: "晚上加完班走在回家的路上，这城市的灯光可真亮啊...",
    date: "2025-04-10",
    favorite: false
  },
];

let works = [...initialWorks];

export const getWorks = () => works;

export const getWorksByUserId = (userId: number) => {
  return works.filter(work => work.userId === userId);
};

export const addWork = (work: Omit<Work, "id" | "date" | "favorite">) => {
  const newWork: Work = {
    ...work,
    id: works.length + 1,
    date: new Date().toISOString().split('T')[0],
    favorite: false
  };
  works = [...works, newWork];
  return newWork;
};

export const toggleFavorite = (id: number) => {
  works = works.map(work => 
    work.id === id ? { ...work, favorite: !work.favorite } : work
  );
  return works.find(work => work.id === id);
};
