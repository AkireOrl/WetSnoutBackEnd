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
        'https://static9.depositphotos.com/1594920/1089/i/950/depositphotos_10891491-stock-photo-border-collie-3-years-old.jpg',
        'https://st4.depositphotos.com/11516992/24044/i/600/depositphotos_240443626-stock-photo-greater-swiss-mountain-dog-sitting.jpg',
        'https://static8.depositphotos.com/1007101/861/i/600/depositphotos_8612026-stock-photo-happy-dog-cairn-terrier.jpg',
        'https://static9.depositphotos.com/1606449/1096/i/600/depositphotos_10969163-stock-photo-basset-hound-dog-looking-to.jpg',
        'https://static5.depositphotos.com/1004199/419/i/600/depositphotos_4193142-stock-photo-golden-retriever-dog.jpg',
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
        dog.age = faker.helpers.rangeToNumber({ min: 1, max: 10 });
        dog.size = "small" || "medium" || "bigger";
        dog.gender = "female" || "male"; // TODO: Implement gender randomness
        dog.weight = faker.string.numeric(); 
        dog.sociable = "si" || "no";
        dog.photo = faker.helpers.arrayElement(DogFactory.DOG_PHOTOS);
        dog.gallery = faker.helpers.arrayElement(DogFactory.DOG_GALLERIES);


        return dog;
    }
    }