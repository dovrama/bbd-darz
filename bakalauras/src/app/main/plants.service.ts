import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Plant } from "./plants.model";

@Injectable({ providedIn: "root" })
export class PlantsService {

  //darzo size
  private length: number;
  private width: number;

  //first filteredPlants
  private firstFilteredPlants: Plant[];

  //second filteredPlants
  private secondFilteredPlants: Plant[];

  //get plants
  private plants: Plant[] = [];
  private plantsUpdated = new Subject<Plant[]>();

  constructor(private http: HttpClient, private router: Router) {}

  //darzo size
  setGardenLengthData(length){
    this.length = length;
  }

  getGardenLengthData(){
    let tempLength = this.length;
    return tempLength;
  }

  setGardenWidthData(width){
    this.width = width;
  }

  getGardenWidthData(){
    let tempWidth = this.width;
    return tempWidth;
  }

  //filteredPlants 1st step
  setFirstFilteredPlantsData(firstFilteredPlants){
    this.firstFilteredPlants = firstFilteredPlants;
  }

  getFirstFilteredPlantsData(){
    let tempFirstFilteredPlants = this.firstFilteredPlants;
    return tempFirstFilteredPlants;
  }

  //filteredPlants 2nd step
  setSecondFilteredPlantsData(secondFilteredPlants){
    this.secondFilteredPlants = secondFilteredPlants;
  }

  getSecondFilteredPlantsData(){
    let tempSecondFilteredPlants = this.secondFilteredPlants;
    return tempSecondFilteredPlants;
  }

  //get first time plants
  getPlants() {
    this.http
      .get<{ message: string; plants: any }>("http://localhost:3000/api/plants")
      .pipe(
        map(plantData => {
          return plantData.plants.map(plant => {
            return {
              title: plant.title,
              name: plant.name,
              soil: plant.soil,
              sunshine: plant.sunshine,
              moisture: plant.moisture,
              wind: plant.wind,
              fertilizer: plant.fertilizer,
              fertilizerAmount: plant.fertilizerAmount,
              fertilizerPeriod: plant.fertilizerPeriod,
              wateringPeriod: plant.wateringPeriod,
              wateringAmount: plant.wateringAmount,
              seed: plant.seed,
              price: plant.price,
              yieldCrop: plant.yieldCrop,
              color: plant.color,
              blossomTime: plant.blossomTime,
              blossomPeriod: plant.blossomPeriod,
              compatability: plant.compatability,
              nonCompatability: plant.nonCompatability,
              cropRotation: plant.cropRotation,
              harvestingTime: plant.harvestingTime,
              seedingTime: plant.seedingTime,
              plantHeight: plant.plantHeight,
              transplant: plant.transplant,
              hints: plant.hints,
              spacing: plant.spacing
            };
          });
        })
      )
      .subscribe(transformedPlants => {
        this.plants = transformedPlants;
        this.plantsUpdated.next([...this.plants]);
      });
  }

  //updeiteris plantsu
  getPlantsUpdateListener() {
    return this.plantsUpdated.asObservable();
  }

  //prideti darzove
  addPost(
    name: string, //augalo pavadinimas
    soil: string, //zemes tipas
    sunshine: string, //sauletumas
    moisture: string, //dregnumas
    wind: string, //vejuotumas
    fertilizer: string, //kokios trasos
    fertilizerAmount: string, //kiek trasu reikia kartui
    fertilizerPeriod: string, //kas kada tresti
    wateringPeriod: string, //kas kada palaistyti (3d)
    wateringAmount: string, //kiek palaistyti
    seed: string, //seklu kiekis kvadratuke
    price: string, //seklu kaina
    yieldCrop: string, //derlius is kvadrato
    color: string, //spalva augalo
    blossomTime: string, //kada prazysta
    blossomPeriod: string, //kiek laiko buna prazydes
    compatability: string, //suderinamumas
    nonCompatability: string, //nesuderinamumas
    cropRotation: string, //sejomaina
    harvestingTime: string, //kada nuimti derliu
    seedingTime: string,  //kada paseti
    plantHeight: string, //kada pradeti sodinukus
    transplant: string, //kada persodinti
    hints: string, // patarimai
    spacing: string, //atstumai tarp augalu
    ) {
    const plant: Plant = {
      name: name,
      soil: soil,
      sunshine: sunshine,
      moisture: moisture,
      wind: wind,
      fertilizer: fertilizer,
      fertilizerAmount: fertilizerAmount,
      fertilizerPeriod: fertilizerPeriod,
      wateringPeriod: wateringPeriod,
      wateringAmount: wateringAmount,
      seed: seed,
      price: price,
      yieldCrop: yieldCrop,
      color: color,
      blossomTime: blossomTime,
      blossomPeriod: blossomPeriod,
      compatability: compatability,
      nonCompatability: nonCompatability,
      cropRotation: cropRotation,
      harvestingTime: harvestingTime,
      seedingTime: seedingTime,
      plantHeight: plantHeight,
      transplant: transplant,
      hints: hints,
      spacing: spacing
    };
    this.http
      .post<{ message: string; postId: string }>(
        "http://localhost:3000/api/plants",
        plant
      )
      .subscribe(responseData => {
        this.plants.push(plant);
      });
  }
}
