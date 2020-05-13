import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Plant } from "../plant.model";
import { PlantsService } from "../plants.service";
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: "app-plant-list",
  templateUrl: "./plant-list.component.html",
  styleUrls: ["./plant-list.component.css"]
})
export class PlantListComponent implements OnInit, OnDestroy {
  checker = true;
  plants: Plant[] = [];
  private plantsSub: Subscription;

  constructor(public plantsService: PlantsService, private authService: AuthService) {}

  ngOnInit() {
    this.plantsService.getPlants();
    this.plantsSub = this.plantsService.getPlantUpdateListener()
      .subscribe((plants: Plant[]) => {
        this.plants = plants;
    });
  }

  onDelete(plantId: string) {
    this.plantsService.deletePlant(plantId);
    this.checker = true;
  }

  toggleChecker() {
    this.checker = false;
    setTimeout(()=>{
      this.checker = true;
    }, 2500);
  }

  ngOnDestroy() {
    this.plantsSub.unsubscribe();
  }
}
