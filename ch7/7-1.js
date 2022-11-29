// const organization = { name: 'Acme Gooseberries', country: 'GB' };

// organization.name = 'Dream Coding';
// console.log(organization.name);
// console.log(organization.country);

class Organization {
    #name;
    #country;
    constructor(data) {
        this.#name = data.name;
        this.#country = data.country;
    }

    get name() { return this.#name; }
    set name(aString) { this.#name = aString; }
    get country() { return this.#country; }
    set country(aCountryCode) { this.#country = aCountryCode; }
    get rawData() { return { name: this.name, country: this.country }; }
}

const organization = new Organization({ name: 'Acme Gooseberries', country: 'GB' })

console.log(organization.name);
console.log(organization.country);
organization.name = 'Dream Coding';
console.log(organization.rawData);