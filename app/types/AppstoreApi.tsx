// Generated using https://quicktype.io/
//
export interface Companions {
  android: Companion | null;
  ios: Companion | null;
}

export interface Companion {
  icon: string;
  id: number;
  name: string;
  pebblekit_version: string;
  required: boolean;
  url: string;
}

export interface Compatibility {
  android: CompatibilityAndroid;
  aplite: CompatibilityWatch;
  basalt: CompatibilityWatch;
  chalk: CompatibilityWatch;
  diorite: CompatibilityWatch;
  emery: CompatibilityWatch;
  flint: CompatibilityWatch;
  gabbro: CompatibilityWatch;
  ios: Ios;
}

export interface CompatibilityAndroid {
  supported: boolean;
}

export interface CompatibilityWatch {
  firmware: Firmware;
  has_binary: boolean;
  supported: boolean;
}

export interface HardwarePlatform {
  description: string;
  images: Images;
  name: ScreenshotHardware;
  pebble_process_info_flags: number;
  sdk_version: string;
}

export interface Images {
  icon: string;
  list: string;
  screenshot: string;
}

export enum ScreenshotHardware {
  Aplite = "aplite",
  Basalt = "basalt",
  Chalk = "chalk",
  Diorite = "diorite",
  Emery = "emery",
  Flint = "flint",
  Gabbro = "gabbro",
}

export interface HeaderImage {
  "720x320": string;
  orig: string;
}

export interface IconImage {
  "28x28": string;
  "48x48": string;
}

export interface LatestRelease {
  id: string;
  js_md5: null | string;
  js_version: null | number;
  pbw_file: string;
  published_date: string;
  release_notes: string;
  version: string;
}

export interface Links {
  add: string;
  add_flag: string;
  add_heart: string;
  remove: string;
  remove_flag: string;
  remove_heart: string;
  share: string;
}

export interface ListImage {
  "144x144": string;
  "80x80": string;
}

export interface ScreenshotImage {
  "144x168": string;
}

export enum Type {
  Watchapp = "watchapp",
  Watchface = "watchface",
}

export interface CollectionOverview {
  applications: Application[];
  banners: Banner[];
  categories: Category[];
  collections: Collection[];
}

export interface Collection {
  application_ids: string[];
  links: CategoryLinks;
  name: string;
  slug: string;
}

export interface Category {
  application_ids: any[];
  banners: Banner[];
  color: string;
  icon: Icon;
  id: string;
  links: CategoryLinks;
  name: string;
  slug: string;
}

export interface Icon {
  "88x88": string;
}

export interface CategoryLinks {
  apps: string;
}

export interface Banner {
  application_id: string;
  image: Image;
  title: string;
}

export interface Image {
  "720x320": string;
}

export interface Application {
  author: string;
  capabilities: string[];
  category: string;
  category_color: string;
  category_id: string;
  changelog: Changelog[];
  companions: Companions;
  compatibility: Compatibility;
  created_at: string;
  description: string;
  developer_id: string;
  discourse_url: string;
  hardware_platforms: HardwarePlatform[];
  header_images: HeaderImage[];
  hearts: number;
  icon_image: IconImage;
  icon_resource_id: number;
  id: string;
  latest_release: LatestRelease;
  links: Links;
  list_image: ListImage;
  published_date: null;
  screenshot_hardware: string;
  screenshot_images: ScreenshotImage[];
  source: string;
  title: string;
  type: string;
  uuid: string;
  visible: boolean;
  website: string;
}

export interface Changelog {
  published_date: string;
  release_notes: string;
  version: string;
}

export interface Android {
  supported: boolean;
}

export interface Firmware {
  major: number;
}

export interface Ios {
  min_js_version: number;
  supported: boolean;
}
