import { Component, OnInit, OnDestroy } from "@angular/core";

import { Plant } from "../plants.model";
import { PlantsService } from "../plants.service";

@Component({
  selector: "list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit, OnDestroy {

  panelOpenState = false;

  constructor(public plantsService: PlantsService) {}

  plants: Plant[] = this.plantsService.getFirstFilteredPlantsData();

  //dropdown select
  windList = [];
  fertilizerList = [];
  fertilizerAmountList = [];
  fertilizerPeriodList = [];
  wateringAmountList = [];
  wateringPeriodList = [];
  seedList = [];
  priceList = [];
  yieldCropList = [];
  colorList = [];
  blossomTimeList = [];
  blossomPeriodList = [];
  harvestingTimeList = [];
  seedingTimeList = [];
  plantHeightList = [];
  transplantList = [];
  spacingList = [];

  //filtras
  selectedWind = [];
  selectedFertilizer = [];
  selectedFertilizerAmount = [];
  selectedFertilizerPeriod = [];
  selectedWateringAmount = [];
  selectedWateringPeriod = [];
  selectedSeed = [];
  selectedPrice = [];
  selectedYieldCrop = [];
  selectedColor = [];
  selectedBlossomTime = [];
  selectedBlossomPeriod = [];
  selectedHarvestingTime = [];
  selectedSeedingTime = [];
  selectedPlantHeight = [];
  selectedTransplant = [];
  selectedSpacing = [];

  filteredPlants: Plant[] = [];

  ngOnInit() {
    this.windList = [...new Set(this.plants.map(plant => plant.wind))];
    this.windList = this.windList.sort((n1,n2) => n1 - n2);
    this.fertilizerList = [...new Set(this.plants.map(plant => plant.fertilizer))];
    this.fertilizerAmountList = [...new Set(this.plants.map(plant => plant.fertilizerAmount))];
    this.fertilizerAmountList = this.fertilizerAmountList.sort((n1,n2) => n1 - n2);
    this.fertilizerPeriodList = [...new Set(this.plants.map(plant => plant.fertilizerPeriod))];
    this.fertilizerPeriodList = this.fertilizerPeriodList.sort((n1,n2) => n1 - n2);
    this.wateringAmountList = [...new Set(this.plants.map(plant => plant.wateringAmount))];
    this.wateringAmountList = this.wateringAmountList.sort((n1,n2) => n1 - n2);
    this.wateringPeriodList = [...new Set(this.plants.map(plant => plant.wateringPeriod))];
    this.wateringPeriodList = this.wateringPeriodList.sort((n1,n2) => n1 - n2);
    this.seedList = [...new Set(this.plants.map(plant => plant.seed))];
    this.seedList = this.seedList.sort((n1,n2) => n1 - n2);
    this.priceList = [...new Set(this.plants.map(plant => plant.price))];
    this.priceList = this.priceList.sort((n1,n2) => n1 - n2);
    this.yieldCropList = [...new Set(this.plants.map(plant => plant.yieldCrop))];
    this.yieldCropList = this.yieldCropList.sort((n1,n2) => n1 - n2);
    this.colorList = [...new Set(this.plants.map(plant => plant.color))];
    this.blossomTimeList = [...new Set(this.plants.map(plant => plant.blossomTime))];
    this.blossomTimeList = this.blossomTimeList.sort((n1,n2) => n1 - n2);
    this.blossomPeriodList = [...new Set(this.plants.map(plant => plant.blossomPeriod))];
    this.blossomPeriodList = this.blossomPeriodList.sort((n1,n2) => n1 - n2);
    this.harvestingTimeList = [...new Set(this.plants.map(plant => plant.harvestingTime))];
    this.seedingTimeList = [...new Set(this.plants.map(plant => plant.seedingTime))];
    this.plantHeightList = [...new Set(this.plants.map(plant => plant.plantHeight))];
    this.plantHeightList = this.plantHeightList.sort((n1,n2) => n1 - n2);
    this.transplantList = [...new Set(this.plants.map(plant => plant.transplant))];
    this.spacingList = [...new Set(this.plants.map(plant => plant.spacing))];
    this.spacingList = this.spacingList.sort((n1,n2) => n1 - n2);
  }

  filterPlantData() {
    this.plants = this.plantsService.getFirstFilteredPlantsData();
    this.filteredPlants = this.plants.filter((plant) =>
      (this.selectedWind.length > 0 ? this.selectedWind.includes(plant.wind) : true) &&
      (this.selectedFertilizer.length > 0 ? this.selectedFertilizer.includes(plant.fertilizer) : true) &&
      (this.selectedFertilizerPeriod.length > 0 ? this.selectedFertilizerPeriod.includes(plant.fertilizerPeriod) : true) &&
      (this.selectedFertilizerAmount.length > 0 ? this.selectedFertilizerAmount.includes(plant.fertilizerAmount) : true) &&
      (this.selectedWateringAmount.length > 0 ? this.selectedWateringAmount.includes(plant.wateringAmount) : true) &&
      (this.selectedWateringPeriod.length > 0 ? this.selectedWateringPeriod.includes(plant.wateringPeriod) : true) &&
      (this.selectedSeed.length > 0 ? this.selectedSeed.includes(plant.seed) : true) &&
      (this.selectedPrice.length > 0 ? this.selectedPrice.includes(plant.price) : true) &&
      (this.selectedYieldCrop.length > 0 ? this.selectedYieldCrop.includes(plant.yieldCrop) : true) &&
      (this.selectedColor.length > 0 ? this.selectedColor.includes(plant.color) : true) &&
      (this.selectedBlossomTime.length > 0 ? this.selectedBlossomTime.includes(plant.blossomTime) : true) &&
      (this.selectedBlossomPeriod.length > 0 ? this.selectedBlossomPeriod.includes(plant.blossomPeriod) : true) &&
      (this.selectedHarvestingTime.length > 0 ? this.selectedHarvestingTime.includes(plant.harvestingTime) : true) &&
      (this.selectedSeedingTime.length > 0 ? this.selectedSeedingTime.includes(plant.seedingTime) : true) &&
      (this.selectedPlantHeight.length > 0 ? this.selectedPlantHeight.includes(plant.plantHeight) : true) &&
      (this.selectedTransplant.length > 0 ? this.selectedTransplant.includes(plant.transplant) : true) &&
      (this.selectedSpacing.length > 0 ? this.selectedSpacing.includes(plant.spacing) : true)
    );
    this.plants = this.filteredPlants;
    this.plantsService.setSecondFilteredPlantsData(this.filteredPlants);
  }

  resetFilter() {
    this.plants = this.plantsService.getFirstFilteredPlantsData();
    this.selectedWind = [];
    this.selectedFertilizer = [];
    this.selectedFertilizerAmount = [];
    this.selectedFertilizerPeriod = [];
    this.selectedWateringAmount = [];
    this.selectedWateringPeriod = [];
    this.selectedSeed = [];
    this.selectedPrice = [];
    this.selectedYieldCrop = [];
    this.selectedColor = [];
    this.selectedBlossomTime = [];
    this.selectedBlossomPeriod = [];
    this.selectedHarvestingTime = [];
    this.selectedSeedingTime = [];
    this.selectedPlantHeight = [];
    this.selectedTransplant = [];
    this.selectedSpacing = [];
  }

  sendPlantsData() {
    this.plantsService.setSecondFilteredPlantsData(this.plants);
  }

  ngOnDestroy() {}

}
