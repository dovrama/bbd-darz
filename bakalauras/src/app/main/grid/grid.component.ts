import { Component, OnInit, OnDestroy } from "@angular/core";

import { Plant } from "../plants.model";
import { PlantsService } from "../plants.service";


@Component({
  selector: "app-post-list",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.css"]
})

export class GridComponent implements OnInit, OnDestroy {

  plants: Plant[] = this.plantsService.getSecondFilteredPlantsData();

  //spalva dropdownu
  color: string;

  //pasirinktu augalu listinimas
  plantsForListing: Plant[] = [];
  totalPrice: number = 0;
  totalYield: number = 0;

  //kiek ko pasirinkta
  selectedPlant = [];

  //nustatytu filtru parametrai is anksciau
  nameList = [];
  soilList = [];
  namesAsString: string;

  constructor(public plantsService: PlantsService) {}

  //darzo size
  gardenLength = this.plantsService.getGardenLengthData();
  gardenWidth = this.plantsService.getGardenWidthData();
  colNum = 'repeat(' + this.gardenLength + ', 100px)';
  rowNum = 'repeat(' + this.gardenWidth + ', 100px)';
  wholeGardenSize = Array;
  gardenSize = this.gardenLength * this.gardenWidth;

  //krastiniai elementai
  boundaryElem = [];
  leftElem = [];
  rightElem = [];

  ngOnInit() {
    //filtru parametrai is anksciau
    this.nameList = [...new Set(this.plants.map(plant => plant.name))];
    this.namesAsString = this.nameList.join(', ');
    this.soilList = [...new Set(this.plants.map(plant => plant.soil))];

    let count = 0;
    for (let i = 0; i < this.gardenWidth; i++) {
      this.boundaryElem.push([]);
      for (let j = 0; j < this.gardenLength; j++) {
        this.boundaryElem[i][j] = count;
        count++;
      };
    };
    for (let i = 0; i < this.gardenWidth; i++) {
      this.leftElem.push(this.boundaryElem[i][0]);
    };
    for (let i = 0; i < this.leftElem.length; i++) {
      this.rightElem.push(this.boundaryElem[i][0]+this.gardenLength-1);
    }
  }

  //listinimas totalo ir derliaus
  onPlantSelection(sqNumber, receivedSelectedPlant) {
    this.totalPrice = 0;
    this.totalYield = 0;
    this.selectedPlant[sqNumber] = receivedSelectedPlant;
    this.plantsForListing = this.plants.filter((plant) => this.selectedPlant.includes(plant.name));
    for (let i = 0; i < this.selectedPlant.length; i++) {
      if (this.selectedPlant[i]) {
        let filteredSelectedPlant = this.plants.filter((plant) => this.selectedPlant[i].includes(plant.name));
        this.totalPrice += +filteredSelectedPlant[0].price;
        this.totalYield += +filteredSelectedPlant[0].yieldCrop;
      }
    };
  }

  getColorInfo(squareNumber, plantName, plantHeight) {  //nustato kokia spalva
    let selectedPlantData = this.plants.filter((plant) => this.selectedPlant[squareNumber].includes(plant.name));
    let selectedPlantCompatability = selectedPlantData[0].compatability;
    let selectedPlantNonCompatability = selectedPlantData[0].nonCompatability;
    let selectedPlantHeight = selectedPlantData[0].plantHeight;
    let selectedPlantName = selectedPlantData[0].name;
    if(selectedPlantCompatability === plantName || selectedPlantName === plantName){
      this.color = 'green';
      return this.color;
    } else if (selectedPlantNonCompatability === plantName) {
      this.color = 'red';
      return this.color;
    } else if (selectedPlantHeight > plantHeight) {
      this.color = 'orange';
      return this.color;
    }
  }

  //spalvos nusetinimas
  setColor(sqNum, plantHeight, plantName) {
    this.color = 'black';
    if(this.gardenLength > 1) {
      if(this.leftElem.includes(sqNum)) { //kairys krastas
        if(this.selectedPlant[sqNum-this.gardenLength]){  //laukelis virs
          this.getColorInfo(sqNum-this.gardenLength, plantName, plantHeight);
        } else if (this.selectedPlant[sqNum+this.gardenLength]){ //laukelis po
          this.getColorInfo(sqNum+this.gardenLength, plantName, plantHeight);
        } else if (this.selectedPlant[sqNum+1]){ //desine
          this.getColorInfo(sqNum+1, plantName, plantHeight);
        } else if (this.selectedPlant[sqNum-this.gardenLength+1]){ //virsus desine
          this.getColorInfo(sqNum-this.gardenLength+1, plantName, plantHeight);
        } else if (this.selectedPlant[sqNum+this.gardenLength+1]){ //apacia desine
          this.getColorInfo(sqNum+this.gardenLength+1, plantName, plantHeight);
        }
      } else if (this.rightElem.includes(sqNum)) {
        if(this.selectedPlant[sqNum-this.gardenLength]){  //laukelis virs
          this.getColorInfo(sqNum-this.gardenLength, plantName, plantHeight);
        } else if (this.selectedPlant[sqNum+this.gardenLength]){ //laukelis po
          this.getColorInfo(sqNum+this.gardenLength, plantName, plantHeight);
        } else if (this.selectedPlant[sqNum-1]){  //kaire
          this.getColorInfo(sqNum-1, plantName, plantHeight);
        } else if (this.selectedPlant[sqNum-this.gardenLength-1]){ //virsus kaire
          this.getColorInfo(sqNum-this.gardenLength-1, plantName, plantHeight);
        } else if (this.selectedPlant[sqNum+this.gardenLength-1]){ //apacia kaire
          this.getColorInfo(sqNum+this.gardenLength-1, plantName, plantHeight);
        }
      } else {
        if(this.selectedPlant[sqNum-this.gardenLength]){  //laukelis virs
          this.getColorInfo(sqNum-this.gardenLength, plantName, plantHeight);
        } else if (this.selectedPlant[sqNum+this.gardenLength]){ //laukelis po
          this.getColorInfo(sqNum+this.gardenLength, plantName, plantHeight);
        } else if (this.selectedPlant[sqNum-1]){  //kaire
          this.getColorInfo(sqNum-1, plantName, plantHeight);
        } else if (this.selectedPlant[sqNum+1]){ //desine
          this.getColorInfo(sqNum+1, plantName, plantHeight);
        } else if (this.selectedPlant[sqNum-this.gardenLength-1]){ //virsus kaire
          this.getColorInfo(sqNum-this.gardenLength-1, plantName, plantHeight);
        } else if (this.selectedPlant[sqNum-this.gardenLength+1]){ //virsus desine
          this.getColorInfo(sqNum-this.gardenLength+1, plantName, plantHeight);
        } else if (this.selectedPlant[sqNum+this.gardenLength-1]){ //apacia kaire
          this.getColorInfo(sqNum+this.gardenLength-1, plantName, plantHeight);
        } else if (this.selectedPlant[sqNum+this.gardenLength+1]){ //apacia desine
          this.getColorInfo(sqNum+this.gardenLength+1, plantName, plantHeight);
        }
      }
    } else {
      if(this.leftElem.includes(sqNum)) { //krastai kai linija
        if(this.selectedPlant[sqNum-1]){  //laukelis pries
          this.getColorInfo(sqNum-1, plantName, plantHeight);
        } else if (this.selectedPlant[sqNum+1]) { //laukelis po
          this.getColorInfo(sqNum+1, plantName, plantHeight);
        }
      } else {
        if(this.selectedPlant[sqNum-1]){  //laukelis pries
          this.getColorInfo(sqNum-1, plantName, plantHeight);
        } else if (this.selectedPlant[sqNum+1]) { //laukelis po
          this.getColorInfo(sqNum+1, plantName, plantHeight);
        }
      }
    }
    return this.color;
  }

  printPage() {
    window.print();
  }

  ngOnDestroy() {}
}
