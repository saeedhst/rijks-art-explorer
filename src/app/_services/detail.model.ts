export interface RootObject {
  elapsedMilliseconds: number;
  artObject: ArtObject;
  artObjectPage: ArtObjectPage;
}

interface ArtObject {
  links: Links;
  id: string;
  priref: string;
  objectNumber: string;
  language: string;
  title: string;
  copyrightHolder: string | null;
  webImage: WebImage;
  colors: Color[];
  colorsWithNormalization: ColorWithNormalization[];
  normalizedColors: NormalizedColor[];
  normalized32Colors: NormalizedColor[];
  materialsThesaurus: any[];
  techniquesThesaurus: any[];
  productionPlacesThesaurus: any[];
  titles: string[];
  description: string;
  labelText: string | null;
  objectTypes: string[];
  objectCollection: string[];
  makers: any[];
  principalMakers: PrincipalMaker[];
  plaqueDescriptionDutch: string;
  plaqueDescriptionEnglish: string;
  principalMaker: string;
  artistRole: string | null;
  associations: any[];
  acquisition: Acquisition;
  exhibitions: any[];
  materials: string[];
  techniques: string[];
  productionPlaces: string[];
  dating: Dating;
  classification: Classification;
  hasImage: boolean;
  historicalPersons: string[];
  inscriptions: any[];
  documentation: string[];
  catRefRPK: any[];
  principalOrFirstMaker: string;
  dimensions: Dimension[];
  physicalProperties: any[];
  physicalMedium: string;
  longTitle: string;
  subTitle: string;
  scLabelLine: string;
  label: Label;
  showImage: boolean;
  location: string;
}

interface Links {
  search: string;
}

interface WebImage {
  guid: string;
  offsetPercentageX: number;
  offsetPercentageY: number;
  width: number;
  height: number;
  url: string;
}

interface Color {
  percentage: number;
  hex: string;
}

interface ColorWithNormalization {
  originalHex: string;
  normalizedHex: string;
}

interface NormalizedColor {
  percentage: number;
  hex: string;
}

interface PrincipalMaker {
  name: string;
  unFixedName: string;
  placeOfBirth: string | null;
  dateOfBirth: string | null;
  dateOfBirthPrecision: string | null;
  dateOfDeath: string | null;
  dateOfDeathPrecision: string | null;
  placeOfDeath: string | null;
  occupation: string[];
  roles: string[];
  nationality: string | null;
  biography: string | null;
  productionPlaces: string[];
  qualification: string | null;
  labelDesc: string;
}

interface Acquisition {
  method: string;
  date: string;
  creditLine: string | null;
}

interface Dating {
  presentingDate: string;
  sortingDate: number;
  period: number;
  yearEarly: number;
  yearLate: number;
}

interface Classification {
  iconClassIdentifier: string[];
  iconClassDescription: string[];
  motifs: any[];
  events: any[];
  periods: any[];
  places: any[];
  people: string[];
  objectNumbers: string[];
}

interface Dimension {
  unit: string;
  type: string;
  precision: string | null;
  part: string | null;
  value: string;
}

interface Label {
  title: string;
  makerLine: string;
  description: string;
  notes: string;
  date: string;
}

interface ArtObjectPage {
  id: string;
  similarPages: any[];
  lang: string;
  objectNumber: string;
  tags: any[];
  plaqueDescription: string;
  audioFile1: string | null;
  audioFileLabel1: string | null;
  audioFileLabel2: string | null;
  createdOn: string;
  updatedOn: string;
  adlibOverrides: AdlibOverrides;
}

interface AdlibOverrides {
  titel: string | null;
  maker: string | null;
  etiketText: string | null;
}
