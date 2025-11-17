// Beginning of next level courses assignment one
const formatValue = (input : number | string | boolean) : number | string | boolean => {
    if(typeof input === "number"){
        return input * 10
    } else if (typeof input === "string"){
        return input.toUpperCase()
    } else {
        return input = !input
    }
}

type ArrayInput = string[] | number[] | boolean[]
const getLength = (input: string | ArrayInput) => {
    if(typeof input === "string") {
        return input.length
    } else if (Array.isArray(input)) {
        return input.length
    }
}

class Person {
    name: string;
    age: number;

    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }

    getDetails(){
        return `Name: ${this.name}, Age: ${this.age}`
    }
}

const person1 = new Person('John Doe', 30);
const person2 = new Person('Alice', 25);

type Items = {
    title: string,
    rating: number
}
const filterByRating = (arrayOfItems: Items[]): Items[] => {
    let filteredArray = [];
    for(let item of arrayOfItems) {
        if(item.rating > 4) {
            filteredArray.push(item)
        }
    }
    return filteredArray;

}

const books : Items[] = [
  { title: 'Book A', rating: 4.5 },
  { title: 'Book B', rating: 3.2 },
  { title: 'Book C', rating: 5.0 },
];

console.log(filterByRating(books));
