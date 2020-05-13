import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlantsService } from "../plants.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Plant } from "../plants.model";

@Component({
  selector: "landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"]
})
export class LandingComponent implements OnInit, OnDestroy {

  //dropdown select
  plants: Plant[] = [];
  private plantsSub: Subscription;
  soilList = [];
  moistureList = [];
  sunshineList = [];
  //dropdown select

  //garden size
  gardenLength: number = null;
  gardenWidth: number = null;
  //garden size

  //stepper
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  //filter and select options
  selectedSoil = [];
  selectedSunshine = [];
  selectedMoisture = [];
  filteredPlants: Plant[] = [];

  constructor(public plantsService: PlantsService, private _formBuilder: FormBuilder) {}

  ngOnInit() {
    //neleidzia step praeiti
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(1)]],
      secondCtrl: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(1)]]
    });
    this.secondFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required]
    });

    //select options
    this.plantsService.getPlants();
    this.plantsSub = this.plantsService.getPlantsUpdateListener()
      .subscribe((plants: Plant[]) => {
        this.plants = plants;
        this.soilList = [...new Set(this.plants.map(plant => plant.soil))];
        this.sunshineList = [...new Set(this.plants.map(plant => plant.sunshine))];
        this.sunshineList = this.sunshineList.sort((n1,n2) => n1 - n2);
        this.moistureList = [...new Set(this.plants.map(plant => plant.moisture))];
        this.moistureList = this.moistureList.sort((n1,n2) => n1 - n2);
    });
  }

  //filtras
  convertGardenSubData() {
    this.filteredPlants = this.plants.filter((plant) =>
      this.selectedSoil.includes(plant.soil) &&
      this.selectedSunshine.includes(plant.sunshine) &&
      this.selectedMoisture.includes(plant.moisture));
  }

  //duomenu siuntimas i serviza
  sendGardenData(){
    this.plantsService.setGardenLengthData(this.gardenLength); //darzo size
    this.plantsService.setGardenWidthData(this.gardenWidth); //darzo size
    this.plantsService.setFirstFilteredPlantsData(this.filteredPlants);
  }

  ngOnDestroy() {
    this.plantsSub.unsubscribe();
  }

}
