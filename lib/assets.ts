/**
 * Central asset path map.
 *
 * Every path below is populated by `scripts/fetch-assets.mjs`, which downloads
 * royalty-free media into /public. Images are verified, on-subject Pexels
 * photos (each ID was visually checked before committing). If a download
 * fails, <SmartImage /> / <SmartVideo /> fall back to an on-brand navy→green
 * gradient at runtime, so the site always looks complete.
 *
 * Many KEYS deliberately point at the SAME underlying file (aliases) so the
 * same photo can be referenced semantically from different places. The content
 * layer (lib/content.ts) is arranged so no two keys that resolve to the same
 * file ever appear together on a single page.
 */

export const videos = {
  hero: "/videos/hero.mp4",
  solar: "/videos/solar.mp4",
  heatPump: "/videos/heat-pump.mp4",
  evCharging: "/videos/ev-charging.mp4",
  house: "/videos/house.mp4",
} as const;

export const images = {
  /* ---- Hero carousel (homepage) ---- */
  heroHome: "/images/home-dusk.jpg",
  heroSolar: "/images/solar-roof-vista.jpg",
  heroHeat: "/images/heat-pump-house.jpg",
  heroEv: "/images/ev-green.jpg",
  heroAerial: "/images/solar-aerial-commercial.jpg",
  heroPoster: "/images/home-dusk.jpg",

  /* ---- Houses / exteriors ---- */
  house: "/images/home-lawn.jpg",
  houseAerial: "/images/home-drive.jpg",

  /* ---- Solar ---- */
  solarPv: "/images/solar-roof-close.jpg",
  solarRoofVista: "/images/solar-roof-vista.jpg",
  solarFlatRoof: "/images/solar-flat-roof.jpg",
  solarHouseHill: "/images/solar-house-hill.jpg",
  solarRoofWorker: "/images/solar-roof-worker.jpg",
  solarAerial: "/images/solar-roof-grid.jpg",
  solarCommercial: "/images/solar-aerial-commercial.jpg",
  solarFarmAerial: "/images/solar-farm-aerial.jpg",
  solarTracking: "/images/solar-farm.jpg",

  /* ---- Installers / people at work ---- */
  installerAction: "/images/installer-action.jpg",
  installersRedRoof: "/images/installers-red-roof.jpg",
  installerCarry: "/images/installer-carry.jpg",
  techniciansTeam: "/images/technicians-team.jpg",
  inspectPanel: "/images/inspect-panel.jpg",
  installers: "/images/technicians-team.jpg",

  /* ---- Heat pumps ---- */
  heatPump: "/images/heat-pump-wall.jpg",
  heatPumpHouse: "/images/heat-pump-house.jpg",
  heatPumpWhite: "/images/heat-pump-white.jpg",
  heatPumpRound: "/images/heat-pump-round.jpg",
  heatPumpService: "/images/inspect-panel.jpg",
  commercialHeating: "/images/heat-pump-round.jpg",

  /* ---- Hot water ---- */
  hotWater: "/images/wall-heater.jpg",
  utilityRoom: "/images/utility-room.jpg",

  /* ---- EV charging ---- */
  evCharger: "/images/ev-home-charge.jpg",
  evBay: "/images/ev-bay.jpg",
  evPublic: "/images/ev-public.jpg",
  evStations: "/images/ev-stations.jpg",
  evGreen: "/images/ev-green.jpg",

  /* ---- Interiors (infrared / comfort / showroom) ---- */
  infrared: "/images/living-bright.jpg",
  livingOpen: "/images/living-open.jpg",
  livingDining: "/images/living-dining.jpg",
  livingBlue: "/images/living-blue.jpg",
  livingCottage: "/images/living-cottage.jpg",
  showroom: "/images/living-blue.jpg",

  /* ---- Showroom (REAL client photos from the Redcar centre) ----
     Committed directly; NOT downloaded by scripts/fetch-assets.mjs.
     Source uploads live in /public/picturesfromourshowroom. See CLAUDE.md. */
  showroomInterior: "/images/showroom-interior.jpg",
  showroomExterior: "/images/showroom-exterior.jpg",
  showroomReception: "/images/showroom-reception.jpg",
  showroomConsult: "/images/showroom-consult.jpg",
  showroomPowerConsumption: "/images/showroom-power-consumption.jpg",
  showroomBattery: "/images/showroom-battery.jpg",
  showroomEvCharger: "/images/showroom-ev-charger.jpg",
  showroomEvBattery: "/images/showroom-ev-battery.jpg",
  showroomHeatPump: "/images/showroom-heat-pump.jpg",
  showroomHeatPumpOutdoor: "/images/showroom-heat-pump-outdoor.jpg",
  showroomInfrared: "/images/showroom-infrared.jpg",
  showroomSolarPanels: "/images/showroom-solar-panels.jpg",
  showroomSolarRoof: "/images/showroom-solar-roof.jpg",
  showroomDisplayCorner: "/images/showroom-display-corner.jpg",

  /* ---- Battery storage ---- */
  battery: "/images/battery-stack.jpg",
  batteryWall: "/images/battery-wall.jpg",
  powerwall: "/images/battery-wall.jpg",

  /* ---- Wind / eco landscape ---- */
  sharedForest: "/images/turbines-field.jpg",
  turbinesField: "/images/turbines-field.jpg",
  turbinesSolar: "/images/turbines-solar.jpg",

  /* ---- People / family / finance ---- */
  partnerVan: "/images/couple-home.jpg",
  coupleHome: "/images/couple-home.jpg",
  familyHome: "/images/family-home.jpg",
  familyNew: "/images/family-new.jpg",
  coupleGreen: "/images/couple-green.jpg",

  /* ---- Case studies ---- */
  residentialCase: "/images/solar-roof-worker.jpg",
  commercialCase: "/images/solar-roof-grid.jpg",
  caseA: "/images/solar-house-hill.jpg",
  caseB: "/images/heat-pump-house.jpg",
  caseC: "/images/home-drive.jpg",
  caseD: "/images/battery-wall.jpg",
  ccWarehouse: "/images/solar-aerial-commercial.jpg",
  ccForecourt: "/images/ev-public.jpg",
  ccCareHome: "/images/heat-pump-white.jpg",
  ccOfficePark: "/images/solar-farm-aerial.jpg",

  /* ---- Blog / insights ---- */
  blogSolar: "/images/installer-carry.jpg",
  blogHeatPump: "/images/heat-pump-white.jpg",
  blogBattery: "/images/battery-wall.jpg",
  blogGrant: "/images/installers-red-roof.jpg",
  blogGlass: "/images/living-dining.jpg",

  /* ---- Page banners ---- */
  bannerSolar: "/images/solar-flat-roof.jpg",
  bannerTracking: "/images/solar-farm-aerial.jpg",
  bannerHeat: "/images/heat-pump-house.jpg",
  bannerCylinder: "/images/utility-room.jpg",
  bannerService: "/images/inspect-panel.jpg",
  bannerBattery: "/images/battery-stack.jpg",
  bannerPowerwall: "/images/battery-stack.jpg",
  bannerOther: "/images/turbines-solar.jpg",
  bannerCommercial: "/images/solar-aerial-commercial.jpg",
  bannerEv: "/images/ev-stations.jpg",
  bannerInfrared: "/images/living-open.jpg",
  bannerFinance: "/images/family-new.jpg",
  bannerGrants: "/images/home-lawn.jpg",
  bannerCentre: "/images/living-dining.jpg",
  bannerContact: "/images/showroom-exterior.jpg",
  bannerFaqs: "/images/living-cottage.jpg",
} as const;

export type VideoKey = keyof typeof videos;
export type ImageKey = keyof typeof images;

export const assets = { videos, images } as const;

/** A reusable on-brand gradient string for inline style fallbacks. */
export const BRAND_GRADIENT =
  "linear-gradient(135deg, #1f344f 0%, #1a304b 45%, #629c35 130%)";
