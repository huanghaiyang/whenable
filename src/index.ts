export interface IConsumer {
  (): void
}

export interface IPredicate {
  (): Boolean
}

export interface IThenable {
  conditional: Boolean
  then(consumer: IConsumer| null): IElsable | null
}

export interface IElsable {
  else(consumer: IConsumer| null): void
}

export class Elsable implements IElsable {
  conditional: Boolean = false
  constructor(conditional: Boolean) {
    this.conditional = conditional
  }
  else(consumer: IConsumer| null): void {
    if (!this.conditional) {
      if(consumer) {
        consumer()
      }
    }
  }
}

export class Thenable implements IThenable {
  conditional: Boolean = true
  constructor(conditional: Boolean) {
    this.conditional = conditional
  }
  then(consumer: IConsumer| null): IElsable | null {
    if (this.conditional) {
      if (consumer) {
        consumer()
      }
      return null
    } else {
      return new Elsable(this.conditional)
    }
  }
}

export function when(predicate: Boolean | IPredicate): Thenable {
  let conditional
  if (predicate instanceof Function) {
    conditional = predicate()
  } else {
    conditional = predicate
  }
  return new Thenable(conditional)
}
