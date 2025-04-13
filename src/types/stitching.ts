
export interface SizeChartMeasurement {
  label: string;
  description?: string;
  unit: "in" | "cm";
}

export interface GarmentSizeChart {
  type: "shirt" | "shalwar" | "pajama";
  measurements: SizeChartMeasurement[];
  standardSizes: {
    [size: string]: { [measurement: string]: number };
  };
}

export interface CustomStitchingOrder {
  garmentType: "shirt" | "shalwar" | "pajama" | "complete-suit";
  serviceType: ServiceType;
  measurements: { [key: string]: number };
  fabric?: string;
  designImage?: string;
  notes?: string;
}
