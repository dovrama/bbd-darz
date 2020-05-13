export interface Plant {
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
  spacing: string; //atstumai tarp augalu
}
