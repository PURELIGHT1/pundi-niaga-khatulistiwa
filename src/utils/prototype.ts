export {}

// ~1~STRING PROTOTYPE
String.prototype.isNumeric = function isNumeric(this: string) {
  const regex = /^[0-9]+$/
  return !!this.match(regex)
}
String.prototype.isBoolean = function isBoolean(this: string) {
  return ['true', 'false'].includes(this)
}
String.prototype.toCapitalizeCase = function toCapitalizeCase(this: string) {
  return this.split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
String.prototype.toLocaleCapitalizeCase = function toLocaleCapitalizeCase(
  this: string,
  locale: string,
) {
  return this.split(' ')
    .map(
      (word) => word.charAt(0).toLocaleUpperCase(locale) + word.slice(1).toLocaleLowerCase(locale),
    )
    .join(' ')
}
String.prototype.trimWhitespace = function trimWhitespace(this: string, all?: boolean) {
  return this.replace(/(\n|\r)+/g, all ? '' : ' ')
    .replace(/\s+/g, all ? '' : ' ')
    .trim()
}
String.prototype.toNomorHP = function toNomorHP(this: string) {
  let output = String(this)

  if (this.length > 3) {
    const head = this.substring(0, 3)
    const tail = this.substring(3, this.length)
    const split = tail.match(/\d{1,4}/g)

    if (split) {
      if (split.length > 2) {
        split.splice(1, 2, `${split[1]}${split[2]}`)
      }

      output = `${head}-${split.join('-')}`
    }
  }

  return output
}

String.prototype.toNomorSIM = function toNomorSIM(this: string) {
  let output = String(this)

  if (this.length > 4) {
    const head = this.substring(0, 4)
    const tail = this.substring(4, this.length)
    const split = tail.match(/\d{1,4}/g)

    if (split) {
      if (split.length > 2) {
        split.splice(1, 2, `${split[1]}${split[2]}`)
      }

      output = `${head}-${split.join('-')}`
    }
  }

  return output
}

//~1~DATE PROTOTYPE
Date.prototype.getWeekNumber = function getWeekNumber(this: Date) {
  const date = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()))
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7))
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  const weekNo = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)

  return weekNo
}
Date.prototype.getFirstDayOfMonth = function getFirstDayOfMonth(this: Date, month?: number) {
  return new Date(this.getFullYear(), month || this.getMonth(), 1).getDay()
}
Date.prototype.getLastDayOfMonth = function getLastDayOfMonth(this: Date, month?: number) {
  return new Date(this.getFullYear(), (month || this.getMonth()) + 1, 0).getDay()
}
Date.prototype.getLastDateOfMonth = function getLastDateOfMonth(this: Date, month?: number) {
  return new Date(this.getFullYear(), (month || this.getMonth()) + 1, 0).getDate()
}
Date.prototype.setDateToLastDayOfWeek = function setDateToLastDayOfWeek(this: Date) {
  this.setDate(this.getDate() + (7 - (this.getDay() % 7)))
}

//~1~ARRAY PROTOTYPE
Array.prototype.isRecursive = function isRecursive<T>(this: Array<T>): boolean {
  for (const element of this) {
    if (Array.isArray(element)) {
      return true
    }
  }
  return false
}
Array.prototype.removeDuplicates = function removeDuplicates<T>(this: Array<T>): Array<T> {
  return this.filter((self, index, array) => array.indexOf(self) === index)
}

declare global {
  interface String {
    /**
     * Checks if the string contains only numeric characters.
     */
    isNumeric(): boolean

    /**
     * Checks if the string is a boolean string ('true' or 'false').
     */
    isBoolean(): boolean

    /**
     * Converts the string to capitalize case, where the first letter of each word is capitalized.
     */
    toCapitalizeCase(): string

    /**
     * Converts the first character of each word in the string to uppercase and the remaining characters to lowercase,
     * taking locale into account.
     */
    toLocaleCapitalizeCase(locale: string): string

    /**
     * Trims whitespace from the string, optionally removing all whitespace characters.
     *
     * This method replaces all newline (`\n`, `\r`) characters and multiple whitespace characters with a single space if `all` is false.
     * If `all` is true, it removes all whitespace characters entirely.
     *
     * @example
     * const str = "  Hello   \nWorld!  ";
     * log(str.trimWhitespace()); // Output: "Hello World!"
     * log(str.trimWhitespace(true)); // Output: "HelloWorld!"
     */
    trimWhitespace(all?: boolean): string
    toNomorHP(): string
    toNomorSIM(): string
  }

  interface Date {
    /**
     * Returns the ISO week number of the current date.
     * - const date = new Date('2021-12-30');
     * - log(date.getWeekNumber()); // 52
     */
    getWeekNumber(): number

    /**
     * Returns the day of the week of the first day of the specified month.
     * - const date = new Date('2021-12-30');
     * - log(date.getFirstDayOfMonth()); // 3 (Wednesday)
     * - log(date.getFirstDayOfMonth(0)); // 5 (Friday, January 1, 2021)
     */
    getFirstDayOfMonth(month?: number): number

    /**
     * Returns the day of the week of the last day of the specified month.
     * - const date = new Date('2021-12-30');
     * - log(date.getLastDayOfMonth()); // 5 (Friday)
     * - log(date.getLastDayOfMonth(1)); // 0 (Sunday, February 28, 2021)
     */
    getLastDayOfMonth(month?: number): number

    /**
     * Returns the last date of the specified month.
     * - const date = new Date('2021-12-30');
     * - log(date.getLastDateOfMonth()); // 31
     * - log(date.getLastDateOfMonth(1)); // 28 (February in a non-leap year)
     */
    getLastDateOfMonth(month?: number): number

    /**
     * Sets the date to the last day of the current week (Sunday).
     * - const date = new Date('2021-12-29');
     * - date.setDateToLastDayOfWeek();
     * - log(date); // The date will be set to Sunday, January 2, 2022
     */
    setDateToLastDayOfWeek(): void
  }

  interface Array<T> {
    /**
     * Checks if the array contains any recursive arrays (nested arrays).
     *
     * This method iterates through the elements of the array and checks if any of them
     * are arrays. If it finds any nested arrays, it returns true; otherwise, it returns false.
     *
     * @example
     * const arr1 = [1, 2, 3];
     * const arr2 = [1, [2, 3], 4];
     * log(arr1.isRecursive()); // false
     * log(arr2.isRecursive()); // true
     */
    isRecursive(): boolean

    /**
     * Removes duplicate elements from an array.
     *
     * This method filters the array and returns a new array with only unique elements.
     * It keeps the first occurrence of each element and removes subsequent duplicates.
     *
     * @example
     * const arr = [1, 2, 2, 3, 4, 4, 5];
     * const uniqueArr = arr.removeDuplicates();
     * log(uniqueArr); // [1, 2, 3, 4, 5]
     */
    removeDuplicates(): Array<T>
  }
}
