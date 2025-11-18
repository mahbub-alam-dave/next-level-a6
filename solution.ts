
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
        return `'Name: ${this.name}, Age: ${this.age}'`
    }
}




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




interface Book {
    title: string;
    author: string;
    publishedYear: number;
    isAvailable: boolean;
}

const printBookDetails = (bookDetails: Book) => {
return `Title: ${bookDetails.title}, Author: ${bookDetails.author}, Published: ${bookDetails.publishedYear}, Available: ${bookDetails.isAvailable === true ? "Yes" : "No"}`
}




const getUniqueValues = <T extends string | number>(array1: T[], array2: T[]): T[] => {
    let newArray: T[] = [];

    const checkNewArray = (value: T) => {
        for(let i = 0; i < newArray.length; i++){
            if(newArray[i] === value) return true
        }
    }

    for(let i = 0; i < array1.length; i++){
            if(checkNewArray(array1[i]) !== true){
                newArray[newArray.length] = array1[i]
            }
    }

    for(let i = 0; i < array2.length; i++){
            if(checkNewArray(array2[i]) !== true){
                newArray[newArray.length] = array2[i]
            }
    }
    return newArray
}




type Products = {
    name: string;
    price: number;
    quantity:number;
    discount?: number;
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

