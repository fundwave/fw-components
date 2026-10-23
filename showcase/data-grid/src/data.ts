export interface Asset {
  id: string;
  name: string;
  logo: string;
  sector: string;
  geography: string;
  investmentDate: string;
  marketValue: number;
  costBasis: number;
  irr: number;
  tvpi: number;
  ownership: number;
  status: string;
  isActive: boolean;
  notes: string;
  customField1: string;
  customField2: number;
}

const sectors = ["Technology", "Healthcare", "Finance", "Energy", "Real Estate", "Consumer", "Industrial", "Materials"];
const geographies = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East"];
const statuses = ["Active", "Realized", "Written Off", "Partially Realized"];
const companyNames = [
  "TechVentures", "HealthCorp", "FinanceHub", "EnergyPlus", "RealtyInvest",
  "ConsumerBrands", "IndustryForge", "MaterialsInc", "DataStream", "BioGenesis",
  "CryptoLedger", "GreenEnergy", "SmartLogistics", "CloudNative", "AIMetrics",
  "QuantumLeap", "NeuralNet", "SpaceOps", "OceanTech", "AgroSmart",
  "EduConnect", "MediaFlow", "TravelCore", "FoodChain", "AutoDrive",
  "RoboFab", "NanoMed", "SolarGrid", "WindForce", "HydroGen",
];

function randomDate(start: Date, end: Date): string {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().split("T")[0];
}

function randomFloat(min: number, max: number): number {
  return Math.round((min + Math.random() * (max - min)) * 100) / 100;
}

export function generateAssets(count: number): Asset[] {
  return Array.from({ length: count }, (_, i) => {
    const baseName = companyNames[i % companyNames.length];
    const suffix = i >= companyNames.length ? ` ${Math.floor(i / companyNames.length) + 1}` : "";
    const name = `${baseName}${suffix}`;
    const sector = sectors[i % sectors.length];
    const marketValue = randomFloat(1_000_000, 500_000_000);
    const costBasis = marketValue * randomFloat(0.2, 0.9);

    return {
      id: `asset-${i + 1}`,
      name,
      logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=32&bold=true`,
      sector,
      geography: geographies[i % geographies.length],
      investmentDate: randomDate(new Date(2015, 0, 1), new Date(2024, 6, 1)),
      marketValue,
      costBasis,
      irr: randomFloat(-0.1, 0.45),
      tvpi: randomFloat(0.5, 4.5),
      ownership: randomFloat(0.01, 0.35),
      status: statuses[i % statuses.length],
      isActive: Math.random() > 0.3,
      notes: i % 3 === 0 ? "Key portfolio company" : "",
      customField1: `CF-${String(i + 1).padStart(4, "0")}`,
      customField2: randomFloat(100, 10000),
    };
  });
}
