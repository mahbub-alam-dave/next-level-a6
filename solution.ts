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

type Users = {
    id: number;
    name: string;
    email: string;
    isActive: boolean
}

const filterActiveUsers = (arrayOfUsers: Users[]) : Users[] => {
    const activeUsers = []
    for(let user of arrayOfUsers) {
        if(user.isActive === true) {
            activeUsers.push(user)
        }
    }
    return activeUsers;
}

const users = [
  { id: 1, name: 'Rakib', email: 'rakib@example.com', isActive: true },
  { id: 2, name: 'Asha', email: 'asha@example.com', isActive: false },
  { id: 3, name: 'Rumi', email: 'rumi@example.com', isActive: true },
];


interface Book {
    title: string;
    author: string;
    publishedYear: number;
    isAvailable: boolean;
}

const printBookDetails = (bookDetails: Book) => {
return `Title: ${bookDetails.title}, Author: ${bookDetails.author}, Published: ${bookDetails.publishedYear}, Available: ${bookDetails.isAvailable === true ? "Yes" : "No"}`
}

const myBook: Book = {
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  publishedYear: 2000,
  isAvailable: false,
};


type ArrayType = string[] | number[]

const getUniqueValues = (array1: ArrayType, array2: ArrayType)  => {
    let newArray = [...array1];
        for(let val of array2) {
            if(!newArray.includes(val)){
                newArray.push(val)
            }
            }
            return newArray
}




type Products = {
    name: string;
    price: number;
    quantity:number;
    discount?: number | undefined;
}

const calculateTotalPrice = (arrayOfProducts: Products[]) => {
    let totalPrice = 0
    if(arrayOfProducts.length === 0) {
        return totalPrice;
    }
    totalPrice = arrayOfProducts.reduce((totals, item) => {
        totals += ((item.price * item.quantity) - (item.discount ? (item.price * item.quantity) * item.discount/100 : 0))
        return totals
    }, 0)

    return totalPrice
    
}

const products  = [
  { name: 'Pen', price: 10, quantity: 2 },
  { name: 'Notebook', price: 25, quantity: 3, discount: 10 },
  { name: 'Bag', price: 50, quantity: 1, discount: 20 },
];
