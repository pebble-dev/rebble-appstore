import * as Datetime from "react-datetime";

export interface AppScreenshot {
  "144x168": string
}

export interface AppBanner {
  "720x320": string
  orig: string
}

export interface AppLinks {
  add: string
  add_flag: string
  add_heart: string
  remove: string
  remove_flag: string
  remove_heart: string
  share: string
}

export interface AppRelease {
  id: string
  js_md5: string | null
  js_version: number
  pbw_file: string
  published_date: Datetime
  release_notes: string
  version: string
}

export interface AppChangelog {
  published_date: Datetime
  release_notes: string
  version: string
}

export interface FirmwareVersion {
  major: number
  minor: number
}

export interface AppCompatibility {
  firmware: FirmwareVersion
  has_binary: boolean
  min_js_version: number
  supported: boolean
}

export interface ApplicationInfo {
  author: string
  capabilities: string[]
  category: string
  category_color: string
  category_id: string
  changelog: AppChangelog[]
  companions: { android: null, ios: null }
  compatibility: {
    android: AppCompatibility
    ios: AppCompatibility
    aplite: AppCompatibility
    basalt: AppCompatibility
    chalk: AppCompatibility
    diorite: AppCompatibility
    emery: AppCompatibility
    flint: AppCompatibility
    gabbro: AppCompatibility
  }
  created_at: Datetime
  description: string
  developer_id: string
  discourse_url: null
  hardware_platforms: {
    description: string,
    name: string,
    pebble_process_info_flags: number,
    sdk_version: string,
    images: {
      icon: string,
      list: string,
      screenshot: string
    }[]
  }[]
  header_images: AppBanner[]
  hearts: number
  icon_image: { "28x28": string, "48x48": string }
  icon_resource_id: number
  id: string
  latest_release: AppRelease
  links: AppLinks
  list_image: { "144x144": string, "80x80": string }
  published_date: Datetime
  screenshot_hardware: string
  screenshot_images: AppScreenshot[]
  source: string | null
  title: string
  type: "watchapp" | "watchface"
  uuid: string
  visible: boolean
  website: string | null
}
