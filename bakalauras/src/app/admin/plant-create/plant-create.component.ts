import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { PlantsService } from "../plants.service";
import { Plant } from "../plant.model";

@Component({
  selector: "app-plant-create",
  templateUrl: "./plant-create.component.html",
  styleUrls: ["./plant-create.component.css"]
})
export class PlantCreateComponent implements OnInit {
  checker = true;
  plant: Plant;
  private mode = "create";
  private plantId: string;

  constructor(
    public plantsService: PlantsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("plantId")) {
        this.mode = "edit";
        this.plantId = paramMap.get("plantId");
        this.plantsService.getPlant(this.plantId).subscribe(plantData => {
          this.plant = {
            id: plantData._id,
            name: plantData.name,
            soil: plantData.soil,
            sunshine: plantData.sunshine,
            moisture: plantData.moisture,
            wind: plantData.wind,
            fertilizer: plantData.fertilizer,
            fertilizerAmount: plantData.fertilizerAmount,
            fertilizerPeriod: plantData.fertilizerPeriod,
            wateringPeriod: plantData.wateringPeriod,
            wateringAmount: plantData.wateringAmount,
            seed: plantData.seed,
            price: plantData.price,
            yieldCrop: plantData.yieldCrop,
            color: plantData.color,
            blossomTime: plantData.blossomTime,
            blossomPeriod: plantData.blossomPeriod,
            compatability: plantData.compatability,
            nonCompatability: plantData.nonCompatability,
            cropRotation: plantData.cropRotation,
            harvestingTime: plantData.harvestingTime,
            seedingTime: plantData.seedingTime,
            plantHeight: plantData.plantHeight,
            transplant: plantData.transplant,
            hints: plantData.hints,
            spacing: plantData.spacing
          };
        });
      } else {
        this.mode = "create";
        this.plantId = null;
      }
    });
  }

  toggleChecker() {
    this.checker = false;
    setTimeout(()=>{
      this.checker = true;
    }, 2500);
  }

  onSavePlant(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === "create") {
      this.plantsService.addPlant(
        form.value.name,
        form.value.soil,
        form.value.sunshine,
        form.value.moisture,
        form.value.wind,
        form.value.fertilizer,
        form.value.fertilizerAmount,
        form.value.fertilizerPeriod,
        form.value.wateringPeriod,
        form.value.wateringAmount,
        form.value.seed,
        form.value.price,
        form.value.yieldCrop,
        form.value.color,
        form.value.blossomTime,
        form.value.blossomPeriod,
        form.value.compatability,
        form.value.nonCompatability,
        form.value.cropRotation,
        form.value.harvestingTime,
        form.value.seedingTime,
        form.value.plantHeight,
        form.value.transplant,
        form.value.hints,
        form.value.spacing
        );
    } else {
      this.plantsService.updatePlant(
        this.plantId,
        form.value.name,
        form.value.soil,
        form.value.sunshine,
        form.value.moisture,
        form.value.wind,
        form.value.fertilizer,
        form.value.fertilizerAmount,
        form.value.fertilizerPeriod,
        form.value.wateringPeriod,
        form.value.wateringAmount,
        form.value.seed,
        form.value.price,
        form.value.yieldCrop,
        form.value.color,
        form.value.blossomTime,
        form.value.blossomPeriod,
        form.value.compatability,
        form.value.nonCompatability,
        form.value.cropRotation,
        form.value.harvestingTime,
        form.value.seedingTime,
        form.value.plantHeight,
        form.value.transplant,
        form.value.hints,
        form.value.spacing
      );
    }
    form.resetForm();
  }
}
