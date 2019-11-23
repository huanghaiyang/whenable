export interface IConsumer {
  (): void
}

export interface IPredicate {
  (): Boolean
}

export interface IPredicatePromise {
  (): Promise<Boolean>
}

export interface IThenable {
  conditional: Boolean | Promise<Boolean>
  then(consumer: IConsumer | null): IElsable | null
}

export interface IElsable {
  else(consumer: IConsumer | null): void
}

export class Elsable implements IElsable {
  conditional: Boolean | Promise<Boolean> = false
  constructor(conditional: Boolean | Promise<Boolean>) {
    this.conditional = conditional
  }
  else(consumer: IConsumer | null): void {
    if (this.conditional instanceof Promise) {
      this.conditional.then((result) => {
        if (!result) {
          if (consumer) {
            consumer()
          }
        }
      })
    } else if (!this.conditional) {
      if (consumer) {
        consumer()
      }
    }
  }
}

export class Thenable implements IThenable {
  conditional: Boolean | Promise<Boolean> = true
  constructor(conditional: Boolean | Promise<Boolean>) {
    this.conditional = conditional
  }
  then(consumer: IConsumer | null): IElsable | null {
    if (this.conditional instanceof Promise) {
      this.conditional.then((result) => {
        if (result) {
          if (consumer) {
            consumer()
          }
        }
      })
    } else if (this.conditional) {
      if (consumer) {
        consumer()
      }
    }
    return new Elsable(this.conditional)
  }
}

export function when(predicate: Boolean | IPredicate | IPredicatePromise): Thenable {
  let conditional
  if (predicate instanceof Function) {
    conditional = predicate()
  } else {
    conditional = predicate
  }
  return new Thenable(conditional)
}
