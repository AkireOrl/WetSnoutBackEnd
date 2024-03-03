import { faker } from "@faker-js/faker";
import { BaseFactory } from "./BaseFactory";
import { Dog } from "../../entities/dogs/dogModel";

//-------------------------------------------------------

export class DogFactory extends BaseFactory<Dog> {
    private static readonly DOG_NAMES: string[] = [
        'Buddy', 'Max', 'Bella', 'Charlie', 'Lucy', 'Molly', 'Bailey', 'Rocky', 'Oreo', 'Oliver',
    ];

    private static readonly DOG_RACES: string[] = [
        'Golden Retriever', 'Labrador Retriever', 'Bulldog', 'Boxer', 'Beagle', 'Yorkshire Terrier',
        'Poodle', 'Corgi', 'Siberian Husky', 'Dachshund', 'Border Collie',
    ];

    private static readonly DOG_PHOTOS: string[] = [
        'https://images.unsplash.com/photo-1517849347919-34e715b5b0c2',
        'https://images.unsplash.com/photo-1518148437677-d12026783881',
        'https://images.unsplash.com/photo-1518148437677-d12026783881',
        'https://images.unsplash.com/photo-1518148437677-d12026783881',
        'https://images.unsplash.com/photo-1518148437677-d12026783881',
    ];

    private static readonly DOG_GALLERIES: string[][] = [
        [
            'https://images.unsplash.com/photo-1517849347919-34e715b5b0c2',
            'https://images.unsplash.com/photo-1518148437677-d12026783881',
        ],
        [
            'https://images.unsplash.com/photo-1518148437677-d12026783881',
            'https://images.unsplash.com/photo-1518148437677-d12026783881',
        ],
        [
            'https://images.unsplash.com/photo-1518148437677-d12026783881',
            'https://images.unsplash.com/photo-1518148437677-d12026783881',
        ],
    ];

    private getRandomName(usedNames: Set<string>): string {
        const name = faker.helpers.arrayElement(DogFactory.DOG_NAMES);
        if (usedNames.has(name)) {
          return this.getRandomName(usedNames);
        }
        usedNames.add(name);
        return name;
      }

    protected generateSpecifics(dog: Dog): Dog {
        const usedNames = new Set<string>();
        dog.name = this.getRandomName(usedNames);
        dog.race = faker.helpers.arrayElement(DogFactory.DOG_RACES);
        dog.photo = faker.helpers.arrayElement(DogFactory.DOG_PHOTOS);
       

        return dog;
    }


    }