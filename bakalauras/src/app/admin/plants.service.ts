import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Plant } from "./plant.model";

@Injectable({ providedIn: "root" })
export class PlantsService {
  private plants: Plant[] = [];
  private plantsUpdated = new Subject<Plant[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPlants() {
    this.http
      .get<{ message: string; plants: any }>("http://localhost:3000/api/admin/plants")
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
              spacing: plant.spacing,
              id: plant._id
            };
          });
        })
      )
      .subscribe(transformedPlants => {
        this.plants = transformedPlants;
        this.plantsUpdated.next([...this.plants]);
      });
  }

  getPlantUpdateListener() {
    return this.plantsUpdated.asObservable();
  }

  getPlant(id: string) {
    return this.http.get<
    {
      _id: string;
      name: string; //augalo pavadinimas
      soil: string; //zemes tipas
      sunshine: string; //sauletumas
      moisture: string; //dregnumas
      wind: string; //vejuotumas
      fertilizer: string; //kokios trasos
      fertilizerAmount: string; //kiek trasu reikia kartui
      fertilizerPeriod: string; //kas kada tresti
      wateringPeriod: string; //kas kada palaistyti (3d)
      wateringAmount: string; //kiek palaistyti
      seed: string; //seklu kiekis kvadratuke
      price: string; //seklu kaina
      yieldCrop: string; //derlius is kvadrato
      color: string; //spalva augalo
      blossomTime: string; //kada prazysta
      blossomPeriod: string; //kiek laiko buna prazydes
      compatability: string; //suderinamumas
      nonCompatability: string; //nesuderinamumas
      cropRotation: string; //sejomaina
      harvestingTime: string; //kada nuimti derliu
      seedingTime: string;  //kada paseti
      plantHeight: string; //kada pradeti sodinukus
      transplant: string; //kada persodinti
      hints: string; // patarimai
      spacing: string
    }>(
      "http://localhost:3000/api/admin/plants/" + id
    );
  }

  addPlant(
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
    spacing: string
    ) {
    const plant: Plant = {
      id: null,
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
      .post<{ message: string; plantId: string }>(
        "http://localhost:3000/api/admin/plants",
        plant
      )
      .subscribe(responseData => {
        const id = responseData.plantId;
        plant.id = id;
        this.plants.push(plant);
        this.plantsUpdated.next([...this.plants]);
        this.router.navigate(["/plantlist"]);
      });
  }

  updatePlant(
    id: string,
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
    spacing: string
    ) {
    const plant: Plant = {
      id: id,
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
      .put("http://localhost:3000/api/admin/plants/" + id, plant)
      .subscribe(response => {
        const updatedPlants = [...this.plants];
        const oldPlantIndex = updatedPlants.findIndex(p => p.id === plant.id);
        updatedPlants[oldPlantIndex] = plant;
        this.plants = updatedPlants;
        this.plantsUpdated.next([...this.plants]);
        this.router.navigate(["/plantlist"]);
      });
  }

  deletePlant(plantId: string) {
    this.http
      .delete("http://localhost:3000/api/admin/plants/" + plantId)
      .subscribe(() => {
        const updatedPlants = this.plants.filter(plant => plant.id !== plantId);
        this.plants = updatedPlants;
        this.plantsUpdated.next([...this.plants]);
      });
  }
}
