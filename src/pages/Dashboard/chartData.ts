export type KPICardData = {
  [key: string]: {
    title: string;
    value: number;
    change: number;
    trend: string;
  }[];
};

export type topTierData = {
  [key: string]: {
    mostCommonViolation: {
      title: string;
      value_name: number;
      value_count: number;
    };
    topRegion: {
      title: string;
      value_name: number;
      value_count: number;
    };
  };
};

export type pieChartData = {
  [key: string]: {
    title: string;
    value: number;
  }[];
};

export type lineChartData = {
  [key: string]: {
    title: string;
    month: string;
    value: number;
  }[];
};

export type dashboardData = {
  KPICardData: KPICardData;
  topTierData: topTierData;
  pieChartData: pieChartData;
  lineChartData: lineChartData;
};
