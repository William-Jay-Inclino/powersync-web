export default function incrementPrimaryKey(stringKey:string,separator:string = '-') {
    // Split the primary key into two parts, prefix and number
    const parts = stringKey.split(separator);
    if (parts.length !== 2 || isNaN(parseInt(parts[1], 10))) {
        throw new Error('Invalid string key format');
    }

    // Increment the numeric part
    const prefix = parts[0];
    const number = parseInt(parts[1], 10) + 1;

    // Convert the number back to a string with leading zeros
    const numberAsString = number.toString().padStart(parts[1].length, '0');

    // Return the new primary key
    return `${prefix}-${numberAsString}`;
}
