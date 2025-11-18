# TypeScript's Essential Concepts

Welcome to this TypeScript guide! This README explores some fundamental TypeScript concepts that every developer should understand.

## Table of Contents
- [Interfaces vs Types: Choosing the Right Tool](#interfaces-vs-types-choosing-the-right-tool)
- [Union and Intersection Types: Composing Flexible Type Systems](#union-and-intersection-types-composing-flexible-type-systems)

---

### Understanding Interfaces

Interfaces in TypeScript are primarily designed to define the shape of objects. They're particularly powerful when you're working with object-oriented programming patterns.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

interface Admin extends User {
  permissions: string[];
  role: 'admin';
}
```

One of the unique features of interfaces is **declaration merging**. This means you can declare the same interface multiple times, and TypeScript will merge them together:

```typescript
interface Window {
  customProperty: string;
}

interface Window {
  anotherProperty: number;
}

// TypeScript merges these into one interface
// Window now has both customProperty and anotherProperty
```

This feature is particularly useful when you need to extend third-party library types or when working on large codebases where you want to augment existing interfaces.

### Understanding Types

Type aliases are more versatile than interfaces. While they can certainly define object shapes, they can represent much more:

```typescript
// Primitives
type ID = string | number;

// Tuples
type Coordinates = [number, number];

// Union types
type Status = 'pending' | 'success' | 'error';

// Function types
type Callback = (data: string) => void;

// Object types (just like interfaces)
type User = {
  id: number;
  name: string;
  email: string;
};
```

Types support advanced type operations that interfaces don't:

```typescript
// Mapped types
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Conditional types
type IsString<T> = T extends string ? true : false;

// Template literal types
type EventName = `on${Capitalize<string>}`;
```

### When to Use Each

**Use Interfaces when:**
- Defining object shapes and contracts
- You want to take advantage of declaration merging
- Working with classes and OOP patterns
- Building public APIs where extensibility matters

**Use Types when:**
- Creating unions, intersections, or tuples
- Working with primitives, literals, or computed properties
- You need advanced type operations
- Creating utility types or complex type transformations

### A Practical Example

Here's a real-world scenario showing both in action:

```typescript
// Interface for base entity (extendable)
interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Type for status (union of string literals)
type Status = 'draft' | 'published' | 'archived';

// Interface extending Entity
interface Article extends Entity {
  title: string;
  content: string;
  status: Status;
  author: Author;
}

// Type for API response (complex type composition)
type ApiResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

// Using both together
async function getArticle(id: string): Promise<ApiResponse<Article>> {
  // Implementation
}
```

### Performance and Compiler Differences

In most cases, interfaces and types perform identically at runtime (since TypeScript is erased). However, the TypeScript compiler may generate slightly different error messages. Interfaces often provide more readable error messages when dealing with object shape mismatches.

---

## Union and Intersection Types: Composing Flexible Type Systems

TypeScript's union and intersection types are powerful tools for building flexible, type-safe applications. They allow you to compose types in ways that model real-world scenarios accurately.

### Union Types: This OR That

Union types (using `|`) allow a value to be one of several types. Think of it as a logical OR operation.

```typescript
type StringOrNumber = string | number;

function formatId(id: StringOrNumber): string {
  if (typeof id === 'string') {
    return id.toUpperCase();
  }
  return `ID-${id}`;
}

formatId('abc123');  // "ABC123"
formatId(42);        // "ID-42"
```

#### Discriminated Unions

One of the most powerful patterns with union types is the discriminated union (also called tagged unions). This pattern uses a common property to distinguish between different shapes:

```typescript
type LoadingState = {
  status: 'loading';
};

type SuccessState = {
  status: 'success';
  data: string[];
};

type ErrorState = {
  status: 'error';
  error: string;
};

type State = LoadingState | SuccessState | ErrorState;

function handleState(state: State) {
  switch (state.status) {
    case 'loading':
      console.log('Loading...');
      break;
    case 'success':
      // TypeScript knows state.data exists here
      console.log('Data:', state.data);
      break;
    case 'error':
      // TypeScript knows state.error exists here
      console.log('Error:', state.error);
      break;
  }
}
```

This pattern provides excellent type safety and makes it impossible to access properties that don't exist on a particular variant.

#### Real-World Example: Form Validation

```typescript
type ValidationSuccess = {
  isValid: true;
  value: string;
};

type ValidationError = {
  isValid: false;
  errors: string[];
};

type ValidationResult = ValidationSuccess | ValidationError;

function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (emailRegex.test(email)) {
    return { isValid: true, value: email };
  }
  
  return { 
    isValid: false, 
    errors: ['Invalid email format'] 
  };
}

// Usage
const result = validateEmail('user@example.com');
if (result.isValid) {
  console.log('Valid email:', result.value);
} else {
  console.log('Errors:', result.errors);
}
```

### Intersection Types: This AND That

Intersection types (using `&`) combine multiple types into one. The resulting type has all properties from all constituent types. Think of it as a logical AND operation.

```typescript
type HasName = {
  name: string;
};

type HasAge = {
  age: number;
};

type Person = HasName & HasAge;

const person: Person = {
  name: 'Alice',
  age: 30
}; // Must have BOTH name and age
```

#### Mixing Behaviors with Intersections

Intersection types excel at mixing different behaviors or capabilities:

```typescript
type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type Identifiable = {
  id: string;
};

type Deletable = {
  isDeleted: boolean;
  deletedAt?: Date;
};

// Combine all capabilities
type Entity = Timestamped & Identifiable & Deletable;

const user: Entity = {
  id: '123',
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false
};
```

### Combining Unions and Intersections

The real power comes when you combine both patterns:

```typescript
type ApiKey = {
  type: 'api-key';
  key: string;
};

type OAuth = {
  type: 'oauth';
  token: string;
  refreshToken: string;
};

type BasicAuth = {
  type: 'basic';
  username: string;
  password: string;
};

// Union of authentication methods
type AuthMethod = ApiKey | OAuth | BasicAuth;

// Add common metadata to all auth methods
type WithMetadata = {
  createdAt: Date;
  lastUsed?: Date;
};

type AuthWithMetadata = AuthMethod & WithMetadata;

// Now any auth method will have metadata
const auth: AuthWithMetadata = {
  type: 'oauth',
  token: 'abc123',
  refreshToken: 'refresh123',
  createdAt: new Date(),
  lastUsed: new Date()
};
```

### Type Guards for Union Types

When working with union types, you'll often need type guards to narrow types:

```typescript
type Circle = {
  kind: 'circle';
  radius: number;
};

type Rectangle = {
  kind: 'rectangle';
  width: number;
  height: number;
};

type Shape = Circle | Rectangle;

function isCircle(shape: Shape): shape is Circle {
  return shape.kind === 'circle';
}

function calculateArea(shape: Shape): number {
  if (isCircle(shape)) {
    return Math.PI * shape.radius ** 2;
  } else {
    return shape.width * shape.height;
  }
}
```

### Best Practices

1. **Use discriminated unions** for complex state management
2. **Keep intersections simple** - deeply nested intersections can be hard to debug
3. **Prefer union types over optional properties** when fields are mutually exclusive
4. **Use type guards** to safely narrow union types
5. **Document your types** - complex unions and intersections benefit from JSDoc comments

---


