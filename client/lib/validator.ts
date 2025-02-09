export function validateFields<T extends Record<string, string | number>>(data: T): string[] {
    const errors: string[] = [];
  
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];
  
        if (typeof value === "string" && value.trim() === "") {
          errors.push(`${key} should not be empty.`);
        } else if (typeof value === "number" && value <= 0) {
          errors.push(`${key} should be greater than 0.`);
        }
      }
    }
  
    return errors;
  }